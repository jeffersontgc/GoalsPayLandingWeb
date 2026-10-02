import { useTranslations } from "next-intl";
import { Logo } from "@/components/brand/Logo";
import { LanguageSwitch } from "@/components/layout/LanguageSwitch";
import { CONTROLLER } from "@/config/site";
import { NAV_SECTIONS, SECTION_IDS } from "@/data/navigation";
import type { Locale } from "@/i18n/config";
import { getLegalPublicPath, LEGAL_DOCUMENT_KEYS } from "@/lib/legal/documents";
import type { LocaleAlternates, NavLink } from "@/types/navigation";

const FOOTER_WORDMARK_SIZE = 18;

interface FooterGroupProps {
  title: string;
  links: NavLink[];
}

const FooterGroup = ({ title, links }: FooterGroupProps) => (
  <div className="flex flex-col gap-3">
    <h2 className="type-eyebrow text-ink-3">{title}</h2>
    <ul className="flex flex-col gap-1">
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            className="inline-flex min-h-11 items-center text-[0.9375rem] text-ink-2 transition-colors hover:text-ink md:min-h-9"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

interface SiteFooterProps {
  locale: Locale;
  alternates: LocaleAlternates;
}

export const SiteFooter = ({ locale, alternates }: SiteFooterProps) => {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tLegal = useTranslations("legal.labels");
  const year = new Date().getFullYear();

  const productLinks: NavLink[] = NAV_SECTIONS.map((section) => ({
    href: `/${locale}#${SECTION_IDS[section]}`,
    label: tNav(section),
  }));
  const legalLinks: NavLink[] = LEGAL_DOCUMENT_KEYS.map((documentKey) => ({
    href: getLegalPublicPath(documentKey, locale),
    label: tLegal(documentKey),
  }));

  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col items-start gap-4">
          <Logo wordmarkSize={FOOTER_WORDMARK_SIZE} />
          <p className="max-w-xs text-[0.9375rem] text-ink-2">{t("tagline")}</p>
          <LanguageSwitch currentLocale={locale} alternates={alternates} label={tNav("language")} />
        </div>
        <FooterGroup title={t("productGroup")} links={productLinks} />
        <FooterGroup title={t("legalGroup")} links={legalLinks} />
      </div>
      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 text-sm text-ink-3 md:flex-row md:items-center md:justify-between">
          <p>
            <span className="font-bold text-ink-2">{t("controller")}:</span> {CONTROLLER.name} ·{" "}
            {CONTROLLER.location} ·{" "}
            <a href={`mailto:${CONTROLLER.email}`} className="text-link underline">
              {CONTROLLER.email}
            </a>
          </p>
          <p>{t("copyright", { year })}</p>
        </div>
      </div>
    </footer>
  );
};
