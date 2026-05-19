import { useTranslations } from "next-intl";
import { Github, Instagram, Twitter } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Logo } from "@/components/shared/Logo";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[color:var(--color-border-soft)] bg-[color:var(--color-bg-surface)]/40">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-8">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm text-[color:var(--color-text-secondary)]">
            {t("tagline")}
          </p>
          <LanguageSwitcher />
        </div>

        <FooterGroup
          title={t("groups.product")}
          links={[
            { href: "#features", label: t("links.features") },
            { href: "#modes", label: t("links.modes") },
            { href: "#faq", label: t("links.faq") },
            { href: "#download", label: t("links.download") },
          ]}
        />
        <FooterGroup
          title={t("groups.legal")}
          links={[
            { href: "/privacy", label: t("links.privacy"), internal: true },
            { href: "/terms", label: t("links.terms"), internal: true },
          ]}
        />
        <div className="space-y-4">
          <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--color-text-muted)]">
            {t("groups.follow")}
          </h3>
          <div className="flex gap-3">
            <SocialIcon href="https://twitter.com/" label="Twitter / X">
              <Twitter className="size-4" />
            </SocialIcon>
            <SocialIcon href="https://instagram.com/" label="Instagram">
              <Instagram className="size-4" />
            </SocialIcon>
            <SocialIcon href="https://github.com/" label="GitHub">
              <Github className="size-4" />
            </SocialIcon>
          </div>
        </div>
      </div>

      <div className="border-t border-[color:var(--color-border-soft)]">
        <div className="container-page py-6 text-center text-xs text-[color:var(--color-text-muted)]">
          {t("madeIn", { year })}
        </div>
      </div>
    </footer>
  );
}

function FooterGroup({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string; internal?: boolean }[];
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--color-text-muted)]">
        {title}
      </h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            {link.internal ? (
              <Link
                href={link.href}
                className="text-sm text-[color:var(--color-text-secondary)] transition hover:text-[color:var(--color-text-primary)]"
              >
                {link.label}
              </Link>
            ) : (
              <a
                href={link.href}
                className="text-sm text-[color:var(--color-text-secondary)] transition hover:text-[color:var(--color-text-primary)]"
              >
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="grid size-10 place-items-center rounded-full border border-[color:var(--color-border-soft)] bg-white/[0.03] text-[color:var(--color-text-secondary)] transition hover:border-white/20 hover:text-[color:var(--color-text-primary)]"
    >
      {children}
    </a>
  );
}
