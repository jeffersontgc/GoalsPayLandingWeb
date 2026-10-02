import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { LegalDocumentView } from "@/components/legal/LegalDocumentView";
import { SiteShell } from "@/components/layout/SiteShell";
import { BRAND_NAME } from "@/config/site";
import { isLocale, openGraphLocales, type Locale } from "@/i18n/config";
import {
  findLegalDocumentBySlug,
  getLegalPublicPath,
  LEGAL_DOCUMENT_KEYS,
  LEGAL_DOCUMENTS,
  type LegalDocumentKey,
} from "@/lib/legal/documents";
import { loadLegalDocument } from "@/lib/legal/loadLegalDocument";
import { getAbsoluteUrl, getLanguageAlternates, getLegalAlternates } from "@/utils/seo";

/**
 * Ruta interna de los documentos legales. Se publica en las URLs .html que enlaza la App
 * (rewrites en next.config.ts); quien entra directo a /es/legal/terms es redirigido allí.
 */
interface LegalPageProps {
  params: Promise<{ locale: string; document: string }>;
}

export const dynamicParams = false;

export const generateStaticParams = () =>
  LEGAL_DOCUMENT_KEYS.map((documentKey) => ({ document: LEGAL_DOCUMENTS[documentKey].routeSlug }));

const resolveParams = async (
  params: LegalPageProps["params"],
): Promise<{ locale: Locale; documentKey: LegalDocumentKey } | null> => {
  const { locale, document } = await params;
  const documentKey = findLegalDocumentBySlug(document);
  if (!isLocale(locale) || !documentKey) return null;
  return { locale, documentKey };
};

export const generateMetadata = async ({ params }: LegalPageProps): Promise<Metadata> => {
  const resolved = await resolveParams(params);
  if (!resolved) return {};
  const { locale, documentKey } = resolved;
  const document = await loadLegalDocument(documentKey, locale);
  const url = getAbsoluteUrl(getLegalPublicPath(documentKey, locale));

  return {
    // El título del documento ya dice "GoalsPay": sin la plantilla "· GoalsPay".
    title: { absolute: document.title },
    alternates: {
      canonical: url,
      languages: getLanguageAlternates(getLegalAlternates(documentKey)),
    },
    openGraph: {
      type: "article",
      url,
      siteName: BRAND_NAME,
      locale: openGraphLocales[locale],
      title: document.title,
    },
  };
};

const LegalPage = async ({ params }: LegalPageProps) => {
  const resolved = await resolveParams(params);
  if (!resolved) notFound();
  const { locale, documentKey } = resolved;
  setRequestLocale(locale);
  const document = await loadLegalDocument(documentKey, locale);

  return (
    <SiteShell locale={locale} alternates={getLegalAlternates(documentKey)}>
      <LegalDocumentView locale={locale} documentKey={documentKey} document={document} />
    </SiteShell>
  );
};

export default LegalPage;
