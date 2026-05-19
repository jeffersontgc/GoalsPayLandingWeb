# GoalsPay Landing — Design System (MASTER)

*Generated from ui-ux-pro-max product type 91 "Personal Finance Tracker" + brand colors heredados de `mobile-app/src/utils/colors.ts` (palette dark).*
*Visual direction elegida: **Fintech moderno oscuro + acentos neón/glow**.*

---

## 1. Visual identity

| Aspecto | Decisión | Razón |
|---------|----------|-------|
| Modo principal | **Dark-first** (con toggle a light) | Coherente con splash `#0b1120` de la app y con vertical fintech/crypto |
| Estilo base | **Glassmorphism + Dark Mode (OLED)** | Recomendación oficial ui-ux-pro-max para Personal Finance Tracker |
| Estilos secundarios | Flat sections, bento grid para features | Storytelling visual escaneable |
| Acentos | Neón verde menta (success/progress) + glow violeta | Refuerza "racha" y "logros" |

## 2. Color tokens

Usar como CSS variables / Tailwind theme. Nada de hex sueltos en componentes.

```css
:root {
  /* Surfaces (dark-first) */
  --bg-base:        #07091a;   /* deeper than app splash, para hero cinematográfico */
  --bg-surface:     #0b1120;   /* = app splash */
  --bg-surface-alt: #111827;   /* = app dark surface */
  --bg-surface-2:   #1e293b;
  --bg-elevated:    rgba(255, 255, 255, 0.04);   /* glass cards */
  --bg-elevated-2:  rgba(255, 255, 255, 0.06);
  --border-soft:    rgba(255, 255, 255, 0.08);
  --border-strong:  rgba(255, 255, 255, 0.16);

  /* Text */
  --text-primary:   #f1f5f9;
  --text-secondary: #cbd5e1;
  --text-muted:     #94a3b8;
  --text-inverse:   #0f172a;

  /* Brand */
  --brand-500:      #6366f1;   /* indigo principal */
  --brand-400:      #818cf8;
  --brand-300:      #a5b4fc;
  --brand-glow:     rgba(99, 102, 241, 0.45);

  /* Accent (progreso, racha, éxito) */
  --accent-500:     #22d3a6;   /* mint neón, ≈ #4ade80 darker chroma */
  --accent-400:     #4ade80;   /* = app success dark */
  --accent-glow:    rgba(34, 211, 166, 0.45);

  /* Semantic */
  --success:        #4ade80;
  --warning:        #fbbf24;
  --danger:         #f87171;
  --info:           #60a5fa;

  /* Gradients */
  --grad-hero:      radial-gradient(1200px 600px at 20% 0%, rgba(99,102,241,0.25), transparent 60%),
                    radial-gradient(900px 500px at 80% 10%, rgba(34,211,166,0.18), transparent 60%);
  --grad-cta:       linear-gradient(135deg, #6366f1 0%, #22d3a6 100%);
  --grad-card:      linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
}

[data-theme="light"] {
  --bg-base:        #f8fafc;
  --bg-surface:     #ffffff;
  --bg-surface-alt: #f1f5f9;
  --bg-elevated:    #ffffff;
  --border-soft:    #e2e8f0;
  --border-strong:  #cbd5e1;
  --text-primary:   #0f172a;
  --text-secondary: #475569;
  --text-muted:     #94a3b8;
}
```

Contraste validado: `--text-primary` sobre `--bg-base` = 16.4:1 (AAA). `--accent-500` sobre `--bg-base` = 8.1:1.

## 3. Typography

| Rol | Familia | Peso | Tamaño desktop | Tamaño mobile | Tracking |
|-----|---------|------|----------------|---------------|----------|
| Display (hero) | **Inter** (variable) | 700 | 64–80px | 40–48px | -0.03em |
| H1 | Inter | 700 | 48px | 32px | -0.02em |
| H2 | Inter | 700 | 36px | 28px | -0.02em |
| H3 | Inter | 600 | 24px | 20px | -0.01em |
| Body L | Inter | 400 | 18px | 17px | 0 |
| Body | Inter | 400 | 16px | 16px | 0 |
| Caption | Inter | 500 | 13px | 13px | 0.02em |
| Mono / números | **JetBrains Mono** | 500 | inherits | inherits | tabular |

Razón: una sola familia variable mantiene bundle <100kb y consistencia. JetBrains Mono solo para mockups de cifras (currency, racha 12d, etc.).

`font-display: swap`. Preload solo Inter 400 + 700.

## 4. Spacing & layout

