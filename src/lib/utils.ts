import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/** Radios propios del sistema (rounded-chip, rounded-control…), para que se fusionen bien. */
const mergeClasses = extendTailwindMerge({
  extend: {
    theme: {
      borderRadius: ["chip", "control", "card", "device", "pill"],
    },
  },
});

export const cn = (...inputs: ClassValue[]): string => mergeClasses(clsx(inputs));
