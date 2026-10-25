import { Plus } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { faqs } from "@/lib/faq";
export default function FAQ() {
  return (
    <section className="faq-section" id="faq">
      <div className="section faq-layout">
        <div>
          <SectionTitle eyebrow="AVANT DE PRENDRE LA ROUTE">
            Vos questions,
            <br />
            <em>tout simplement.</em>
          </SectionTitle>
          <p>
            Chaque mariage est différent.
            <br />
            Et si nous en parlions ?
          </p>
          <a className="text-link" href="#contact">
            Nous poser une question ↗
          </a>
        </div>
        <div className="faq-list">
          {faqs.map(([q, a]) => (
            <details key={q} name="faq">
              <summary>
                {q}
                <Plus size={19} />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
