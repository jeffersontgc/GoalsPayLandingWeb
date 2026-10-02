import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { locales } from "./src/i18n/config";
import {
  getLegalPublicPath,
  getLegalRewrites,
  getLegalRoutePath,
  LEGAL_DOCUMENT_KEYS,
} from "./src/lib/legal/documents";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const DEFAULT_LOCALE_FOR_OLD_ROUTES = "es";

/** Rutas viejas del sitio (/privacy, /terms con y sin idioma) → las URLs .html nuevas. */
const OLD_LEGAL_ROUTES = [
  { oldSlug: "privacy", documentKey: "privacy" },
  { oldSlug: "terms", documentKey: "terms" },
] as const;

const buildOldLegalRedirects = () =>
  OLD_LEGAL_ROUTES.flatMap(({ oldSlug, documentKey }) => [
    {
      source: `/${oldSlug}`,
      destination: getLegalPublicPath(documentKey, DEFAULT_LOCALE_FOR_OLD_ROUTES),
      permanent: true,
    },
    ...locales.map((locale) => ({
      source: `/${locale}/${oldSlug}`,
      destination: getLegalPublicPath(documentKey, locale),
      permanent: true,
    })),
  ]);

/** La ruta interna (/es/legal/terms) no se publica: quien llegue a ella va a la URL .html. */
const buildInternalLegalRedirects = () =>
  LEGAL_DOCUMENT_KEYS.flatMap((documentKey) =>
    locales.map((locale) => ({
      source: getLegalRoutePath(documentKey, locale),
      destination: getLegalPublicPath(documentKey, locale),
      permanent: true,
    })),
  );

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // landing-web es la raíz del proyecto (así lo construye Vercel), aunque haya otros lockfiles
  // en carpetas superiores.
  outputFileTracingRoot: process.cwd(),
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [...buildOldLegalRedirects(), ...buildInternalLegalRedirects()];
  },
  async rewrites() {
    // Las URLs que enlaza la App (/es/terminos.html…) se sirven desde /[locale]/legal/[document].
    // El middleware de next-intl no las toca: su matcher excluye las rutas con punto.
    return { beforeFiles: getLegalRewrites(), afterFiles: [], fallback: [] };
  },
};

export default withNextIntl(nextConfig);
