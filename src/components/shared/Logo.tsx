import * as React from "react";
import { cn } from "@/lib/utils";

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  withText?: boolean;
  size?: number;
}

export function Logo({
  withText = true,
  size = 32,
  className,
  ...props
}: LogoProps) {
  return (
    <div
      className={cn("flex items-center gap-2.5", className)}
      aria-label="GoalsPay"
      {...props}
    >
      <LogoMark size={size} />
      {withText && (
        <span className="text-base font-semibold tracking-tight text-[color:var(--color-text-primary)]">
          GoalsPay
        </span>
      )}
    </div>
  );
}

export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      role="img"
      aria-hidden
      className="shrink-0"
    >
      <defs>
        <linearGradient id="goalspay-bar-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#42a5f5" />
          <stop offset="100%" stopColor="#0d47a1" />
        </linearGradient>
        <linearGradient id="goalspay-bar-highlight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Small bar */}
      <rect
        x="3"
        y="18"
        width="6"
        height="11"
        rx="1.5"
        fill="url(#goalspay-bar-grad)"
      />
      <rect x="3" y="18" width="3" height="11" rx="1.5" fill="url(#goalspay-bar-highlight)" />

      {/* Medium bar */}
      <rect
        x="13"
        y="10"
        width="6"
        height="19"
        rx="1.5"
        fill="url(#goalspay-bar-grad)"
      />
      <rect x="13" y="10" width="3" height="19" rx="1.5" fill="url(#goalspay-bar-highlight)" />

      {/* Tall bar */}
      <rect
        x="23"
        y="3"
        width="6"
        height="26"
        rx="1.5"
        fill="url(#goalspay-bar-grad)"
      />
      <rect x="23" y="3" width="3" height="26" rx="1.5" fill="url(#goalspay-bar-highlight)" />
    </svg>
  );
}
