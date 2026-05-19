"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/shared/Section";
import { achievements } from "@/lib/content";

export function Achievements() {
  const t = useTranslations("achievements");
  const streak = 12;

  return (
    <Section eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")}>
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-[40px] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(99,102,241,0.18),transparent_70%)]"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="glass mx-auto mb-12 flex max-w-md items-center gap-5 rounded-3xl p-6"
        >
          <div className="grid size-14 place-items-center rounded-2xl bg-orange-500/20">
            <Flame className="size-7 text-orange-400" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-text-muted)]">
              {t("streakLabel")}
            </p>
            <p className="font-mono text-3xl font-bold">
              {t("streakDays", { count: streak })}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {achievements.map((a, idx) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -3 }}
                className="glass flex flex-col items-center gap-3 rounded-2xl p-4 text-center"
              >
                <div
                  className="grid size-12 place-items-center rounded-xl"
                  style={{ background: `${a.color}1f`, color: a.color }}
                >
                  <Icon className="size-6" />
                </div>
                <p className="text-xs font-medium text-[color:var(--color-text-primary)]">
                  {t(`list.${a.id}`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
