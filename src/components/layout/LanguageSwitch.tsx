import { locales, localeLabels, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";
import type { LocaleAlternates } from "@/types/navigation";

interface LanguageSwitchProps {
  currentLocale: Locale;
  alternates: LocaleAlternates;
  label: string;
}

/**
 * Enlaces normales a la misma página en el otro idioma (en las legales, al documento
 * traducido). Al entrar por /es o /en, el middleware guarda la elección en NEXT_LOCALE.
 */
export const LanguageSwitch = ({ currentLocale, alternates, label }: LanguageSwitchProps) => (
  <nav aria-label={label}>
    <ul className="inline-flex items-center gap-1 rounded-pill border border-line p-1">
      {locales.map((locale) => {
        const isCurrent = locale === currentLocale;
        return (
          <li key={locale}>
            <a
              href={alternates[locale]}
              hrefLang={locale}
              lang={locale}
              aria-current={isCurrent ? "page" : undefined}
              aria-label={localeLabels[locale]}
              className={cn(
                "inline-flex h-9 min-w-11 items-center justify-center rounded-pill px-3 text-sm font-bold uppercase transition-colors",
                isCurrent
                  ? "bg-tag-blue text-tag-blue-ink"
                  : "text-ink-2 hover:bg-surface-muted hover:text-ink",
              )}
            >
              {locale}
            </a>
          </li>
        );
      })}
    </ul>
  </nav>
);
