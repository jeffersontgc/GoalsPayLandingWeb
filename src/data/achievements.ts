/**
 * Los logros que la App muestra hoy (app/src/utils/achievements.ts, calculados en el teléfono
 * con las metas y los abonos). Son 12; el catálogo del backend (achievements.seed.ts) es otro
 * y la App no lo muestra.
 */
export const ACHIEVEMENT_IDS = [
  "first_goal",
  "first_deposit",
  "five_deposits",
  "twenty_deposits",
  "fifty_deposits",
  "streak_3",
  "streak_7",
  "streak_30",
  "first_completion",
  "five_completions",
  "multi_goals",
  "saver_1000",
] as const;

export const ACHIEVEMENT_COUNT = ACHIEVEMENT_IDS.length;
