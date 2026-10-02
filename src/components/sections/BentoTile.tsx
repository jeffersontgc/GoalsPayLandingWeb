import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ICON_STROKE_WIDTH } from "@/config/site";
import type { BentoSize } from "@/data/features";
import { cn } from "@/lib/utils";

/** XL 2×2 · W 2×1 · S 1×1 en la rejilla de 4 columnas; 2 columnas en tablet, 1 en móvil. */
const SIZE_CLASSES: Record<BentoSize, string> = {
  xl: "sm:col-span-2 lg:row-span-2",
  wide: "sm:col-span-2",
  small: "",
};

type BentoTone = "surface" | "sun";

const TONE_CLASSES: Record<BentoTone, { tile: string; icon: string; title: string; body: string }> = {
  surface: {
    tile: "border border-line bg-surface",
    icon: "bg-tag-blue text-tag-blue-ink",
    title: "text-ink",
    body: "text-ink-2",
  },
  // Sol: solo para rachas y logros. Marino sobre --gp-sun da 10.1:1 en los dos temas.
  sun: {
    tile: "bg-sun",
    icon: "bg-band text-sun",
    title: "text-band",
    body: "text-band",
  },
};

interface BentoTileProps {
  size: BentoSize;
  tone?: BentoTone;
  icon: LucideIcon;
  title: string;
  body: string;
  visual?: ReactNode;
}

/** Ícono en un cuadro de 40 → título Sora 600 20 → una o dos líneas → mini visual abajo. */
export const BentoTile = ({ size, tone = "surface", icon: Icon, title, body, visual }: BentoTileProps) => {
  const toneClasses = TONE_CLASSES[tone];
  return (
    <li className={cn("flex flex-col gap-4 rounded-card p-6", toneClasses.tile, SIZE_CLASSES[size])}>
      <span className={cn("grid size-10 shrink-0 place-items-center rounded-icon", toneClasses.icon)}>
        <Icon className="size-5" strokeWidth={ICON_STROKE_WIDTH} aria-hidden="true" />
      </span>
      <div className="flex flex-col gap-2">
        <h3 className={cn("type-tile", toneClasses.title)}>{title}</h3>
        <p className={cn("text-base leading-relaxed", toneClasses.body)}>{body}</p>
      </div>
      {visual && <div className="mt-auto pt-2">{visual}</div>}
    </li>
  );
};
