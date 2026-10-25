"use client";
import Script from "next/script";
import { useEffect, useState } from "react";
export default function Analytics() {
  const [consent, setConsent] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const gtm = process.env.NEXT_PUBLIC_GTM_ID;
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  const ads = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const configured = !!(gtm || ga || ads);
  useEffect(() => {
    const saved = localStorage.getItem("4l-consent");
    setConsent(saved);
    setShow(!saved);
    const open = () => setShow(true);
    window.addEventListener("open-consent", open);
    return () => window.removeEventListener("open-consent", open);
  }, []);
  function choose(value: string) {
    localStorage.setItem("4l-consent", value);
    setConsent(value);
    setShow(false);
    if (value === "rejected") {
      const names = document.cookie
        .split(";")
        .map((c) => c.split("=")[0].trim())
        .filter((n) => n.startsWith("_ga") || n.startsWith("_gcl"));
      const host = location.hostname.split(".");
      for (const name of names) {
        document.cookie = `${name}=;Max-Age=0;path=/`;
        for (let i = 0; i < host.length - 1; i++)
          document.cookie = `${name}=;Max-Age=0;path=/;domain=.${host.slice(i).join(".")}`;
      }
      if (window.gtag || window.dataLayer) location.reload();
    }
  }
  return (
    <>
      {configured &&
        consent === "accepted" &&
        (gtm ? (
          <Script
            id="gtm"
            strategy="afterInteractive"
          >{`window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtm.js?id='+${JSON.stringify(gtm)};document.head.appendChild(s);`}</Script>
        ) : (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga || ads || "")}`}
              strategy="afterInteractive"
            />
            <Script
              id="google-init"
              strategy="afterInteractive"
            >{`window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments);};gtag('js',new Date());${ga ? `gtag('config',${JSON.stringify(ga)});` : ""}${ads ? `gtag('config',${JSON.stringify(ads)});` : ""}`}</Script>
          </>
        ))}
      {show && (
        <aside
          className="cookie-banner"
          aria-label="Préférences de confidentialité"
        >
          <p>
            <strong>Un petit mot sur les cookies</strong>
            <br />
            {configured
              ? "Avec votre accord, nous utilisons des outils de mesure d’audience et de publicité. Votre choix n’empêche pas l’utilisation du site."
              : "Aucun outil de mesure publicitaire n’est activé pour le moment. Seul votre choix de confidentialité est conservé sur cet appareil."}{" "}
            <a href="/confidentialite">En savoir plus</a>
          </p>
          <div>
            <button onClick={() => choose("rejected")}>Tout refuser</button>
            <button onClick={() => choose("accepted")}>Tout accepter</button>
          </div>
        </aside>
      )}
    </>
  );
}
