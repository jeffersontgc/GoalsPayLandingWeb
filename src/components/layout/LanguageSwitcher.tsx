"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Languages } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/routing";
import { locales, localeLabels, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const current = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("nav");

  function setLocale(next: Locale) {
    if (next === current) return;
    router.replace(pathname, { locale: next });
  }

  if (compact) {
    return (
      <div
        role="group"
        aria-label={t("toggleLang")}
        className="inline-flex items-center gap-1 rounded-full border border-[color:var(--color-border-soft)] bg-white/[0.03] p-1"
      >
        {locales.map((loc) => (
          <button
            key={loc}
            type="button"
            aria-pressed={loc === current}
            onClick={() => setLocale(loc)}
            className={cn(
              "h-7 rounded-full px-2.5 text-xs font-medium uppercase tracking-wide transition",
              loc === current
                ? "bg-white/10 text-[color:var(--color-text-primary)]"
                : "text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-primary)]"
            )}
          >
            {loc}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2">
      <Languages className="size-4 text-[color:var(--color-text-muted)]" aria-hidden />
      <div
        role="group"
        aria-label={t("toggleLang")}
        className="inline-flex items-center gap-1 rounded-full border border-[color:var(--color-border-soft)] bg-white/[0.03] p-1"
      >
        {locales.map((loc) => (
          <button
            key={loc}
            type="button"
            aria-pressed={loc === current}
            onClick={() => setLocale(loc)}
            className={cn(
              "h-7 rounded-full px-3 text-xs font-medium transition",
              loc === current
                ? "bg-white/10 text-[color:var(--color-text-primary)]"
                : "text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-primary)]"
            )}
          >
            {localeLabels[loc]}
          </button>
        ))}
      </div>
    </div>
  );
}
