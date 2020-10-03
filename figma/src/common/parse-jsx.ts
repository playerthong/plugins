import { numToAutoFixed } from "./num-to-auto-fixed";

export function parseNumJSX(std_str: string,
  jsx_str: string,
  isJsx: boolean,
  value: number): string {
  if (isJsx) {
    return `${jsx_str}: ${numToAutoFixed(value)}, `;
  } else {
    return `${std_str}: ${numToAutoFixed(value)}px; `;
  }
}
