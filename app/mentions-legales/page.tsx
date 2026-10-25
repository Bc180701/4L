import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
export const metadata: Metadata = {
  title: "Mentions légales",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false, follow: true },
};
export default function Legal() {
  return (
    <main id="main" className="legal-page section">
      <p className="eyebrow">LES INFORMATIONS PRATIQUES</p>
      <h1>Mentions légales</h1>
      <p className="legal-notice">
        Document préparatoire : les informations de l’exploitant et de
        l’hébergeur doivent être complétées avant la publication commerciale du
        site.
      </p>
      <h2>Éditeur du site</h2>
      <p>
        {site.name}
        <br />
        Responsable de publication : {site.legal.owner || "À renseigner"}
        <br />
        Statut : {site.legal.status || "À renseigner"}
        <br />
        Immatriculation : {site.legal.registration || "À renseigner"}
        <br />
        Adresse professionnelle : {site.legal.address || "À renseigner"}
        <br />
        Email : {site.email || "À renseigner"}
        <br />
        Téléphone : {site.phone || "À renseigner"}
      </p>
      <h2>Hébergement</h2>
      <p>
        {site.legal.hosting ||
          "Raison sociale, adresse et coordonnées de l’hébergeur à renseigner après le choix du prestataire."}
      </p>
      <h2>La prestation</h2>
      <p>
        Le site présente un projet de mise à disposition d’une Renault 4L avec
        conducteur pour des mariages en Provence. Le véhicule est actuellement
        en restauration. Les disponibilités et les conditions précises sont
        confirmées directement avec le propriétaire. Une demande via le site ne
        constitue pas une réservation.
      </p>
      <h2>Images et contenus</h2>
      <p>
        Les illustrations d’ambiance sont provisoires et ne représentent pas
        l’état réel du véhicule. Les photographies seront ajoutées après la
        restauration. Les textes et éléments visuels ne peuvent être réutilisés
        sans autorisation de leur titulaire.
      </p>
      <h2>Données personnelles</h2>
      <p>
        Consultez la{" "}
        <Link href="/confidentialite">politique de confidentialité</Link> pour
        connaître l’utilisation des informations du formulaire et des outils de
        mesure facultatifs.
      </p>
      <Link className="text-link" href="/">
        ← Revenir aux petites routes
      </Link>
    </main>
  );
}
