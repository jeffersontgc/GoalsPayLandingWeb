"use client";

import { useEffect, useRef } from "react";
import { useAnimate, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getPulseStroke, PULSE_DOT, PULSE_PATH, PULSE_VIEWBOX } from "@/utils/brandLogo";
import {
  BRAND_EASE,
  isBelowViewport,
  PULSE_DOT_DURATION_S,
  PULSE_DOT_START_SCALE,
  PULSE_DRAW_DURATION_S,
  REVEAL_VISIBLE_AMOUNT,
} from "@/utils/motion";

/** Con pathLength = 1, un offset de 1 es el trazo entero sin dibujar y 0 es el trazo completo. */
const HIDDEN_OFFSET = 1;
const DRAWN_OFFSET = 0;

interface DrawOnViewPulseProps {
  size: number;
  className?: string;
}

/**
 * El pulso que se dibuja al llegar al capítulo del balance (M1 de la App). Decorativo: llega
 * dibujado desde el servidor y solo se borra para dibujarse si aún no estaba a la vista.
 */
export const DrawOnViewPulse = ({ size, className }: DrawOnViewPulseProps) => {
  const { strokeWidth, dotRadius } = getPulseStroke(size);
  const [scope, animate] = useAnimate<SVGSVGElement>();
  const isInView = useInView(scope, { once: true, amount: REVEAL_VISIBLE_AMOUNT });
  const shouldReduceMotion = useReducedMotion();
  const isPrimedRef = useRef(false);

  useEffect(() => {
    const svg = scope.current;
    if (!svg || shouldReduceMotion || !isBelowViewport(svg)) return;
    isPrimedRef.current = true;
    animate("path", { strokeDashoffset: HIDDEN_OFFSET }, { duration: 0 });
    animate("circle", { opacity: 0, scale: PULSE_DOT_START_SCALE }, { duration: 0 });
  }, [animate, scope, shouldReduceMotion]);

  useEffect(() => {
    if (!isInView || !isPrimedRef.current) return;
    animate(
      "path",
      { strokeDashoffset: DRAWN_OFFSET },
      { duration: PULSE_DRAW_DURATION_S, ease: BRAND_EASE },
    );
    animate(
      "circle",
      { opacity: 1, scale: 1 },
      { duration: PULSE_DOT_DURATION_S, ease: BRAND_EASE, delay: PULSE_DRAW_DURATION_S },
    );
  }, [animate, isInView]);

  return (
    <svg
      ref={scope}
      data-motion
      viewBox={PULSE_VIEWBOX}
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={cn("block shrink-0", className)}
    >
      <path
        d={PULSE_PATH}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={DRAWN_OFFSET}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle
        cx={PULSE_DOT.cx}
        cy={PULSE_DOT.cy}
        r={dotRadius}
        fill="currentColor"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />
    </svg>
  );
};
