# GoalsPay Landing — Design System (MASTER)

Direction: a combination of three skills from awesome-design-skills, on top of the GoalsPay design system.
- **storytelling** sets the page's narrative arc.
- **bento** sets the modular grid for features.
- **premium** sets the finish: precise spacing, typographic restraint and generous whitespace.

**The palette, fonts and logo of the three skills are discarded.** Bento brings peach and Inter, premium Inter, and storytelling Abril Fatface. **The GoalsPay system always wins:** `../../GoalsPay Design System.dc.html` and `../app/src/utils/{colors,theme,typography,brandLogo}.ts`.

> **Design intent, in one sentence:** tell, in five clear chapters, how GoalsPay turns "I don't know how much I can save" into "I know how much I have, and every deposit gets me closer", with the calm and precision of a premium product and features presented as an orderly bento.

---

## 1. Context and goals

- **The page's only job:** for someone in Latin America who wants to save to understand the real balance connected to their goals, trust it, and download the app.
- **Primary metric:** a tap on "Descargar". **Secondary:** reaching chapter 3 (the balance).
- **Audience:** adults 18 and older, on mobile first (≥ 70 % of traffic in LATAM). Spanish first, English second.
- **Truth over sales:** no claim the app can't prove. No "3x", no user counts, no testimonials, no ratings.

## 2. Tokens and foundations (GoalsPay, the only allowed source)

### 2.1 Color: CSS variables in `src/styles/globals.css`. Literal hex values in components are forbidden.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#F6F8FB` | `#0B0F19` | Page background |
| `--surface` | `#FFFFFF` | `#111827` | Bento tiles, cards |
| `--surface-2` | `#F6F8FB` | `#1F2937` | Tiles inside tiles, device mockups |
| `--ink` (fixed navy) | `#111827` | `#111827` | "Chapter" bands, the hero and the final CTA in both themes |
| `--border` | `#E3E8EF` | `#273142` | Dividers. A border never carries meaning on its own |
| `--text` | `#111827` | `#F6F8FB` | Main text |
| `--text-2` | `#55627A` | `#C7CBD6` | Secondary text |
| `--text-3` | `#667286` | `#8A96A8` | Metadata. In light mode `#8A96A8` is only for decoration |
| `--blue` | `#4C6FFF` | `#4C6FFF` | The pulse, progress bars, chart fills. **Not for small text** |
| `--blue-text` | `#3452E0` | `#7B93FF` | Links, the eyebrow, text accents |
| `--primary` / `--on-primary` | `#3452E0` / `#FFFFFF` | same | Primary button |
| `--secondary` / `--on-secondary` | `#111827` / `#FFFFFF` | `#F6F8FB` / `#111827` | Secondary button |
| `--sun` | `#FFB547` | `#FFB547` | **Streaks and achievements only** |
| `--danger-text` | `#C4363B` | `#FF6B6F` | Errors, negative balance |
| Tags | from `colors.ts` (`tags.blue/sun/error/muted`) | from `colors.ts` | Pills |

On a navy band, accent text uses `#7B93FF` (4.24:1 is not enough for `#4C6FFF`).

### 2.2 Typography: `next/font/google`, which self-hosts at build time

| Role | Font | Desktop / Mobile | Weight | Notes |
|---|---|---|---|---|
| Wordmark | Syncopate | — | 700 | **Only** in the logo |
| Display, chapter titles | Sora | 64 / 40 | 700 | `letter-spacing: -0.02em`, `text-wrap: balance` |
| H2 | Sora | 40 / 30 | 700 | |
| H3, tile titles | Sora | 24 / 20 | 600 | |
| Figures | Sora | 48–32 | 600 | `font-variant-numeric: tabular-nums` |
| Body | DM Sans | 18 / 16 | 400 | `line-height: 1.6`, max 65 characters |
| Small | DM Sans | 14 | 500 | |
| Eyebrow | DM Sans | 13 | 700 | Uppercase, `letter-spacing: 0.12em`, `--blue-text` |

