import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { FeatureBento } from "@/components/sections/FeatureBento";
import { ModesShowcase } from "@/components/sections/ModesShowcase";
import { Achievements } from "@/components/sections/Achievements";
import { Privacy } from "@/components/sections/Privacy";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { publicEnv } from "@/lib/env";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <TrustStrip />
      <FeatureBento />
      <ModesShowcase />
      <Achievements />
      <Privacy />
      <FAQ />
      <FinalCTA />
      <SoftwareApplicationJsonLd locale={locale} />
    </>
  );
}

function SoftwareApplicationJsonLd({ locale }: { locale: string }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "GoalsPay",
    description:
      locale === "es"
        ? "App de ahorro con metas, rachas y logros. 100% privada."
        : "Savings app with goals, streaks and achievements. 100% private.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Android, iOS",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    inLanguage: locale,
    url: `${publicEnv.NEXT_PUBLIC_SITE_URL}/${locale}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
