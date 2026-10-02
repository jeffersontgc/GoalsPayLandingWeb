import type { Locale } from "@/i18n/config";

export interface NavLink {
  href: string;
  label: string;
}

/** URL de la misma página en cada idioma (selector de idioma y hreflang). */
export type LocaleAlternates = Record<Locale, string>;
