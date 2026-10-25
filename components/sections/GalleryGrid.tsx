"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
type Photo = {
  name: string;
  label: string;
  category: string;
  src: string;
  placeholder: boolean;
};
export default function GalleryGrid({ photos }: { photos: Photo[] }) {
  const [category, setCategory] = useState("Tout");
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const filtered =
    category === "Tout"
      ? photos
      : photos.filter((p) => p.category === category);
  const photo = active === null ? null : filtered[active];
  useEffect(() => {
    if (active !== null) {
      dialog.current?.showModal();
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    } else dialog.current?.close();
  }, [active]);
  return (
    <>
      <div className="gallery-filters" aria-label="Catégories de photos">
        {["Tout", "La 4L", "Mariages", "Détails", "Provence"].map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="gallery-grid">
        {filtered.map((p, i) => (
          <button
            key={p.name}
            onClick={() => setActive(i)}
            className={`gallery-item gallery-item-${i}`}
            aria-label={`Agrandir : ${p.label}`}
          >
            <Image
              src={p.src}
              alt={`${p.placeholder ? "Illustration provisoire — " : ""}${p.label}`}
              fill
              sizes="(max-width: 600px) 85vw, (max-width: 1000px) 45vw, 30vw"
            />
            <span className="gallery-expand">
              <Expand size={17} />
            </span>
            <span className="gallery-label">
              {p.label}
              <small>
                {p.placeholder ? "ILLUSTRATION PROVISOIRE" : p.category}
              </small>
            </span>
          </button>
        ))}
      </div>
      <p className="gallery-disclaimer">
        Les illustrations présentent une ambiance, pas l’état réel du véhicule.
        Elles seront remplacées après le shooting.
      </p>
      <dialog
        ref={dialog}
        className="lightbox"
        onCancel={() => setActive(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setActive(null);
        }}
        aria-label="Photo agrandie"
      >
        <button
          className="lightbox-close"
          aria-label="Fermer la photo"
          onClick={() => setActive(null)}
        >
          <X />
        </button>
        {photo && (
          <>
            <div className="lightbox-image">
              <Image src={photo.src} alt={photo.label} fill sizes="90vw" />
            </div>
            <p>
              {photo.label}
              {photo.placeholder ? " — Illustration provisoire" : ""}
            </p>
            <div className="lightbox-controls">
              <button
                aria-label="Photo précédente"
                onClick={() =>
                  setActive((active! + filtered.length - 1) % filtered.length)
                }
              >
                <ArrowLeft />
              </button>
              <span>
                {active! + 1} / {filtered.length}
              </span>
              <button
                aria-label="Photo suivante"
                onClick={() => setActive((active! + 1) % filtered.length)}
              >
                <ArrowRight />
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
