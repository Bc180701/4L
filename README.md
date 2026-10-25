# La Balade des Gens Heureux

Site français de présentation d’une Renault 4L Clan de 1987 avec conducteur pour les mariages en Provence. Next.js App Router, TypeScript strict, React et Tailwind CSS 4. Aucun paiement, compte, calendrier automatique ni base de données.

## Installation et lancement

Prérequis : Node.js 22.13 ou supérieur (Node 24 utilisé pour la validation), npm. À la racine du dépôt :

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Ouvrir le port 3000 avec votre outil de développement. Ne pas committer `.env.local`. Le cache npm est placé dans `/workspace/.cache/npm` pour cet environnement cloud ; hors de cet environnement, adapter la ligne `cache` de `.npmrc` à un dossier accessible, ou utiliser `npm ci --cache /chemin/accessible`.

Production :

```bash
npm run typecheck
npm test
npm run build
npm run start
```

`npm run build` vérifie aussi TypeScript. Polices auto-hébergées via Fontsource : aucune requête vers Google Fonts. Les illustrations SVG sont locales.

## Configuration éditoriale

`config/site.ts` centralise marque, coordonnées, ville, réseaux sociaux, tarifs, durées, kilométrage, options, communes et réponse concernant la capacité passagers. Les champs vides de téléphone, email et Instagram ne créent aucun faux lien. Le titre SEO initial suit le cahier des charges ; pour changer son libellé éditorial, adapter également `metadata.title.default` dans `app/layout.tsx`.

Les tarifs sont utilisés dans les cartes, le formulaire et les données structurées. Les durées ne constituent pas une réservation automatique. Le statut « En cours de restauration » reste visible ; modifier `site.car.status` et les textes de restauration lorsque la voiture est effectivement prête.

Les mentions légales et la confidentialité sont des **documents préparatoires**. Renseigner `site.legal`, les coordonnées de l’éditeur, les informations de l’hébergeur, le contact pour les droits RGPD, la durée de conservation et les garanties des prestataires avant ouverture commerciale. Aucun numéro d’entreprise ou garantie contractuelle n’a été inventé.

## Variables d’environnement

