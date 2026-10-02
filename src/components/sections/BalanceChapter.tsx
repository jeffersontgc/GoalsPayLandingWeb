import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { DownloadButton } from "@/components/layout/DownloadButton";
import { Reveal } from "@/components/motion/Reveal";
import { BalanceFlowDiagram } from "@/components/sections/BalanceFlowDiagram";
import { Chapter } from "@/components/shared/Chapter";
import { ICON_STROKE_WIDTH } from "@/config/site";
import { SECTION_IDS } from "@/data/navigation";

const RULE_KEYS = ["noDouble", "priorSavings"] as const;

/** 02 · El balance: el diferenciador. Termina con la segunda llamada a descargar. */
export const BalanceChapter = () => {
  const t = useTranslations("balance");
  const tDownload = useTranslations("download");

  return (
    <Chapter
      id={SECTION_IDS.balance}
      variant="canvas"
      eyebrow={t("eyebrow")}
      title={t("title")}
      lead={t("lead")}
    >
      <Reveal>
        <BalanceFlowDiagram />
      </Reveal>
      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {RULE_KEYS.map((ruleKey) => (
          <li key={ruleKey} className="flex items-start gap-3 type-body text-ink-2">
            <Check className="mt-1 size-5 shrink-0 text-link" strokeWidth={ICON_STROKE_WIDTH} aria-hidden="true" />
            {t(`rules.${ruleKey}`)}
          </li>
        ))}
      </ul>
      <div className="mt-12 flex flex-col items-start gap-4 border-t border-line pt-10 md:flex-row md:items-center md:justify-between">
        <p className="type-h3 text-ink">{t("ctaTitle")}</p>
        <div className="flex flex-col items-start gap-2 md:items-end">
          <DownloadButton />
          <p className="type-small text-ink-3">{tDownload("hint")}</p>
        </div>
      </div>
    </Chapter>
  );
};
