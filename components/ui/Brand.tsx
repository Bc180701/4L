import Image from "next/image";
import { site } from "@/config/site";
import OliveBranch from "./OliveBranch";

/** Le fichier original du logo peut remplacer cette signature typographique via site.brand.logoSrc. */
export default function Brand({ className = "" }: { className?: string }) {
  return (
    <span className={`brand-signature ${className}`}>
      {site.brand.logoSrc ? (
        <Image
          className="brand-image"
          src={site.brand.logoSrc}
          alt={site.name}
          width={600}
          height={300}
          priority
        />
      ) : (
        <>
          <span className="brand-title">{site.brand.title}</span>
          <span className="brand-subtitle">{site.brand.subtitle}</span>
          <span className="brand-rule">
            <i />
            <OliveBranch />
            <i />
          </span>
          <span className="brand-tagline">{site.brand.tagline}</span>
        </>
      )}
    </span>
  );
}
