import { useTranslations } from "next-intl";
import { FINANCE_BALANCE_SAMPLE, SAMPLE_CURRENCY } from "@/data/mockups";
import { useSiteLocale } from "@/hooks/useSiteLocale";
import { MockSummaryCard } from "@/components/mockups/MockSummaryCard";
import { formatMoney, formatSignedMoney } from "@/utils/formatMoney";

interface BreakdownRowProps {
  label: string;
  amount: string;
  detail: string;
}

const BreakdownRow = ({ label, amount, detail }: BreakdownRowProps) => (
  <div className="flex flex-col gap-0.5 border-t border-band-line pt-2.5">
    <div className="flex items-baseline justify-between gap-3">
      <p className="mock-meta font-bold text-on-inverse">{label}</p>
      <p className="mock-amount-row text-on-inverse">{amount}</p>
    </div>
    <p className="mock-meta text-on-inverse-2">{detail}</p>
  </div>
);

const DETAIL_SEPARATOR = " · ";

/**
 * Tarjeta de balance de Finanzas con su desglose (Entradas, Salidas, En metas), como
 * BalanceCard en la App. Ilustración con un solo nombre accesible.
 */
export const FinanceBalanceCard = () => {
  const t = useTranslations("mockups.finance");
  const locale = useSiteLocale();
  const formatAmount = (amount: number) => formatMoney(amount, locale, SAMPLE_CURRENCY);
  const { moneyIn, moneyOut, inGoals, available } = FINANCE_BALANCE_SAMPLE;

  return (
    <div role="img" aria-label={t("label", { available: formatAmount(available) })}>
      <div aria-hidden="true">
        <MockSummaryCard label={t("balance")} amount={formatAmount(available)} className="gap-3 p-5">
          <BreakdownRow
            label={t("moneyIn")}
            amount={formatSignedMoney(moneyIn.total, locale, SAMPLE_CURRENCY)}
            detail={[
              t("opening", { amount: formatAmount(moneyIn.opening) }),
              t("recurring", { amount: formatAmount(moneyIn.recurring) }),
              t("oneOff", { amount: formatAmount(moneyIn.oneOff) }),
            ].join(DETAIL_SEPARATOR)}
          />
          <BreakdownRow
            label={t("moneyOut")}
            amount={formatSignedMoney(-moneyOut.total, locale, SAMPLE_CURRENCY)}
            detail={[
              t("recurring", { amount: formatAmount(moneyOut.recurring) }),
              t("oneOff", { amount: formatAmount(moneyOut.oneOff) }),
            ].join(DETAIL_SEPARATOR)}
          />
          <BreakdownRow
            label={t("inGoals")}
            amount={formatSignedMoney(-inGoals.total, locale, SAMPLE_CURRENCY)}
            detail={[
              t("deposited", { amount: formatAmount(inGoals.deposited) }),
              t("withdrawn", { amount: formatAmount(inGoals.withdrawn) }),
            ].join(DETAIL_SEPARATOR)}
          />
        </MockSummaryCard>
      </div>
    </div>
  );
};
