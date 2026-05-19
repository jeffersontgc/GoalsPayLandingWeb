import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
}

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section id={id} className={cn("section", className)} {...props}>
      <div className="container-page">
        {(eyebrow || title || subtitle) && (
          <header
            className={cn(
              "mx-auto mb-12 max-w-3xl space-y-4 md:mb-16",
              align === "center" ? "text-center" : "text-left"
            )}
          >
            {eyebrow && (
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--color-brand-300)]">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-balance text-3xl font-bold tracking-tight md:text-5xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-pretty text-base text-[color:var(--color-text-secondary)] md:text-lg">
                {subtitle}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
