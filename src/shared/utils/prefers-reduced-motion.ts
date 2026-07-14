/** Whether the user has requested reduced motion. Evaluated at call time. */
export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
