export const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(v, max));

export function remToPx(rem: number): number {
  const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return rem * rootFontSize;
}

export function pxToRem(px: number): number {
  const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return px / rootFontSize;
}
