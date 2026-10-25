import { NextResponse } from "next/server";
import { contactSchema, escapeHtml } from "@/lib/contact";
import { site } from "@/config/site";
import { createHash } from "node:crypto";
export const runtime = "nodejs";
const attempts = new Map<string, { count: number; expires: number }>();
const recent = new Map<string, number>();
const json = (error: string, status: number) =>
  NextResponse.json({ error }, { status });
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  // Next peut reconstruire l’URL interne avec 0.0.0.0 derrière un proxy.
  // Le domaine public configuré reste prioritaire ; en développement, comparer au Host reçu.
  if (origin) {
    let allowed = false;
    try {
      allowed = site.url
        ? new URL(origin).origin === new URL(site.url).origin
        : new URL(origin).host ===
          (request.headers.get("host") || new URL(request.url).host);
    } catch {
      return json("Origine de la demande invalide.", 403);
    }
    if (!allowed) return json("Origine de la demande non autorisée.", 403);
  }
  if (!request.headers.get("content-type")?.includes("application/json"))
    return json("Format de demande invalide.", 415);
  // Lecture bornée, y compris pour les requêtes sans Content-Length.
  const reader = request.body?.getReader();
  if (!reader) return json("Demande vide.", 400);
  let size = 0;
  let raw = "";
  const decoder = new TextDecoder();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16000) {
        await reader.cancel();
        return json("Votre demande est trop longue.", 413);
      }
      raw += decoder.decode(value, { stream: true });
    }
    raw += decoder.decode();
  } catch {
    return json("Impossible de lire la demande.", 400);
  }
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return json("Demande invalide.", 400);
  }
  const parsed = contactSchema.safeParse(value);
  if (!parsed.success)
    return json(
      "Certains champs sont invalides. Vérifiez la date, vos coordonnées et votre accord.",
      400,
    );
  const data = parsed.data;
  if (
    data.website ||
    Date.now() - data.startedAt < 1800 ||
    data.startedAt > Date.now()
  )
    return json("Veuillez patienter quelques secondes et réessayer.", 400);
  // Limite locale simple : compléter par une limite au niveau hébergeur en production multi-instance.
  const key = createHash("sha256")
    .update(data.email.toLowerCase())
    .digest("hex");
  const now = Date.now();
  for (const [key, bucket] of attempts)
    if (bucket.expires < now) attempts.delete(key);
  for (const [key, expiry] of recent) if (expiry < now) recent.delete(key);
  if (recent.has(key))
    return json(
      "Une demande vient déjà d’être envoyée avec cet email. Patientez une minute avant de réessayer.",
      429,
    );
  const bucket = attempts.get(key);
  if (bucket && bucket.count >= 5)
    return json(
      "Trop de tentatives. Veuillez réessayer dans quelques minutes.",
      429,
    );
  if (attempts.size > 10000)
    return json(
      "Le service est temporairement occupé. Veuillez réessayer.",
      503,
    );
  attempts.set(key, {
    count: (bucket?.count || 0) + 1,
    expires: bucket?.expires || now + 15 * 60 * 1000,
  });
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !to || !from)
    return json(
      "L’envoi des demandes n’est pas encore activé. Veuillez revenir prochainement.",
      503,
    );
  const selected =
    site.packages.find((p) => p.id === data.package)?.name ||
    "À définir ensemble";
  const fields = [
    ["Prénom", data.firstName],
    ["Nom", data.lastName],
    ["Email", data.email],
    ["Téléphone", data.phone],
    ["Date du mariage", data.date],
    ["Départ", data.departure],
    ["Cérémonie", data.ceremony],
    ["Réception", data.reception],
    ["Formule", selected],
    ["Heures estimées", String(data.hours)],
    ["Message", data.message || "—"],
  ];
  const text =
    fields.map(([k, v]) => `${k} : ${v}`).join("\n") +
    "\n\nAccord de recontact recueilli via le formulaire.";
  const fingerprint = createHash("sha256")
    .update(JSON.stringify(data))
    .digest("hex");
  try {
    const result = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(12000),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `4l-${fingerprint}`,
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `Demande mariage — ${data.date} — ${site.name}`,
        text,
        html: `<h1>Nouvelle demande de disponibilité</h1>${fields.map(([k, v]) => `<p><strong>${escapeHtml(k)}</strong><br/>${escapeHtml(v).replace(/\n/g, "<br/>")}</p>`).join("")}<p>Accord de recontact recueilli via le formulaire.</p>`,
      }),
    });
    if (!result.ok)
      return json(
        "L’envoi n’a pas abouti. Veuillez réessayer un peu plus tard.",
        502,
      );
    recent.set(key, now + 60000);
    return NextResponse.json({ ok: true });
  } catch {
    return json(
      "Le service d’envoi ne répond pas. Veuillez réessayer un peu plus tard.",
      502,
    );
  }
}
