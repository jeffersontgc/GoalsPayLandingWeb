/** Movimiento de MASTER.md §2.4: 200–400 ms, entrada con opacidad y 12 px, una sola vez. */
export const BRAND_EASE = [0.2, 0.8, 0.2, 1] as const;
export const REVEAL_DURATION_S = 0.4;
export const REVEAL_OFFSET_Y_PX = 12;
/** Fracción del elemento que tiene que estar a la vista para que entre. */
export const REVEAL_VISIBLE_AMOUNT = 0.3;
export const PULSE_DRAW_DURATION_S = 0.9;
export const PULSE_DOT_DURATION_S = 0.3;
export const PULSE_DOT_START_SCALE = 0.4;

/**
 * Solo se esconde (para luego animarlo) lo que todavía está por debajo de la pantalla cuando
 * el JS ya cargó. Lo demás se queda como vino del servidor: la página está completa en reposo.
 */
export const isBelowViewport = (element: Element): boolean =>
  element.getBoundingClientRect().top > window.innerHeight;

/**
 * Un elemento cuyo 30 % no cabe en la pantalla (el bento entero en un móvil) nunca llegaría
 * a "estar a la vista": ese no se esconde, se queda tal cual.
 */
export const canReachRevealAmount = (element: HTMLElement): boolean =>
  element.offsetHeight * REVEAL_VISIBLE_AMOUNT < window.innerHeight;
