import { assertEquals } from "./deps.ts";
import getPixelPositions from "./get_pixel_positions.ts";

Deno.test("pixelize 'a'", () => {
  const pixelPositions = getPixelPositions("a");
  assertEquals(
    pixelPositions,
    [[2, 5], [2, 4, 6], [3, 4, 5, 6], []],
  );
});

Deno.test("pixelize 'あ'", () => {
  const pixelPositions = getPixelPositions("あ");
  assertEquals(
    pixelPositions,
    [
      [4, 5],
      [1, 3, 6],
      [0, 1, 2, 3, 4, 5, 6],
      [1, 3, 5],
      [1, 3, 4],
      [1, 3, 6],
      [4, 5],
      [],
    ],
  );
});
