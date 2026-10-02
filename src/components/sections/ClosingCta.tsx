import { useTranslations } from "next-intl";
import { DownloadButton } from "@/components/layout/DownloadButton";
import { StoreBadges } from "@/components/layout/StoreBadges";
import { DrawOnViewPulse } from "@/components/motion/DrawOnViewPulse";
import { SECTION_IDS } from "@/data/navigation";

const CTA_PULSE_SIZE = 72;

/** Cierre: banda marino con el pulso, la tercera llamada a descargar y las tiendas. */
export const ClosingCta = () => {
  const t = useTranslations("finalCta");
  const tDownload = useTranslations("download");

  return (
    <section
      id={SECTION_IDS.download}
      aria-labelledby="final-cta-title"
      data-band=""
      className="chapter-y bg-band dark:border-y dark:border-band-line"
    >
      <div className="container-page flex flex-col items-center gap-6 text-center">
        <DrawOnViewPulse size={CTA_PULSE_SIZE} className="text-pulse" />
        <h2 id="final-cta-title" className="type-h2 text-on-band">
          {t("title")}
        </h2>
        <p className="type-body max-w-[52ch] text-on-band-2">{t("subtitle")}</p>
        <div className="flex flex-col items-center gap-3 pt-2">
          <DownloadButton />
          <p className="type-small text-on-band-2">{tDownload("hint")}</p>
        </div>
        <StoreBadges tone="band" className="justify-center" />
      </div>
    </section>
  );
};
