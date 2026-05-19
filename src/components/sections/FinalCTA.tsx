"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Section } from "@/components/shared/Section";
import { DownloadButton } from "@/components/layout/DownloadButton";

export function FinalCTA() {
  const t = useTranslations("finalCta");

  return (
    <Section id="download">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="glass relative mx-auto max-w-4xl overflow-hidden rounded-[40px] p-10 text-center md:p-16"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_30%,rgba(99,102,241,0.25),transparent)]"
        />
        <div className="relative space-y-6">
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-5xl">
            <span className="text-gradient">{t("title")}</span>
          </h2>
          <p className="mx-auto max-w-xl text-[color:var(--color-text-secondary)] md:text-lg">
            {t("subtitle")}
          </p>
          <div className="flex flex-col items-center gap-3">
            <DownloadButton size="xl" label={t("cta")} />
            <p className="text-xs text-[color:var(--color-text-muted)]">{t("hint")}</p>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
