import { ArrowRight, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { Chapter } from "@/components/shared/Chapter";
import { ICON_STROKE_WIDTH } from "@/config/site";
import { SECTION_IDS, TRUST_KEYS } from "@/data/navigation";
import type { Locale } from "@/i18n/config";
import { getLegalPublicPath } from "@/lib/legal/documents";

interface TrustChapterProps {
  locale: Locale;
}

/** 05 · Confianza: banda marino con hechos que se pueden comprobar en la Política de Privacidad. */
export const TrustChapter = ({ locale }: TrustChapterProps) => {
  const t = useTranslations("trust");
  const links = [
    { href: getLegalPublicPath("privacy", locale), label: t("policyLink") },
    { href: getLegalPublicPath("deleteAccount", locale), label: t("deleteLink") },
  ];

  return (
    <Chapter id={SECTION_IDS.trust} variant="ink" eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")}>
      <ul className="grid gap-x-12 gap-y-8 md:grid-cols-2">
        {TRUST_KEYS.map((itemKey) => (
          <li key={itemKey} className="flex gap-4 border-t border-band-line pt-6">
            <ShieldCheck
              className="mt-0.5 size-6 shrink-0 text-on-band-accent"
              strokeWidth={ICON_STROKE_WIDTH}
              aria-hidden="true"
            />
            <div className="flex flex-col gap-1.5">
              <h3 className="type-tile text-on-band">{t(`items.${itemKey}.title`)}</h3>
              <p className="type-body text-on-band-2">{t(`items.${itemKey}.body`)}</p>
            </div>
          </li>
        ))}
      </ul>
      <ul className="mt-12 flex flex-col gap-3 sm:flex-row sm:gap-8">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="inline-flex min-h-11 items-center gap-2 font-bold text-on-band-accent underline underline-offset-4 hover:no-underline"
            >
              {link.label}
              <ArrowRight className="size-5" strokeWidth={ICON_STROKE_WIDTH} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </Chapter>
  );
};
