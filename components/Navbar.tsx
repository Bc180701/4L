"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { site } from "@/config/site";
const links = [
  ["Accueil", "/"],
  ["La 4L", "/#la-4l"],
  ["Formules", "/#formules"],
  ["Galerie", "/#galerie"],
  ["FAQ", "/#faq"],
  ["Contact", "/#contact"],
];
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 30);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <Link className="brand" href="/" aria-label={`${site.name}, accueil`}>
          <span className="brand-monogram">
            4L<span>✳︎</span>
          </span>
          <span className="brand-words">
            {site.name.replace(/^4L\s*/, "")}
            <small>UN AIR DE PROVENCE</small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Navigation principale">
          {links.map(([label, href]) => (
            <Link href={href} key={label}>
              {label}
            </Link>
          ))}
        </nav>
        <Link className="button nav-cta" href="/#contact">
          Vérifier ma date <ArrowUpRight size={16} />
        </Link>
        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-menu"
          className="mobile-menu"
          aria-label="Navigation mobile"
        >
          {links.map(([label, href]) => (
            <Link key={label} href={href} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
