import { z } from "zod";
import { site } from "@/config/site";
const cleanText = (max: number) =>
  z
    .string()
    .trim()
    .min(1, "Ce champ est requis.")
    .max(max, `Maximum ${max} caractères.`);
export const contactSchema = z.object({
  firstName: cleanText(80),
  lastName: cleanText(80),
  email: z.email("Veuillez renseigner un email valide.").max(254),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d\s().-]{8,25}$/, "Veuillez renseigner un téléphone valide."),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Choisissez une date.")
    .refine((value) => {
      const parsed = new Date(value + "T12:00:00Z");
      const today = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Europe/Paris",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(new Date());
      return (
        !Number.isNaN(parsed.getTime()) &&
        parsed.toISOString().slice(0, 10) === value &&
        value >= today
      );
    }, "La date doit être valide et ne pas être passée."),
  departure: cleanText(200),
  ceremony: cleanText(200),
  reception: cleanText(200),
  package: z
    .string()
    .refine(
      (value) =>
        [...site.packages.map((p) => p.id), "undecided"].includes(value),
      "Choisissez une formule.",
    ),
  hours: z.coerce.number().int().min(1).max(12),
  message: z.string().trim().max(3000),
  consent: z.literal(true, {
    error: "Votre accord est nécessaire pour vous recontacter.",
  }),
  website: z.string().max(200).default(""),
  startedAt: z.number().int().positive(),
});
export type ContactInput = z.input<typeof contactSchema>;
export function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
}
