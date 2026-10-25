import Photo from "@/components/ui/Photo";
import SectionTitle from "@/components/ui/SectionTitle";
import { site } from "@/config/site";
import { isPlaceholder } from "@/lib/images";
export default function CarStory() {
  return (
    <section className="section story" id="la-4l">
      <div className="story-copy">
        <SectionTitle eyebrow="UNE VOITURE, UN PROJET DE CŒUR">
          Une 4L de {site.car.year}
          <br />
          qui <em>reprend la route.</em>
        </SectionTitle>
        <p>
          Tout commence avec une {site.car.model} de {site.car.year} et l’envie
          de lui offrir une seconde vie. Un projet de restauration mécanique et
          esthétique, mené avec soin, pour retrouver ce qui fait son charme.
        </p>
        <p>
          Sa prochaine destination ? Les mariages de Provence. Une voiture à
          taille humaine, un bleu tout en douceur et le propriétaire au volant,
          heureux de partager un petit bout de route avec vous.
        </p>
        <span className="status">
          <span /> {site.car.status} · Les vraies photos arrivent bientôt
        </span>
        <div className="car-facts">
          <span>
            <strong>{site.car.year}</strong>Son année
          </span>
          <span>
            <strong>Clan</strong>Son caractère
          </span>
          <span>
            <strong>Provence</strong>Son horizon
          </span>
        </div>
      </div>
      <div className="story-images">
        <figure>
          <Photo
            name="restoration-before.jpg"
            fallback="placeholder-detail.svg"
            alt="La 4L avant sa restauration"
          />
          <figcaption>
            01 — Avant
            {isPlaceholder("restoration-before.jpg") ? " · Photo à venir" : ""}
          </figcaption>
        </figure>
        <figure>
          <Photo
            name="restoration-after.jpg"
            alt="La 4L après sa restauration"
          />
          <figcaption>
            02 — La suite de l’histoire
            {isPlaceholder("restoration-after.jpg") ? " · Photo à venir" : ""}
          </figcaption>
        </figure>
        <span className="story-seal">
          Une seconde vie,
          <br />
          <em>de belles premières fois.</em>
        </span>
      </div>
    </section>
  );
}
