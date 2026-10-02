export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export const localeLabels: Record<Locale, string> = {
  es: "Español",
  en: "English",
};

/** Etiquetas de Open Graph por idioma. */
export const openGraphLocales: Record<Locale, string> = {
  es: "es_419",
  en: "en_US",
};

export const isLocale = (value: string | undefined): value is Locale =>
  value !== undefined && (locales as readonly string[]).includes(value);
