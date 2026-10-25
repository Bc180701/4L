import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="legal-page section">
      <p className="eyebrow">UN PETIT DÉTOUR</p>
      <h1>Cette route n’existe pas.</h1>
      <p>Retrouvons-nous sur la page d’accueil.</p>
      <Link href="/" className="button">
        Revenir à l’accueil
      </Link>
    </main>
  );
}
