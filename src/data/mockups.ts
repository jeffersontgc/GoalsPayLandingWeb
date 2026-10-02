import type { CurrencyCode } from "@/data/currencies";

/**
 * Datos de ejemplo de los mockups, en córdobas. Son ilustraciones: los nombres están en
 * messages/*.json (mockups.*) y aquí solo van cifras y fechas. Las cuentas cuadran entre sí:
 * el diagrama del balance, la tarjeta del bento y el plan del mes cuentan el mismo mes.
 */

export const SAMPLE_CURRENCY: CurrencyCode = "NIO";

export type TagTone = "blue" | "sun" | "error" | "muted";

/** Inicio de Metas (hero). 7,320 + 11,130 + 2,400 = 20,850. */
export const GOALS_HOME_SAMPLE = {
  streakDays: 12,
  totalSaved: 20850,
  savedThisMonth: 2300,
  goals: [
    { key: "laptop", current: 7320, target: 12000 },
    { key: "emergency", current: 11130, target: 13250 },
    { key: "trip", current: 2400, target: 8000 },
  ],
} as const;

export type GoalsHomeGoalKey = (typeof GOALS_HOME_SAMPLE.goals)[number]["key"];

export type GoalMovementKind = "deposit" | "priorSavings";

/**
 * Meta con sus abonos (capítulo de los modos). 1,500 + 1,200 + 2,000 + 2,620 = 7,320.
 * Faltan 4,680 en 56 días: 585 por semana y unos 84 por día, como lo calcula la App.
 */
export const GOAL_DETAIL_SAMPLE = {
  current: 7320,
  target: 12000,
  perWeek: 585,
  perDay: 84,
  daysLeft: 56,
  movements: [
    { key: "fortnight", kind: "deposit", amount: 1500, date: "2026-09-28" },
    { key: "bonus", kind: "deposit", amount: 1200, date: "2026-09-15" },
    { key: "extra", kind: "deposit", amount: 2000, date: "2026-08-30" },
    { key: "prior", kind: "priorSavings", amount: 2620, date: "2026-08-01" },
  ],
} as const satisfies {
  current: number;
  target: number;
  perWeek: number;
  perDay: number;
  daysLeft: number;
  movements: readonly { key: string; kind: GoalMovementKind; amount: number; date: string }[];
};

export type GoalMovementKey = (typeof GOAL_DETAIL_SAMPLE.movements)[number]["key"];

/** Diagrama del balance: 24,000 − 10,300 = 13,700; tras abonar 1,500 quedan 12,200. */
export const BALANCE_FLOW_SAMPLE = {
  received: 24000,
  paid: 10300,
  beforeGoals: 13700,
  deposit: 1500,
  available: 12200,
  /** Abono que la App rechaza porque supera el balance. */
  blockedDeposit: 15000,
} as const;

/**
 * Balance de Finanzas con el desglose completo (bento). Es el mismo mes del diagrama más el
 * saldo inicial y los puntuales: 25,950 − 10,870 − 1,500 = 13,580.
 */
export const FINANCE_BALANCE_SAMPLE = {
  available: 13580,
  moneyIn: { total: 25950, opening: 1200, recurring: 24000, oneOff: 750 },
  moneyOut: { total: 10870, recurring: 10300, oneOff: 570 },
  inGoals: { total: 1500, deposited: 1800, withdrawn: 300 },
} as const;

/** Movimientos puntuales del mismo mes: los 750 y 570 del desglose. */
export const ONE_OFF_SAMPLE = {
  income: 750,
  expense: 570,
} as const;

/** Saldo inicial y ahorro previo (bento). */
export const OPENING_SAMPLE = {
  openingBalance: 1200,
  priorSavings: 2620,
} as const;

export type MonthPlanStatus = "received" | "paid" | "pending" | "skipped";

/** Tono de etiqueta de cada estado, como STATUS_TAG_TONE de la App. */
export const MONTH_PLAN_STATUS_TONE: Record<MonthPlanStatus, TagTone> = {
  received: "blue",
  paid: "blue",
  pending: "sun",
  skipped: "muted",
};

/** Plan del mes: los gastos pagados suman los 10,300 del diagrama. */
export const MONTH_PLAN_SAMPLE = {
  rows: [
    { key: "salary", kind: "income", amount: 24000, status: "received", day: 1 },
    { key: "rent", kind: "expense", amount: 6500, status: "paid", day: 5 },
    { key: "groceries", kind: "expense", amount: 3000, status: "paid", day: 8 },
    { key: "internet", kind: "expense", amount: 800, status: "paid", day: 12 },
    { key: "power", kind: "expense", amount: 1100, status: "pending", day: 20 },
    { key: "gym", kind: "expense", amount: 900, status: "skipped", day: 25 },
  ],
} as const satisfies {
  rows: readonly {
    key: string;
    kind: "income" | "expense";
    amount: number;
    status: MonthPlanStatus;
    day: number;
  }[];
};

export type MonthPlanRowKey = (typeof MONTH_PLAN_SAMPLE.rows)[number]["key"];

/** Flujo de seis meses para la mini gráfica de analíticas (miles de córdobas). */
export const ANALYTICS_SAMPLE = [
  { month: "2026-04", moneyIn: 24, moneyOut: 13 },
  { month: "2026-05", moneyIn: 24, moneyOut: 15 },
  { month: "2026-06", moneyIn: 26, moneyOut: 12 },
  { month: "2026-07", moneyIn: 24, moneyOut: 14 },
  { month: "2026-08", moneyIn: 25, moneyOut: 11 },
  { month: "2026-09", moneyIn: 26, moneyOut: 11 },
] as const;

export const ANALYTICS_MAX_VALUE = 26;

/** Ejemplo de la tarjeta de racha. */
export const STREAK_SAMPLE_DAYS = 12;
