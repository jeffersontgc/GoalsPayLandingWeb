# Landing redesign: report (2026-10-01)

Scope: the GoalsPay marketing site (`landing-web`), rebuilt from scratch on the GoalsPay design system and on `design-system/MASTER.md` (written by the coordinator: storytelling + bento + premium, with the GoalsPay tokens). Nothing was committed. `app/`, `backend/` and `legal/` were only read.

## 1. Positioning (April Dunford)

| Step | Decision |
|---|---|
| Alternatives | A notebook or Excel, budgeting apps, the bank app, doing nothing |
| Unique attribute | A real available balance connected to the goals: the monthly bills and the savings are the same account |
| Value | Knowing how much you can actually set aside this month; every goal reflects money that exists |
| Best-fit customer | Adults in Latin America with regular monthly income and bills, saving for concrete goals, who don't want to connect their bank |
| Category | Savings-goals app with monthly finances |

**Statement:** For people in Latin America who want to save for concrete goals without connecting their bank, GoalsPay is a goals and personal-finance app that works out your real balance from what you got paid and what you paid, and only lets you put into your goals money you actually have. Unlike a notebook, a spreadsheet or a budgeting app, your monthly bills and your goals are the same account, so nothing is counted twice.

The same text is in `.agents/product-marketing.md`, which I rewrote: the old version described an app with no account, no server and a Google Drive backup.

## 2. Page structure (MASTER.md §3)

| # | Section | Band | Proof visual |
|---|---|---|---|
| 0 | Hero: "Sabes cuánto tienes. Sabes cuánto te falta." | ink (navy) | Coded phone: the goals home with the "Ahorro total" card and 3 goals; the background pulse draws itself (CSS) |
| 01 | The problem: "Ahorrar sin saber cuánto te sobra es adivinar." | surface | Three real-life phrases |
| 02 | The balance: "Un balance real, conectado a tus metas." | canvas + surface card | Diagram: received +C$24,000 → paid −C$10,300 → available C$13,700 → deposit −C$1,500 → C$12,200, plus the app's real block message ("Supera tu balance: puedes abonar hasta …"). The pulse draws itself (Framer Motion). **Download CTA #2** |
| 03 | Two modes: "Finanzas para tu mes. Metas para lo que viene." | surface | Two phones: the month plan (received / paid / pending / skipped) and a goal with a 10px bar, pace and deposits |
| 04 | Everything else (bento): "Hecho para el día a día." | canvas | 8 tiles (see below) |
| 05 | Trust: "Tus datos, con reglas claras." | ink | 6 verifiable facts in 2 columns, plus links to Privacy and Delete account |
| — | FAQ: "Lo que suelen preguntarnos" | canvas, 720 wide | Radix accordion, single + collapsible |
| — | Final CTA: "Empieza con tu primera meta." | ink | Pulse + **Download CTA #3** + stores "Próximamente" |
| — | Footer | surface | Logo, chapters, the 4 legal links, controller line, year, language |

- Two ink bands are never adjacent (hero, 05 and the close).
- In dark mode the band and the surface are the same navy, so the ink bands get a 1px `band-line` edge.
- The header "Descargar" is the **secondary** variant, so each viewport has a single primary button.

**Bento** (`src/data/features.ts`):
- XL: the balance with no duplicates, using the Finance balance card with its full breakdown
- W: streaks and the 12 achievements (the only tile in `--sun`)
- S: one-off movements
- S: the Android widget
- W: opening balance and prior savings
- W: 14 currencies with flags
- W: analytics and history, with a mini bar chart
- W: reminders and the biometric lock

## 3. False claims removed or corrected

