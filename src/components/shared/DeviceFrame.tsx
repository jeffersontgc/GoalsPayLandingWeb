import * as React from "react";
import { cn } from "@/lib/utils";

interface DeviceFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glow?: boolean;
}

export function DeviceFrame({
  children,
  className,
  glow = true,
  ...props
}: DeviceFrameProps) {
  return (
    <div
      className={cn(
        "relative mx-auto aspect-[9/19] w-[260px] rounded-[42px] border border-white/10 bg-[color:var(--color-bg-surface)] p-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] md:w-[300px]",
        className
      )}
      {...props}
    >
      {glow && (
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-4 -z-10 rounded-[60px] bg-[radial-gradient(closest-side,rgba(99,102,241,0.35),transparent)] blur-2xl"
        />
      )}
      <span
        aria-hidden
        className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black/70"
      />
      <div className="relative h-full w-full overflow-hidden rounded-[34px] bg-[color:var(--color-bg-surface-alt)]">
        {children}
      </div>
    </div>
  );
}
