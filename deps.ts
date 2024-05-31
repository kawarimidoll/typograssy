import { range as genRange } from "https://deno.land/x/it_range@v1.0.3/range.mjs";
export function range(start: number, end?: number, step?: number): number[] {
  return [...genRange(start, end, step)];
}
