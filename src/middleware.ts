import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Fuera: la API, los internos de Next y Vercel, el ícono de Apple (es una ruta sin punto) y
  // todo lo que tenga un punto. Eso deja fuera a propósito las páginas legales .html, que
  // llegan por rewrite y ya traen su idioma en la ruta.
  matcher: "/((?!api|_next|_vercel|apple-icon|.*\..*).*)",
};
