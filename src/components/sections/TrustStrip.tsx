"use client";

import { motion } from "framer-motion";
import { Shield, Gift, UserX, Globe2, CloudDownload } from "lucide-react";
import { useTranslations } from "next-intl";

const items = [
  { key: "private", Icon: Shield },
  { key: "free", Icon: Gift },
  { key: "noLogin", Icon: UserX },
  { key: "currencies", Icon: Globe2 },
  { key: "backup", Icon: CloudDownload },
] as const;

export function TrustStrip() {
  const t = useTranslations("trust");

  return (
    <section
      aria-label="Trust signals"
      className="border-y border-[color:var(--color-border-soft)] bg-white/[0.02] py-6"
    >
      <div className="container-page">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:gap-x-10">
          {items.map(({ key, Icon }, i) => (
            <motion.li
              key={key}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.4,
                delay: i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-flex items-center gap-2 text-xs text-[color:var(--color-text-secondary)] md:text-sm"
            >
              <Icon className="size-4 text-[color:var(--color-accent-400)]" aria-hidden />
              {t(key)}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
