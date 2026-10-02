import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import type { Locale } from "@/i18n/config";
import { LEGAL_DOCUMENTS, type LegalDocumentKey } from "@/lib/legal/documents";
import { assertLegalDocument, parseLegalMarkdown } from "@/lib/legal/parseLegalMarkdown";
import type { ParsedLegalDocument } from "@/types/legal";

/**
 * Lee el Markdown en el build (las páginas legales son estáticas). Los archivos viven en
 * content/legal/, que es una copia de ../legal/ hecha por scripts/sync-legal.mjs: así el
 * sitio se construye desde landing-web aunque Vercel no tenga la carpeta legal/ al lado.
 */
const LEGAL_CONTENT_DIR = path.join(process.cwd(), "content", "legal");

export const loadLegalDocument = cache(
  async (documentKey: LegalDocumentKey, locale: Locale): Promise<ParsedLegalDocument> => {
    const sourceFile = LEGAL_DOCUMENTS[documentKey].sourceFile[locale];
    const markdown = await readFile(path.join(LEGAL_CONTENT_DIR, locale, sourceFile), "utf8");
    return assertLegalDocument(parseLegalMarkdown(markdown), sourceFile, locale);
  },
);
