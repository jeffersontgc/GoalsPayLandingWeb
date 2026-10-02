import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { APK_DOWNLOAD_PATH, ICON_STROKE_WIDTH } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DownloadButtonProps {
  /** El primario va una sola vez por vista; la cabecera usa el secundario. */
  variant?: "primary" | "secondary";
  size?: "md" | "sm";
  /** "headerCta" es la versión corta ("Descargar") para la cabecera. */
  labelKey?: "apk" | "headerCta";
  className?: string;
}

/** Enlace al APK: /api/download redirige a APK_URL. */
export const DownloadButton = ({
  variant = "primary",
  size = "md",
  labelKey = "apk",
  className,
}: DownloadButtonProps) => {
  const t = useTranslations("download");
  return (
    <a href={APK_DOWNLOAD_PATH} rel="nofollow" className={cn(buttonVariants({ variant, size }), className)}>
      <Download strokeWidth={ICON_STROKE_WIDTH} aria-hidden="true" />
      {t(labelKey)}
    </a>
  );
};