| Old site | Now |
|---|---|
| "Alcanza tus metas 3x más rápido" (title, OG, JSON-LD) | Removed. Title: "GoalsPay: ahorra para tus metas con tu balance real" |
| "100% privado: tus datos viven solo en tu teléfono", "No hay servidor. No hay cuenta", "Sin login, sin servidor, sin tracking" | "Viven en tu cuenta: se guardan en nuestros servidores, por eso la app necesita internet" |
| "Sin registro" | Account required: email/password, Google, Apple (iPhone), Microsoft or Facebook |
| "Backup a Google Drive", "restaurar desde tu Drive" | "Instalas la app en el nuevo e inicias sesión con tu cuenta" |
| "¿Funciona sin internet? Sí" | "No. La app necesita conexión…" |
| "Gratis sin anuncios… las funciones de hoy seguirán siendo gratis" | Terms §7: free today, possible premium, never charged without explicit consent, through the stores |
| "Metas con foto" | Removed: `ImagePickerField` exists but no screen uses it, and the Privacy Policy says no photos are collected |
| "Imparable", "streaks of up to 30 days" (marketing copy) | Streaks have no cap. There are achievements at 3, 7 and 30 days, and "Pasado el día 30, la racha sigue contando" |
| "12 logros" | **True and kept**: the app shows 12 achievements (`app/src/utils/achievements.ts`). See §8 |
| "Sugerencia automática de cuánto puedes abonar" | Replaced by the real pace text: "Necesitas C$585/semana · C$84/día por 56 días" |
| "Versión 1.0 · Android 8+" | Removed: the minimum Android version can't be verified from the repo |
| "Empieza en 30 segundos" | Removed |
| Twitter / Instagram / GitHub links pointing to bare domains | Removed |
| `contacto@goalspay.app` in the old legal stubs | The real controller and email from the legal texts |
| JSON-LD "100% private" | Factual description, price 0, `author` = the controller, no ratings |

**Copy:**
- All es/en copy went through the humanizer patterns: no em dashes in marketing text, no rule-of-three filler, no inflated words, second person "tú", and figures instead of adjectives.
- The only "Imparable" left is the real label of the `streak_30` achievement in the app, and the page doesn't display it (the tile shows "Primer paso, Semana perfecta, Meta cumplida…").
- The FAQ covers:
  - cost / premium
  - no bank connection
  - the 14 currencies
  - changing phones
  - needs internet
  - deleting your account (with the email and a link to the page)
  - availability (APK now, stores coming soon)
  - 18+

## 4. How the legal pages are wired

1. The source of truth is `../legal/{es,en}/*.md`. `scripts/sync-legal.mjs` copies them to `content/legal/` and fails if es and en have different versions.
   - `yarn dev` and `yarn build` run it with `--if-present`: it copies when `../legal` exists and keeps the committed copy otherwise (Vercel).
   - `yarn legal:sync` is the strict manual version.
   - **`content/legal/` must be committed**, because the landing repo on Vercel doesn't have `../legal` next to it. I verified this by building a copy without `../legal`: "using the committed content/legal copy", and the build passed.
2. `src/lib/legal/parseLegalMarkdown.ts` is a TypeScript port of the subset `legal/scripts/build_site.py` handles: headings, paragraphs, bold, italics, links, auto-linked emails, nested lists, tables and the translation notice.
   - It produces a typed tree (`src/types/legal.ts`) that React renders. There is no `dangerouslySetInnerHTML`.
   - Links between `.md` files become the public `.html` URLs.
   - The build fails if a document has no title, version or date.
3. The internal route `src/app/[locale]/legal/[document]/page.tsx` is SSG for 4 × 2 pages.
   - `next.config.ts` rewrites (`beforeFiles`) serve the exact URLs the app links to: `/es/{terminos,privacidad,cookies,eliminar-cuenta}.html` and `/en/{terms,privacy,cookies,delete-account}.html`.
   - The next-intl matcher excludes paths with a dot, so it doesn't touch them; the locale comes from the route segment.
   - Hitting the internal path directly (`/es/legal/terms`) redirects (308) to the `.html` URL.
4. Old routes redirect with 308: `/privacy`, `/terms`, `/es/privacy`, `/es/terms`, `/en/privacy` and `/en/terms`.
5. Each page has:
   - a numbered eyebrow, H1, version and date in a `<dl>`, and the translation notice in English
   - a table of contents (`nav` + `ol`, sticky on desktop)
   - accessible tables: a focusable `role="region"` with a name, a `caption` and `th scope="col"`
   - the ES/EN switch pointing to the translated document, "Otros documentos" and canonical + hreflang
