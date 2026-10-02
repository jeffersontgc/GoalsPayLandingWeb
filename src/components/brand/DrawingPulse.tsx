import { cn } from "@/lib/utils";
import { getPulseStroke, PULSE_DOT, PULSE_PATH, PULSE_VIEWBOX } from "@/utils/brandLogo";

interface DrawingPulseProps {
  size: number;
  className?: string;
}

/**
 * Pulso que se dibuja al cargar la página (hero), solo con CSS: no espera al JS y con
 * movimiento reducido aparece ya dibujado. Ver .pulse-draw-path en globals.css.
 */
export const DrawingPulse = ({ size, className }: DrawingPulseProps) => {
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
        className="pulse-draw-path"
        d={PULSE_PATH}
        pathLength={1}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle
        className="pulse-draw-dot"
        cx={PULSE_DOT.cx}
        cy={PULSE_DOT.cy}
        r={dotRadius}
        fill="currentColor"
      />
    </svg>
  );
};
