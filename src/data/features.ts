import {
  BarChart3,
  Bell,
  Coins,
  Flame,
  LayoutGrid,
  PiggyBank,
  Receipt,
  Scale,
  type LucideIcon,
} from "lucide-react";

/**
 * Tamaños del bento (MASTER.md §4.3): XL 2×2, W 2×1, S 1×1. Son tres tamaños y suman 16
 * celdas, así que la rejilla de 4 columnas queda completa, sin huecos.
 */
export type BentoSize = "xl" | "wide" | "small";

export type BentoTileKey =
  | "balance"
  | "streaks"
  | "oneOff"
  | "widget"
  | "opening"
  | "currencies"
  | "analytics"
  | "reminders";

interface BentoTileMeta {
  key: BentoTileKey;
  icon: LucideIcon;
  size: BentoSize;
}

/** Orden de lectura del bento (en una columna en móvil). Los textos están en features.tiles.*. */
export const BENTO_TILES: readonly BentoTileMeta[] = [
  { key: "balance", icon: Scale, size: "xl" },
  { key: "streaks", icon: Flame, size: "wide" },
  { key: "oneOff", icon: Receipt, size: "small" },
  { key: "widget", icon: LayoutGrid, size: "small" },
  { key: "opening", icon: PiggyBank, size: "wide" },
  { key: "currencies", icon: Coins, size: "wide" },
  { key: "analytics", icon: BarChart3, size: "wide" },
  { key: "reminders", icon: Bell, size: "wide" },
];
