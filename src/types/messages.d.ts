// Claves de traducción tipadas: un t("clave") que no existe en messages/es.json no compila.
type SiteMessages = typeof import("../../messages/es.json");

declare global {
  interface IntlMessages extends SiteMessages {}
}

export {};
