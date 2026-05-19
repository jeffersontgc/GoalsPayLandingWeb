"use client";

import * as React from "react";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { DownloadButton } from "@/components/layout/DownloadButton";
import { cn } from "@/lib/utils";

const sections = [
  { href: "#features", key: "features" },
  { href: "#modes", key: "modes" },
  { href: "#privacy", key: "privacy" },
  { href: "#faq", key: "faq" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-[color:var(--color-border-soft)] bg-[color:var(--color-bg-base)]/80 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-full focus:bg-[color:var(--color-bg-surface)] focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <Link href="/" aria-label="GoalsPay">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {sections.map((s) => (
            <a
              key={s.key}
              href={s.href}
              className="rounded-full px-3 py-2 text-sm text-[color:var(--color-text-secondary)] transition hover:text-[color:var(--color-text-primary)]"
            >
              {t(s.key)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher compact />
          <ThemeToggle />
          <DownloadButton size="sm" />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label={t("openMenu")}>
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent closeLabel={t("closeMenu")}>
              <Logo />
              <nav className="mt-2 flex flex-col gap-1">
                {sections.map((s) => (
                  <a
                    key={s.key}
                    href={s.href}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl px-4 py-3 text-base text-[color:var(--color-text-secondary)] transition hover:bg-white/5 hover:text-[color:var(--color-text-primary)]"
                  >
                    {t(s.key)}
                  </a>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-4">
                <LanguageSwitcher />
                <DownloadButton size="lg" className="w-full" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
