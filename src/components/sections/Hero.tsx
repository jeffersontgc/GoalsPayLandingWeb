import { ArrowDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { DrawingPulse } from "@/components/brand/DrawingPulse";
import { DownloadButton } from "@/components/layout/DownloadButton";
import { StoreBadges } from "@/components/layout/StoreBadges";
import { GoalsHomeScreen } from "@/components/mockups/GoalsHomeScreen";
import { buttonVariants } from "@/components/ui/button";
import { ICON_STROKE_WIDTH } from "@/config/site";
import { SECTION_IDS } from "@/data/navigation";
import { cn } from "@/lib/utils";

/** El pulso de fondo, como en la portada del sistema de diseño. */
const WATERMARK_PULSE_SIZE = 520;

/** Banda marino: propuesta de valor a la izquierda, inicio de Metas a la derecha. */
export const Hero = () => {
  const t = useTranslations("hero");
  const tDownload = useTranslations("download");

  return (
    <section aria-labelledby="hero-title" data-band="" className="relative isolate overflow-hidden bg-band dark:border-b dark:border-band-line">
      <DrawingPulse
        size={WATERMARK_PULSE_SIZE}
        className="pointer-events-none absolute -right-32 -bottom-40 -z-10 text-pulse opacity-[0.14] md:-right-16"
      />
      <div className="container-page grid items-center gap-12 py-16 md:grid-cols-[1.1fr_0.9fr] md:gap-8 md:py-24">
        <div className="flex flex-col items-start gap-6">
          <p className="type-eyebrow text-on-band-accent">{t("eyebrow")}</p>
          <h1 id="hero-title" className="type-display text-on-band">
            {t("title")}
          </h1>
          <p className="type-body max-w-[52ch] text-on-band-2">{t("subtitle")}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
            <DownloadButton />
            <a
              href={`#${SECTION_IDS.balance}`}
              className={cn(buttonVariants({ variant: "ghost" }), "px-0 text-on-band-accent")}
            >
              {t("secondaryCta")}
              <ArrowDown strokeWidth={ICON_STROKE_WIDTH} aria-hidden="true" />
            </a>
          </div>
          <p className="type-small text-on-band-2">{tDownload("hint")}</p>
          <StoreBadges tone="band" />
        </div>
        <GoalsHomeScreen />
      </div>
    </section>
  );
};
