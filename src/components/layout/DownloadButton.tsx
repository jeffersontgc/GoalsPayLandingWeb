"use client";

import * as React from "react";
import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, type ButtonProps } from "@/components/ui/button";
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
  const t = useTranslations("nav");
  const text = label ?? t("download");

  function handleClick() {
    if (typeof window !== "undefined" && "plausible" in window) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).plausible?.("apk_download_click");
    }
  }

  return (
    <Button asChild onClick={handleClick} className={cn(className)} {...props}>
      <a href="/api/download" rel="nofollow noopener">
        {showIcon && <Download />}
        {text}
      </a>
    </Button>
  );
}
