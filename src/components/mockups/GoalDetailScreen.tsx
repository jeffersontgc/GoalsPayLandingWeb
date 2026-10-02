import { ArrowDownLeft, PiggyBank } from "lucide-react";
import { useTranslations } from "next-intl";
import { ICON_STROKE_WIDTH } from "@/config/site";
import { GOAL_DETAIL_SAMPLE, SAMPLE_CURRENCY } from "@/data/mockups";
import { useSiteLocale } from "@/hooks/useSiteLocale";
import { MockProgressBar } from "@/components/mockups/MockProgressBar";
import { MockTag } from "@/components/mockups/MockTag";
import { PhoneFrame } from "@/components/mockups/PhoneFrame";
import { formatShortDate } from "@/utils/formatDate";
import { formatMoney, formatSignedMoney, getProgressPercent } from "@/utils/formatMoney";

/** Una meta con su tarjeta (barra de 10 px y ritmo) y sus últimos movimientos. */
export const GoalDetailScreen = () => {
  const t = useTranslations("mockups.goalDetail");
  const locale = useSiteLocale();
  const formatAmount = (amount: number) => formatMoney(amount, locale, SAMPLE_CURRENCY);
  const percent = getProgressPercent(GOAL_DETAIL_SAMPLE.current, GOAL_DETAIL_SAMPLE.target);

  return (
    <PhoneFrame label={t("label", { percent })}>
      <div className="flex flex-col gap-3 rounded-card bg-surface p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <p className="mock-card-title text-ink">{t("name")}</p>
            <p className="mock-meta text-ink-3">{t("category")}</p>
          </div>
          <MockTag tone="blue">{percent}%</MockTag>
        </div>
        <p className="mock-amount-card text-ink">
          {formatAmount(GOAL_DETAIL_SAMPLE.current)}{" "}
          <span className="mock-meta font-medium text-ink-3">
            / {formatAmount(GOAL_DETAIL_SAMPLE.target)}
          </span>
        </p>
        <MockProgressBar percent={percent} size="regular" />
        <p className="mock-meta text-ink-2">
          {t("pace", {
            perWeek: formatAmount(GOAL_DETAIL_SAMPLE.perWeek),
            perDay: formatAmount(GOAL_DETAIL_SAMPLE.perDay),
            days: GOAL_DETAIL_SAMPLE.daysLeft,
          })}
        </p>
      </div>

      <p className="pt-1 mock-row-title text-ink">{t("movementsTitle")}</p>
      <ul className="flex flex-col gap-2">
        {GOAL_DETAIL_SAMPLE.movements.map((movement) => {
          const isPriorSavings = movement.kind === "priorSavings";
          const MovementIcon = isPriorSavings ? PiggyBank : ArrowDownLeft;
          return (
            <li key={movement.key} className="flex items-center gap-3 rounded-card bg-surface px-3 py-2.5">
              <span className="grid size-9 shrink-0 place-items-center rounded-icon bg-tag-blue text-tag-blue-ink">
                <MovementIcon className="size-5" strokeWidth={ICON_STROKE_WIDTH} />
              </span>
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="truncate mock-row-title text-ink">{t(`movements.${movement.key}`)}</p>
                <p className="mock-meta text-ink-3">
                  {isPriorSavings ? t("priorSavings") : t("deposit")} ·{" "}
                  {formatShortDate(movement.date, locale)}
                </p>
              </div>
              <p className="mock-amount-row text-ink">
                {formatSignedMoney(movement.amount, locale, SAMPLE_CURRENCY)}
              </p>
            </li>
          );
        })}
      </ul>

      <div className="mt-auto flex h-[52px] items-center justify-center rounded-control bg-primary mock-button text-on-primary">
        {t("depositButton")}
      </div>
    </PhoneFrame>
  );
};
