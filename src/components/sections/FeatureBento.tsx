"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  CloudDownload,
  Flame,
  Globe2,
  ImageIcon,
  LineChart,
  Shield,
  Smartphone,
  Trophy,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/shared/Section";
import { currencies } from "@/lib/content";
import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

function Card({ className, children }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className={cn(
        "glass group relative overflow-hidden rounded-3xl p-6 transition-all hover:border-white/20",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-[color:var(--color-brand-500)]/10 text-[color:var(--color-brand-300)]">
      {children}
    </div>
  );
}

export function FeatureBento() {
  const t = useTranslations("features");

  return (
    <Section
      id="features"
      eyebrow={t("eyebrow")}
      title={t("title")}
      subtitle={t("subtitle")}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-[auto_auto_auto] md:gap-5">
        {/* Photo goals - hero card 2x2 */}
        <Card className="md:col-span-2 md:row-span-2">
          <div className="flex h-full flex-col justify-between gap-6">
            <div>
              <IconBadge>
                <ImageIcon className="size-5" />
              </IconBadge>
              <h3 className="mt-5 text-xl font-semibold md:text-2xl">
                {t("items.photoGoals.title")}
              </h3>
              <p className="mt-2 text-sm text-[color:var(--color-text-secondary)] md:text-base">
                {t("items.photoGoals.desc")}
              </p>
            </div>
            <PhotoGoalPreview />
          </div>
        </Card>

        {/* Streaks 1x1 */}
        <Card>
          <IconBadge>
            <Flame className="size-5" />
          </IconBadge>
          <h3 className="mt-5 font-semibold">{t("items.streaks.title")}</h3>
          <p className="mt-1 text-sm text-[color:var(--color-text-secondary)]">
            {t("items.streaks.desc")}
          </p>
          <div className="mt-4 flex items-end gap-1">
            {[3, 5, 7, 4, 8, 9, 12].map((h, i) => (
              <div
                key={i}
                className="w-2.5 rounded-full bg-gradient-to-t from-orange-500/40 to-red-400"
                style={{ height: `${h * 4}px` }}
              />
            ))}
          </div>
          <p className="mt-3 font-mono text-2xl font-bold text-[color:var(--color-text-primary)]">
            12 <span className="text-xs font-normal text-[color:var(--color-text-muted)]">días</span>
          </p>
        </Card>

        {/* Achievements 1x1 */}
        <Card>
          <IconBadge>
            <Trophy className="size-5" />
          </IconBadge>
          <h3 className="mt-5 font-semibold">{t("items.achievements.title")}</h3>
          <p className="mt-1 text-sm text-[color:var(--color-text-secondary)]">
            {t("items.achievements.desc")}
          </p>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {[
              "from-blue-500 to-cyan-400",
              "from-pink-500 to-rose-400",
              "from-emerald-500 to-teal-400",
              "from-amber-500 to-orange-400",
              "from-purple-500 to-fuchsia-400",
              "from-orange-500 to-red-400",
              "from-red-500 to-pink-400",
              "from-violet-500 to-indigo-400",
            ].map((g, i) => (
              <div
                key={i}
                className={cn(
                  "aspect-square rounded-lg bg-gradient-to-br opacity-90",
                  g
                )}
              />
            ))}
          </div>
        </Card>

        {/* Projection 2x1 */}
        <Card className="md:col-span-2">
          <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
            <div>
              <IconBadge>
                <LineChart className="size-5" />
              </IconBadge>
              <h3 className="mt-5 font-semibold">{t("items.projection.title")}</h3>
              <p className="mt-1 text-sm text-[color:var(--color-text-secondary)]">
                {t("items.projection.desc")}
              </p>
            </div>
            <ProjectionPreview />
          </div>
        </Card>

        {/* Widget 1x2 */}
        <Card className="md:row-span-2">
          <IconBadge>
            <Smartphone className="size-5" />
          </IconBadge>
          <h3 className="mt-5 font-semibold">{t("items.widget.title")}</h3>
          <p className="mt-1 text-sm text-[color:var(--color-text-secondary)]">
            {t("items.widget.desc")}
          </p>
          <WidgetPreview />
        </Card>

        {/* Privacy 1x1 */}
        <Card>
          <IconBadge>
            <Shield className="size-5" />
          </IconBadge>
          <h3 className="mt-5 font-semibold">{t("items.privacy.title")}</h3>
          <p className="mt-1 text-sm text-[color:var(--color-text-secondary)]">
            {t("items.privacy.desc")}
          </p>
        </Card>

        {/* Currencies 2x1 */}
        <Card className="md:col-span-2">
          <IconBadge>
            <Globe2 className="size-5" />
          </IconBadge>
          <h3 className="mt-5 font-semibold">{t("items.currencies.title")}</h3>
          <p className="mt-1 text-sm text-[color:var(--color-text-secondary)]">
            {t("items.currencies.desc")}
          </p>
          <CurrencyMarquee />
        </Card>
      </div>
    </Section>
  );
}

function PhotoGoalPreview() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center gap-4">
        <div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500/30 to-emerald-400/30">
          <Smartphone className="size-7 text-[color:var(--color-brand-300)]" />
        </div>
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium">iPhone 16 Pro</p>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400"
              style={{ width: "68%" }}
            />
          </div>
          <p className="font-mono text-xs text-[color:var(--color-text-muted)]">
            $820 / $1,200 · 68%
          </p>
        </div>
      </div>
    </div>
  );
}

function ProjectionPreview() {
  const points = [10, 18, 28, 36, 50, 58, 72, 80, 92];
  const w = 200;
  const h = 80;
  const max = 100;
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - (p / max) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div className="flex flex-col justify-end gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <svg viewBox={`0 0 ${w} ${h}`} className="h-20 w-full" aria-hidden>
        <defs>
          <linearGradient id="proj-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3a6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#22d3a6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${path} L${w},${h} L0,${h} Z`} fill="url(#proj-grad)" />
        <path d={path} stroke="#22d3a6" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
      <p className="text-xs text-[color:var(--color-text-muted)]">
        Necesitas <span className="font-mono text-[color:var(--color-accent-400)]">$35/sem</span> por 8 semanas.
      </p>
    </div>
  );
}

function WidgetPreview() {
  return (
    <div className="mt-5 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-4 shadow-inner">
      <div className="grid gap-3">
        <div className="rounded-2xl bg-white/5 p-3">
          <p className="text-[9px] uppercase tracking-wider text-slate-400">
            Meta principal
          </p>
          <p className="mt-1 text-sm font-semibold">iPhone 16 Pro</p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400"
              style={{ width: "68%" }}
            />
          </div>
          <p className="mt-1 font-mono text-[10px] text-slate-300">$820 / $1,200</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-white/5 p-2 text-center">
            <p className="text-[9px] uppercase text-slate-400">Racha</p>
            <p className="font-mono text-base font-bold">12d</p>
          </div>
          <div className="rounded-xl bg-white/5 p-2 text-center">
            <p className="text-[9px] uppercase text-slate-400">Metas</p>
            <p className="font-mono text-base font-bold">3</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CurrencyMarquee() {
  return (
    <div className="mt-4 -mx-2 flex flex-wrap gap-2">
      {currencies.map((c) => (
        <div
          key={c.code}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium"
        >
          <span aria-hidden>{c.flag}</span>
          <span className="font-mono">{c.code}</span>
        </div>
      ))}
    </div>
  );
}
