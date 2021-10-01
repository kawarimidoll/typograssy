import { PIXEL_CHARACTERS } from "./characters.ts";

export function getEncodedCharacter(char: string): string {
  const undefinedCharacter = "/3/";
  return PIXEL_CHARACTERS[char] || undefinedCharacter;
}

// add a blank line to separate each character
export function getCharacterArray(char: string): number[][] {
  return `${getEncodedCharacter(char)}/`.split("/")
    .map((p) => p.split("").map((n) => Number(n)));
}

export function getPixelPositions(text: string): number[][] {
  return [...text].reduce(
    (acc, current) => acc.concat(getCharacterArray(current)),
    [] as number[][],
  );
}
