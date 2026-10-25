import { imageSource, isPlaceholder } from "@/lib/images";
import SectionTitle from "@/components/ui/SectionTitle";
import GalleryGrid from "./GalleryGrid";
const photos = [
  {
    name: "4l-side.jpg",
    label: "Le charme d’une silhouette",
    category: "La 4L",
    fallback: "placeholder-4l.svg",
  },
  {
    name: "4l-front.jpg",
    label: "Un joli départ à deux",
    category: "Mariages",
    fallback: "placeholder-4l.svg",
  },
  {
    name: "4l-interior.jpg",
    label: "Les détails font la différence",
    category: "Détails",
    fallback: "placeholder-detail.svg",
  },
  {
    name: "4l-provence.jpg",
    label: "Quelque part dans les Alpilles",
    category: "Provence",
    fallback: "placeholder-provence.svg",
  },
];
export default function Gallery() {
  return (
    <section className="section gallery" id="galerie">
      <div className="gallery-heading">
        <SectionTitle eyebrow="UN APERÇU DE NOTRE UNIVERS">
          Les beaux jours
          <br />
          <em>se dessinent ici.</em>
        </SectionTitle>
        <p>
          En attendant les photos de notre 4L restaurée,
          <br />
          quelques illustrations pour imaginer la suite.
        </p>
      </div>
      <GalleryGrid
        photos={photos.map((p) => ({
          ...p,
          src: imageSource(p.name, p.fallback),
          placeholder: isPlaceholder(p.name),
        }))}
      />
    </section>
  );
}
