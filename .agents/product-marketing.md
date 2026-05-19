# Product Marketing Context

*Last updated: 2026-05-18*
*Auto-drafted from mobile-app source (`C:/Users/jeffersondev/Documents/MetasApp/mobile-app`). Review and correct.*

## Product Overview
**One-liner:** Alcanza metas de ahorro 3x más rápido, sin que tu dinero salga de tu teléfono.
**What it does:** GoalsPay es una app móvil de finanzas personales con dos modos en uno: **Metas** (objetivos de ahorro con foto, fecha, categoría y proyección) y **Finanzas** (control de ingresos fijos y gastos mensuales). Gamifica el hábito con rachas, logros y un widget en tu pantalla de inicio, todo 100% local en el dispositivo.
**Product category:** Personal finance / savings goal tracker (no banca, sin conexión a cuentas reales).
**Product type:** Aplicación móvil nativa (Android + iOS) construida con Expo / React Native. Versión web no existe.
**Business model:** Gratis. Sin anuncios. Sin suscripción visible en el código. (Confirmar con el dueño si habrá premium futuro.)

## Target Audience
**Target companies:** N/A — producto B2C.
**Decision-makers:** El propio usuario final.
**Primary use case:** Ahorrar de forma disciplinada para metas concretas (un iPhone, un viaje, un fondo de emergencia) cuando los bancos / hojas de cálculo se sienten frías o complicadas.
**Jobs to be done:**
- "Quiero saber cuánto me falta y qué tan rápido voy para no rendirme"
- "Quiero ver mis ahorros como progreso visual, no como un número aburrido"
- "Quiero controlar mis gastos fijos del mes sin meter mi banco en una app extraña"

**Use cases:**
- Joven LATAM que ahorra para un objeto/viaje específico (foto del producto + barra de progreso)
- Persona que quiere armar un fondo de emergencia con depósitos pequeños y recurrentes
- Usuario que quiere ver de un vistazo "qué me queda este mes después de gastos fijos"
- Pareja/familia que distribuye dinero en varias metas en paralelo
- Quien busca privacidad: no quiere conectar su banco a ninguna app

## Personas
B2C: persona única primaria.

| Persona | Cares about | Challenge | Value we promise |
|---------|-------------|-----------|------------------|
| Ahorrador LATAM 22–40 años | Cumplir metas concretas sin sentirse vigilado | Le cuesta mantener el hábito; otras apps piden conectar el banco | Visualiza el progreso, rachas que motivan, datos solo en su teléfono |

## Problems & Pain Points
**Core problem:** Ahorrar es "aburrido y abstracto". La gente abre la calculadora, hace una nota, y a la semana ya no se acuerda. Las apps gringas (Mint, YNAB) no soportan moneda local LATAM ni tienen tono cercano.
**Why alternatives fall short:**
- Excel / Notas: cero motivación, cero visualización, cero recordatorios
- Apps bancarias: muestran lo que ya gastaste, no te ayudan a planear metas
- Mint / YNAB / Rocket Money: enfoque presupuesto, no metas; en inglés; requieren conexión bancaria; muchas no funcionan fuera de USA
- Hojas de cálculo: requieren disciplina, no son móviles

**What it costs them:** Metas pospuestas meses o años, dinero gastado en impulsos, sensación de "nunca ahorro nada".
**Emotional tension:** Frustración con uno mismo, vergüenza por no avanzar, ansiedad ante imprevistos.

## Competitive Landscape
**Direct:** Fintonic, Mobills, Wallet by BudgetBakers — apps de finanzas LATAM/globales. Falla: muchas requieren conexión bancaria, freemium agresivo, foco en presupuesto no en metas concretas con foto.
**Secondary:** YNAB, Mint, Rocket Money — apps anglo, no localizadas a 14 monedas LATAM, paywall mensual.
**Indirect:** Excel/Google Sheets, Notas del teléfono, alcancía física, "lo que sobre en la cuenta" — fricción alta o nula visualización.

## Differentiation
**Key differentiators:**
- **Dos apps en una**: switch entre modo Metas (objetivos) y modo Finanzas (ingresos / gastos fijos)
- **Gamificación real**: 12+ logros (Primer paso, En racha, Veterano, Imparable…) y streak diaria de depósitos
- **Privacidad por defecto**: datos solo en el dispositivo (AsyncStorage), backup opcional a tu propio Google Drive
- **14 monedas LATAM** nativas (USD, EUR, GTQ, MXN, NIO, CRC, PAB, HNL, BRL, VEF, DOP, ARS, PYG, CLP)
- **Widget Android** con el progreso de tu meta principal en la pantalla de inicio
- **Personalización profunda**: cinco estilos de tarjeta (modern, minimalist, classic, neumorphism, glass), colores de marca personalizables
- **Biometría** (Face ID / huella) y bilingüe ES/EN
- **Proyección inteligente**: te dice cuánto necesitas ahorrar por semana / día para llegar a tu fecha objetivo
- **Foto del producto** que estás ahorrando — convierte el ahorro en algo tangible

