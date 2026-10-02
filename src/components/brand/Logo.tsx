import { Pulse } from "@/components/brand/Pulse";
import { BRAND_NAME, WORDMARK_TEXT } from "@/config/site";
import { cn } from "@/lib/utils";
import { getLogoMetrics, WORDMARK_LETTER_SPACING_EM } from "@/utils/brandLogo";

type LogoTone = "theme" | "inverse";

interface LogoProps {
  /** Cuerpo de "GOALSPAY" en px. Si el logotipo completo mide menos de 96 px, solo va el símbolo. */
  wordmarkSize: number;
  /** `theme` sigue al tema de la página; `inverse` es para las superficies marino. */
  tone?: LogoTone;
  className?: string;
}

const TONE_CLASSES: Record<LogoTone, { wordmark: string; pulse: string }> = {
  theme: { wordmark: "text-logo-wordmark", pulse: "text-logo-pulse" },
  inverse: { wordmark: "text-on-inverse", pulse: "text-pulse" },
};

/** Palabra "GOALSPAY" en Syncopate 700 y, a la derecha, el pulso. Un solo nombre accesible. */
export const Logo = ({ wordmarkSize, tone = "theme", className }: LogoProps) => {
  const { symbolSize, gap, isSymbolOnly } = getLogoMetrics(wordmarkSize);
  const toneClasses = TONE_CLASSES[tone];

  return (
    <span
      role="img"
      aria-label={BRAND_NAME}
      className={cn("inline-flex items-center", className)}
      style={{ gap }}
    >
      {!isSymbolOnly && (
        <span
          aria-hidden="true"
          className={cn("font-wordmark leading-none font-bold", toneClasses.wordmark)}
          style={{
            fontSize: wordmarkSize,
            letterSpacing: `${WORDMARK_LETTER_SPACING_EM}em`,
          }}
        >
          {WORDMARK_TEXT}
        </span>
      )}
      <Pulse size={symbolSize} className={toneClasses.pulse} />
    </span>
  );
};
