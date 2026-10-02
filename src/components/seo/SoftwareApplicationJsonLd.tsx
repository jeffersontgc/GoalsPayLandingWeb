import { BRAND_NAME, CONTROLLER } from "@/config/site";
import type { Locale } from "@/i18n/config";

/** `<` escapado: el JSON va dentro de un <script> y no puede cerrar la etiqueta. */
const escapeJsonForScript = (json: string): string => json.replace(/</g, "\\u003c");

interface SoftwareApplicationJsonLdProps {
  locale: Locale;
  url: string;
  description: string;
}

/** Datos estructurados: app gratuita, sin valoraciones ni reseñas (no las hay). */
export const SoftwareApplicationJsonLd = ({ locale, url, description }: SoftwareApplicationJsonLdProps) => {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: BRAND_NAME,
    description,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Android",
    inLanguage: locale,
    url,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: { "@type": "Person", name: CONTROLLER.name },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: escapeJsonForScript(JSON.stringify(data)) }}
    />
  );
};
