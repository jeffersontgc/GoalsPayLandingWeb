import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MockSummaryCardProps {
  label: string;
  amount: string;
  caption?: string;
  children?: ReactNode;
  className?: string;
}

/**
 * La tarjeta oscura de la App ("Ahorro total", "Balance disponible"): marino en claro y un
 * escalón por encima del fondo en oscuro. El acento de texto es --gp-on-inverse-accent para pasar AA.
 */
export const MockSummaryCard = ({
  label,
  amount,
  caption,
  children,
  className,
}: MockSummaryCardProps) => (
  <div className={cn("flex flex-col gap-1.5 rounded-card bg-inverse p-4", className)}>
    <p className="mock-meta text-on-inverse-2">{label}</p>
    <p className="mock-amount-summary text-on-inverse">{amount}</p>
    {caption && <p className="mock-meta font-bold text-on-inverse-accent">{caption}</p>}
    {children}
  </div>
);
