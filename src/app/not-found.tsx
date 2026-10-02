import { Logo } from "@/components/brand/Logo";
import { buttonVariants } from "@/components/ui/button";
import { defaultLocale } from "@/i18n/config";
import "@/styles/globals.css";

const NOT_FOUND_WORDMARK_SIZE = 20;

/**
 * 404 fuera de un idioma (la raíz no tiene <html> propio). Bilingüe y sin fuentes web: es
 * una página de paso. Se muestra en el tema del sistema.
 */
const NotFound = () => (
  <html lang={defaultLocale}>
    <body className="grid min-h-dvh place-items-center bg-canvas p-6 text-center text-ink">
      <main className="flex flex-col items-center gap-6">
        <Logo wordmarkSize={NOT_FOUND_WORDMARK_SIZE} />
        <p className="type-eyebrow text-link">404</p>
        <h1 className="type-h2">No encontramos esta página</h1>
        <p className="type-body text-ink-2" lang="en">
          We couldn&apos;t find this page.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href="/es" className={buttonVariants({ variant: "primary" })}>
            Ir al inicio
          </a>
          <a href="/en" lang="en" className={buttonVariants({ variant: "secondary" })}>
            Go home
          </a>
        </div>
      </main>
    </body>
  </html>
);

export default NotFound;
