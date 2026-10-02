import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { Chapter } from "@/components/shared/Chapter";
import { PROBLEM_QUOTE_KEYS, SECTION_IDS } from "@/data/navigation";

const QUOTE_STAGGER_S = 0.08;

/** 01 · El problema: tres frases de la vida real, con mucho aire. */
export const ProblemChapter = () => {
  const t = useTranslations("problem");
  return (
    <Chapter
      id={SECTION_IDS.problem}
      variant="surface"
      eyebrow={t("eyebrow")}
      title={t("title")}
      lead={t("lead")}
      isCentered
    >
      <ul aria-label={t("quotesLabel")} className="mx-auto grid max-w-5xl gap-3 md:grid-cols-3 md:gap-4">
        {PROBLEM_QUOTE_KEYS.map((quoteKey, index) => (
          <li key={quoteKey}>
            <Reveal delaySeconds={index * QUOTE_STAGGER_S} className="h-full">
              <p className="flex h-full items-center justify-center rounded-card bg-elevated px-6 py-8 text-center font-display type-body font-semibold text-ink">
                {t(`quotes.${quoteKey}`)}
              </p>
            </Reveal>
          </li>
        ))}
      </ul>
    </Chapter>
  );
};
