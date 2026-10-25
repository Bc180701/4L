"use client";
import { useEffect, useRef } from "react";
import { Check, ArrowUpRight } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { site, money } from "@/config/site";
import { track } from "@/lib/analytics";
export default function Pricing() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          track("view_pricing");
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  function select(id: string) {
    track("select_package", { package_id: id });
    window.dispatchEvent(new CustomEvent("select-package", { detail: id }));
  }
  return (
    <section className="pricing-section" id="formules" ref={ref}>
      <div className="section">
        <SectionTitle
          eyebrow="À CHACUN SA BELLE ÉCHAPPÉE"
          centered
          text="Trois façons de prendre la route ensemble. Le même soin, la même 4L, et toujours votre chauffeur."
        >
          De jolies formules,
          <br />
          <em>en toute simplicité.</em>
        </SectionTitle>
        <div className="pricing-grid">
          {site.packages.map((p, i) => (
            <article
              key={p.id}
              className={`price-card ${p.featured ? "featured" : ""}`}
            >
              {p.featured && <span className="popular">La plus choisie</span>}
              <span className="card-number">0{i + 1} /</span>
              <h3>{p.name}</h3>
              <p className="package-tagline">{p.tagline}</p>
              <div className="price">
                <strong>{money(p.price)}</strong>
                <span>/ {p.hours} heures</span>
              </div>
              <p className="package-description">{p.description}</p>
              <ul>
                {[...p.features, `${site.includedKm} km inclus`].map((f) => (
                  <li key={f}>
                    <Check size={15} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={`#contact`}
                className={`button ${p.featured ? "button-light" : "button-outline"}`}
                onClick={() => select(p.id)}
              >
                Demander une disponibilité <ArrowUpRight size={16} />
              </a>
            </article>
          ))}
        </div>
        <div className="pricing-options">
          <p>
            <strong>Un peu plus de vous ?</strong> Les petits plus, selon vos
            envies.
          </p>
          <div>
            <span>
              Heure supplémentaire <b>+{money(site.options.extraHour)}</b>
            </span>
            <span>
              Décoration personnalisée{" "}
              <b>dès {money(site.options.decorationFrom)}</b>
            </span>
            <span>
              Au-delà de {site.includedKm} km{" "}
              <b>+{money(site.options.extraKm)}/km</b>
            </span>
          </div>
        </div>
        <p className="pricing-note">
          Les trajets, horaires et options sont confirmés ensemble avant la
          réservation. Une seule voiture, une attention toute particulière.
        </p>
      </div>
    </section>
  );
}
