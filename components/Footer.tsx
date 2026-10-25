"use client";
import Link from "next/link";
import { ArrowUpRight, Instagram } from "lucide-react";
import { site } from "@/config/site";
import { track } from "@/lib/analytics";
import Brand from "@/components/ui/Brand";
export default function Footer() {
  return (
    <footer>
      <div className="footer-top section">
        <div className="footer-brand">
          <Link
            href="/"
            className="footer-logo"
            aria-label={`${site.name}, accueil`}
          >
            <Brand />
          </Link>
          <p>
            Une Renault 4L vintage
            <br />
            pour votre mariage en Provence.
          </p>
        </div>
        <div>
          <p className="eyebrow">LES PETITES ROUTES</p>
          <a href="/#formules">Les formules</a>
          <a href="/#la-4l">L’histoire de la 4L</a>
          <a href="/#galerie">La galerie</a>
          <a href="/#faq">Vos questions</a>
        </div>
        <div>
          <p className="eyebrow">FAISONS CONNAISSANCE</p>
          <a href="/#contact">
            Parlons de votre mariage <ArrowUpRight size={14} />
          </a>
          {site.email && (
            <a
              href={`mailto:${site.email}`}
              onClick={() => track("click_email")}
            >
              {site.email}
            </a>
          )}
          {site.phone && (
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              onClick={() => track("click_phone")}
            >
              {site.phone}
            </a>
          )}
          {site.instagram && (
            <a href={site.instagram} target="_blank" rel="noopener noreferrer">
              <Instagram size={15} /> Instagram
            </a>
          )}
          <p className="footer-zone">
            Saint-Rémy-de-Provence
            <br />
            Alpilles · Provence
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {site.name} · Les beaux jours se
          partagent.
        </span>
        <div>
          <Link href="/mentions-legales">Mentions légales</Link>
          <Link href="/confidentialite">Confidentialité</Link>
          <button
            onClick={() => window.dispatchEvent(new Event("open-consent"))}
          >
            Cookies
          </button>
        </div>
      </div>
    </footer>
  );
}