The **premium** flavor comes from restraint: at most 3 sizes per viewport, weights limited to 400/600/700, and no italics in headings.

### 2.3 Spacing, radii, elevation

- **Spacing:** 4-point scale `4 8 12 16 24 32 48 64 96 128`. Between chapters: **128 desktop / 96 mobile**. Inside a tile: 24–32. Bento gap: **16 desktop / 12 mobile**.
- **Radii:** chips 8, buttons and fields 14, **bento tiles 20**, large chapter cards 28, tags 999.
- **Elevation:** the premium look calls for almost none. Tiles separate by surface color, not by shadow. Mockups get a single shadow: `0 24px 64px -24px rgb(17 24 39 / 0.25)`. No glassmorphism, no neon glow, no blur.
- **Content width:** 1200 max, side gutter 24 desktop / 16 mobile.

### 2.4 Motion

- **Duration** 200–400 ms, `cubic-bezier(0.2, 0.8, 0.2, 1)`. Elements enter with **opacity + translateY(12px)** only, once, when 30 % of the element is visible.
- **The pulse draws itself** (`stroke-dashoffset`) in the hero and at the start of the balance chapter: the brand's narrative signature, borrowed from M1 in the app.
- **`prefers-reduced-motion: reduce`:** everything shows in its final state, with no transitions. **The page is complete at rest:** nothing starts at `opacity: 0` waiting for JavaScript.

## 3. Narrative structure (storytelling)

Five chapters plus a close. Each chapter has: an **eyebrow with its number** ("01 · El problema"), a **title that is a sentence the user would say**, at most **two lines of text**, and **one visual that proves the claim**.

| # | Chapter | Promise (title, to be refined with humanizer) | Proof visual | Layout |
|---|---|---|---|---|
| 0 | **Hero** | "Sabes cuánto tienes. Sabes cuánto te falta." | Phone with the goals home ("Ahorro total" card + 2 goals); the pulse draws itself | Navy band, text left and phone right; stacked on mobile |
| 1 | **The problem** | "Ahorrar sin saber cuánto te sobra es adivinar." | Three short phrases from real life: "¿Me alcanza para abonar?", "Pagué el alquiler… ¿o no?", "Abono y al final del mes no cuadra" | Light, centered, lots of whitespace |
| 2 | **The balance** (key differentiator) | "Un balance real, conectado a tus metas." | Animated diagram: income received → paid expenses → available → goal. Real figures in a LATAM currency. Shows the block: "No puedes abonar dinero que no tienes" | Large card on `--surface`, a 3-step diagram |
| 3 | **Two modes** | "Finanzas para tu mes. Metas para lo que viene." | Two phones side by side: the Finance month plan (received/paid/skipped) and a goal with deposits | Tabs on desktop, sequential stack on mobile |
| 4 | **Everything else** (bento) | "Hecho para el día a día." | Bento grid (see §4.3) | Bento |
| 5 | **Trust** | "Tus datos, con reglas claras." | List of verifiable facts: HTTPS, you delete your account from the app, we don't sell data, no bank connection, biometric lock | Navy band, 2 columns |
| — | **FAQ** | "Lo que suelen preguntarnos" | Accordion | Light, 720 width |
| — | **Final CTA** | "Empieza con tu primera meta." | Pulse + download button | Navy band |
| — | **Footer** | Logo, links, legal, controller | — | `--surface` |

**Story rules.** Each chapter answers the doubt the previous one raises (problem → how? → what else? → can I trust it? → how do I start?). The **"Descargar" CTA appears 3 times:** the hero, after chapter 2 and the close.

## 4. Component rules

### 4.1 Button
- **Anatomy:** label, plus an optional left icon (lucide, stroke 1.5, 20px).
- **Sizes:** **height 52 / horizontal padding 24** (large); 44 / 20 (nav).
- **Variants:**
  - **primary** `--primary`: one per viewport, for downloading.
  - **secondary** `--secondary`.
  - **ghost**: text in `--blue-text`.
  - **store**: an outline with the store logo and "Próximamente".
