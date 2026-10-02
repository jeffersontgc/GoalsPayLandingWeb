/** Árbol de un documento legal ya parseado. Se pinta con componentes de React, sin HTML crudo. */

export type LegalInline =
  | { type: "text"; value: string }
  | { type: "strong"; children: LegalInline[] }
  | { type: "em"; children: LegalInline[] }
  | { type: "link"; href: string; isExternal: boolean; children: LegalInline[] };

export interface LegalListItem {
  content: LegalInline[];
  nested: LegalListBlock | null;
}

export interface LegalListBlock {
  type: "list";
  isOrdered: boolean;
  items: LegalListItem[];
}

export interface LegalHeadingBlock {
  type: "heading";
  level: 2 | 3;
  id: string;
  content: LegalInline[];
}

export interface LegalParagraphBlock {
  type: "paragraph";
  /** Cada línea del Markdown es una línea visual (se separan con <br>). */
  lines: LegalInline[][];
}

export interface LegalTableBlock {
  type: "table";
  /** Título de la sección en la que está la tabla: da nombre accesible a la región. */
  label: string;
  header: LegalInline[][];
  rows: LegalInline[][][];
}

export type LegalBlock = LegalHeadingBlock | LegalParagraphBlock | LegalListBlock | LegalTableBlock;

export interface LegalTocEntry {
  id: string;
  title: string;
}

export interface ParsedLegalDocument {
  title: string;
  version: string;
  updated: string;
  /** Aviso de traducción ("This is a translation…"), solo en inglés. */
  notice: LegalInline[] | null;
  toc: LegalTocEntry[];
  blocks: LegalBlock[];
}
