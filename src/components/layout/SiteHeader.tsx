import { useTranslations } from "next-intl";
import { Logo } from "@/components/brand/Logo";
import { DownloadButton } from "@/components/layout/DownloadButton";
import { LanguageSwitch } from "@/components/layout/LanguageSwitch";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { StickyHeader } from "@/components/layout/StickyHeader";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { NAV_SECTIONS, SECTION_IDS } from "@/data/navigation";
import type { Locale } from "@/i18n/config";
import type { LocaleAlternates, NavLink } from "@/types/navigation";

/** 16 px de cuerpo da un logotipo de ~126 px: por encima del mínimo de 96. */
const HEADER_WORDMARK_SIZE = 16;

interface SiteHeaderProps {
  locale: Locale;
  alternates: LocaleAlternates;
}

export const SiteHeader = ({ locale, alternates }: SiteHeaderProps) => {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const links: NavLink[] = NAV_SECTIONS.map((section) => ({
    href: `/${locale}#${SECTION_IDS[section]}`,
    label: t(section),
  }));

  return (
    <StickyHeader>
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-[72px]">
        <a href={`/${locale}`} aria-label={tCommon("homeLabel")} className="inline-flex min-h-11 items-center">
          <Logo wordmarkSize={HEADER_WORDMARK_SIZE} />
        </a>

        <nav aria-label={t("label")} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-11 items-center rounded-control px-3 text-[0.9375rem] font-medium text-ink-2 transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <LanguageSwitch currentLocale={locale} alternates={alternates} label={t("language")} />
          </div>
          <ThemeToggle label={t("toggleTheme")} />
          <DownloadButton variant="secondary" size="sm" labelKey="headerCta" className="hidden sm:inline-flex" />
          <div className="lg:hidden">
            <MobileMenu
              links={links}
              openLabel={t("openMenu")}
              closeLabel={t("closeMenu")}
              title={t("menuTitle")}
            >
              <LanguageSwitch currentLocale={locale} alternates={alternates} label={t("language")} />
              <DownloadButton className="w-full" />
            </MobileMenu>
          </div>
        </div>
      </div>
    </StickyHeader>
  );
};
