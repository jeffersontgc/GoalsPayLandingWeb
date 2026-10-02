# GoalsPay Landing Web

Sitio de marketing de [GoalsPay](../app), la app móvil de metas de ahorro y finanzas personales. Se publica en Vercel como https://goalspay.app.

## Stack

- **Next.js 15** (App Router) + **TypeScript** estricto
- **Tailwind CSS 4** (`@tailwindcss/postcss`) con los tokens de GoalsPay en `src/styles/globals.css`
- **Radix UI** (menú móvil y acordeón del FAQ) y **Framer Motion** (entradas y el pulso que se dibuja)
- **next-intl** para es/en, siempre con prefijo (`/es`, `/en`)
- **next-themes** para claro/oscuro (sigue al sistema; clave `theme` en localStorage)
- **Vercel Analytics + Speed Insights** (sin cookies, declarados en la Política de Cookies)

El sistema de diseño está en `design-system/MASTER.md`.

## Setup

Usa **yarn** (hay `yarn.lock`). No uses npm.

```bash
yarn install
cp .env.example .env.local
yarn dev -p 3100        # el puerto 3000 es el backend
```

## Variables de entorno

| Variable | Requerida | Notas |
|----------|-----------|-------|
| `APK_URL` | sí, en producción | URL del APK más reciente. `/api/download` redirige ahí; si está vacía responde 503. Solo servidor. Por compatibilidad también se lee `NEXT_PUBLIC_APK_URL`, el nombre que documentaba este README antes. |
| `NEXT_PUBLIC_PLAY_STORE_URL` | no | Mientras esté vacía, Google Play aparece como "Próximamente". |
| `NEXT_PUBLIC_APP_STORE_URL` | no | Igual para App Store. |
| `NEXT_PUBLIC_SITE_URL` | no | Por defecto `https://goalspay.app`. Se usa en canonical, hreflang, sitemap y JSON-LD. |

## Scripts

```bash
yarn dev          # servidor de desarrollo (antes copia los legales si ../legal existe)
yarn build        # build de producción (igual, copia los legales si ../legal existe)
yarn start        # sirve el build
yarn typecheck    # tsc --noEmit
yarn legal:sync   # copia ../legal/{es,en}/*.md a content/legal/ (falla si ../legal no existe)
```

## Documentos legales

Los textos legales se escriben **solo** en `../legal/{es,en}/*.md`, que es la fuente de verdad. La landing los pinta en el build con su propio parser (`src/lib/legal/`), sin HTML crudo.

- `scripts/sync-legal.mjs` copia esos Markdown a `content/legal/` y comprueba que es y en tengan la misma versión. `content/legal/` **se commitea**: en Vercel el repo de la landing no tiene `../legal` al lado, así que el build usa la copia. `yarn dev` y `yarn build` corren el script con `--if-present`, de modo que en local la copia se actualiza sola y en Vercel no falla.
- Después de cambiar un `.md` en `legal/`, corre `yarn legal:sync` y commitea `content/legal/`. No edites `content/legal/` a mano.
- Las URLs públicas son las que enlaza la App y no pueden cambiar: `/es/{terminos,privacidad,cookies,eliminar-cuenta}.html` y `/en/{terms,privacy,cookies,delete-account}.html`. Se sirven con rewrites (`next.config.ts`) desde la ruta interna `/[locale]/legal/[document]`; el middleware de next-intl no las toca porque su matcher excluye las rutas con punto.
- Las rutas viejas `/privacy`, `/terms`, `/es/privacy`, `/en/terms`, etc. redirigen (308) a las nuevas.

## Estructura

- `messages/` — textos es/en (las claves están tipadas: una que falte no compila)
- `content/legal/` — copia de `../legal` para el build
- `src/app/[locale]/` — inicio, documentos legales, imagen OG
- `src/app/api/download/route.ts` — redirige a `APK_URL`
- `src/components/sections/` — hero y capítulos de la página
- `src/components/mockups/` — pantallas de la App recreadas en código (no son capturas)
- `src/components/legal/` — renderizado de los documentos legales
- `src/components/layout/` — cabecera, pie, idioma, tema, descarga
- `src/data/` — datos de ejemplo y catálogos (monedas, logros, bento)
- `src/lib/legal/` — registro, parser y carga de los legales
- `src/utils/` — helpers puros (logo, dinero, fechas, SEO, movimiento)
- `public/flags/` — banderas de flag-icons (MIT)
- `src/assets/og-fonts/` — TTF para la imagen OG (OFL / Apache 2.0)

## Publicar una nueva versión del APK

El APK se distribuye por **GitHub Releases** del repo de la landing (no se commitea).

```powershell
gh release create v1.1.0 ./goalspay-v1.1.0.apk `
  --repo jeffersontgc/GoalsPayLandingWeb `
  --title "GoalsPay v1.1.0" `
  --notes "Cambios"
```

Luego actualiza `APK_URL` en Vercel, por ejemplo
`https://github.com/jeffersontgc/GoalsPayLandingWeb/releases/download/v1.1.0/goalspay-v1.1.0.apk`.

## Privacidad del sitio

El sitio solo guarda la cookie `NEXT_LOCALE` (next-intl, 1 año, SameSite=Lax) y la clave `theme` en localStorage (next-themes). La analítica es Vercel Web Analytics y Speed Insights, sin cookies. Antes de añadir cualquier otra cookie o rastreador hay que actualizar la Política de Cookies y pedir consentimiento.
