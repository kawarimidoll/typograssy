import characters from "./characters.ts";

const CHARACTER_UNDEFINED = "/3/";
const getEncodedCharacter = (char: string): string =>
  characters[char] || CHARACTER_UNDEFINED;

// add a blank line to separate each character
const getCharacterArray = (char: string): number[][] =>
  `${getEncodedCharacter(char)}/`
    .split("/")
    .map((p) => p.split("").map((n) => Number(n)));

export default function (text: string): number[][] {
  return text
    .split("")
    .reduce(
      (acc, crnt) => acc.concat(getCharacterArray(crnt)),
      [] as number[][],
    );
}
