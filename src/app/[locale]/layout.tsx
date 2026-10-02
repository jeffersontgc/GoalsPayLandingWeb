import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { DM_Sans, Sora, Syncopate } from "next/font/google";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "@/app/providers";
import { BRAND_COLORS, BRAND_NAME } from "@/config/site";
import { isLocale, locales } from "@/i18n/config";
import { publicEnv } from "@/lib/env";
import "@/styles/globals.css";

// next/font descarga las fuentes en el build y las sirve desde el propio sitio:
// el navegador del visitante no pide nada a Google.
const syncopate = Syncopate({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-syncopate",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: BRAND_COLORS.canvasLight },
    { media: "(prefers-color-scheme: dark)", color: BRAND_COLORS.navyDeep },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(publicEnv.NEXT_PUBLIC_SITE_URL),
  applicationName: BRAND_NAME,
  title: { default: BRAND_NAME, template: `%s · ${BRAND_NAME}` },
  referrer: "strict-origin-when-cross-origin",
  formatDetection: { email: false, telephone: false, address: false },
};

export const dynamicParams = false;

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${syncopate.variable} ${sora.variable} ${dmSans.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default LocaleLayout;
