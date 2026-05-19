# GoalsPay Landing — Design Spec

*Fecha: 2026-05-18 · Owner: Jefferson · Estado: pendiente de aprobación*

## 1. Resumen ejecutivo

Landing page de marketing para **GoalsPay** (app móvil de metas de ahorro + finanzas personales). El objetivo del v1 es convertir visitantes en **descargas directas del APK** (mientras se publica en Play Store) y, en paralelo, mostrar un badge "Próximamente en Play Store / App Store".

- **Stack:** Next.js 15 (App Router) + TypeScript + Tailwind v4 + shadcn/ui + Framer Motion + next-intl.
- **i18n:** Español (default) e Inglés con switcher visible.
- **Ruta del proyecto:** `MetasApp/landing-web/`.
- **Dominio:** `goalspay.app` (ya configurado como universal link en la app móvil).
- **Hosting recomendado:** Vercel (edge functions + ISR + analytics gratis).
- **Visual:** fintech moderno oscuro + acentos neón/glow. Detalle completo en `design-system/MASTER.md`.
- **Brand context:** `.agents/product-marketing.md` (auto-drafteado y versionado).

## 2. Estructura del proyecto

```
landing-web/
├── .agents/
│   └── product-marketing.md          # contexto de marketing (ya creado)
├── design-system/
│   └── MASTER.md                     # design tokens y reglas (ya creado)
├── docs/
│   └── specs/
│       └── 2026-05-18-goalspay-landing-design.md   # este archivo
├── public/
│   ├── og.png                        # 1200x630 OG
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── icons/                        # logo SVG, etc.
│   └── screenshots/                  # capturas reales de la app (webp)
├── messages/
│   ├── es.json                       # copy en español
│   └── en.json                       # copy en inglés
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx           # html, fonts, theme, navbar, footer
│   │   │   ├── page.tsx             # landing (compone secciones)
│   │   │   ├── privacy/page.tsx     # política de privacidad
│   │   │   └── terms/page.tsx       # términos
│   │   ├── api/
│   │   │   └── download/route.ts    # redirige a APK_URL (env var)
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── opengraph-image.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── LanguageSwitcher.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── TrustStrip.tsx        # "100% privado · Gratis · 14 monedas LATAM"
│   │   │   ├── FeatureBento.tsx      # bento grid principal
│   │   │   ├── ModesShowcase.tsx     # Metas vs Finanzas tabs
│   │   │   ├── ScreensCarousel.tsx   # carrusel scroll-driven de pantallas
│   │   │   ├── Achievements.tsx      # rachas + logros
│   │   │   ├── Privacy.tsx           # bloque "tu data, tu teléfono"
│   │   │   ├── FAQ.tsx
│   │   │   └── FinalCTA.tsx
│   │   ├── ui/                       # shadcn primitives
│   │   └── shared/
│   │       ├── DeviceFrame.tsx       # marco de phone para mockups
│   │       ├── GradientText.tsx
│   │       ├── GlowButton.tsx
│   │       └── Section.tsx
│   ├── lib/
│   │   ├── seo.ts                    # helpers metadata
│   │   ├── analytics.ts              # Vercel Analytics / Plausible
│   │   └── env.ts                    # zod env validation
│   ├── i18n/
│   │   ├── config.ts                 # locales, defaultLocale
│   │   └── request.ts                # next-intl loader
│   ├── styles/
│   │   └── globals.css               # tailwind + tokens del MASTER
│   └── middleware.ts                 # next-intl middleware (locale routing)
├── .env.example
├── .gitignore
├── README.md
├── components.json                   # shadcn config
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## 3. Secciones de la landing (orden, copy framework y data flow)

### 3.1 Navbar (sticky, transparente → solid on scroll)
- Logo `GoalsPay` (SVG) + wordmark
- Links anchor: `Características`, `Modos`, `Privacidad`, `FAQ`
- Right: `LanguageSwitcher` (ES/EN), `ThemeToggle` (dark/light), `Button` "Descargar"
- Mobile: hamburguesa abre `Sheet` lateral
- Cumple `bottom-nav-limit ≤5`, focus visible, lang switcher con `aria-pressed`

### 3.2 Hero
- Background: `--grad-hero` aurora + dot grid + spotlight cursor
- H1 (display): **"Alcanza tus metas 3x más rápido. Sin entregar tu banco a nadie."**
  - Variante EN: "Reach your goals 3x faster. Without handing your bank to anyone."
- Sub: "GoalsPay es la app de ahorro con rachas, logros y privacidad real. Tu dinero vive solo en tu teléfono."
- Doble CTA:
  - Primario (gradient glow): **"Descargar APK"** → `/api/download` (302 a APK_URL)
  - Secundario (badge): "Próximamente en Play Store" (disabled visual) + "App Store" (disabled visual)
- Right: mockup de phone con Dashboard real (capturado de la app), animación entrante stagger
- Trust strip debajo (ver 3.3)
- A11y: H1 único en la página, alt descriptivo en mockup

### 3.3 Trust strip
Banda fina con 5 pills: `100% privado` · `Gratis sin anuncios` · `Sin login` · `14 monedas LATAM` · `Backup Google Drive opcional`.
- Iconos lucide: Shield, Gift, UserX, Globe, CloudDownload.

### 3.4 Feature Bento (sección principal "Qué hace")
Grid bento 4 columnas (desktop) / 1 (mobile) con 7 cards:

| Card | Tamaño | Contenido |
|------|--------|-----------|
| Metas con foto | 2x2 | Mockup card de meta (foto + barra de progreso + monto) |
| Rachas | 1x1 | Flame icon + "Racha de 12 días" + contador animado |
| Logros | 1x1 | Trophy + grid de 6 badges desbloqueados |
| Proyección | 2x1 | Mini chart línea + "Necesitas $35/sem por 8 sem" |
| Widget Android | 1x2 | Mockup home Android con widget GoalsPay |
| Privacidad | 1x1 | Shield + "Datos solo en tu teléfono" |
| 14 monedas | 2x1 | Globo + selector animado MXN / COP / GTQ / BRL / ... |

Microinteracciones: hover scale 1.02, border → brand. Sin más de 2 elementos animando a la vez por viewport.

### 3.5 Modes Showcase (Metas vs Finanzas)
Tabs grandes con dos paneles. Cada tab muestra:
- Lado izquierdo: copy explicando el modo + 3 bullets
- Lado derecho: mockup phone con la pantalla correspondiente (Dashboard de Metas / FinanceHome)
- Animación de transición fade + slide al cambiar tab
- Sirve para enseñar que es "2 apps en 1"

### 3.6 Screens Carousel
Showcase tipo Apple product page: 6–8 pantallas reales (Dashboard, Goals, Analytics, FinanceHome, Personalization, Onboarding, Achievements).
- Scroll horizontal con `scroll-snap`
- Cada slide tiene marco de phone, título y subtítulo
- Mobile: scroll-snap nativo; Desktop: arrows + drag con Framer Motion

### 3.7 Achievements & Streaks (motivación)
Sección oscura con glow violeta. Muestra:
- Lista visual de 12 logros (Primer paso, En racha, Veterano, Imparable…) heredados de `src/utils/achievements.ts`
- Counter animado de racha
- Quote: "El cerebro celebra lo que se ve. Por eso GoalsPay convierte cada abono en progreso visible."

### 3.8 Privacy block
Fila full-width oscura con icono Shield XL.
- Headline: **"Tus datos no salen de tu teléfono. Punto."**
- 3 bullets:
  - Sin login, sin servidor.
  - Backup opcional a TU Google Drive.
  - Código abierto verificable (si aplica; si no, eliminar).
- CTA secundaria: "Leer política de privacidad" → `/privacy`.

### 3.9 FAQ
Accordion shadcn. 6 preguntas iniciales (mapeadas a Objections en product-marketing.md):
1. ¿Es realmente gratis?
2. ¿Necesito conectar mi banco?
3. ¿Está disponible en mi país / moneda?
4. ¿Qué pasa si cambio de teléfono?
5. ¿Funciona sin internet?
6. ¿Cuándo estará en Play Store / App Store?

### 3.10 Final CTA
Bloque centrado con gradient overlay.
- H2: "Empieza a ahorrar hoy en menos de 30 segundos."
- Botón gigante "Descargar APK" + texto pequeño "Versión 1.0 · Android 8+"

### 3.11 Footer
3 columnas:
- Brand: logo + tagline + redes (Twitter, Instagram, GitHub si aplica)
- Producto: Features, Modos, FAQ, Descargar
- Legal: Privacidad, Términos, Contacto
- Bottom: `© 2026 GoalsPay. Hecho con amor en LATAM.` + selector de idioma duplicado

## 4. Internacionalización (next-intl)

- Locales: `['es', 'en']`, default `es`.
- Routing: `/[locale]/...`. Redirección automática por `Accept-Language` con preferencia guardada en cookie `NEXT_LOCALE`.
- Diccionarios: `messages/es.json`, `messages/en.json`. Estructurados por sección (`hero.title`, `features.bento.goal_with_photo.title`, etc.).
- Para v1, copy 100% manual escrito a mano (no auto-traducción). EN se hereda del onboarding ya existente en `mobile-app/src/locales/en.ts` para asegurar consistencia de tono.

## 5. Data / contenido dinámico

No hay backend. Toda la página es estática (SSG):
- Mockups: PNG/WEBP en `public/screenshots/` (capturas reales de la app, exportadas en 1080×1920).
- Achievements: array literal en `lib/content.ts`, espejo de `mobile-app/src/utils/achievements.ts`.
- Currencies: array de las 14 monedas heredado de `mobile-app/src/types/index.ts`.
- APK: env var `NEXT_PUBLIC_APK_URL` (con fallback `/downloads/goalspay-v1.apk`).

## 6. SEO

- `metadata` por locale: title, description, keywords (en español + inglés).
- OG dinámico generado vía `app/opengraph-image.tsx` con título + logo + gradient.
- `sitemap.xml` con ambos locales.
- `robots.txt` permitiendo todo, `Sitemap:` apuntando al sitemap.
- JSON-LD `SoftwareApplication` con `applicationCategory: FinanceApplication`, `operatingSystem: Android, iOS`, `offers.price: 0`.
- `<html lang>` por locale, `<link rel="alternate" hreflang>` cruzados.

## 7. Analytics (opcional v1)

- `@vercel/analytics` (zero config) + `@vercel/speed-insights`.
- Eventos custom: `apk_download_click`, `lang_switch`, `mode_tab_change`, `faq_open`.
- Sin cookies de terceros, sin necesidad de banner GDPR.

## 8. Env vars

```
NEXT_PUBLIC_APK_URL=https://...           # URL externa al APK (Jefferson la provee)
NEXT_PUBLIC_PLAY_STORE_URL=               # vacío hasta publicación
NEXT_PUBLIC_APP_STORE_URL=                # vacío hasta publicación
NEXT_PUBLIC_SITE_URL=https://goalspay.app
```

Validadas con `zod` en `src/lib/env.ts`.

## 9. Performance & a11y budgets

- Lighthouse Performance ≥95 (mobile)
- Accessibility 100
- Best Practices ≥95
- SEO 100
- LCP <2.5s, INP <200ms, CLS <0.1
- JS inicial <120kb gzipped

## 10. Out of scope (v1, NO hacer)

- Blog / CMS
- Sistema de waitlist con backend
- Dashboard de admin
- Pricing / paywall (la app es gratis hoy)
- Integración real con EAS Build API
- Tests automatizados (E2E con Playwright queda para v2)
- Multi-tenant / white-label

## 11. Plan de build (orden sugerido)

1. Scaffold Next.js 15 + Tailwind v4 + tsconfig + lint.
2. Instalar shadcn/ui y dependencias (`framer-motion`, `next-intl`, `lucide-react`, `next-themes`, `zod`, `@vercel/analytics`).
3. Configurar Tailwind theme con los tokens del MASTER + `globals.css`.
4. Setup `next-intl` con middleware + diccionarios mínimos.
5. Layout base: Navbar + Footer + ThemeProvider + LanguageSwitcher.
6. Componentes shared: `DeviceFrame`, `GlowButton`, `Section`, `GradientText`.
7. Sección por sección en orden (3.2 → 3.10).
8. SEO: metadata + OG dinámico + sitemap + robots.
9. Páginas legales (privacy, terms) con placeholder editable.
10. README + `.env.example`.
11. Smoke test `npm run build` y revisión visual `npm run dev`.

## 12. Aceptación

- [ ] `npm run build` sin warnings de tipos
- [ ] Navega ES y EN sin estados rotos
- [ ] APK download responde 302 al URL configurado (o muestra mensaje claro si no está seteado)
- [ ] Toggle dark/light persiste en localStorage y respeta `prefers-color-scheme`
- [ ] Lighthouse pasa los budgets de §9
- [ ] Cero hardcoded hex fuera del MASTER
- [ ] Todas las imágenes con `width/height`
- [ ] Focus visible en todos los interactivos
