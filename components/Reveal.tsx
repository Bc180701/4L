"use client";
import { useEffect } from "react";
export default function Reveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = document.querySelectorAll(
      ".section-heading, .experience-grid article, .price-card, .steps article",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    targets.forEach((el) => {
      el.classList.add("reveal");
      observer.observe(el);
    });
    return () => {
      observer.disconnect();
      targets.forEach((el) => el.classList.remove("reveal"));
    };
  }, []);
  return null;
}