6. `sitemap.ts` lists the home in both languages and the 8 legal URLs, each with es / en / x-default.

## 5. Files

**Created**
- `content/legal/{es,en}/*.md`: copied by the script, not by hand
- `scripts/sync-legal.mjs`
- `public/flags/*.svg` + `LICENSE`: flag-icons, MIT, from `app/assets/flags`
- `src/assets/og-fonts/*.ttf` + licences: Syncopate, Sora and DM Sans, used only for the OG image
- `src/config/site.ts`
- `src/data/{achievements,currencies,features,mockups,navigation}.ts`
- `src/hooks/useSiteLocale.ts`
- `src/lib/legal/{documents,parseLegalMarkdown,loadLegalDocument}.ts`
- `src/types/{legal,navigation,messages.d}.ts`: `messages.d.ts` types the i18n keys, and a missing key doesn't compile (verified with a probe)
- `src/utils/{brandLogo,formatMoney,formatDate,motion,seo}.ts`
- `src/components/brand/`: `Logo`, `Pulse`, `DrawingPulse`, `StoreMarks`
- `src/components/motion/`: `Reveal`, `DrawOnViewPulse`
- `src/components/mockups/`:
  - phone and its pieces: `PhoneFrame`, `MockTag`, `MockProgressBar`, `MockSummaryCard`
  - screens: `GoalsHomeScreen`, `GoalDetailScreen`, `MonthPlanScreen`
  - cards and previews: `FinanceBalanceCard`, `StreakCard`, `WidgetPreview`, `AnalyticsBars`, `CurrencyFlags`, `OpeningPreview`, `OneOffPreview`, `RemindersPreview`
- `src/components/sections/`:
  - hero: `Hero`
  - chapters: `ProblemChapter`, `BalanceChapter`, `BalanceFlowDiagram`, `ModesChapter`, `FeaturesChapter`, `BentoTile`, `TrustChapter`
  - FAQ and close: `FaqChapter`, `ClosingCta`
- `src/components/shared/Chapter.tsx`
- `src/components/layout/`: `SiteShell`, `SiteHeader`, `StickyHeader`, `SiteFooter`, `MobileMenu`, `LanguageSwitch`, `StoreBadges`
- `src/components/legal/`: `LegalDocumentView`, `LegalBlocks`, `LegalTable`, `LegalInlineContent`
- `src/components/seo/`: `SoftwareApplicationJsonLd`, `OgPulse`
- `src/app/[locale]/legal/[document]/page.tsx`, `src/app/icon.svg` and `src/app/apple-icon.tsx`
- `docs/specs/screenshots/*.png` and this report

**Rewritten**
- `src/styles/globals.css`: all tokens for both themes, the type roles, motion, and Tailwind's default palette removed
- `messages/{es,en}.json`
- `next.config.ts`, `src/middleware.ts`, `src/i18n/*`, `src/lib/{env,utils}.ts`
- `src/app/layout.tsx`, `src/app/[locale]/{layout,page,opengraph-image}.tsx`, `src/app/{providers,not-found,sitemap,robots}.tsx/ts`
- `src/components/ui/{button,sheet,accordion}.tsx`, `src/components/layout/{DownloadButton,ThemeToggle}.tsx`
- `README.md` (yarn, `../app`, the real env vars, the legal flow), `.env.example` (`APK_URL`, which is what the code reads) and `.agents/product-marketing.md`
- `package.json`: only the `predev`, `prebuild` and `legal:sync` scripts; no dependency changes

**Deleted**
- the old sections (`Hero`, `TrustStrip`, `FeatureBento`, `ModesShowcase`, `Achievements`, `Privacy`, `FAQ`, `FinalCTA`)
- `Navbar`, `Footer`, `LanguageSwitcher`, `shared/{DeviceFrame,Logo,Section}` and `ui/tabs`
- `lib/content.ts`, the `privacy/` and `terms/` pages, `app/icon.png`, `app/apple-icon.png` and `public/goalspay-logo.png`

