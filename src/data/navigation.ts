/** Anclas de la página de inicio. Iguales en los dos idiomas para que los enlaces no cambien. */
export const SECTION_IDS = {
  problem: "problem",
  balance: "balance",
  modes: "modes",
  features: "features",
  trust: "trust",
  faq: "faq",
  download: "download",
} as const;

export type SectionKey = keyof typeof SECTION_IDS;

/** Capítulos que aparecen en la navegación principal y en el pie, en orden. */
export const NAV_SECTIONS = ["balance", "modes", "features", "trust", "faq"] as const satisfies readonly SectionKey[];

/** Orden de las preguntas frecuentes (los textos están en messages/*.json, faq.items.*). */
export const FAQ_KEYS = [
  "cost",
  "bank",
  "currencies",
  "newPhone",
  "internet",
  "deleteAccount",
  "availability",
  "whoCanUse",
] as const;

/** Frases del capítulo 1 (problem.quotes.*). */
export const PROBLEM_QUOTE_KEYS = ["enough", "rent", "monthEnd"] as const;

/** Hechos verificables del capítulo de confianza (trust.items.*). */
export const TRUST_KEYS = ["account", "noBank", "noSelling", "encryption", "lock", "deletion"] as const;
