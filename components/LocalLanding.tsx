import type { ReactNode } from "react";
import Link from "next/link";
// Architecture pour de futures pages locales : fournir un contenu et des photos propres à chaque lieu.
// Aucune page artificielle n’est publiée automatiquement.
export type LocalLandingContent = {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
};
export default function LocalLanding({
  eyebrow,
  title,
  intro,
  children,
}: LocalLandingContent) {
  return (
    <main id="main" className="legal-page section">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="section-intro">{intro}</p>
      {children}
      <Link className="button" href="/#contact">
        Parlons de votre mariage ↗
      </Link>
    </main>
  );
}