**Not touched:** `design-system/MASTER.md`. The coordinator wrote it; I followed it and did not overwrite it.

## 6. Design system as implemented

**Tokens:**
- `--gp-*` on `:root` / `.dark`, exposed to Tailwind with `@theme inline`.
- `--color-*: initial` removes Tailwind's palette, so only GoalsPay utilities exist (`bg-canvas`, `text-ink-2`, `text-link`, `bg-band`…).
- Radii: chip 8, icon 12, control 14, card 20, chapter 28, device 44, pill 999.
- The single mockup shadow is `--gp-mockup-shadow`.

**Type roles:**
- `type-display` (Sora 700, 64/40), `type-h2` (40/30), `type-h3` (24/20) and `type-tile` (20)
- `type-figure` / `type-figure-compact` (Sora 600, tabular)
- `type-body` (DM Sans 18/16, 1.6) and `type-small` (14/500)
- `type-eyebrow` (13/700 uppercase, 0.12em)
- mockups use `mock-*`, the app's `TYPE_SCALE`

**Fonts:** `next/font/google` in `[locale]/layout.tsx`: Syncopate 700, Sora 500/600/700 and DM Sans 400/500/700. They self-host at build, and the built HTML has 0 references to `fonts.googleapis.com` / `gstatic`.

**Logo:** `Logo` ports `brandLogo.ts`, with the same pulse path, optical stroke steps and wordmark metrics. Below an estimated 96px it renders only the symbol. It is one image named "GoalsPay", with theme and inverse tones.

**Icons:** `icon.svg` (navy, rounded, the favicon pulse) and `apple-icon` (180px, navy, pulse 104/180 as in §02 of the document) are generated at build. The OG image is static per locale.

**Theme:** next-themes, `defaultTheme="system"`, `storageKey="theme"`. The toggle's icon is chosen by CSS, so there is no hydration jump.

**Motion:**
- The hero pulse draws itself with pure CSS.
- The chapter-2 and final-CTA pulses and the chapter reveals use Framer Motion (`MotionConfig reducedMotion="user"`, 400ms, `cubic-bezier(0.2,0.8,0.2,1)`, opacity plus 12px, once, at 30% visible).
- The page is complete at rest:
  - The server HTML is in its final state: 0 `opacity:0` in the built HTML.
  - Only elements still below the fold when JS loads are primed.
  - Elements whose 30% can't fit the viewport (the bento on mobile) are never hidden. I found and fixed this bug at 375px.
  - Under `prefers-reduced-motion`, a CSS rule on `[data-motion]` forces the final state even before hydration.

## 7. Verification

| Check | Result |
|---|---|
| `yarn install` | OK with `--frozen-lockfile`. The global yarn cache is **corrupt** (ENOENT / integrity errors), so I used an isolated `--cache-folder` in the scratchpad |
| `yarn typecheck` | 0 errors. The probe `src/__probe.ts` is reported (`grep -c` = 1) and was deleted; a wrong i18n key fails as well |
| `yarn build` | OK (19 static pages, OG static per locale). Run again at the end on a copy without `../legal`, to reproduce Vercel: OK |
| `/es`, `/en` | 200 |
| `/` | **307 → `/es`** (or `/en`, from `NEXT_LOCALE` / Accept-Language), then 200. See §8 |
| The 8 legal URLs | 200, with the right H1, version 2026-10-01, a table of contents, tables, `lang` per locale, canonical and hreflang. No `.md` links left |
| `/es/privacy`, `/es/terms`, `/en/privacy`, `/en/terms`, `/privacy`, `/terms`, `/es/legal/*` | 308 to the `.html` URLs |
| `/sitemap.xml`, `/robots.txt`, `/icon.svg`, `/apple-icon`, `/es/opengraph-image` | 200. `/apple-icon` was redirected by the middleware until I excluded it from the matcher |
| Google Fonts in the HTML | 0 references |
| Cookies / storage | Only `NEXT_LOCALE=es; Max-Age=31536000; SameSite=lax` (set by the middleware on `/es` and `/en`; nothing on the `.html` pages). `theme` in localStorage only when the theme is changed. No other tracker |
| Headings | One `h1`; chapter `h2`s in order; `h3`s in tiles, trust items and FAQ questions |
| Horizontal overflow | None at 1280 or 375, in either theme (measured `scrollWidth`) |
| Literal hex in components | 0 (`grep` over `src/**/*.ts(x)`). The only exception is `src/config/site.ts`, used by the OG image, the Apple icon and the viewport, which can't read CSS variables |
| Case-sensitive imports | 84 files checked, 0 problems. I renamed `FinalCta` to `ClosingCta`: the case-only rename of `FinalCTA.tsx` would have broken on Linux / Vercel |
| Port 3000 | Never used or touched. My servers ran on 3100 and are stopped (0 listeners) |

