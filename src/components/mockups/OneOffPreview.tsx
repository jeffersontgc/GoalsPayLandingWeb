import { useTranslations } from "next-intl";
import { ONE_OFF_SAMPLE, SAMPLE_CURRENCY } from "@/data/mockups";
import { useSiteLocale } from "@/hooks/useSiteLocale";
import { formatMoney } from "@/utils/formatMoney";

/** Un ingreso y un gasto puntuales: el signo dice cuál es cuál, no solo el color. */
export const OneOffPreview = () => {
  const t = useTranslations("mockups.oneOff");
  const locale = useSiteLocale();
  const formatAmount = (amount: number) => formatMoney(amount, locale, SAMPLE_CURRENCY);

  return (
    <ul aria-hidden="true" className="flex flex-col gap-1.5">
      <li className="flex items-center justify-between gap-2 rounded-control bg-elevated px-3 py-2">
        <span className="truncate mock-meta text-ink-2">{t("income")}</span>
        <span className="shrink-0 whitespace-nowrap mock-amount-row text-link">
          {t("incomeAmount", { amount: formatAmount(ONE_OFF_SAMPLE.income) })}
        </span>
      </li>
      <li className="flex items-center justify-between gap-2 rounded-control bg-elevated px-3 py-2">
        <span className="truncate mock-meta text-ink-2">{t("expense")}</span>
        <span className="shrink-0 whitespace-nowrap mock-amount-row text-ink">
          {t("expenseAmount", { amount: formatAmount(ONE_OFF_SAMPLE.expense) })}
        </span>
      </li>
    </ul>
  );
};
