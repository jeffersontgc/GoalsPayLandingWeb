import { defaultLocale, locales, type Locale } from "@/i18n/config";
import { getLegalPublicPath, type LegalDocumentKey } from "@/lib/legal/documents";
import { publicEnv } from "@/lib/env";
import type { LocaleAlternates } from "@/types/navigation";

const X_DEFAULT = "x-default";

export const getAbsoluteUrl = (path: string): string => `${publicEnv.NEXT_PUBLIC_SITE_URL}${path}`;

/** Si se añade un idioma, LocaleAlternates (Record<Locale, string>) obliga a completarlo aquí. */
const buildAlternates = (getPath: (locale: Locale) => string): LocaleAlternates => ({
  es: getPath("es"),
  en: getPath("en"),
});

export const getHomePath = (locale: Locale): string => `/${locale}`;

export const getHomeAlternates = (): LocaleAlternates => buildAlternates(getHomePath);

export const getLegalAlternates = (documentKey: LegalDocumentKey): LocaleAlternates =>
  buildAlternates((locale) => getLegalPublicPath(documentKey, locale));

/** hreflang absolutos para los metadatos y el sitemap, con x-default en español. */
export const getLanguageAlternates = (alternates: LocaleAlternates): Record<string, string> => ({
  ...Object.fromEntries(locales.map((locale) => [locale, getAbsoluteUrl(alternates[locale])])),
  [X_DEFAULT]: getAbsoluteUrl(alternates[defaultLocale]),
});