**Screenshots** (`docs/specs/screenshots/`), all reviewed:
- `home-es-1280-light.png`, `home-es-1280-dark.png`
- `home-es-375-light.png`, `home-es-375-dark.png`
- `home-en-1280-light.png`
- `home-es-1280-light-reduced-motion.png`
- `legal-privacidad-1280-light.png`, `legal-cookies-en-375-dark.png`

Fixes made after reviewing them:
- an empty XL tile and reminders tile (added the rules chips and the reminders preview)
- a wrapped one-off amount
- empty space in the hero phone (a third goal)
- the dark hero merging with the next section
- the bento hidden on mobile

**Contrast** (WCAG, computed):

| Pair | Light | Dark |
|---|---|---|
| ink on canvas / surface / elevated | 16.67 / 17.74 / 16.67 | 18.00 / 16.67 / 13.80 |
| ink-2 on canvas / surface / elevated | 5.78 / 6.15 / 5.78 | 11.80 / 10.93 / 9.05 |
| ink-3 on canvas / surface / elevated | 4.57 / 4.87 / 4.57 | 6.39 / 5.92 / 4.90 |
| link on canvas / surface / elevated | 5.76 / 6.12 / 5.76 | 6.80 / 6.30 / 5.21 |
| danger text on surface | 5.33 | 6.41 |
| white on primary | 6.12 | 6.12 |
| on-secondary on secondary | 17.74 | 16.67 |
| ink band: white / `#C7CBD6` / `#7B93FF` | 17.74 / 10.93 / 6.30 | same (fixed band) |
| inverse card (navy / `#1F2937`): white / text-2 / accent | 17.74 / 10.93 / 6.30 | 14.68 / 9.05 / 5.21 |
| tags blue / sun / error / muted | 5.44 / 5.09 / 4.67 / 5.43 | 4.86 / 7.72 / 5.68 / 8.07 |
| navy on sun (streak tile) | 10.10 | 10.10 |
| UI: pulse / bars vs surface (≥ 3:1) | 4.18 | 4.24 |

Rules applied:
- `#4C6FFF` is never small text.
- On navy, accent text is `#7B93FF`.
- ink-3 is never used on `surface-muted` in light mode, where it would only reach 4.30.

**MASTER.md §9 checklist**

- [x] No hex outside `globals.css`. Exceptions: `config/site.ts`, for the non-CSS contexts, and the flag SVG files.
- [x] No Inter, no Abril Fatface, and no Google Fonts request in the built HTML.
- [x] Five chapters in the §3 order, each with a numbered eyebrow and one primary CTA per viewport. "Descargar" appears 3 times: the hero, after chapter 2 and the close.
- [x] Bento of 8 tiles with 3 sizes, readable in one column at 375. It deviates from the proposed composition; see §8.
- [x] Contrast in both themes: every text pair ≥ 4.5:1, and UI elements ≥ 3:1.
- [x] Reduced motion: the page is complete and static (screenshot).
- [x] Copy humanized, with nothing that can't be proven.
- [x] The legal URLs return 200.
- [x] Only the `NEXT_LOCALE` cookie and the `theme` storage key.
- [x] Typecheck with the probe, build OK, and light/dark screenshots at 1280 and 375 reviewed.

