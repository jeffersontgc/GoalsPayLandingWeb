"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useAnimate, useInView, useReducedMotion } from "framer-motion";
import {
  BRAND_EASE,
  canReachRevealAmount,
  isBelowViewport,
  REVEAL_DURATION_S,
  REVEAL_OFFSET_Y_PX,
  REVEAL_VISIBLE_AMOUNT,
} from "@/utils/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delaySeconds?: number;
}

/**
 * Entrada con opacidad + 12 px, una vez, al 30 % visible. El HTML del servidor llega en su
 * estado final: solo se esconde, ya con JS, lo que aún está debajo de la pantalla. Con
 * movimiento reducido no se toca nada (y el CSS de [data-motion] lo garantiza igualmente).
 */
export const Reveal = ({ children, className, delaySeconds = 0 }: RevealProps) => {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const isInView = useInView(scope, { once: true, amount: REVEAL_VISIBLE_AMOUNT });
  const shouldReduceMotion = useReducedMotion();
  const isPrimedRef = useRef(false);

  useEffect(() => {
    const element = scope.current;
    if (!element || shouldReduceMotion) return;
    if (!isBelowViewport(element) || !canReachRevealAmount(element)) return;
    isPrimedRef.current = true;
    animate(element, { opacity: 0, y: REVEAL_OFFSET_Y_PX }, { duration: 0 });
  }, [animate, scope, shouldReduceMotion]);

  useEffect(() => {
    const element = scope.current;
    if (!element || !isInView || !isPrimedRef.current) return;
    animate(
      element,
      { opacity: 1, y: 0 },
      { duration: REVEAL_DURATION_S, ease: BRAND_EASE, delay: delaySeconds },
    );
  }, [animate, delaySeconds, isInView, scope]);

  return (
    <div ref={scope} data-motion className={className}>
      {children}
    </div>
  );
};
