import { Bell, CalendarClock, Fingerprint } from "lucide-react";
import { useTranslations } from "next-intl";
import { ICON_STROKE_WIDTH } from "@/config/site";
import { MONTH_PLAN_SAMPLE, SAMPLE_CURRENCY } from "@/data/mockups";
import { useSiteLocale } from "@/hooks/useSiteLocale";
import { formatMoney } from "@/utils/formatMoney";

/** El gasto pendiente del plan del mes es el que "vence hoy" en el ejemplo. */
const dueRow = MONTH_PLAN_SAMPLE.rows.find((row) => row.status === "pending");

/** Dos avisos (racha y vencimiento) y el interruptor del bloqueo, con los textos de la App. */
export const RemindersPreview = () => {
  const t = useTranslations("mockups.reminders");
  const locale = useSiteLocale();

  return (
    <div role="img" aria-label={t("label")}>
      <ul aria-hidden="true" className="flex flex-col gap-2">
        <li className="flex items-start gap-3 rounded-control bg-elevated p-3">
          <Bell className="mt-0.5 size-5 shrink-0 text-link" strokeWidth={ICON_STROKE_WIDTH} />
          <div className="flex min-w-0 flex-col">
            <p className="mock-meta font-bold text-ink">{t("reminderTitle")}</p>
            <p className="mock-meta text-ink-2">{t("reminderBody")}</p>
          </div>
        </li>
        {dueRow && (
          <li className="flex items-center gap-3 rounded-control bg-elevated p-3">
            <CalendarClock className="size-5 shrink-0 text-link" strokeWidth={ICON_STROKE_WIDTH} />
            <p className="flex-1 mock-meta font-bold text-ink">{t("dueTitle")}</p>
            <p className="whitespace-nowrap mock-amount-row text-ink">
              {t("dueBody", { amount: formatMoney(dueRow.amount, locale, SAMPLE_CURRENCY) })}
            </p>
          </li>
        )}
        <li className="flex items-center gap-3 rounded-control bg-elevated p-3">
          <Fingerprint className="size-5 shrink-0 text-link" strokeWidth={ICON_STROKE_WIDTH} />
          <p className="flex-1 mock-meta font-bold text-ink">{t("lock")}</p>
          <span className="flex h-6 w-10 items-center justify-end rounded-pill bg-primary p-0.5">
            <span className="size-5 rounded-pill bg-on-primary" />
          </span>
        </li>
      </ul>
    </div>
  );
};
