import SectionTitle from "@/components/ui/SectionTitle";
const steps = [
  [
    "Vous nous parlez de votre mariage",
    "Votre date, vos communes, vos horaires et les grandes lignes de votre journée.",
  ],
  [
    "Nous préparons votre itinéraire",
    "La prise en charge, la cérémonie, les photos et l’arrivée à la réception.",
  ],
  [
    "Votre 4L vous attend",
    "La voiture est préparée avant votre arrivée. Il ne manque plus que vous.",
  ],
  [
    "Vous profitez, tout simplement",
    "Votre chauffeur s’occupe du trajet. À vous de savourer cette parenthèse à deux.",
  ],
];
export default function HowItWorks() {
  return (
    <section className="section how">
      <SectionTitle eyebrow="ON S’OCCUPE DE LA ROUTE" centered>
        Quatre étapes.
        <br />
        <em>Et beaucoup de simplicité.</em>
      </SectionTitle>
      <div className="steps">
        {steps.map(([title, text], i) => (
          <article key={title}>
            <span className="step-number">0{i + 1}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
