/**
 * Datos fijos del sitio. Los colores de aquí solo se usan donde no llegan las variables
 * CSS (metadatos del viewport, imágenes OG e íconos generados en el servidor).
 */

export const BRAND_NAME = "GoalsPay";

/** El logotipo se escribe en mayúsculas; no pasa por i18n porque es la marca. */
export const WORDMARK_TEXT = "GOALSPAY";

/** Responsable del tratamiento, tal como aparece en los documentos legales. */
export const CONTROLLER = {
  name: "Jefferson José Quezada Irigoyen",
  location: "Granada, Nicaragua",
  email: "jeffersonirigoyen@gmail.com",
} as const;

/** Mismos valores que BRAND_COLORS en app/src/utils/colors.ts. */
export const BRAND_COLORS = {
  navy: "#111827",
  navyDeep: "#0b0f19",
  brandBlue: "#4c6fff",
  canvasLight: "#f6f8fb",
  white: "#ffffff",
  onNavySecondary: "#c7cbd6",
} as const;

/** Ruta que redirige al APK publicado (APK_URL). */
export const APK_DOWNLOAD_PATH = "/api/download";

/** Grosor de trazo de los íconos lucide en todo el sistema (ICON_STROKE_WIDTH en la App). */
export const ICON_STROKE_WIDTH = 1.5;

/** Destino del enlace "Saltar al contenido". */
export const MAIN_CONTENT_ID = "main";
