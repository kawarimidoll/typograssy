import { assertEquals } from "@std/assert";
import {
  getCharacterArray,
  getEncodedCharacter,
  getPixelPositions,
} from "./get_pixel_positions.ts";

Deno.test("[getCharacterArray] 'a'", () => {
  const pixelPositions = getCharacterArray("a");
  assertEquals(
    pixelPositions,
    [[2, 5], [2, 4, 6], [3, 4, 5, 6], []],
  );
});

Deno.test("[getCharacterArray] 'あ'", () => {
  const pixelPositions = getCharacterArray("あ");
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

Deno.test("[getCharacterArray] undefined character", () => {
  const pixelPositions = getCharacterArray("Ω");
  assertEquals(
    pixelPositions,
    [[], [3], [], []],
  );
});

Deno.test("[getPixelPositions] 'aあΩ'", () => {
  const pixelPositions = getPixelPositions("aあΩ");
  assertEquals(
    pixelPositions,
    [
      [2, 5],
      [2, 4, 6],
      [3, 4, 5, 6],
      [],
      [4, 5],
      [1, 3, 6],
      [0, 1, 2, 3, 4, 5, 6],
      [1, 3, 5],
      [1, 3, 4],
      [1, 3, 6],
      [4, 5],
      [],
      [],
      [3],
      [],
      [],
    ],
  );
});

Deno.test("[getEncodedCharacter] 'a'", () => {
  const encodedCharacter = getEncodedCharacter("a");
  assertEquals(
    encodedCharacter,
    "25/246/3456",
  );
});
Deno.test("[getEncodedCharacter] 'あ'", () => {
  const encodedCharacter = getEncodedCharacter("あ");
  assertEquals(
    encodedCharacter,
    "45/136/0123456/135/134/136/45",
  );
});

Deno.test("[getEncodedCharacter] 'Ω'", () => {
  const encodedCharacter = getEncodedCharacter("Ω");
  assertEquals(
    encodedCharacter,
    "/3/",
  );
});
