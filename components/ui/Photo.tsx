import Image from "next/image";
import { imageSource, isPlaceholder } from "@/lib/images";
export default function Photo({
  name,
  alt,
  className = "",
  priority = false,
  fallback,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fallback?: string;
  sizes?: string;
}) {
  const placeholder = isPlaceholder(name);
  return (
    <div className={`photo ${className}`}>
      <Image
        src={imageSource(name, fallback)}
        alt={placeholder ? `Illustration provisoire — ${alt}` : alt}
        fill
        sizes={sizes}
        priority={priority}
      />
      {placeholder && (
        <span className="photo-caption">
          Illustration d’ambiance · Photos à venir
        </span>
      )}
    </div>
  );
}
