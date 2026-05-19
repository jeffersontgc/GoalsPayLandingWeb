"use client";

import { motion } from "framer-motion";
import { Check, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Section } from "@/components/shared/Section";

export function Privacy() {
  const t = useTranslations("privacy");
  const bullets = t.raw("bullets") as string[];

  return (
    <Section
      id="privacy"
      eyebrow={t("eyebrow")}
      title={t("title")}
      subtitle={t("subtitle")}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="glass relative mx-auto max-w-3xl overflow-hidden rounded-[36px] p-8 md:p-12"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-[color:var(--color-accent-500)]/15 blur-3xl"
        />
        <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
          <div className="grid size-24 shrink-0 place-items-center rounded-3xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 text-[color:var(--color-accent-400)]">
            <ShieldCheck className="size-12" />
          </div>
          <ul className="flex-1 space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <Check
                  className="mt-1 size-5 shrink-0 text-[color:var(--color-accent-400)]"
                  aria-hidden
                />
                <span className="text-base text-[color:var(--color-text-secondary)] md:text-lg">
                  {b}
                </span>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/privacy"
                className="inline-flex items-center gap-1 text-sm font-medium text-[color:var(--color-brand-300)] hover:underline"
              >
                {t("cta")} →
              </Link>
            </li>
          </ul>
        </div>
      </motion.div>
    </Section>
  );
}
