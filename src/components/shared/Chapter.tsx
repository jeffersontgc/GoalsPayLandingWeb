import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export type ChapterVariant = "canvas" | "surface" | "ink";

const VARIANT_CLASSES: Record<ChapterVariant, { section: string; eyebrow: string; title: string; lead: string }> = {
  canvas: { section: "bg-canvas", eyebrow: "text-link", title: "text-ink", lead: "text-ink-2" },
  surface: { section: "bg-surface", eyebrow: "text-link", title: "text-ink", lead: "text-ink-2" },
  ink: {
    // En oscuro la banda es del mismo marino que la superficie: un filo la separa.
    section: "bg-band dark:border-y dark:border-band-line",
    eyebrow: "text-on-band-accent",
    title: "text-on-band",
    lead: "text-on-band-2",
  },
};

interface ChapterProps {
  id: string;
  variant: ChapterVariant;
  eyebrow: string;
  title: string;
  lead?: string;
  isCentered?: boolean;
  children: ReactNode;
}

/**
 * Capítulo de la historia (MASTER.md §4.2): eyebrow numerado → H2 → entrada → prueba visual.
 * La sección se nombra con su H2. "ink" es la banda marino fija de los dos temas.
 */
export const Chapter = ({ id, variant, eyebrow, title, lead, isCentered = false, children }: ChapterProps) => {
  const classes = VARIANT_CLASSES[variant];
  const titleId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      data-band={variant === "ink" ? "" : undefined}
      className={cn("chapter-y", classes.section)}
    >
      <div className="container-page">
        <Reveal
          className={cn(
            "flex max-w-3xl flex-col gap-4",
            isCentered && "mx-auto items-center text-center",
          )}
        >
          <p className={cn("type-eyebrow", classes.eyebrow)}>{eyebrow}</p>
          <h2 id={titleId} className={cn("type-h2", classes.title)}>
            {title}
          </h2>
          {lead && <p className={cn("type-body max-w-[65ch]", classes.lead)}>{lead}</p>}
        </Reveal>
        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  );
};
