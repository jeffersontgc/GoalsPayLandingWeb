// Import relativo: next.config.ts también usa este módulo y ahí no hay alias "@/".
import { locales, type Locale } from "../../i18n/config";

/**
 * Registro de los documentos legales. Las URLs públicas son las que enlaza la App
 * (app/src/features/legal/content/index.ts) y no pueden cambiar.
 */
export const LEGAL_DOCUMENT_KEYS = ["terms", "privacy", "cookies", "deleteAccount"] as const;

export type LegalDocumentKey = (typeof LEGAL_DOCUMENT_KEYS)[number];

interface LegalDocumentConfig {
  /** Segmento de la ruta interna (/[locale]/legal/[slug]), a la que reescribe la URL .html. */
  routeSlug: string;
  /** Archivo Markdown dentro de content/legal/<locale>/. */
  sourceFile: Record<Locale, string>;
  /** Página pública dentro de /<locale>/. */
  publicFile: Record<Locale, string>;
}

export const LEGAL_DOCUMENTS: Record<LegalDocumentKey, LegalDocumentConfig> = {
  terms: {
    routeSlug: "terms",
    sourceFile: { es: "terminos-y-condiciones.md", en: "terms-and-conditions.md" },
    publicFile: { es: "terminos.html", en: "terms.html" },
  },
  privacy: {
    routeSlug: "privacy",
    sourceFile: { es: "politica-de-privacidad.md", en: "privacy-policy.md" },
    publicFile: { es: "privacidad.html", en: "privacy.html" },
  },
  cookies: {
    routeSlug: "cookies",
    sourceFile: { es: "politica-de-cookies.md", en: "cookie-policy.md" },
    publicFile: { es: "cookies.html", en: "cookies.html" },
  },
  deleteAccount: {
    routeSlug: "delete-account",
    sourceFile: { es: "eliminar-cuenta.md", en: "delete-account.md" },
    publicFile: { es: "eliminar-cuenta.html", en: "delete-account.html" },
  },
};

export const getLegalPublicPath = (documentKey: LegalDocumentKey, locale: Locale): string =>
  `/${locale}/${LEGAL_DOCUMENTS[documentKey].publicFile[locale]}`;

export const getLegalRoutePath = (documentKey: LegalDocumentKey, locale: Locale): string =>
  `/${locale}/legal/${LEGAL_DOCUMENTS[documentKey].routeSlug}`;

export const findLegalDocumentBySlug = (routeSlug: string): LegalDocumentKey | null =>
  LEGAL_DOCUMENT_KEYS.find((documentKey) => LEGAL_DOCUMENTS[documentKey].routeSlug === routeSlug) ??
  null;

/** Los Markdown se enlazan entre sí por nombre de archivo; se traducen a la URL pública. */
export const findLegalDocumentBySourceFile = (
  sourceFile: string,
): { documentKey: LegalDocumentKey; locale: Locale } | null => {
  for (const documentKey of LEGAL_DOCUMENT_KEYS) {
    const locale = locales.find(
      (candidate) => LEGAL_DOCUMENTS[documentKey].sourceFile[candidate] === sourceFile,
    );
    if (locale) return { documentKey, locale };
  }
  return null;
};

/** Pares de URL pública ↔ ruta interna, para las rewrites de next.config.ts. */
export const getLegalRewrites = (): { source: string; destination: string }[] =>
  LEGAL_DOCUMENT_KEYS.flatMap((documentKey) =>
    locales.map((locale) => ({
      source: getLegalPublicPath(documentKey, locale),
      destination: getLegalRoutePath(documentKey, locale),
    })),
  );
