export { tag } from "https://deno.land/x/markup_tag@0.4.0/mod.ts";
export { assertEquals } from "https://deno.land/std@0.218.2/testing/asserts.ts";
export { randomInteger } from "https://deno.land/std@0.218.2/collections/_utils.ts";

import { range as genRange } from "https://deno.land/x/it_range@v1.0.3/range.mjs";
export function range(start: number, end?: number, step?: number): number[] {
  return [...genRange(start, end, step)];
}