**How we do it differently:** En lugar de pedirte que conectes tu banco y luego mostrarte gráficas de "ya gastaste", GoalsPay te pone una foto del iPhone que quieres y una barra que sube cada vez que abonas. Hábito + dopamina + tu propio dinero, tu propio ritmo.
**Why that's better:** Mantiene la motivación viva (rachas, logros, foto), elimina la fricción de seguridad (sin login bancario), y respeta tu moneda real.
**Why customers choose us:** Porque pueden empezar en 30 segundos, sin conectar nada, sin pagar nada, y ver progreso visible la primera semana.

## Objections
| Objection | Response |
|-----------|----------|
| "¿Para qué otra app de finanzas?" | No es una app de finanzas tradicional: es un tracker de metas con foto y rachas, que ADEMÁS gestiona ingresos y gastos fijos. Dos apps en una. |
| "¿Es segura? ¿Tienen mis datos?" | No. Toda la información vive en tu teléfono. No hay servidor, no hay cuenta. Backup opcional a tu propio Google Drive. |
| "¿Es gratis de verdad o me van a cobrar después?" | Gratis hoy, sin anuncios. (Confirmar plan de monetización si aplica.) |
| "Ya tengo mi banca móvil" | Tu banca te muestra lo que pasó. GoalsPay te muestra lo que va a pasar si sigues abonando. |
| "Soy de [país pequeño], las apps gringas no me sirven" | Soportamos 14 monedas LATAM nativas y la UI está en español. |

**Anti-persona:** Empresarios/contadores que necesitan multiusuario, facturación, integración bancaria o reportes fiscales. GoalsPay es personal, no corporativo.

## Switching Dynamics
**Push:** Ya intenté con Excel y no lo abro; el banco me deprime; pongo dinero en una alcancía y se me olvida.
**Pull:** "Quiero ver una barra subir hacia mi meta", "quiero una racha que me obligue a no romperla", "no quiero meter mi banco en una app rara".
**Habit:** Calcular mentalmente, hacer notas en el celular, revisar el banco una vez por semana.
**Anxiety:** "¿Y si se pierde mi info?" (respuesta: backup Google Drive opcional). "¿Y si se vuelve cara?" (respuesta: hoy es gratis y sin anuncios).

## Customer Language
**How they describe the problem:**
- "Nunca llego a fin de mes con algo guardado"
- "No sé cuánto me falta para [meta]"
- "Quiero ahorrar pero se me va la motivación"
- "Apunto en notas pero después no le hago caso"

**How they describe us:**
- "La app de la fotito y la barrita"
- "La de las metas con racha"
- "Como una alcancía pero digital y con foto"

**Words to use:** metas, ahorrar, racha, progreso, abonar (no "depositar" en bancario), avance, motivación, control, tu ritmo, sin complicaciones, privado, gratis, local, en tu teléfono.
**Words to avoid:** presupuesto (intimidante), inversión (no lo es), banco / bancario (no lo es), suscripción, premium (a menos que confirmes plan de monetización), patrimonio.

**Glossary:**
| Term | Meaning |
|------|---------|
| Meta | Objetivo de ahorro con monto, fecha y opcionalmente foto |
| Abono | Depósito que sumas a una meta (no "depósito bancario") |
| Racha | Días consecutivos haciendo al menos un abono |
| Logro | Achievement desbloqueado por hitos (primer abono, 30 días, etc.) |
| Modo Metas / Modo Finanzas | Dos vistas distintas dentro de la misma app |
| Gastos fijos | Pagos recurrentes mensuales (renta, suscripciones, etc.) |

## Brand Voice
**Tone:** Cercano, motivacional, optimista, sin paternalismo. Como un coach amigo, no un asesor financiero formal.
**Style:** Frases cortas, verbos en presente, segunda persona ("tú"), llamado a la acción claro. Cero jerga bancaria.
**Personality:**
- Motivador (te empuja a seguir la racha)
- Honesto (privacidad real, no marketing falso)
- Cálido (LATAM friendly, no anglo frío)
- Disciplinado (de verdad ayuda a ahorrar)
- Moderno (visuales premium, no aburrido)

## Proof Points
**Metrics:** "Alcanza metas 3x más rápido" (claim oficial del app.json — validar fuente). 12 logros desbloqueables, hasta 14 monedas, dos modos en una sola app.
**Customers:** Aún no hay testimoniales públicos. Pendiente recopilar después del lanzamiento.
**Testimonials:** TBD — pedir al usuario testimoniales reales tras primeras descargas.
**Value themes:**
| Theme | Proof |
|-------|-------|
| Privacidad real | Datos 100% locales (AsyncStorage); sin login, sin servidor |
| Motivación que funciona | Sistema de rachas + 12 logros + barra de progreso visual + widget |
| Pensado para LATAM | 14 monedas, español nativo, sin requerir banco USA |
| Sin fricción | Empieza a usar en 30 segundos, sin registro |
| Dos apps en una | Modo Metas y modo Finanzas con un solo switch |

## Goals
**Business goal:** Conseguir primeras descargas reales y rotación orgánica antes de evaluar monetización.
**Conversion action:** Descargar el APK directo (mientras llega la aprobación de Play Store) y, una vez listo, redirigir al badge oficial de Play Store / App Store.
**Current metrics:** Sin datos públicos aún. Pendiente integrar analytics en la landing (Plausible / Vercel Analytics).
