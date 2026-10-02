import { useTranslations } from "next-intl";
import { Pulse } from "@/components/brand/Pulse";
import { GOALS_HOME_SAMPLE, SAMPLE_CURRENCY } from "@/data/mockups";
import { useSiteLocale } from "@/hooks/useSiteLocale";
import { formatMoney } from "@/utils/formatMoney";

const WIDGET_PULSE_SIZE = 20;

/** El widget de Android: ahorro total y metas en progreso (lo que guarda su snapshot). */
export const WidgetPreview = () => {
  const t = useTranslations("mockups.widget");
  const locale = useSiteLocale();
  const total = formatMoney(GOALS_HOME_SAMPLE.totalSaved, locale, SAMPLE_CURRENCY);

  return (
    <div
      role="img"
      aria-label={t("label", { total })}
      className="flex flex-col gap-1 rounded-card bg-inverse p-4"
    >
      <div aria-hidden="true" className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <p className="mock-meta text-on-inverse-2">{t("total")}</p>
          <Pulse size={WIDGET_PULSE_SIZE} className="text-pulse" />
        </div>
        <p className="mock-amount-card text-on-inverse">{total}</p>
        <p className="mock-meta text-on-inverse-2">
          {t("goals", { count: GOALS_HOME_SAMPLE.goals.length })}
        </p>
      </div>
    </div>
  );
};
