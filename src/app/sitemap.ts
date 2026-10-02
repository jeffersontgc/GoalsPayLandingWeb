import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { LEGAL_DOCUMENT_KEYS } from "@/lib/legal/documents";
import type { LocaleAlternates } from "@/types/navigation";
import {
  getAbsoluteUrl,
  getHomeAlternates,
  getLanguageAlternates,
  getLegalAlternates,
} from "@/utils/seo";

const HOME_PRIORITY = 1;
const LEGAL_PRIORITY = 0.4;

const buildEntries = (
  alternates: LocaleAlternates,
  priority: number,
  changeFrequency: "monthly" | "yearly",
): MetadataRoute.Sitemap =>
  locales.map((locale) => ({
    url: getAbsoluteUrl(alternates[locale]),
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: { languages: getLanguageAlternates(alternates) },
  }));

/** Inicio y los ocho documentos legales, cada uno con su hreflang. */
const sitemap = (): MetadataRoute.Sitemap => [
  ...buildEntries(getHomeAlternates(), HOME_PRIORITY, "monthly"),
  ...LEGAL_DOCUMENT_KEYS.flatMap((documentKey) =>
    buildEntries(getLegalAlternates(documentKey), LEGAL_PRIORITY, "yearly"),
  ),
];

export default sitemap;
