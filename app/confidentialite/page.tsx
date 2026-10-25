import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
export const metadata: Metadata = {
  title: "Politique de confidentialité",
  alternates: { canonical: "/confidentialite" },
  robots: { index: false, follow: true },
};
export default function Privacy() {
  return (
    <main id="main" className="legal-page section">
      <p className="eyebrow">VOS DONNÉES, AVEC SOIN</p>
      <h1>Politique de confidentialité</h1>
      <p className="legal-notice">
        Document à compléter avant publication : identité du responsable,
        contact pour l’exercice des droits, durée de conservation et
        prestataires effectivement retenus.
      </p>
      <h2>Responsable du traitement</h2>
      <p>
        {site.legal.owner || "Identité de l’exploitant à renseigner"} —{" "}
        {site.name}. Contact pour vos données :{" "}
        {site.legal.privacyContact ||
          site.email ||
          "À renseigner avant ouverture du formulaire au public"}
        .
      </p>
      <h2>Votre demande de disponibilité</h2>
      <p>
        Le formulaire recueille votre prénom, votre nom, votre email, votre
        téléphone, la date de votre mariage, les lieux de départ, de cérémonie
        et de réception, la formule, la durée estimée et votre message. Ces
        informations servent exclusivement à étudier votre demande et à vous
        recontacter. Les champs obligatoires permettent de préparer un échange
        utile.
      </p>
      <p>
        Le traitement de votre demande repose sur les démarches
        précontractuelles que vous sollicitez. La case de recontact confirme
        votre souhait d’être contacté ; elle ne vaut pas inscription à une
        newsletter ni accord pour de la prospection.
      </p>
      <h2>Destinataires et conservation</h2>
      <p>
        Les demandes sont destinées à l’exploitant. Si l’envoi est activé, elles
        transitent par Resend et la messagerie de réception configurée. Aucun
        stockage en base de données n’est prévu par ce site.{" "}
        {site.legal.retention}
      </p>
      <p>
        L’hébergeur et le fournisseur de messagerie peuvent conserver des
        journaux techniques. L’exploitant doit préciser les prestataires
        retenus, leurs garanties et les éventuels transferts hors de l’Espace
        économique européen avant mise en service.
      </p>
      <h2>Protection contre les abus</h2>
      <p>
        Une empreinte temporaire de l’adresse email et un compteur sont
        conservés dans la mémoire du serveur, pendant 15 minutes au maximum,
        pour limiter les envois répétés. Les contenus du formulaire ne sont pas
        enregistrés dans les journaux de l’application.
      </p>
      <h2>Cookies et mesure d’audience</h2>
      <p>
        Les outils Google Analytics, Google Ads ou Google Tag Manager sont
        facultatifs. S’ils sont configurés, ils ne sont chargés qu’après votre
        acceptation. Ils peuvent mesurer la consultation des formules et les
        interactions avec le formulaire. Aucune donnée saisie dans le formulaire
        n’est transmise par les événements de mesure.
      </p>
      <p>
        Vous pouvez refuser ou retirer votre accord à tout moment grâce au lien
        « Cookies » du pied de page. Votre choix est conservé dans le stockage
        local de votre navigateur jusqu’à sa suppression ou sa modification.
        L’usage du formulaire reste possible sans accepter les outils de mesure.
      </p>
      <h2>Vos droits</h2>
      <p>
        Vous pouvez demander l’accès, la rectification, l’effacement ou la
        limitation de vos données, ainsi que leur portabilité lorsque
        applicable. Vous pouvez retirer votre consentement pour les mesures
        facultatives et déposer une réclamation auprès de la CNIL sur cnil.fr.
      </p>
      <Link className="text-link" href="/">
        ← Revenir au site
      </Link>
    </main>
  );
}