## 8. Decisions for you, and things to fix

1. **Someone else is working in `landing-web` at the same time.** None of the following was me:
   - **`package-lock.json` was created and `yarn.lock` was rewritten with `registry.npmjs.org` URLs at 19:10:18.** That is the signature of `npm install`, and it happened while my yarn install was still running.
   - **A `next dev` started at 19:51 on port 3001** (PID 13356/4392). It overwrote my production `.next`, which is why the final build and checks ran on a copy in the scratchpad.
   - **Several files are now staged in git**, including `package-lock.json`.

   I touched none of it. If you want yarn only:
   ```
   git restore --staged . && git checkout -- yarn.lock && rm package-lock.json && yarn install --frozen-lockfile
   ```
   Then stop that `next dev`.
2. **`/` answers 307, not 200.** I used `localePrefix: "always"`, so the legal URLs, `/es` and `/en` follow one pattern, and `/` sends each visitor to their language (cookie or Accept-Language). With `as-needed`, `/` would be a 200 but `/es` would become a 307 to `/`. Tell me if you prefer that.
3. **Cookie Policy wording.**
   - The name `NEXT_LOCALE` and the "up to 1 year" lifetime are correct: next-intl defaults to 31536000s with SameSite=Lax.
   - But next-intl sets the cookie **on the first visit** to `/es` or `/en`, with the detected language, and not only when you pick one. The policy says "Recordar el idioma que elegiste".
   - Suggestion: "Recordar el idioma del sitio (el que elegiste o el de tu navegador)". Turning that behavior off would mean losing the language memory.
4. **Achievements.** The app shows **12**, computed on the device in `app/src/utils/achievements.ts`. That is what the site says.
   - `backend/src/database/seeds/achievements.seed.ts` seeds a **different catalog of 7** (`saver_100`, `first_expense_paid`…), and the app doesn't display it.
   - The real label of the 30-day achievement is "Imparable".
   - Worth aligning both catalogs.
5. **Deviations from MASTER.md:**
   - **Bento:** the proposed composition (1 XL, 2 W, 1 T, 4 S) adds up to 14 cells, which leaves 2 holes in a 4-column grid, and it mixes 4 sizes while §4.3 and §9 allow at most 3. I used XL + 5 W + 2 S, which is 16 cells, 3 sizes and no holes. Streaks are W instead of T.
   - **Chapter 3:** the table asks for "two phones side by side" and "tabs on desktop" at once. I chose side by side, with no tabs, so neither proof is hidden and no JS is added.
   - **Type sizes:** inside the mockups, the app's own scale is kept. The page uses three tiers: Sora 40/32, DM Sans 18/16 and labels 13–14.
6. **`legal/README.md` is out of date.** It says the site "no pone cookies, no tiene analítica, no usa JavaScript" and that `legal/site/` is what gets published. Now the landing serves those URLs, with Vercel Analytics declared in the Cookie Policy. The legal Markdown itself needed no change.
7. **APK env var.**
   - The code reads `APK_URL`, but the old README and `.env.example` documented `NEXT_PUBLIC_APK_URL`. The route now accepts both.
   - Check in Vercel which one is set, and keep `APK_URL`.
   - `/api/download` answers 503 locally because neither is set.
8. **Not verifiable from the repo:**
   - the minimum Android version for the APK (I removed "Android 8+")
   - whether the user can change the currency after signing up (the copy only says "al crear la cuenta")
9. **Minor:**
   - Unused dependencies remain in `package.json` (`@radix-ui/react-tabs`, `-dropdown-menu`, `-navigation-menu`, `-tooltip`). I didn't remove them, to avoid touching `yarn.lock`.
   - There is no `favicon.ico`; `icon.svg` covers modern browsers.
   - The OG image `alt` is "GoalsPay" in both languages.
