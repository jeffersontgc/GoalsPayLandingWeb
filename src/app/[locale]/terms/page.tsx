import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.terms" });
  return { title: t("title") };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal.terms" });

  return (
    <article className="container-page section">
      <div className="mx-auto max-w-2xl space-y-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-brand-300)]">
          {t("updated")}
        </p>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {t("title")}
        </h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-pretty text-[color:var(--color-text-secondary)] md:text-lg leading-relaxed">
            {t("body")}
          </p>
        </div>
      </div>
    </article>
  );
}
