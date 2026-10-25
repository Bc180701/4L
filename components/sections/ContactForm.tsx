"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  CalendarDays,
  Clock3,
  MapPin,
} from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { site, money } from "@/config/site";
import { contactSchema } from "@/lib/contact";
import { track } from "@/lib/analytics";
export default function ContactForm() {
  const [selected, setSelected] = useState("undecided");
  const [hours, setHours] = useState("4");
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const started = useRef(0);
  const interacted = useRef(false);
  const errorRef = useRef<HTMLDivElement>(null);
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  useEffect(() => {
    started.current = Date.now();
    const handler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      setSelected(id);
      setHours(String(site.packages.find((p) => p.id === id)?.hours || 4));
    };
    window.addEventListener("select-package", handler);
    return () => window.removeEventListener("select-package", handler);
  }, []);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const payload = {
      ...data,
      consent: data.consent === "on",
      startedAt: started.current,
    };
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      setErrors(
        Object.fromEntries(
          parsed.error.issues.map((i) => [String(i.path[0]), i.message]),
        ),
      );
      setState("error");
      setMessage("Vérifiez les champs indiqués avant d’envoyer votre demande.");
      setTimeout(() => errorRef.current?.focus(), 0);
      return;
    }
    setErrors({});
    setState("sending");
    setMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const body = await res.json();
      if (!res.ok)
        throw new Error(
          body.error || "L’envoi n’a pas abouti. Veuillez réessayer.",
        );
      setState("success");
      track("generate_lead", { package_id: selected });
    } catch (e) {
      setState("error");
      setMessage(
        e instanceof Error
          ? e.message
          : "L’envoi est indisponible pour le moment.",
      );
      setTimeout(() => errorRef.current?.focus(), 0);
    }
  }
  function field(name: string, label: string, type = "text", placeholder = "") {
    return (
      <label className="field" key={name}>
        <span>
          {label} <span aria-hidden="true">*</span>
        </span>
        <input
          type={type}
          name={name}
          required
          maxLength={type === "email" ? 254 : 200}
          placeholder={placeholder}
          autoComplete={
            (
              {
                firstName: "given-name",
                lastName: "family-name",
                email: "email",
                phone: "tel",
              } as Record<string, string>
            )[name]
          }
          min={type === "date" ? today : undefined}
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? `${name}-error` : undefined}
        />
        {errors[name] && (
          <small className="field-error" id={`${name}-error`}>
            {errors[name]}
          </small>
        )}
      </label>
    );
  }
  return (
    <section className="contact-section" id="contact">
      <div className="section contact-layout">
        <div className="contact-copy">
          <SectionTitle eyebrow="LE DÉBUT DE VOTRE BELLE ÉCHAPPÉE">
            Votre date
            <br />
            est-elle <em>disponible ?</em>
          </SectionTitle>
          <p>
            Racontez-nous les grandes lignes de votre mariage. Nous revenons
            vers vous pour parler du trajet, de vos envies et de la
            disponibilité de la 4L.
          </p>
          <div className="contact-points">
            <span>
              <CalendarDays size={19} /> Une demande, sans engagement
            </span>
            <span>
              <MapPin size={19} /> Un programme préparé ensemble
            </span>
            <span>
              <Clock3 size={19} /> Un échange direct avec le propriétaire
            </span>
          </div>
          <p className="contact-note">
            Notre 4L est actuellement en restauration. Les dates de prestation
            seront confirmées personnellement, selon sa remise en route.
          </p>
          <span className="contact-signature">
            À bientôt sur les petites routes.
          </span>
        </div>
        <div className="contact-card">
          {state === "success" ? (
            <div className="success" role="status">
              <CheckCircle2 size={45} strokeWidth={1} />
              <h3>Merci pour votre confiance.</h3>
              <p>
                Merci ! Votre demande a bien été envoyée. Nous revenons vers
                vous rapidement pour vérifier la disponibilité de la 4L.
              </p>
              <button
                className="button button-outline"
                onClick={() => {
                  setState("idle");
                  started.current = Date.now();
                }}
              >
                Faire une autre demande
              </button>
            </div>
          ) : (
            <form
              onSubmit={submit}
              onFocus={() => {
                if (!interacted.current) {
                  track("form_start");
                  interacted.current = true;
                }
              }}
              noValidate
            >
              <p className="form-title">
                Parlons de votre mariage <span>↗</span>
              </p>
              <p className="form-hint">
                Les champs marqués d’un * sont nécessaires.
              </p>
              <div className="form-grid">
                {field("firstName", "Prénom", "text", "Camille")}
                {field("lastName", "Nom", "text", "Votre nom")}
                {field("email", "Email", "email", "vous@exemple.fr")}
                {field("phone", "Téléphone", "tel", "06 …")}
                {field("date", "Date du mariage", "date")}
                {field(
                  "departure",
                  "Commune de départ",
                  "text",
                  "Saint-Rémy-de-Provence",
                )}
                {field(
                  "ceremony",
                  "Lieu de cérémonie",
                  "text",
                  "Mairie, église ou domaine",
                )}
                {field(
                  "reception",
                  "Lieu de réception",
                  "text",
                  "Nom du lieu et commune",
                )}
                <label className="field">
                  <span>Formule envisagée *</span>
                  <select
                    name="package"
                    value={selected}
                    onChange={(e) => {
                      setSelected(e.target.value);
                      const p = site.packages.find(
                        (p) => p.id === e.target.value,
                      );
                      if (p) setHours(String(p.hours));
                    }}
                  >
                    {site.packages.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} · {p.hours} h · {money(p.price)}
                      </option>
                    ))}
                    <option value="undecided">À définir ensemble</option>
                  </select>
                </label>
                <label className="field">
                  <span>Nombre d’heures estimé *</span>
                  <input
                    name="hours"
                    type="number"
                    min="1"
                    max="12"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    required
                    aria-invalid={!!errors.hours}
                  />
                  {errors.hours && (
                    <small className="field-error">{errors.hours}</small>
                  )}
                </label>
                <label className="field full-width">
                  <span>Un petit mot sur votre journée</span>
                  <textarea
                    name="message"
                    rows={4}
                    maxLength={3000}
                    placeholder="Votre programme, vos envies, vos questions…"
                  />
                </label>
              </div>
              <div className="honeypot" aria-hidden="true">
                <label>
                  Votre site internet
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              <label className="consent">
                <input
                  name="consent"
                  type="checkbox"
                  required
                  aria-invalid={!!errors.consent}
                />
                <span>
                  J’accepte d’être recontacté concernant ma demande.{" "}
                  <Link href="/confidentialite">
                    En savoir plus sur mes données.
                  </Link>
                </span>
              </label>
              {errors.consent && (
                <p className="field-error">{errors.consent}</p>
              )}
              {state === "error" && (
                <div
                  ref={errorRef}
                  tabIndex={-1}
                  className="form-error"
                  role="alert"
                >
                  {message}
                </div>
              )}
              <button
                className="button submit-button"
                type="submit"
                disabled={state === "sending"}
              >
                {state === "sending"
                  ? "Envoi en cours…"
                  : "Demander ma disponibilité"}{" "}
                <ArrowUpRight size={17} />
              </button>
              <p className="form-hint form-bottom">
                Une demande de disponibilité ne constitue pas une réservation.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
