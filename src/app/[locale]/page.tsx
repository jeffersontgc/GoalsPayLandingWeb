import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteShell } from "@/components/layout/SiteShell";
import { BalanceChapter } from "@/components/sections/BalanceChapter";
import { FaqChapter } from "@/components/sections/FaqChapter";
import { FeaturesChapter } from "@/components/sections/FeaturesChapter";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { Hero } from "@/components/sections/Hero";
import { ModesChapter } from "@/components/sections/ModesChapter";
import { ProblemChapter } from "@/components/sections/ProblemChapter";
import { TrustChapter } from "@/components/sections/TrustChapter";
import { SoftwareApplicationJsonLd } from "@/components/seo/SoftwareApplicationJsonLd";
import { BRAND_NAME } from "@/config/site";
import { isLocale, openGraphLocales } from "@/i18n/config";
import { getAbsoluteUrl, getHomeAlternates, getHomePath, getLanguageAlternates } from "@/utils/seo";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export const generateMetadata = async ({ params }: HomePageProps): Promise<Metadata> => {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  const url = getAbsoluteUrl(getHomePath(locale));

  return {
    title: { absolute: t("title") },
    description: t("description"),
    alternates: { canonical: url, languages: getLanguageAlternates(getHomeAlternates()) },
    openGraph: {
      type: "website",
      url,
      siteName: BRAND_NAME,
      locale: openGraphLocales[locale],
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
    twitter: { card: "summary_large_image", title: t("ogTitle"), description: t("ogDescription") },
  };
};

/**
 * La historia de MASTER.md §3: hero, cinco capítulos (problema, balance, modos, bento,
 * confianza), preguntas y cierre. Bandas marino: hero, confianza y cierre, nunca seguidas.
 */
const HomePage = async ({ params }: HomePageProps) => {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "meta" });

  return (
    <SiteShell locale={locale} alternates={getHomeAlternates()}>
      <Hero />
      <ProblemChapter />
      <BalanceChapter />
      <ModesChapter />
      <FeaturesChapter />
      <TrustChapter locale={locale} />
      <FaqChapter locale={locale} />
      <ClosingCta />
      <SoftwareApplicationJsonLd
        locale={locale}
        url={getAbsoluteUrl(getHomePath(locale))}
        description={t("jsonLdDescription")}
      />
    </SiteShell>
  );
};

export default HomePage;