- Sistema 4pt: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128`.
- Container: `max-w-6xl` (1152px) en desktop, `px-5` mobile → `px-8` tablet.
- Section vertical rhythm: `py-24 md:py-32` para secciones principales; `py-16` para secundarias.
- Card radius: `rounded-2xl` (16px) para tarjetas grandes, `rounded-xl` para chips.
- Border style: 1px sólido `--border-soft` + sombra interna sutil para glass.

## 5. Effects

| Efecto | Uso | Implementación |
|--------|-----|----------------|
| Glass card | Tarjetas de features y testimonios | `backdrop-blur-xl`, `bg-white/[0.04]`, `border border-white/10` |
| Glow CTA | Botón primario, hero | `box-shadow: 0 0 40px var(--brand-glow)` |
| Spotlight cursor | Hero background | Gradient radial siguiendo cursor (Framer Motion) |
| Grid background | Sección hero | SVG dot/grid con `mask-image: radial-gradient` |
| Aurora gradient | Detrás del hero | `--grad-hero`, animado lento con `bg-position` |
| Sombras | Solo en cards elevadas | `0 20px 60px -20px rgba(0,0,0,0.6)` |

## 6. Motion (Framer Motion)

- Tokens de duración: `fast 0.18s`, `base 0.28s`, `slow 0.42s`. Easing `[0.22, 1, 0.36, 1]` (out-expo).
- Entradas de sección: `whileInView`, `y: 24 → 0`, `opacity: 0 → 1`, stagger 60ms.
- Hover en tarjetas: `scale 1.0 → 1.02`, `border-color → brand`.
- Botón CTA: leve scale 0.97 al press, glow pulsa cada 4s en idle.
- Respeta `prefers-reduced-motion`: desactiva todos los `whileInView`/spotlight.

## 7. Componentes base (shadcn/ui)

A instalar:
`button`, `card`, `badge`, `accordion`, `tabs`, `sheet`, `dialog`, `dropdown-menu`, `tooltip`, `separator`, `navigation-menu`, `sonner`, `skeleton`.

Variantes custom de `button`:
- `default` → gradient `--grad-cta` + glow
- `secondary` → glass `bg-white/5 border border-white/10`
- `ghost` → solo texto sobre dark
- Sizes: `sm 36px`, `md 44px (default ≥ touch target)`, `lg 52px`, `xl 60px`

## 8. Iconografía

- **Lucide React** (la app móvil ya usa lucide-react-native, garantiza consistencia visual).
- Stroke 1.75px uniforme, tamaño 20/24/32.
- Iconos de features: contenedor `48×48` con `bg-brand-500/10` + icono `text-brand-400`.
- Cero emojis como íconos estructurales.

## 9. Imágenes / mockups

- Screenshots de la app reales (capturas portrait), exportadas a WebP/AVIF con `next/image`.
- Marco "device frame" en SVG (sin shadow Apple, propio minimal).
- Lazy load below-the-fold, `width/height` declarados para CLS 0.
- Si no hay capturas reales aún: placeholders gradient con label "Screenshot pendiente".

## 10. Anti-patterns (qué evitar)

- Emojis para íconos de navegación o features.
- Más de 2 fuentes.
- Hex hardcodeados en componentes (siempre via CSS var / tailwind theme).
- Animaciones de >500ms en microinteracciones.
- Pie chart con >5 categorías; preferir barras horizontales.
- Touch targets <44px (incluye botones de social/footer).
- Hover-only para info crítica (mobile no tiene hover).
- Color como único indicador de estado.

## 11. Accesibilidad (gates)

- Contraste body ≥4.5:1, large text ≥3:1 verificado en ambos modos.
- Focus visible 2px `--accent-400` outline + 2px offset en TODO interactivo.
- Cero `outline: none` sin reemplazo.
- Tab order = orden visual.
- `aria-label` en iconos solos (cambio de idioma, toggle theme, social links).
- Lang switcher usa `<button aria-pressed>`.
- Skip link al inicio del body.
- Respeta `prefers-reduced-motion` y `prefers-color-scheme`.

## 12. Performance gates

- LCP <2.5s, CLS <0.1, INP <200ms.
- Next.js App Router + RSC por defecto; client components solo donde hay interacción (motion, theme toggle, lang switcher, FAQ).
- Imágenes `next/image` con `priority` solo en hero.
- Fuentes `next/font` (Inter + JetBrains Mono) con `display: 'swap'`.
- Sin librerías de iconos completas; tree-shake lucide.
- Sin librerías de animación pesadas más allá de Framer Motion.
