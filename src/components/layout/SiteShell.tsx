import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import type { Locale } from "@/i18n/config";
import { MAIN_CONTENT_ID } from "@/config/site";
import type { LocaleAlternates } from "@/types/navigation";

interface SiteShellProps {
  locale: Locale;
  alternates: LocaleAlternates;
  children: ReactNode;
}

/** Enlace de salto, cabecera, <main> y pie. Cada página pasa sus URLs en el otro idioma. */
export const SiteShell = ({ locale, alternates, children }: SiteShellProps) => {
  const t = useTranslations("common");
  return (
    <>
      <a
        href={`#${MAIN_CONTENT_ID}`}
        className="sr-only z-50 rounded-control bg-surface px-4 py-3 font-bold text-link focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {t("skipToContent")}
      </a>
      <SiteHeader locale={locale} alternates={alternates} />
      <main id={MAIN_CONTENT_ID} tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <SiteFooter locale={locale} alternates={alternates} />
    </>
  );
};
