export const site = {
  name: "La Balade des Gens Heureux",
  brand: {
    title: "La Balade",
    subtitle: "des Gens Heureux",
    tagline: "Voitures anciennes avec chauffeur",
    logoSrc: "", // Ajouter le PNG/SVG original dans public/images puis renseigner son chemin public.
  },
  description:
    "Une Renault 4L vintage avec chauffeur pour votre mariage à Saint-Rémy-de-Provence, dans les Alpilles et en Provence. Découvrez nos formules mariage.",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "",
  email: "", // À renseigner avant publication.
  phone: "", // Format affiché, par exemple +33 6 …
  instagram: "", // URL complète.
  city: "Saint-Rémy-de-Provence",
  region: "Provence-Alpes-Côte d’Azur",
  address: "",
  car: {
    model: "Renault 4L Clan",
    year: 1987,
    color: "Bleu vintage",
    status: "En cours de restauration",
    passengersAnswer:
      "La capacité d’accueil des mariés sera confirmée lors de notre échange, selon la configuration finale du véhicule restauré.",
  },
  includedKm: 50,
  options: { extraHour: 60, decorationFrom: 50, extraKm: 1 },
  packages: [
    {
      id: "escapade",
      name: "L’Escapade",
      hours: 3,
      price: 279,
      tagline: "L’essentiel, avec du caractère.",
      description:
        "Du départ à la cérémonie, puis jusqu’à votre lieu de réception.",
      features: [
        "Véhicule et chauffeur",
        "Trajets définis ensemble",
        "Une parenthèse pour les photos",
      ],
      featured: false,
    },
    {
      id: "provencale",
      name: "La Provençale",
      hours: 4,
      price: 349,
      tagline: "Le temps de savourer chaque étape.",
      description:
        "Une cérémonie, quelques détours et de beaux souvenirs entre les oliviers.",
      features: [
        "Véhicule et chauffeur",
        "Prise en charge à votre adresse",
        "Cérémonie, photos et réception",
      ],
      featured: true,
    },
    {
      id: "journee",
      name: "La Journée",
      hours: 5,
      price: 419,
      tagline: "Votre journée, à votre rythme.",
      description:
        "Davantage de temps pour vos déplacements et votre séance photo.",
      features: [
        "Véhicule et chauffeur",
        "Itinéraire personnalisé",
        "Plus de temps pour les photos",
      ],
      featured: false,
    },
  ],
  locations: [
    "Saint-Rémy-de-Provence",
    "Les Baux-de-Provence",
    "Maussane-les-Alpilles",
    "Eygalières",
    "Eyragues",
    "Fontvieille",
    "Arles",
    "Avignon",
    "Châteaurenard",
    "Graveson",
    "Tarascon",
  ],
  legal: {
    owner: "",
    status: "",
    registration: "",
    address: "",
    hosting: "",
    privacyContact: "",
    retention:
      "Durée de conservation des demandes à définir avant publication.",
  },
};
export const money = (amount: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
