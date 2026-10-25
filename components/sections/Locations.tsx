import { MapPin, ArrowUpRight } from "lucide-react";
import Photo from "@/components/ui/Photo";
import SectionTitle from "@/components/ui/SectionTitle";
import { site } from "@/config/site";
export default function Locations() {
  return (
    <section className="location-section" id="provence">
      <div className="location-photo">
        <Photo
          name="4l-provence.jpg"
          fallback="placeholder-provence.svg"
          alt="Les reliefs des Alpilles, les oliviers et les routes de Provence"
        />
        <span className="handwritten">
          Les petits chemins font
          <br />
          les plus beaux souvenirs.
        </span>
      </div>
      <div className="location-copy">
        <SectionTitle eyebrow="ICI, CHEZ NOUS">
          Une 4L pour votre mariage
          <br />
          <em>au cœur des Alpilles.</em>
        </SectionTitle>
        <p>
          De la lumière de Saint-Rémy-de-Provence aux ruelles des Baux, des mas
          de Maussane aux oliviers d’Eygalières, notre 4L trouve naturellement
          sa place dans le décor de votre mariage.
        </p>
        <p>
          Nous vous accompagnons dans les Alpilles, autour d’Arles et d’Avignon,
          jusqu’aux domaines et lieux de réception de Provence, dans les
          Bouches-du-Rhône et le Vaucluse, selon la distance.
        </p>
        <div className="location-tags">
          {site.locations.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
        <p className="other-location">
          <MapPin size={17} /> Une autre commune ? Nous étudions chaque demande.
        </p>
        <a href="#contact" className="text-link">
          Parlons de votre itinéraire <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}
