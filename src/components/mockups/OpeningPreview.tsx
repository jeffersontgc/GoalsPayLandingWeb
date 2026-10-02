import { useTranslations } from "next-intl";
import { OPENING_SAMPLE, SAMPLE_CURRENCY } from "@/data/mockups";
import { useSiteLocale } from "@/hooks/useSiteLocale";
import { formatMoney } from "@/utils/formatMoney";

interface OpeningFigureProps {
  label: string;
  amount: string;
  note: string;
}

const OpeningFigure = ({ label, amount, note }: OpeningFigureProps) => (
  <div className="flex flex-1 flex-col gap-0.5 rounded-control bg-elevated p-3">
    <p className="mock-meta text-ink-2">{label}</p>
    <p className="mock-amount-row text-ink">{amount}</p>
    <p className="mock-meta text-ink-3">{note}</p>
  </div>
);

/** Saldo inicial (suma al balance) frente a ahorro previo (va a la meta). */
export const OpeningPreview = () => {
  const t = useTranslations("mockups.opening");
  const locale = useSiteLocale();
  const formatAmount = (amount: number) => formatMoney(amount, locale, SAMPLE_CURRENCY);

  return (
    <div aria-hidden="true" className="flex flex-col gap-2 sm:flex-row">
      <OpeningFigure
        label={t("openingLabel")}
        amount={formatAmount(OPENING_SAMPLE.openingBalance)}
        note={t("openingNote")}
      />
      <OpeningFigure
        label={t("priorLabel")}
        amount={formatAmount(OPENING_SAMPLE.priorSavings)}
        note={t("priorNote")}
      />
    </div>
  );
};
