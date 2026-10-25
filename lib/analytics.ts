export type EventName =
  | "form_start"
  | "generate_lead"
  | "click_phone"
  | "click_email"
  | "view_pricing"
  | "select_package";
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}
export function track(
  event: EventName,
  params: Record<string, string | number> = {},
) {
  if (
    typeof window === "undefined" ||
    localStorage.getItem("4l-consent") !== "accepted"
  )
    return;
  // Pas de données personnelles dans les événements.
  if (process.env.NEXT_PUBLIC_GTM_ID) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
  } else window.gtag?.("event", event, params);
  const ads = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const label = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
  if (
    event === "generate_lead" &&
    ads &&
    label &&
    !process.env.NEXT_PUBLIC_GTM_ID
  ) {
    window.gtag?.("event", "conversion", { send_to: `${ads}/${label}` });
  }
}
