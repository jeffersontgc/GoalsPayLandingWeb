import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { AnalyticsBars } from "@/components/mockups/AnalyticsBars";
import { CurrencyFlags } from "@/components/mockups/CurrencyFlags";
import { FinanceBalanceCard } from "@/components/mockups/FinanceBalanceCard";
import { OneOffPreview } from "@/components/mockups/OneOffPreview";
import { MockTag } from "@/components/mockups/MockTag";
import { OpeningPreview } from "@/components/mockups/OpeningPreview";
import { RemindersPreview } from "@/components/mockups/RemindersPreview";
import { StreakCard } from "@/components/mockups/StreakCard";
import { WidgetPreview } from "@/components/mockups/WidgetPreview";
import { Reveal } from "@/components/motion/Reveal";
import { BentoTile } from "@/components/sections/BentoTile";
import { Chapter } from "@/components/shared/Chapter";
import { ACHIEVEMENT_COUNT } from "@/data/achievements";
import { BENTO_TILES, type BentoTileKey } from "@/data/features";
import { SECTION_IDS } from "@/data/navigation";

/** 04 · Todo lo demás: el bento de 8 piezas (XL, W, S) que llena la rejilla sin huecos. */
export const FeaturesChapter = () => {
  const t = useTranslations("features");
  const tRules = useTranslations("mockups.balanceRules");

  const visuals: Record<BentoTileKey, ReactNode> = {
    balance: (
      <div className="flex flex-col gap-3">
        <FinanceBalanceCard />
        <div aria-hidden="true" className="flex flex-wrap gap-2">
          <MockTag tone="blue">{tRules("noDouble")}</MockTag>
          <MockTag tone="error">{tRules("blocked")}</MockTag>
        </div>
      </div>
    ),
    streaks: (
      <div className="flex flex-col gap-3">
        <StreakCard />
        <p className="text-sm font-medium text-band">{t("achievementSamples")}</p>
      </div>
    ),
    oneOff: <OneOffPreview />,
    widget: <WidgetPreview />,
    opening: <OpeningPreview />,
    currencies: <CurrencyFlags />,
    analytics: <AnalyticsBars />,
    reminders: <RemindersPreview />,
  };

  return (
    <Chapter
      id={SECTION_IDS.features}
      variant="canvas"
      eyebrow={t("eyebrow")}
      title={t("title")}
      lead={t("lead")}
    >
      <Reveal>
        <ul className="grid auto-rows-[minmax(200px,auto)] grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
          {BENTO_TILES.map((tile) => (
            <BentoTile
              key={tile.key}
              size={tile.size}
              tone={tile.key === "streaks" ? "sun" : "surface"}
              icon={tile.icon}
              title={t(`tiles.${tile.key}.title`, { count: ACHIEVEMENT_COUNT })}
              body={t(`tiles.${tile.key}.body`)}
              visual={visuals[tile.key]}
            />
          ))}
        </ul>
      </Reveal>
      <p className="mt-8 max-w-[65ch] type-body text-ink-2">{t("also")}</p>
    </Chapter>
  );
};
