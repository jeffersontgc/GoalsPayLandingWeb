import type { ReactNode } from "react";
import type { TagTone } from "@/data/mockups";
import { cn } from "@/lib/utils";

const TONE_CLASSES: Record<TagTone, string> = {
  blue: "bg-tag-blue text-tag-blue-ink",
  sun: "bg-tag-sun text-tag-sun-ink",
  error: "bg-tag-error text-tag-error-ink",
  muted: "bg-tag-muted text-tag-muted-ink",
};

interface MockTagProps {
  tone: TagTone;
  children: ReactNode;
  className?: string;
}

/** Etiqueta en píldora de la App ("En camino", "Racha", "Atrasada", "Pausada"). */
export const MockTag = ({ tone, children, className }: MockTagProps) => (
  <span
    className={cn(
      "inline-flex shrink-0 items-center rounded-pill px-2.5 py-1 mock-tag tabular",
      TONE_CLASSES[tone],
      className,
    )}
  >
    {children}
  </span>
);
