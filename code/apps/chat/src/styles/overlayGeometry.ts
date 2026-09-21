import type { MiddlewareState } from "@floating-ui/react";

// These two geometry tokens use px so Floating UI reads their computed values
// without duplicating CSS constants in JavaScript. Re-read on every positioning pass.
function pixels(state: MiddlewareState, name: string): number {
  return (
    Number.parseFloat(
      getComputedStyle(state.elements.floating).getPropertyValue(name),
    ) || 0
  );
}
export const overlayGap = (state: MiddlewareState) =>
  pixels(state, "--overlay-gap");
export const overlayPadding = (state: MiddlewareState) =>
  pixels(state, "--overlay-viewport-padding");
