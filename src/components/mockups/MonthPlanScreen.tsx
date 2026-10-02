import { useTranslations } from "next-intl";
import {
  MONTH_PLAN_SAMPLE,
  MONTH_PLAN_STATUS_TONE,
  SAMPLE_CURRENCY,
  type MonthPlanRowKey,
  type MonthPlanStatus,
} from "@/data/mockups";
import { useSiteLocale } from "@/hooks/useSiteLocale";
import { MockTag } from "@/components/mockups/MockTag";
import { PhoneFrame } from "@/components/mockups/PhoneFrame";
import { formatMoney } from "@/utils/formatMoney";

interface PlanRowProps {
  rowKey: MonthPlanRowKey;
  day: number;
  amount: string;
  status: MonthPlanStatus;
}

const PlanRow = ({ rowKey, day, amount, status }: PlanRowProps) => {
  const t = useTranslations("mockups.monthPlan");
  return (
    <li className="flex items-center gap-3 px-3 py-2.5">
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="truncate mock-row-title text-ink">{t(`rows.${rowKey}`)}</p>
        <p className="mock-meta text-ink-3">{t("day", { day })}</p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <p className="mock-amount-row text-ink">{amount}</p>
        <MockTag tone={MONTH_PLAN_STATUS_TONE[status]}>{t(`status.${status}`)}</MockTag>
      </div>
    </li>
  );
};

const incomeRows = MONTH_PLAN_SAMPLE.rows.filter((row) => row.kind === "income");
const expenseRows = MONTH_PLAN_SAMPLE.rows.filter((row) => row.kind === "expense");
const paidCount = expenseRows.filter((row) => row.status === "paid").length;
const skippedCount = expenseRows.filter((row) => row.status === "skipped").length;

/** Plan del mes de Finanzas: cada fila con su estado (recibido, pagado, pendiente u omitido). */
export const MonthPlanScreen = () => {
  const t = useTranslations("mockups.monthPlan");
  const locale = useSiteLocale();
  const formatAmount = (amount: number) => formatMoney(amount, locale, SAMPLE_CURRENCY);

  return (
    <PhoneFrame label={t("label")}>
      <div className="flex items-center justify-between pt-2">
        <p className="mock-title text-ink">{t("title")}</p>
        <MockTag tone="muted">{t("month")}</MockTag>
      </div>

      <p className="pt-1 mock-row-title text-ink">{t("incomes")}</p>
      <ul className="divide-y divide-line rounded-card bg-surface">
        {incomeRows.map((row) => (
          <PlanRow
            key={row.key}
            rowKey={row.key}
            day={row.day}
            amount={formatAmount(row.amount)}
            status={row.status}
          />
        ))}
      </ul>

      <div className="flex items-baseline justify-between gap-2 pt-1">
        <p className="mock-row-title text-ink">{t("expenses")}</p>
        <p className="mock-meta text-ink-2">
          {t("expensesSummary", {
            paid: paidCount,
            total: expenseRows.length,
            skipped: skippedCount,
          })}
        </p>
      </div>
      <ul className="divide-y divide-line rounded-card bg-surface">
        {expenseRows.map((row) => (
          <PlanRow
            key={row.key}
            rowKey={row.key}
            day={row.day}
            amount={formatAmount(row.amount)}
            status={row.status}
          />
        ))}
      </ul>
    </PhoneFrame>
  );
};
