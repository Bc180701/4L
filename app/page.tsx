import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import Pricing from "@/components/sections/Pricing";
import HowItWorks from "@/components/sections/HowItWorks";
import Locations from "@/components/sections/Locations";
import Gallery from "@/components/sections/Gallery";
import CarStory from "@/components/sections/CarStory";
import FAQ from "@/components/sections/FAQ";
import ContactForm from "@/components/sections/ContactForm";
import Reveal from "@/components/Reveal";
import { site } from "@/config/site";
import { faqs } from "@/lib/faq";
export default function Home() {
  const structured = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        name: site.name,
        description: site.description,
        ...(site.url ? { "@id": `${site.url}/#business`, url: site.url } : {}),
        ...(site.phone ? { telephone: site.phone } : {}),
        ...(site.email ? { email: site.email } : {}),
        areaServed: site.locations.map((name) => ({ "@type": "City", name })),
        address: {
          "@type": "PostalAddress",
          addressLocality: site.city,
          addressRegion: site.region,
          addressCountry: "FR",
        },
        priceRange: "€€",
        ...(site.instagram ? { sameAs: [site.instagram] } : {}),
      },
      {
        "@type": "Service",
        name: "Mise à disposition d’une Renault 4L avec chauffeur pour les mariages en Provence",
        provider: { "@type": "LocalBusiness", name: site.name },
        areaServed: { "@type": "AdministrativeArea", name: "Provence" },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Formules mariage",
          itemListElement: site.packages.map((p) => ({
            "@type": "Offer",
            name: p.name,
            price: p.price,
            priceCurrency: "EUR",
            description: `${p.hours} heures avec chauffeur, ${site.includedKm} km inclus. Disponibilité sur demande.`,
            itemOffered: { "@type": "Service", name: p.name },
          })),
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(([q, a]) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };
  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structured).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <Experience />
      <Pricing />
      <HowItWorks />
      <Locations />
      <Gallery />
      <CarStory />
      <FAQ />
      <ContactForm />
      <Reveal />
    </main>
  );
}