- **States:**
  - **default**
  - **hover:** 8 % darker or lighter, no movement
  - **focus-visible:** a 2px `--blue-text` ring offset by 2px
  - **active:** `scale(0.98)`
  - **disabled:** 0.5 opacity plus `aria-disabled`
  - **loading:** spinner plus the label, `aria-busy`
- **Must** have a visible label; icon-only only with an `aria-label`. **Don't:** two primary buttons side by side.

### 4.2 Chapter
- **Anatomy:** eyebrow → H2 → lead → visual.
- **Variants:** `light` (on `--bg`) and `ink` (fixed navy, white text, `#7B93FF` accent).
- **Must:** use a `section` with `aria-labelledby` pointing to its H2. Light and ink chapters alternate, never two ink bands in a row.

### 4.3 Bento grid
- **Grid:** desktop is **4 columns × auto rows of 200px min**; tablet 2 columns; **mobile 1 column** in reading order.
- **Tile sizes:**
  - `XL` = 2×2, at most one per grid
  - `W` = 2×1
  - `T` = 1×2
  - `S` = 1×1
- **Proposed composition** (8 tiles):
  - `XL` **real balance + no duplicates**, with a mini balance card
  - `W` **opening balance and prior savings**
  - `T` **streaks and achievements**, the only tile in `--sun`
  - `S` **one-off movements**
  - `S` **14 LATAM currencies**, with the flags of the supported currencies
  - `W` **Finance analytics and history**, with a mini bar chart
  - `S` **Android widget**
  - `S` **reminders + biometric lock**
- **Tile anatomy:** an icon in a 40px square (radius 12) → a Sora 600 20 title → 1–2 lines of `--text-2` text → an optional mini visual anchored to the bottom.
- **States:** tiles are **not interactive** by default. If one becomes a link: hover raises the border to `--blue-text`, focus-visible gets the ring, and the whole tile is one `<a>`.
- **Must:** all tiles share the same internal padding (24), and none is left half empty. **Don't:** mix more than 3 sizes, put a tile's text at 12px, or use a bento grid with fewer than 5 tiles.

### 4.4 Device mockup (an in-code recreation of the app)
- A 9:19.5 frame, radius 44, 8px border in `#0B0F19`, a single shadow. **Contents are recreated with the app's tokens**: the "Ahorro total" card, the goal card with a 10px bar, the balance card with its breakdown, and the month plan rows.
- **Sample data:** realistic, in **C$** or **US$**, with plausible names (e.g. "Laptop para la U", "Fondo de emergencia", "Alquiler", "Salario").
- **Accessibility:** `role="img"` plus an `aria-label` describing it ("Ilustración: pantalla de metas con un ahorro total de C$ 18 450"). Its contents are `aria-hidden`.
- **Responsive:** 360px wide on desktop, `min(80vw, 300px)` on mobile, never clipped.

### 4.5 Header and nav
- Sticky at `top: 0` with a solid `--bg` background (no blur), and a bottom border only after scrolling.
- Left: the logo, wordmark plus pulse; below 96px only the symbol. Center (desktop): anchors to the chapters. Right: the language switch, the theme toggle and a 44px "Descargar".
- **Mobile:** a hamburger opens a Radix sheet. It has a focus trap, closes with Esc, and focus returns to the trigger.

### 4.6 FAQ (accordion)
- Radix Accordion with `type="single" collapsible`. The full question is the button, and an animated chevron (or none with reduced motion) marks the state. A 44px minimum target.

### 4.7 Footer
- The logo and tagline.
- **Product:** the chapters.
- **Legal:** Términos, Privacidad, Cookies and Eliminar cuenta, pointing to `/es/terminos.html`, etc.
- **Controller:** "Jefferson José Quezada Irigoyen · Granada, Nicaragua · jeffersonirigoyen@gmail.com". Also the year and the language switch.

## 5. Accessibility (WCAG 2.2 AA, testable)

