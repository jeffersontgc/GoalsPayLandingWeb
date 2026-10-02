import { BRAND_COLORS } from "@/config/site";
import { getPulseStroke, PULSE_DOT, PULSE_PATH, PULSE_VIEWBOX } from "@/utils/brandLogo";

interface OgPulseProps {
  size: number;
  color?: string;
}

/**
 * El pulso para ImageResponse (OG e ícono de Apple). Satori no entiende variables CSS, así
 * que el color es el valor fijo de la marca.
 */
export const OgPulse = ({ size, color = BRAND_COLORS.brandBlue }: OgPulseProps) => {
  const { strokeWidth, dotRadius } = getPulseStroke(size);
  return (
    <svg viewBox={PULSE_VIEWBOX} width={size} height={size}>
      <path
        d={PULSE_PATH}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx={PULSE_DOT.cx} cy={PULSE_DOT.cy} r={dotRadius} fill={color} />
    </svg>
  );
};
