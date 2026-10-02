import { ArrowDown, ArrowRight, CircleAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import { DrawOnViewPulse } from "@/components/motion/DrawOnViewPulse";
import { ICON_STROKE_WIDTH } from "@/config/site";
import { BALANCE_FLOW_SAMPLE, SAMPLE_CURRENCY } from "@/data/mockups";
import { useSiteLocale } from "@/hooks/useSiteLocale";
import { cn } from "@/lib/utils";
import { formatMoney, formatSignedMoney } from "@/utils/formatMoney";

const DIAGRAM_PULSE_SIZE = 48;

interface FlowStepProps {
  label: string;
  amount: string;
  note?: string;
  isResult?: boolean;
}

const FlowStep = ({ label, amount, note, isResult = false }: FlowStepProps) => (
  <div
    className={cn(
      "flex flex-1 flex-col gap-1 rounded-card p-5",
      isResult ? "bg-tag-blue" : "bg-elevated",
    )}
  >
    <p className={cn("type-small", isResult ? "text-tag-blue-ink" : "text-ink-2")}>{label}</p>
    <p className="type-figure-compact text-ink">
      {amount}
    </p>
    {note && <p className="type-small text-ink-3">{note}</p>}
  </div>
);

const FlowArrow = () => (
  <span aria-hidden="true" className="grid shrink-0 place-items-center text-ink-3">
    <ArrowDown className="size-5 md:hidden" strokeWidth={ICON_STROKE_WIDTH} />
    <ArrowRight className="hidden size-5 md:block" strokeWidth={ICON_STROKE_WIDTH} />
  </span>
);

/**
 * Prueba visual del capítulo 2: recibido → pagado → disponible → abono, con cifras reales y
 * el bloqueo de la App cuando el abono supera el balance. Un solo nombre accesible.
 */
export const BalanceFlowDiagram = () => {
  const t = useTranslations("balance.flow");
  const locale = useSiteLocale();
  const formatAmount = (amount: number) => formatMoney(amount, locale, SAMPLE_CURRENCY);
  const { received, paid, beforeGoals, deposit, available, blockedDeposit } = BALANCE_FLOW_SAMPLE;

  return (
    <div
      role="img"
      aria-label={t("label", {
        received: formatAmount(received),
        paid: formatAmount(paid),
        beforeGoals: formatAmount(beforeGoals),
        deposit: formatAmount(deposit),
        available: formatAmount(available),
        blocked: formatAmount(blockedDeposit),
      })}
      className="rounded-chapter border border-line bg-surface p-5 md:p-10"
    >
      <div aria-hidden="true" className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <DrawOnViewPulse size={DIAGRAM_PULSE_SIZE} className="text-logo-pulse" />
          <p className="type-eyebrow text-ink-3">{t("example")}</p>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-stretch">
          <FlowStep label={t("received")} amount={formatSignedMoney(received, locale, SAMPLE_CURRENCY)} note={t("receivedNote")} />
          <FlowArrow />
          <FlowStep label={t("paid")} amount={formatSignedMoney(-paid, locale, SAMPLE_CURRENCY)} note={t("paidNote")} />
          <FlowArrow />
          <FlowStep label={t("available")} amount={formatAmount(beforeGoals)} />
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-stretch">
          <FlowStep label={t("deposit")} amount={formatSignedMoney(-deposit, locale, SAMPLE_CURRENCY)} note={t("depositNote")} />
          <FlowArrow />
          <FlowStep label={t("after")} amount={formatAmount(available)} isResult />
          <div className="flex flex-1 flex-col gap-2 rounded-card border-[1.5px] border-dashed border-line-strong p-5">
            <p className="type-small text-ink-2">{t("blockedTitle")}</p>
            <p className="type-small font-bold text-ink">
              {t("blockedAttempt", { amount: formatAmount(blockedDeposit) })}
            </p>
            <p className="flex items-start gap-2 rounded-control bg-tag-error px-3 py-2 type-small text-tag-error-ink">
              <CircleAlert className="mt-0.5 size-4 shrink-0" strokeWidth={ICON_STROKE_WIDTH} />
              {t("blockedMessage", { amount: formatAmount(available) })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
