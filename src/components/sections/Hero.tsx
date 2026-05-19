"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { DeviceFrame } from "@/components/shared/DeviceFrame";
import { DownloadButton } from "@/components/layout/DownloadButton";
import { Button } from "@/components/ui/button";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  const t = useTranslations("hero");
  const tNav = useTranslations("nav");

  return (
    <section
      id="main"
      className="relative isolate overflow-hidden pt-32 md:pt-40"
    >
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10" />
      <div className="container-page grid items-center gap-16 pb-24 md:grid-cols-[1.05fr_0.95fr] md:gap-12 md:pb-32">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="space-y-7"
        >
          <motion.p
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border-soft)] bg-white/[0.03] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-brand-300)]"
          >
            <span className="size-1.5 rounded-full bg-[color:var(--color-accent-400)]" />
            {t("kicker")}
          </motion.p>
          <motion.h1
            variants={item}
            className="text-balance text-4xl font-bold leading-[1.05] tracking-[-0.03em] md:text-6xl lg:text-7xl"
          >
            {t("title")}
          </motion.h1>
          <motion.p
            variants={item}
            className="max-w-xl text-pretty text-base leading-relaxed text-[color:var(--color-text-secondary)] md:text-lg"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
            <DownloadButton size="xl" />
            <Button variant="secondary" size="xl" asChild>
              <a href="#features" className="inline-flex items-center gap-2">
                {tNav("features")}
                <ArrowRight />
              </a>
            </Button>
          </motion.div>

          <motion.p
            variants={item}
            className="flex items-center gap-2 text-xs text-[color:var(--color-text-muted)]"
          >
            <CheckCircle2 className="size-4 text-[color:var(--color-accent-400)]" />
            {t("ctaPrimaryHint")}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto"
        >
          <DeviceFrame>
            <HeroMockup />
          </DeviceFrame>
          <FloatingCard
            className="absolute -left-4 top-12 md:-left-16"
            delay={0.4}
          >
            <p className="text-[10px] uppercase tracking-wider text-[color:var(--color-text-muted)]">
              Racha
            </p>
            <p className="font-mono text-lg font-semibold">12 días</p>
          </FloatingCard>
          <FloatingCard
            className="absolute -right-4 bottom-16 md:-right-12"
            delay={0.55}
          >
            <p className="text-[10px] uppercase tracking-wider text-[color:var(--color-text-muted)]">
              Ahorrado
            </p>
            <p className="font-mono text-lg font-semibold">
              <span className="text-[color:var(--color-accent-400)]">$</span>1,240
            </p>
          </FloatingCard>
        </motion.div>
      </div>
    </section>
  );
}

function FloatingCard({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`glass rounded-2xl px-4 py-3 shadow-xl ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}

function HeroMockup() {
  return (
    <div className="flex h-full w-full flex-col bg-[#0b1120] p-4 text-[10px] text-slate-100">
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-[8px] uppercase tracking-wider text-slate-400">
            Hola de nuevo
          </p>
          <p className="text-sm font-semibold">Jefferson 👋</p>
        </div>
        <div className="size-8 rounded-full bg-gradient-to-br from-indigo-500 to-emerald-400" />
      </div>

      <div className="mt-5 rounded-2xl bg-white/5 p-3 backdrop-blur">
        <p className="text-[8px] uppercase text-slate-400">Disponible este mes</p>
        <p className="mt-1 font-mono text-xl font-semibold">$2,840</p>
        <div className="mt-2 flex items-center gap-2 text-[9px] text-emerald-400">
          <span>↑ Podrías abonar $200 a tu meta</span>
        </div>
      </div>

      <p className="mt-5 text-[10px] font-semibold uppercase text-slate-300">
        Mis metas
      </p>

      <GoalRow
        title="iPhone 16 Pro"
        current={820}
        target={1200}
        color="from-indigo-500 to-emerald-400"
      />
      <GoalRow
        title="Viaje a CDMX"
        current={420}
        target={900}
        color="from-pink-500 to-amber-400"
      />
      <GoalRow
        title="Fondo emergencia"
        current={1100}
        target={2000}
        color="from-emerald-500 to-cyan-400"
      />
    </div>
  );
}

function GoalRow({
  title,
  current,
  target,
  color,
}: {
  title: string;
  current: number;
  target: number;
  color: string;
}) {
  const pct = Math.round((current / target) * 100);
  return (
    <div className="mt-3 rounded-xl border border-white/5 bg-white/5 p-3">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-medium">{title}</p>
        <p className="font-mono text-[10px] text-slate-300">{pct}%</p>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-1 font-mono text-[9px] text-slate-400">
        ${current} / ${target}
      </p>
    </div>
  );
}
