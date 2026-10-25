import { Camera, Heart, Route, CarFront } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
const items = [
  {
    icon: CarFront,
    title: "Votre chauffeur, tout simplement",
    text: "Le propriétaire au volant, vous deux à l’arrière. L’esprit léger, du premier au dernier kilomètre.",
  },
  {
    icon: Route,
    title: "Un itinéraire qui vous ressemble",
    text: "Domicile ou hôtel, mairie, cérémonie et réception : les étapes se dessinent avec vous.",
  },
  {
    icon: Camera,
    title: "Une vraie place dans vos photos",
    text: "Une ligne attachante, un bleu singulier. Et le temps de s’arrêter pour en garder une image.",
  },
  {
    icon: Heart,
    title: "Le charme des choses simples",
    text: "Une voiture préparée pour votre journée, une allure vintage et le plaisir de prendre son temps.",
  },
];
export default function Experience() {
  return (
    <>
      <div className="promise-strip">
        <span>Une 4L de caractère</span>
        <span>✳︎</span>
        <span>Un chauffeur attentionné</span>
        <span>✳︎</span>
        <span>Votre Provence, à votre rythme</span>
      </div>
      <section className="section experience" id="experience">
        <div className="experience-intro">
          <SectionTitle eyebrow="L’ESPRIT 4L">
            Plus qu’une voiture,
            <br />
            un souvenir <em>de votre mariage.</em>
          </SectionTitle>
          <p>
            Il y a les grands moments. Et puis ces petits instants entre deux :
            un sourire en quittant la mairie, une route bordée d’oliviers, votre
            arrivée au mas. Notre 4L est là pour leur donner une couleur à part.
          </p>
        </div>
        <div className="experience-grid">
          {items.map(({ icon: Icon, title, text }) => (
            <article key={title}>
              <Icon size={26} strokeWidth={1.2} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
