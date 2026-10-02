import { useTranslations } from "next-intl";
import { STREAK_SAMPLE_DAYS } from "@/data/mockups";

/** Tarjeta de racha del sistema de diseño: insignia en sol (48 px) sobre marino. */
export const StreakCard = () => {
  const t = useTranslations("mockups.streak");
  return (
    <div aria-hidden="true" className="flex items-center gap-3.5 rounded-card bg-band px-5 py-4">
      <span className="grid size-12 shrink-0 place-items-center rounded-control bg-sun font-display text-lg font-bold text-band tabular">
        {STREAK_SAMPLE_DAYS}
      </span>
      <div className="flex flex-col gap-0.5">
        <p className="mock-card-title text-on-band">{t("title", { days: STREAK_SAMPLE_DAYS })}</p>
        <p className="mock-meta text-on-band-2">{t("caption")}</p>
      </div>
    </div>
  );
};
