import { cn } from "@/lib/utils";
import { getPulseStroke, PULSE_DOT, PULSE_PATH, PULSE_VIEWBOX } from "@/utils/brandLogo";

interface PulseProps {
  /** Lado en px. El grosor del trazo se compensa según el tamaño, como en el documento. */
  size: number;
  className?: string;
}

/** El símbolo de GoalsPay. Toma el color de `currentColor`; es decorativo por defecto. */
export const Pulse = ({ size, className }: PulseProps) => {
  const { strokeWidth, dotRadius } = getPulseStroke(size);
  return (
    <svg
      viewBox={PULSE_VIEWBOX}
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={cn("block shrink-0", className)}
    >
      <path
        d={PULSE_PATH}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx={PULSE_DOT.cx} cy={PULSE_DOT.cy} r={dotRadius} fill="currentColor" />
    </svg>
  );
};
