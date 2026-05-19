"use client";

import * as React from "react";
import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, type ButtonProps } from "@/components/ui/button";
import { publicEnv } from "@/lib/env";
import { cn } from "@/lib/utils";

interface DownloadButtonProps extends Omit<ButtonProps, "children"> {
  label?: string;
  showIcon?: boolean;
}

export function DownloadButton({
  label,
  showIcon = true,
  className,
  ...props
}: DownloadButtonProps) {
  const t = useTranslations();
  const [toastOpen, setToastOpen] = React.useState(false);

  const hasUrl = Boolean(publicEnv.NEXT_PUBLIC_APK_URL);
  const text = label ?? t("nav.download");

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (typeof window !== "undefined" && "plausible" in window) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).plausible?.("apk_download_click");
    }
    if (!hasUrl) {
      event.preventDefault();
      setToastOpen(true);
      window.setTimeout(() => setToastOpen(false), 4500);
    }
  }

  return (
    <>
      <Button
        asChild={hasUrl}
        onClick={handleClick}
        className={cn(className)}
        {...props}
      >
        {hasUrl ? (
          <a href="/api/download" rel="nofollow noopener">
            {showIcon && <Download />}
            {text}
          </a>
        ) : (
          <span className="inline-flex items-center gap-2">
            {showIcon && <Download />}
            {text}
          </span>
        )}
      </Button>

      <div
        role="status"
        aria-live="polite"
        className={cn(
          "pointer-events-none fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-2xl border border-white/10 bg-[color:var(--color-bg-surface)]/95 px-5 py-3 text-sm shadow-2xl backdrop-blur transition-all duration-300",
          toastOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        )}
      >
        <p className="font-semibold">{t("downloadToast.missingTitle")}</p>
        <p className="text-[color:var(--color-text-secondary)]">
          {t("downloadToast.missingBody")}
        </p>
      </div>
    </>
  );
}
