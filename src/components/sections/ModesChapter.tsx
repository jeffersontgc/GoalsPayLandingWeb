import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { GoalDetailScreen } from "@/components/mockups/GoalDetailScreen";
import { MonthPlanScreen } from "@/components/mockups/MonthPlanScreen";
import { Reveal } from "@/components/motion/Reveal";
import { Chapter } from "@/components/shared/Chapter";
import { ICON_STROKE_WIDTH } from "@/config/site";
import { SECTION_IDS } from "@/data/navigation";

const FINANCE_BULLETS = ["oneOff", "opening", "analytics"] as const;
const GOALS_BULLETS = ["movements", "priorSavings", "streak"] as const;
const SECOND_MODE_DELAY_S = 0.1;

interface ModeColumnProps {
  name: string;
  body: string;
  bullets: string[];
  phone: ReactNode;
}

const ModeColumn = ({ name, body, bullets, phone }: ModeColumnProps) => (
  <div className="flex flex-col items-center gap-8">
    {phone}
    <div className="flex w-full max-w-md flex-col gap-3">
      <h3 className="type-h3 text-ink">{name}</h3>
      <p className="type-body text-ink-2">{body}</p>
      <ul className="flex flex-col gap-2">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2.5 type-body text-ink-2">
            <Check className="mt-1 size-5 shrink-0 text-link" strokeWidth={ICON_STROKE_WIDTH} aria-hidden="true" />
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

/**
 * 03 · Dos modos: los dos teléfonos lado a lado en escritorio y uno tras otro en móvil, para
 * que las dos pruebas se vean sin tener que cambiar de pestaña.
 */
export const ModesChapter = () => {
  const t = useTranslations("modes");
  return (
    <Chapter
      id={SECTION_IDS.modes}
      variant="surface"
      eyebrow={t("eyebrow")}
      title={t("title")}
      lead={t("lead")}
    >
      <div className="grid gap-16 md:grid-cols-2 md:gap-8">
        <Reveal>
          <ModeColumn
            name={t("finance.name")}
            body={t("finance.body")}
            bullets={FINANCE_BULLETS.map((bullet) => t(`finance.bullets.${bullet}`))}
            phone={<MonthPlanScreen />}
          />
        </Reveal>
        <Reveal delaySeconds={SECOND_MODE_DELAY_S}>
          <ModeColumn
            name={t("goals.name")}
            body={t("goals.body")}
            bullets={GOALS_BULLETS.map((bullet) => t(`goals.bullets.${bullet}`))}
            phone={<GoalDetailScreen />}
          />
        </Reveal>
      </div>
    </Chapter>
  );
};
