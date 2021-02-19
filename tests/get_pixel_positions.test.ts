import { assertStrictEquals } from "./deps.ts";
import getPixelPositions from "../api/get_pixel_positions.ts";

Deno.test({
  name: "pixelize 'a'",
  fn() {
    const pixelPositions = getPixelPositions("a");
    assertStrictEquals(
      JSON.stringify(pixelPositions),
      "[[2,5],[2,4,6],[3,4,5,6],[]]",
    );
  },
});

Deno.test({
  name: "pixelize 'あ'",
  fn() {
    const pixelPositions = getPixelPositions("あ");
    assertStrictEquals(
      JSON.stringify(pixelPositions),
      "[[4,5],[1,3,6],[0,1,2,3,4,5,6],[1,3,5],[1,3,4],[1,3,6],[4,5],[]]",
    );
  },
});
