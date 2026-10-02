import { useTranslations } from "next-intl";
import { ANALYTICS_MAX_VALUE, ANALYTICS_SAMPLE } from "@/data/mockups";
import { useSiteLocale } from "@/hooks/useSiteLocale";
import { formatShortMonth } from "@/utils/formatDate";

const PERCENT_SCALE = 100;

const toBarHeight = (value: number): string => `${(value / ANALYTICS_MAX_VALUE) * PERCENT_SCALE}%`;

/**
 * Mini gráfica de entradas y salidas por mes. Las barras pasan 3:1 contra la tarjeta en los
 * dos temas, y la leyenda dice en texto qué es cada color.
 */
export const AnalyticsBars = () => {
  const t = useTranslations("mockups.analytics");
  const locale = useSiteLocale();

  return (
    <div role="img" aria-label={t("label")} className="flex flex-col gap-3">
      <div aria-hidden="true" className="flex flex-col gap-3">
        <div className="flex h-24 items-end gap-3">
          {ANALYTICS_SAMPLE.map((month) => (
            <div key={month.month} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="flex h-20 w-full items-end justify-center gap-1">
                <span className="w-2.5 rounded-t-chip bg-pulse" style={{ height: toBarHeight(month.moneyIn) }} />
                <span className="w-2.5 rounded-t-chip bg-ink-3" style={{ height: toBarHeight(month.moneyOut) }} />
              </div>
              <span className="mock-meta text-ink-3">{formatShortMonth(month.month, locale)}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mock-meta text-ink-2">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-pill bg-pulse" />
            {t("moneyIn")}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-pill bg-ink-3" />
            {t("moneyOut")}
          </span>
        </div>
      </div>
    </div>
  );
};
