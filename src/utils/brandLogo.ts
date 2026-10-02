/**
 * Geometría del pulso y métricas del logotipo. Es un port de app/src/utils/brandLogo.ts para
 * que el sitio y la App dibujen exactamente la misma marca.
 */

export const PULSE_VIEWBOX = "0 0 64 64";

/** Trazo exacto del documento: la línea de ahorro que sube hasta la meta. */
export const PULSE_PATH = "M4 46 H16 L22 32 L30 52 L38 22 L46 34 L58 8";

/** Punto final: la meta. */
export const PULSE_DOT = { cx: 58, cy: 8 } as const;

interface PulseStroke {
  strokeWidth: number;
  dotRadius: number;
}

/**
 * Compensación óptica del documento: cuanto más pequeño se pinta el símbolo, más grueso el
 * trazo (6 a 40 px o más, hasta 9 en tamaños de favicon).
 */
const PULSE_STROKES_BY_MIN_SIZE: readonly (PulseStroke & { minSize: number })[] = [
  { minSize: 40, strokeWidth: 6, dotRadius: 5 },
  { minSize: 24, strokeWidth: 7, dotRadius: 6 },
  { minSize: 20, strokeWidth: 8, dotRadius: 6 },
  { minSize: 0, strokeWidth: 9, dotRadius: 7 },
];

const SMALLEST_PULSE_STROKE = PULSE_STROKES_BY_MIN_SIZE[PULSE_STROKES_BY_MIN_SIZE.length - 1];

export const getPulseStroke = (renderedSize: number): PulseStroke => {
  const match =
    PULSE_STROKES_BY_MIN_SIZE.find((stroke) => renderedSize >= stroke.minSize) ??
    SMALLEST_PULSE_STROKE;
  return { strokeWidth: match.strokeWidth, dotRadius: match.dotRadius };
};

/** Por debajo de este ancho el logotipo completo no se lee: solo el símbolo. */
export const LOGO_MIN_WIDTH = 96;

/** Ancho aproximado de "GOALSPAY" en Syncopate Bold, en múltiplos del cuerpo. */
const WORDMARK_WIDTH_PER_FONT_SIZE = 6.25;

/** letter-spacing del documento (-0.6 px a 38 px), en em. */
export const WORDMARK_LETTER_SPACING_EM = -0.016;

/** Proporciones de la variante horizontal del documento (cuerpo 38, símbolo 48, separación 14). */
const SYMBOL_TO_WORDMARK_RATIO = 1.25;
const GAP_TO_WORDMARK_RATIO = 0.4;

export interface LogoMetrics {
  symbolSize: number;
  gap: number;
  /** El logotipo completo quedaría por debajo del mínimo: se pinta solo el símbolo. */
  isSymbolOnly: boolean;
}

export const getLogoMetrics = (wordmarkSize: number): LogoMetrics => {
  const symbolSize = wordmarkSize * SYMBOL_TO_WORDMARK_RATIO;
  const gap = wordmarkSize * GAP_TO_WORDMARK_RATIO;
  const fullWidth = wordmarkSize * WORDMARK_WIDTH_PER_FONT_SIZE + gap + symbolSize;
  return { symbolSize, gap, isSymbolOnly: fullWidth < LOGO_MIN_WIDTH };
};
