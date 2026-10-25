import type { Metadata, Viewport } from "next";
import "@fontsource/cormorant-garamond/latin-400.css";
import "@fontsource/cormorant-garamond/latin-500.css";
import "@fontsource/cormorant-garamond/latin-400-italic.css";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "./globals.css";
import { site } from "@/config/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import Analytics from "@/components/Analytics";
export const metadata: Metadata = {
  metadataBase: new URL(site.url || "http://localhost:3000"),
  title: {
    default: `${site.name} | 4L mariage en Provence avec chauffeur`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  ...(site.url ? { alternates: { canonical: site.url } } : {}),
  robots: { index: !!site.url, follow: !!site.url },
  openGraph: {
    title: site.name,
    description: site.description,
    locale: "fr_FR",
    type: "website",
    siteName: site.name,
    ...(site.url ? { url: site.url } : {}),
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: site.name },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: ["/opengraph-image"],
  },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#243f50",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <a className="skip-link" href="#main">
          Aller au contenu
        </a>
        <Navbar />
        {children}
        <Footer />
        <MobileCTA />
        <Analytics />
      </body>
    </html>
  );
}
