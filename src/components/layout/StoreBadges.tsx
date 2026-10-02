import { useTranslations } from "next-intl";
import { AppleMark, GooglePlayMark } from "@/components/brand/StoreMarks";
import { publicEnv } from "@/lib/env";
import { cn } from "@/lib/utils";

type StoreBadgesTone = "theme" | "band";

interface StoreEntry {
  key: "playStore" | "appStore";
  url: string;
  Mark: typeof AppleMark;
}

const STORES: StoreEntry[] = [
  { key: "playStore", url: publicEnv.NEXT_PUBLIC_PLAY_STORE_URL, Mark: GooglePlayMark },
  { key: "appStore", url: publicEnv.NEXT_PUBLIC_APP_STORE_URL, Mark: AppleMark },
];

const TONE_CLASSES: Record<StoreBadgesTone, { badge: string; name: string; status: string }> = {
  theme: { badge: "border-line", name: "text-ink", status: "text-ink-2" },
  band: { badge: "border-band-line", name: "text-on-band", status: "text-on-band-2" },
};

interface StoreBadgesProps {
  tone?: StoreBadgesTone;
  className?: string;
}

/** Variante "store" del botón: contorno, logo de la tienda y "Próximamente" mientras no haya URL. */
export const StoreBadges = ({ tone = "theme", className }: StoreBadgesProps) => {
  const t = useTranslations("download");
  const toneClasses = TONE_CLASSES[tone];

  return (
    <ul aria-label={t("storesLabel")} className={cn("flex flex-wrap gap-3", className)}>
      {STORES.map(({ key, url, Mark }) => {
        const content = (
          <>
            <Mark className={cn("size-5", toneClasses.name)} />
            <span className="flex flex-col leading-tight">
              {!url && (
                <span className={cn("text-[0.8125rem] font-medium", toneClasses.status)}>
                  {t("comingSoon")}
                </span>
              )}
              <span className={cn("text-sm font-bold", toneClasses.name)}>{t(key)}</span>
            </span>
          </>
        );
        const badgeClasses = cn(
          "inline-flex h-11 items-center gap-2.5 rounded-control border-[1.5px] px-4",
          toneClasses.badge,
        );
        return (
          <li key={key}>
            {url ? (
              <a href={url} rel="noopener" className={cn(badgeClasses, "hover:border-link")}>
                {content}
              </a>
            ) : (
              <span className={badgeClasses}>{content}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
};
