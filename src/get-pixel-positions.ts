const CHARACTER_UNDEFINED = "/3/";
const getEncodedCharacter = (char: string): string =>
  JSON.parse(
    new TextDecoder().decode(Deno.readFileSync("./src/characters.json")),
  )[char] || CHARACTER_UNDEFINED;

// add a blank line to separate each character
const getCharacterArray = (char: string): number[][] =>
  `${getEncodedCharacter(char)}/`
    .split("/")
    .map((p) => p.split("").map((n) => Number(n)));

export default (text: string): number[][] =>
  text
    .split("")
    .reduce(
      (acc, crnt) => acc.concat(getCharacterArray(crnt)),
      [] as number[][],
    );