| Variable                                  | Utilité                                                                                                                                           |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                    | URL HTTPS réelle du site, sans slash final. Définit canonical, sitemap et URL sociales. Sans URL, l’indexation est désactivée et le sitemap vide. |
| `RESEND_API_KEY`                          | Clé Resend, uniquement côté serveur.                                                                                                              |
| `CONTACT_EMAIL`                           | Adresse du propriétaire recevant les demandes.                                                                                                    |
| `RESEND_FROM_EMAIL`                       | Expéditeur validé dans Resend, par exemple `Votre marque <bonjour@votre-domaine.fr>`.                                                             |
| `NEXT_PUBLIC_GA_ID`                       | Identifiant GA4 facultatif.                                                                                                                       |
| `NEXT_PUBLIC_GOOGLE_ADS_ID`               | Identifiant Google Ads facultatif.                                                                                                                |
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL` | Libellé de conversion Google Ads facultatif.                                                                                                      |
| `NEXT_PUBLIC_GTM_ID`                      | Conteneur GTM facultatif, prioritaire sur les intégrations directes.                                                                              |

Les variables `NEXT_PUBLIC_*` sont intégrées lors de la compilation : reconstruire après modification. Les secrets Resend ne doivent jamais porter ce préfixe. Les trois variables d’email manquantes entraînent une réponse 503 explicite, jamais une confirmation d’envoi.

## Activer Resend

1. Créer un domaine expéditeur dans Resend et valider ses enregistrements DNS.
2. Définir les trois variables serveur ci-dessus dans les secrets de l’hébergeur.
3. Autoriser les requêtes HTTPS sortantes vers `api.resend.com` si nécessaire.
4. Déployer puis envoyer une vraie demande de test. Vérifier sa réception, l’adresse de réponse du visiteur et le dossier indésirable.

`app/api/contact/route.ts` appelle l’API HTTPS Resend sans exposer la clé. Les données sont validées avec le même schéma Zod que le navigateur, bornées à 16 Ko et échappées dans le HTML de l’email. Une clé d’idempotence évite de multiplier un même envoi lors d’une nouvelle tentative identique. Le serveur contrôle l’origine, un champ piège, un délai minimum, les répétitions par empreinte email et un délai après succès. Ne jamais ajouter de journal contenant les clés ou le contenu des demandes.

**Limite de la V1 :** les compteurs anti-spam sont en mémoire, locaux à un processus. En production distribuée, ajouter une limite de débit au niveau de l’hébergeur/WAF ; envisager un stockage partagé ou un CAPTCHA si les abus le justifient. Ne pas considérer ces protections simples comme un service anti-bot complet.

La date est évaluée dans le fuseau Europe/Paris. La disponibilité est toujours confirmée manuellement. Les messages de succès sont affichés seulement après acceptation par Resend : cela ne garantit pas la remise finale dans la boîte du destinataire.

## Remplacer les images

Déposer les fichiers suivants dans `public/images/`. Ils sont détectés côté serveur à la compilation : **relancer le build** après ajout. Le composant `Photo` et les données de galerie utilisent sinon les illustrations SVG locales ; aucun fichier manquant ne casse la page.

| Fichier                  | Sujet                                                                              | Dimensions recommandées                       |
| ------------------------ | ---------------------------------------------------------------------------------- | --------------------------------------------- |
| `hero-4l.jpg`            | Vue trois quarts de la 4L bleue dans un décor provençal, espace autour du véhicule | 2400 × 1800 px, paysage                       |
| `4l-side.jpg`            | Profil du véhicule                                                                 | 1600 × 2000 px, portrait ou cadrage adaptable |
| `4l-front.jpg`           | Avant du véhicule, ambiance mariage                                                | 1600 × 1200 px                                |
| `4l-interior.jpg`        | Habitacle ou détails intérieurs                                                    | 1400 × 1400 px                                |
| `4l-provence.jpg`        | La 4L dans les Alpilles ou un paysage local                                        | 2000 × 1600 px                                |
| `restoration-before.jpg` | État réel avant restauration                                                       | 1200 × 1400 px                                |
| `restoration-after.jpg`  | État réel après restauration                                                       | 1200 × 1400 px                                |

Privilégier JPEG sRGB, fichiers inférieurs à 500 Ko si possible ; `next/image` optimise les photos. Éviter les visages reconnaissables sans autorisation et retirer les métadonnées GPS sensibles. Les légendes et textes alternatifs sont dans les composants ; les adapter aux photos réelles. Les catégories de galerie se modifient dans `components/sections/Gallery.tsx`. Les illustrations actuelles ne prouvent ni l’apparence exacte ni l’état du véhicule.

## Mesure d’audience et Google Ads

Aucun identifiant fictif. Sans variables Google, aucun script de mesure n’est chargé. Avec des identifiants, les scripts sont chargés après acceptation dans le bandeau. Le refus est aussi simple que l’acceptation et le lien « Cookies » du pied de page permet de revenir sur son choix. Le retrait recharge la page pour arrêter les scripts et supprime les cookies Google accessibles sur le domaine courant ; il ne peut supprimer les cookies tiers ni des données déjà transmises.

Événements sans données personnelles : `form_start`, `generate_lead`, `click_phone`, `click_email`, `view_pricing`, `select_package`. `generate_lead` est émis uniquement après succès serveur. Les événements précédant le consentement ne sont pas rejoués. La conversion Ads directe nécessite l’identifiant **et** le libellé.

Avec GTM, créer les déclencheurs sur ces événements dans le conteneur et y gérer GA4/Ads ; l’intégration directe est désactivée pour éviter les doubles comptages. Contrôler les balises du conteneur et la politique de consentement avant publication. Les variables d’analytics nécessitent un nouveau build.

## SEO et futures pages locales

Métadonnées françaises, canonical, Open Graph, Twitter, image sociale générée, icône, `robots.txt`, `sitemap.xml`, JSON-LD LocalBusiness/Service/FAQPage. Les informations non renseignées ne sont pas remplacées par des coordonnées fictives. Les pages légales préparatoires sont marquées `noindex`. Les données FAQ ne garantissent pas l’affichage d’un résultat enrichi par Google.

`components/LocalLanding.tsx` fournit une structure réutilisable. Pour ajouter une page locale, créer un dossier explicite dans `app/`, par exemple `app/voiture-mariage-alpilles/page.tsx`, importer ce composant et fournir un contenu original : itinéraire réaliste, accès au lieu, photos locales et contraintes propres à la destination. Ajouter des métadonnées et une canonical propres puis compléter `app/sitemap.ts`. Les cinq futures destinations du cahier des charges ne sont pas publiées comme pages vides ou dupliquées.

## Tests

```bash
npm test
npm run typecheck
npm run build
npm run test:e2e
```

Tests serveur : validation des dates/champs, accord, origine, limite de taille, piège anti-spam, absence de configuration, erreur du fournisseur, envoi simulé et prévention des doublons. Aucun email réel n’est envoyé par ces tests.

Tests Playwright : parcours ordinateur et mobile, navigation, choix de formule, FAQ, galerie/lightbox, débordement horizontal, erreurs du formulaire, succès simulé, pages légales, image sociale et SEO. Dans ce cloud, Chromium système est disponible à `/usr/bin/chromium`. Sur une autre machine : installer Chromium avec `npx playwright install chromium` puis définir `PLAYWRIGHT_CHROMIUM_EXECUTABLE` vers son exécutable ou adapter `launchOptions` dans `playwright.config.ts`. La suite démarre le serveur de production sur le port 3000 si nécessaire : exécuter le build d’abord. Les scénarios sans fournisseur supposent l’absence de secrets d’email dans l’environnement de test.

Les tests fonctionnels ne constituent pas une mesure Lighthouse. Mesurer Lighthouse sur le déploiement HTTPS définitif avec les photographies et balises réelles avant d’annoncer un score.

## Déploiement

Vercel ou hébergeur Node compatible Next.js : installer avec `npm ci`, compiler avec `npm run build`, démarrer avec `npm run start` si requis par l’hébergeur. Ne pas exporter le site en HTML statique : le formulaire nécessite la route serveur. Définir le domaine réel et les variables avant compilation, configurer les secrets au runtime, valider le domaine Resend, HTTPS et la réception des emails. Les images et polices sont auto-hébergées.

Avant ouverture publique : compléter coordonnées et mentions légales, vérifier capacité passagers et conditions de prestation, confirmer la remise en route de la voiture, remplacer les illustrations, contrôler les prix, le parcours réel d’envoi et le consentement analytics. Aucun déploiement ou publication n’est réalisé automatiquement par ce dépôt.

## Arborescence

- `app/` : accueil, route API, pages légales, SEO et styles globaux.
- `components/sections/` : sections indépendantes de la page d’accueil.
- `components/ui/` : photo avec repli et titres de section.
- `config/site.ts` : contenu métier modifiable.
- `lib/` : validation, FAQ, événements et résolution des images.
- `public/images/` : illustrations et futures photographies.
- `tests/` : validation serveur et parcours navigateur.

## Identité visuelle

Marque : **La Balade des Gens Heureux**, signature « Voitures anciennes avec chauffeur ». Palette : bleu encre `#243F50`, ivoire `#FFFDF8`, doré `#B49059`, olive `#777B60`. Les dorés servent aux filets et ornements ; les textes et boutons conservent un contraste foncé sur fond clair.

La signature typographique actuelle est un affichage temporaire, pas une reproduction du logo illustré final. Pour intégrer le fichier original, exporter le logo recadré (sans les grandes marges de l’aperçu), idéalement en SVG ou PNG transparent de 1200 px de large minimum, le placer dans `public/images/logo-final.png`, puis renseigner `site.brand.logoSrc` avec `/images/logo-final.png`. Le composant partagé `Brand` l’affichera dans le header et le footer. Ne pas remplacer le logo original par une reconstitution générée.

L’image `public/images/illustration-provence.png` est une illustration d’ambiance générée, inspirée des couleurs du logo, et non une photographie du véhicule. Elle sert uniquement de repli pour le hero tant que `hero-4l.jpg` n’est pas fourni.
