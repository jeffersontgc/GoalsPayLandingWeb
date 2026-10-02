import type { Locale } from "@/i18n/config";
import { findLegalDocumentBySourceFile, getLegalPublicPath } from "@/lib/legal/documents";
import type {
  LegalBlock,
  LegalInline,
  LegalListBlock,
  LegalListItem,
  ParsedLegalDocument,
} from "@/types/legal";

/**
 * Parser del subconjunto de Markdown que usan legal/{es,en}/*.md: encabezados, párrafos,
 * negritas, cursivas, enlaces, correos, listas anidadas, tablas y la cita del aviso de
 * traducción. Es el mismo subconjunto que legal/scripts/build_site.py.
 */

const VERSION_PATTERN = /^\*\*(?:Versión|Version):\*\*\s*(.+)$/;
const UPDATED_PATTERN = /^\*\*(?:Última actualización|Last updated):\*\*\s*(.+)$/;
const LIST_ITEM_PATTERN = /^(\s*)(-|\d+\.)\s+(.*)$/;
const INLINE_PATTERN =
  /\[([^\]]+)\]\(([^)]+)\)|\*\*(.+?)\*\*|(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])/g;
const EMAIL_PATTERN = /(?<![\w.@/:])([\w.+-]+@[\w-]+\.[\w.-]+\w)/g;
const EXTERNAL_LINK_PATTERN = /^(https?:|mailto:)/;
const ORDERED_MARKER_PATTERN = /^\d/;
const TABLE_DIVIDER_ROW_INDEX = 1;
const FALLBACK_SLUG = "seccion";

const resolveHref = (target: string): { href: string; isExternal: boolean } => {
  if (EXTERNAL_LINK_PATTERN.test(target)) return { href: target, isExternal: true };
  const [path, fragment] = target.split("#");
  const linkedDocument = findLegalDocumentBySourceFile(path);
  if (!linkedDocument) return { href: target, isExternal: false };
  const publicPath = getLegalPublicPath(linkedDocument.documentKey, linkedDocument.locale);
  return { href: fragment ? `${publicPath}#${fragment}` : publicPath, isExternal: false };
};

const parseEmails = (text: string): LegalInline[] => {
  const nodes: LegalInline[] = [];
  let cursor = 0;
  for (const match of text.matchAll(EMAIL_PATTERN)) {
    const start = match.index ?? 0;
    if (start > cursor) nodes.push({ type: "text", value: text.slice(cursor, start) });
    const email = match[1];
    nodes.push({
      type: "link",
      href: `mailto:${email}`,
      isExternal: true,
      children: [{ type: "text", value: email }],
    });
    cursor = start + match[0].length;
  }
  if (cursor < text.length) nodes.push({ type: "text", value: text.slice(cursor) });
  return nodes;
};

export const parseInline = (text: string): LegalInline[] => {
  const nodes: LegalInline[] = [];
  let cursor = 0;
  for (const match of text.matchAll(INLINE_PATTERN)) {
    const start = match.index ?? 0;
    if (start > cursor) nodes.push(...parseEmails(text.slice(cursor, start)));
    const [, linkLabel, linkTarget, strongText, emphasisText] = match;
    if (linkLabel !== undefined && linkTarget !== undefined) {
      nodes.push({ type: "link", ...resolveHref(linkTarget), children: parseInline(linkLabel) });
    } else if (strongText !== undefined) {
      nodes.push({ type: "strong", children: parseInline(strongText) });
    } else if (emphasisText !== undefined) {
      nodes.push({ type: "em", children: parseInline(emphasisText) });
    }
    cursor = start + match[0].length;
  }
  if (cursor < text.length) nodes.push(...parseEmails(text.slice(cursor)));
  return nodes;
};

export const getPlainText = (nodes: LegalInline[]): string =>
  nodes.map((node) => (node.type === "text" ? node.value : getPlainText(node.children))).join("");

const slugify = (text: string): string =>
  text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || FALLBACK_SLUG;

const splitBlocks = (markdown: string): string[][] => {
  const blocks: string[][] = [];
  let current: string[] = [];
  for (const line of markdown.split(/\r?\n/)) {
    if (line.trim()) {
      current.push(line.trimEnd());
    } else if (current.length > 0) {
      blocks.push(current);
      current = [];
    }
  }
  if (current.length > 0) blocks.push(current);
  return blocks;
};

const getIndent = (line: string): number => LIST_ITEM_PATTERN.exec(line)?.[1].length ?? 0;

