"use client";

import { motion } from "framer-motion";
import { Check, Target, Wallet } from "lucide-react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/shared/Section";
import { DeviceFrame } from "@/components/shared/DeviceFrame";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ModesShowcase() {
  const t = useTranslations("modes");

  const renderPanel = (mode: "goals" | "finance") => {
    const bullets = t.raw(`${mode}.bullets`) as string[];

    return (
      <motion.div
        key={mode}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="grid items-center gap-12 md:grid-cols-[1fr_1fr] md:gap-16"
      >
        <div className="space-y-5">
          <h3 className="text-2xl font-bold md:text-3xl">{t(`${mode}.title`)}</h3>
          <p className="text-[color:var(--color-text-secondary)] md:text-lg">
            {t(`${mode}.desc`)}
          </p>
          <ul className="space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm md:text-base">
                <Check
                  className="mt-1 size-4 shrink-0 text-[color:var(--color-accent-400)]"
                  aria-hidden
                />
                <span className="text-[color:var(--color-text-secondary)]">{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <DeviceFrame>
          {mode === "goals" ? <GoalsScreen /> : <FinanceScreen />}
        </DeviceFrame>
      </motion.div>
    );
  };

  return (
    <Section
      id="modes"
      eyebrow={t("eyebrow")}
      title={t("title")}
      subtitle={t("subtitle")}
    >
      <Tabs defaultValue="goals" className="space-y-12">
        <div className="flex justify-center">
          <TabsList>
            <TabsTrigger value="goals">
              <Target className="size-4" />
              {t("goals.tab")}
            </TabsTrigger>
            <TabsTrigger value="finance">
              <Wallet className="size-4" />
              {t("finance.tab")}
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="goals">{renderPanel("goals")}</TabsContent>
        <TabsContent value="finance">{renderPanel("finance")}</TabsContent>
      </Tabs>
    </Section>
  );
}

function GoalsScreen() {
  return (
    <div className="flex h-full w-full flex-col gap-3 bg-[#0b1120] p-4 text-[10px] text-slate-100">
      <p className="mt-4 text-sm font-semibold">Mis Metas</p>
      <p className="text-[9px] text-slate-400">3 en progreso</p>
      <div className="mt-2 flex gap-1 rounded-full bg-white/5 p-1 text-[9px]">
        {["Todas", "Pendientes", "En Progreso", "Finalizadas"].map((tab, i) => (
          <div
            key={tab}
            className={`flex-1 rounded-full px-1 py-1 text-center ${
              i === 0 ? "bg-white/10 font-medium" : "text-slate-400"
            }`}
          >
            {tab}
          </div>
        ))}
      </div>
      {[
        { name: "iPhone 16 Pro", current: 820, target: 1200, color: "from-indigo-500 to-emerald-400" },
        { name: "Viaje CDMX", current: 420, target: 900, color: "from-pink-500 to-amber-400" },
        { name: "Fondo emergencia", current: 1100, target: 2000, color: "from-emerald-500 to-cyan-400" },
        { name: "Cámara Sony", current: 200, target: 1400, color: "from-purple-500 to-fuchsia-400" },
      ].map((g) => (
        <div
          key={g.name}
          className="rounded-xl border border-white/5 bg-white/5 p-2.5"
        >
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium">{g.name}</p>
            <p className="font-mono text-[10px] text-slate-300">
              {Math.round((g.current / g.target) * 100)}%
            </p>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${g.color}`}
              style={{ width: `${(g.current / g.target) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function FinanceScreen() {
  return (
    <div className="flex h-full w-full flex-col gap-3 bg-[#0b1120] p-4 text-[10px] text-slate-100">
      <p className="mt-4 text-sm font-semibold">Finanzas</p>
      <p className="text-[9px] text-slate-400">Mayo 2026</p>

      <div className="rounded-2xl bg-gradient-to-br from-indigo-500/15 to-emerald-400/15 p-3">
        <p className="text-[9px] uppercase tracking-wider text-slate-400">
          Disponible
        </p>
        <p className="mt-1 font-mono text-2xl font-bold text-emerald-300">
          $1,840
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-white/5 bg-white/5 p-2.5">
          <p className="text-[9px] uppercase text-emerald-400">Ingresos</p>
          <p className="font-mono text-sm font-bold">$3,200</p>
        </div>
        <div className="rounded-xl border border-white/5 bg-white/5 p-2.5">
          <p className="text-[9px] uppercase text-rose-400">Gastos</p>
          <p className="font-mono text-sm font-bold">$1,360</p>
        </div>
      </div>

      <p className="mt-1 text-[10px] font-semibold uppercase text-slate-300">
        Gastos fijos
      </p>
      {[
        { name: "Renta", amount: 600, day: 1, paid: true },
        { name: "Netflix", amount: 12, day: 5, paid: true },
        { name: "Internet", amount: 45, day: 10, paid: false },
        { name: "Gimnasio", amount: 30, day: 15, paid: false },
      ].map((e) => (
        <div
          key={e.name}
          className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-2.5"
        >
          <div>
            <p className="text-[11px] font-medium">{e.name}</p>
            <p className="text-[9px] text-slate-400">Día {e.day}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-mono text-[11px]">${e.amount}</p>
            <span
              className={`size-2 rounded-full ${
                e.paid ? "bg-emerald-400" : "bg-amber-400"
              }`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
