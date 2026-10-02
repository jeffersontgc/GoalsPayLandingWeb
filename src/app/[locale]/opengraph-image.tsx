import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { OgPulse } from "@/components/seo/OgPulse";
import { BRAND_COLORS, WORDMARK_TEXT } from "@/config/site";
import { defaultLocale, isLocale, locales } from "@/i18n/config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "GoalsPay";

/** Una imagen por idioma, generada en el build. */
export const generateStaticParams = () => locales.map((locale) => ({ locale }));

/** TTF locales (OFL / Apache): Satori no lee woff2 y así el build no depende de la red. */
const FONT_DIR = path.join(process.cwd(), "src", "assets", "og-fonts");

const loadFont = (fileName: string): Promise<Buffer> => readFile(path.join(FONT_DIR, fileName));

const LOGO_PULSE_SIZE = 56;
const WATERMARK_PULSE_SIZE = 560;
const WATERMARK_OPACITY = 0.14;

interface OpenGraphImageProps {
  params: Promise<{ locale: string }>;
}

/** Imagen para compartir: fondo marino, logotipo, el mensaje del hero y el pulso de fondo. */
const OpenGraphImage = async ({ params }: OpenGraphImageProps) => {
  const { locale: requestedLocale } = await params;
  const locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;
  const t = await getTranslations({ locale, namespace: "meta" });
  const [syncopate, sora, dmSans] = await Promise.all([
    loadFont("Syncopate_700Bold.ttf"),
    loadFont("Sora_700Bold.ttf"),
    loadFont("DMSans_400Regular.ttf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: BRAND_COLORS.navy,
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", right: -60, bottom: -170, display: "flex", opacity: WATERMARK_OPACITY }}>
          <OgPulse size={WATERMARK_PULSE_SIZE} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ fontFamily: "Syncopate", fontSize: 44, color: BRAND_COLORS.white, letterSpacing: -0.7 }}>
            {WORDMARK_TEXT}
          </div>
          <OgPulse size={LOGO_PULSE_SIZE} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 920 }}>
          <div style={{ fontFamily: "Sora", fontSize: 68, lineHeight: 1.08, color: BRAND_COLORS.white, letterSpacing: -1.4 }}>
            {t("ogImageTitle")}
          </div>
          <div style={{ fontFamily: "DM Sans", fontSize: 32, lineHeight: 1.4, color: BRAND_COLORS.onNavySecondary }}>
            {t("ogImageSubtitle")}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Syncopate", data: syncopate, weight: 700, style: "normal" },
        { name: "Sora", data: sora, weight: 700, style: "normal" },
        { name: "DM Sans", data: dmSans, weight: 400, style: "normal" },
      ],
    },
  );
};

export default OpenGraphImage;