const parseList = (
  lines: string[],
  startIndex: number,
  indent: number,
): { list: LegalListBlock; nextIndex: number } => {
  const firstMarker = LIST_ITEM_PATTERN.exec(lines[startIndex])?.[2] ?? "-";
  const items: LegalListItem[] = [];
  let index = startIndex;
  while (index < lines.length) {
    const match = LIST_ITEM_PATTERN.exec(lines[index]);
    if (!match) break;
    const currentIndent = match[1].length;
    if (currentIndent < indent) break;
    const lastItem = items[items.length - 1];
    if (currentIndent > indent && lastItem) {
      const nested = parseList(lines, index, currentIndent);
      lastItem.nested = nested.list;
      index = nested.nextIndex;
      continue;
    }
    items.push({ content: parseInline(match[3]), nested: null });
    index += 1;
  }
  return {
    list: { type: "list", isOrdered: ORDERED_MARKER_PATTERN.test(firstMarker), items },
    nextIndex: index,
  };
};

const splitTableRow = (line: string): string[] =>
  line
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((cell) => cell.trim());

const isMetadataBlock = (block: string[]): boolean =>
  block.every((line) => VERSION_PATTERN.test(line) || UPDATED_PATTERN.test(line));

interface ParseState {
  document: ParsedLegalDocument;
  lastHeading: string;
  usedIds: Set<string>;
}

const createUniqueId = (state: ParseState, text: string): string => {
  const baseId = slugify(text);
  let candidate = baseId;
  let suffix = 2;
  while (state.usedIds.has(candidate)) {
    candidate = `${baseId}-${suffix}`;
    suffix += 1;
  }
  state.usedIds.add(candidate);
  return candidate;
};

const parseHeading = (state: ParseState, rawText: string, level: 2 | 3): LegalBlock => {
  const content = parseInline(rawText.trim());
  const plainText = getPlainText(content);
  const id = createUniqueId(state, plainText);
  state.lastHeading = plainText;
  if (level === 2) state.document.toc.push({ id, title: plainText });
  return { type: "heading", level, id, content };
};

const parseMetadata = (state: ParseState, block: string[]): void => {
  for (const line of block) {
    const version = VERSION_PATTERN.exec(line);
    if (version) state.document.version = version[1].trim();
    const updated = UPDATED_PATTERN.exec(line);
    if (updated) state.document.updated = updated[1].trim();
  }
};

const parseBlock = (state: ParseState, block: string[]): LegalBlock | null => {
  const firstLine = block[0];
  if (firstLine.startsWith("## ")) return parseHeading(state, firstLine.slice(3), 2);
  if (firstLine.startsWith("### ")) return parseHeading(state, firstLine.slice(4), 3);
  if (firstLine.startsWith("|")) {
    const rows = block.map(splitTableRow).map((cells) => cells.map(parseInline));
    return {
      type: "table",
      label: state.lastHeading,
      header: rows[0],
      rows: rows.slice(TABLE_DIVIDER_ROW_INDEX + 1),
    };
  }
  if (LIST_ITEM_PATTERN.test(firstLine)) return parseList(block, 0, getIndent(firstLine)).list;
  return { type: "paragraph", lines: block.map(parseInline) };
};

export const parseLegalMarkdown = (markdown: string): ParsedLegalDocument => {
  const state: ParseState = {
    document: { title: "", version: "", updated: "", notice: null, toc: [], blocks: [] },
    lastHeading: "",
    usedIds: new Set<string>(),
  };
  for (const block of splitBlocks(markdown)) {
    const firstLine = block[0];
    if (firstLine.startsWith("# ")) {
      state.document.title = firstLine.slice(2).trim();
    } else if (isMetadataBlock(block)) {
      parseMetadata(state, block);
    } else if (firstLine.startsWith("> ")) {
      state.document.notice = parseInline(block.map((line) => line.slice(2)).join(" "));
    } else {
      const parsedBlock = parseBlock(state, block);
      if (parsedBlock) state.document.blocks.push(parsedBlock);
    }
  }
  return state.document;
};

/** Falla en el build si un documento llega sin lo que la página necesita mostrar. */
export const assertLegalDocument = (
  document: ParsedLegalDocument,
  sourceFile: string,
  locale: Locale,
): ParsedLegalDocument => {
  if (!document.title || !document.version || !document.updated) {
    throw new Error(`content/legal/${locale}/${sourceFile} needs a title, a version and a date.`);
  }
  return document;
};
