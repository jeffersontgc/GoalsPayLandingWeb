# GoalsPay Landing Web

Landing page de marketing para [GoalsPay](../mobile-app), la app móvil de metas de ahorro + finanzas personales.

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS 4** (`@tailwindcss/postcss`)
- **shadcn/ui** primitivos (Radix UI)
- **Framer Motion** para microinteracciones
- **next-intl** para i18n ES/EN
- **next-themes** para dark/light
- **Vercel Analytics + Speed Insights**

## Setup

```bash
npm install
cp .env.example .env.local   # edita NEXT_PUBLIC_APK_URL al menos
npm run dev
```

Abre `http://localhost:3000` — redirige a `/es` por defecto.

## Variables de entorno

| Variable | Requerida | Notas |
|----------|-----------|-------|
| `NEXT_PUBLIC_APK_URL` | sí (en producción) | URL externa al APK más reciente. Si está vacía, el botón muestra un toast amigable y la API responde 503. |
| `NEXT_PUBLIC_PLAY_STORE_URL` | no | Cuando esté publicado en Play Store. |
| `NEXT_PUBLIC_APP_STORE_URL` | no | Cuando esté publicado en App Store. |
| `NEXT_PUBLIC_SITE_URL` | no | Default `https://goalspay.app`. Usado para SEO + sitemap. |

## Scripts

```bash
npm run dev       # dev server (Turbopack)
npm run build     # build de producción
npm run start     # serve del build
npm run lint      # next lint
npm run typecheck # tsc --noEmit
```

## Estructura

Ver `docs/specs/2026-05-18-goalspay-landing-design.md` para el spec completo.

- `messages/` — diccionarios i18n (es.json, en.json)
- `src/app/[locale]/` — rutas con prefijo de idioma
- `src/app/api/download/route.ts` — redirige al APK_URL
- `src/components/sections/` — bloques visuales de la landing
- `src/components/layout/` — Navbar, Footer, ThemeToggle, LanguageSwitcher
- `src/components/ui/` — primitivos shadcn personalizados
- `src/components/shared/` — Section, DeviceFrame, Logo
- `design-system/MASTER.md` — design tokens y reglas
- `.agents/product-marketing.md` — contexto de marketing reutilizable

## Próximos pasos

1. Reemplazar mockups en `Hero`, `ModesShowcase` y `ScreensCarousel` con capturas reales (WebP) cuando estén disponibles.
2. Setear `NEXT_PUBLIC_APK_URL` apuntando al build EAS o GitHub Release.
3. Conectar dominio `goalspay.app` en Vercel.
4. Publicar en Play Store / App Store y descomentar los badges.

## Licencia

© 2026 GoalsPay. Hecho con amor en LATAM.
