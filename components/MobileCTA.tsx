"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
export default function MobileCTA() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const el = document.getElementById("contact");
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setHidden(e.isIntersecting));
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div className={`mobile-cta ${hidden ? "is-hidden" : ""}`}>
      <a href="#contact" className="button">
        Vérifier ma date <ArrowUpRight size={17} />
      </a>
    </div>
  );
}
