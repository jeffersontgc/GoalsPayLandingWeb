import { useTranslations } from "next-intl";
import { LegalBlocks } from "@/components/legal/LegalBlocks";
import { LegalInlineContent } from "@/components/legal/LegalInlineContent";
import type { Locale } from "@/i18n/config";
import { getLegalPublicPath, LEGAL_DOCUMENT_KEYS, type LegalDocumentKey } from "@/lib/legal/documents";
import type { ParsedLegalDocument } from "@/types/legal";

const TITLE_ID = "legal-title";
const TOC_LINK_CLASSES =
  "inline-flex min-h-9 items-center text-[0.9375rem] text-ink-2 transition-colors hover:text-link";

interface LegalDocumentViewProps {
  locale: Locale;
  documentKey: LegalDocumentKey;
  document: ParsedLegalDocument;
}

/** Página de un documento legal: título, versión y fecha, índice, cuerpo y otros documentos. */
export const LegalDocumentView = ({ locale, documentKey, document }: LegalDocumentViewProps) => {
  const t = useTranslations("legal");
  const otherDocuments = LEGAL_DOCUMENT_KEYS.filter((key) => key !== documentKey);

  return (
    <article aria-labelledby={TITLE_ID} className="container-page py-12 md:py-20">
      <header className="flex max-w-3xl flex-col gap-4 border-b border-line pb-8">
        <p className="type-eyebrow text-link">{t("eyebrow")}</p>
        <h1 id={TITLE_ID} className="type-h2 text-ink">
          {document.title}
        </h1>
        <dl className="flex flex-wrap gap-x-6 gap-y-1 type-small text-ink-2">
          <div className="flex gap-1.5">
            <dt className="font-bold text-ink">{t("version")}:</dt>
            <dd>{document.version}</dd>
          </div>
          <div className="flex gap-1.5">
            <dt className="font-bold text-ink">{t("updated")}:</dt>
            <dd>{document.updated}</dd>
          </div>
        </dl>
        {document.notice && (
          <p className="rounded-control bg-tag-blue px-4 py-3 type-small text-tag-blue-ink">
            <LegalInlineContent nodes={document.notice} />
          </p>
        )}
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
        <nav aria-label={t("tocTitle")} className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="mb-3 type-eyebrow text-ink-3">{t("tocTitle")}</h2>
          <ol className="flex flex-col gap-0.5 border-l border-line pl-4">
            {document.toc.map((entry) => (
              <li key={entry.id}>
                <a href={`#${entry.id}`} className={TOC_LINK_CLASSES}>
                  {entry.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="max-w-[70ch] text-[1.0625rem] leading-[1.7] text-ink-2">
          <LegalBlocks blocks={document.blocks} />

          <footer className="mt-16 flex flex-col gap-4 border-t border-line pt-8">
            <h2 className="type-eyebrow text-ink-3">{t("otherDocuments")}</h2>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {otherDocuments.map((key) => (
                <li key={key}>
                  <a href={getLegalPublicPath(key, locale)} className="font-medium text-link underline underline-offset-[3px]">
                    {t(`labels.${key}`)}
                  </a>
                </li>
              ))}
            </ul>
            <a href={`#${TITLE_ID}`} className="self-start text-[0.9375rem] text-ink-2 underline underline-offset-[3px]">
              {t("backToTop")}
            </a>
          </footer>
        </div>
      </div>
    </article>
  );
};