| Criterion | How it's checked |
|---|---|
| Text contrast ≥ 4.5:1, large text and UI ≥ 3:1, in **both** themes and on ink bands | Contrast computed for each token pair; the list goes in the report |
| Visible focus on everything interactive, never hidden behind the sticky header | Tab through the whole page; `scroll-margin-top` on the anchors |
| A "Saltar al contenido" link first in the tab order | Manual |
| A single `h1`, with chapter `h2`s in order | Heading outline |
| `lang="es"` or `"en"` depending on the route | View source |
| Reduced motion: no transitions, complete content | Emulated in DevTools |
| Mockups and diagrams have an `aria-label` describing them | Screen reader |
| 44×44px targets on mobile | Measured at 375px |
| Usable at 200 % zoom with no horizontal scroll at 320px | Manual |
| Color never carries meaning on its own (a negative balance has text and a sign) | Visual review |

## 6. Tone and copy

- **Tone:** concise, confident, helpful. Second person "tú". Short sentences. Real numbers instead of adjectives.
- **Run all the copy through the `humanizer` skill.** Forbidden: "revoluciona", "imparable", "potencia", "lleva tu X al siguiente nivel", em-dash chains, lists of three adjectives, and promises with no evidence.

| ✅ Do | ❌ Don't |
|---|---|
| "No puedes abonar dinero que no tienes." | "La forma más inteligente de ahorrar." |
| "Marcas tu salario como recibido y el balance sube." | "Potencia tus finanzas con IA." |
| "Gratis. Si algún día hay un plan de pago, nunca se cobra sin que lo aceptes." | "Gratis para siempre." |
| "Necesita internet: tus datos viven en tu cuenta." | "Funciona sin conexión." |

## 7. Anti-patterns (forbidden)

- Glassmorphism, neon glow, background blur, decorative purple-to-mint gradients: the old landing.
- The palettes and fonts of the skills (peach `#FAD4C0`, Inter, Abril Fatface).
- Literal hex in components, or `--blue` (`#4C6FFF`) as small text on white.
- Screenshots or images with baked-in text.
- Elements at `opacity: 0` waiting for an IntersectionObserver.
- A hero at `100vh` that pushes the content below the fold on mobile.
- Shadows on every tile.
- Statistics, ratings, testimonials or press logos that don't exist.
- Third-party trackers besides Vercel Analytics and Speed Insights, which are declared in the Cookie Policy.
- Cookies other than `NEXT_LOCALE`; `localStorage` other than `theme`.

## 8. Migrating from the current landing

| Old | New |
|---|---|
| `--brand-500 #6366f1`, `--accent-500 #22d3a6`, `--grad-*` | Remove; map to the §2.1 tokens |
| `Hero`, `TrustStrip`, `FeatureBento`, `ModesShowcase`, `Achievements`, `Privacy`, `FAQ`, `FinalCTA` | Rewrite as the §3 chapters; reuse the logic (download, i18n), not the styles |
| `DeviceFrame` + PNG | The coded mockup from §4.4 |
| `privacy/` and `terms/` pages with a single paragraph | The legal pages generated from `../legal/*.md`, with redirects |
| `public/goalspay-logo.png` | The `Logo` component (SVG) |

## 9. QA checklist (code review)

- [ ] `grep` finds no hex outside `globals.css` and the store logos.
- [ ] No Inter, Abril Fatface or Google Fonts request in the built HTML.
- [ ] Five chapters in the §3 order, with a numbered eyebrow and a single CTA per viewport.
- [ ] A bento grid of 8 tiles, at most 3 sizes, readable in a single column at 375px.
- [ ] Contrast table in both themes with every pair ≥ 4.5:1 (≥ 3:1 for large text).
- [ ] Reduced motion: the page is complete and static.
- [ ] Every copy line passed through humanizer; nothing unprovable.
- [ ] Legal URLs `/es/{terminos,privacidad,cookies,eliminar-cuenta}.html` and `/en/{terms,privacy,cookies,delete-account}.html` return 200.
- [ ] Only the `NEXT_LOCALE` cookie and the `theme` key in storage.
- [ ] `yarn typecheck` with the probe, `yarn build` OK, and light/dark screenshots at 1280 and 375 reviewed.
