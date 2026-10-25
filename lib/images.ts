import { existsSync } from "node:fs";
import path from "node:path";
// Les photos réelles sont détectées à la compilation. Relancer le build après remplacement.
export function imageSource(name: string, fallback = "placeholder-4l.svg") {
  return existsSync(path.join(process.cwd(), "public", "images", name))
    ? `/images/${name}`
    : `/images/${fallback}`;
}
export function isPlaceholder(name: string) {
  return !existsSync(path.join(process.cwd(), "public", "images", name));
}
