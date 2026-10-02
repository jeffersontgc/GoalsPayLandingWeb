import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { ICON_STROKE_WIDTH } from "@/config/site";
import { GOALS_HOME_SAMPLE, SAMPLE_CURRENCY } from "@/data/mockups";
import { useSiteLocale } from "@/hooks/useSiteLocale";
import { MockProgressBar } from "@/components/mockups/MockProgressBar";
import { MockSummaryCard } from "@/components/mockups/MockSummaryCard";
import { MockTag } from "@/components/mockups/MockTag";
import { PhoneFrame } from "@/components/mockups/PhoneFrame";
import { formatMoney, formatSignedMoney, getProgressPercent } from "@/utils/formatMoney";

/** Inicio del modo Metas, como en la pantalla 07 del sistema de diseño. */
export const GoalsHomeScreen = () => {
  const t = useTranslations("mockups.goalsHome");
  const locale = useSiteLocale();
  const formatAmount = (amount: number) => formatMoney(amount, locale, SAMPLE_CURRENCY);

  return (
    <PhoneFrame label={t("label", { total: formatAmount(GOALS_HOME_SAMPLE.totalSaved) })}>
      <div className="flex items-center justify-between pt-2">
        <div className="flex flex-col gap-0.5">
          <p className="mock-meta text-ink-2">{t("greeting")}</p>
          <p className="mock-title text-ink">{t("title")}</p>
        </div>
        <MockTag tone="sun">{t("streak", { days: GOALS_HOME_SAMPLE.streakDays })}</MockTag>
      </div>

      <MockSummaryCard
        label={t("totalSaved")}
        amount={formatAmount(GOALS_HOME_SAMPLE.totalSaved)}
        caption={t("thisMonth", {
          amount: formatSignedMoney(GOALS_HOME_SAMPLE.savedThisMonth, locale, SAMPLE_CURRENCY),
        })}
      />

      {GOALS_HOME_SAMPLE.goals.map((goal) => {
        const percent = getProgressPercent(goal.current, goal.target);
        return (
          <div key={goal.key} className="flex flex-col gap-2.5 rounded-card bg-surface p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="mock-row-title text-ink">{t(`goals.${goal.key}`)}</p>
              <p className="mock-meta font-bold text-link tabular">{percent}%</p>
            </div>
            <MockProgressBar percent={percent} />
            <p className="mock-meta text-ink-2 tabular">
              {t("progress", {
                current: formatAmount(goal.current),
                target: formatAmount(goal.target),
              })}
            </p>
          </div>
        );
      })}

      <div className="mt-auto flex h-[52px] items-center justify-center gap-2 rounded-control bg-secondary mock-button text-on-secondary">
        <Plus className="size-5" strokeWidth={ICON_STROKE_WIDTH} />
        {t("newGoal")}
      </div>
    </PhoneFrame>
  );
};
