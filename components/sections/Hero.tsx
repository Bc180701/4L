import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import Photo from "@/components/ui/Photo";
export default function Hero() {
  return (
    <section className="hero" id="accueil">
      <div className="hero-content">
        <p className="eyebrow">
          <span className="tiny-line" /> LE BONHEUR PREND LES PETITES ROUTES
        </p>
        <h1>
          Votre mariage
          <br />
          en Provence
          <br /> à bord d’une <em>4L.</em>
        </h1>
        <p className="hero-description">
          Une Renault 4L de 1987, son chauffeur et le charme de la Provence pour
          accompagner l’un des plus beaux jours de votre vie.
        </p>
        <div className="hero-actions">
          <a className="button" href="#contact">
            Vérifier la disponibilité <ArrowUpRight size={17} />
          </a>
          <a className="text-link" href="#formules">
            Découvrir les formules <ArrowDown size={15} />
          </a>
        </div>
        <p className="hero-location">
          <MapPin size={14} /> Saint-Rémy-de-Provence · Alpilles · Provence
        </p>
      </div>
      <div className="hero-visual">
        <Photo
          name="hero-4l.jpg"
          alt="Une 4L bleue sur une petite route de Provence"
          priority
          sizes="(max-width: 760px) 100vw, 62vw"
        />
        <div className="hero-stamp">
          <span>DEPUIS</span>
          <strong>1987</strong>
          <span>LE CHARME RESTE</span>
        </div>
        <div className="visual-note">
          <span className="note-star">✳︎</span>
          <span>
            Une jolie route.
            <br />
            Votre belle histoire.
          </span>
        </div>
      </div>
      <a className="hero-scroll" href="#experience">
        <ArrowDown size={15} /> PRENDRE LE TEMPS DE DÉCOUVRIR
      </a>
    </section>
  );
}
