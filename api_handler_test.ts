import { assertEquals } from "./deps.ts";
import {
  apiHandler,
  apiHeaders,
  errorMessages,
  getValidColor,
} from "./api_handler.ts";

const errorSvg = await Deno.readTextFile(
  "./resources/tests/test_error.svg",
);
function loadErrorSvg(msg: string) {
  return errorSvg.trim().replace("ERROR_MESSAGE", msg);
}

Deno.test("[apiHandler] error: no text parameter", async () => {
  const response = apiHandler(new URLSearchParams(""));
  const headers = response.headers;
  const svg = await response.text();
  assertEquals(
    headers.entries(),
    apiHeaders.entries(),
  );
  assertEquals(
    svg,
    loadErrorSvg(errorMessages.noText),
  );
});

Deno.test("[apiHandler] error: too long text parameter", async () => {
  const text =
    "This is a too long text parameter that cannot be rendered by Typograssy";

  const response = apiHandler(new URLSearchParams({ text }));
  const headers = response.headers;
  const svg = await response.text();
  assertEquals(
    headers.entries(),
    apiHeaders.entries(),
  );
  assertEquals(
    svg,
    loadErrorSvg(errorMessages.tooLongText),
  );
});

Deno.test("[apiHandler] error: too long comment parameter", async () => {
  const text = "a";
  const comment =
    "This is a too long text parameter that cannot be rendered by Typograssy";

  const response = apiHandler(new URLSearchParams({ text, comment }));
  const headers = response.headers;
  const svg = await response.text();
  assertEquals(
    headers.entries(),
    apiHeaders.entries(),
  );
  assertEquals(
    svg,
    loadErrorSvg(errorMessages.tooLongComment),
  );
});

Deno.test("[apiHandler] error: invalid color", async () => {
  const response = apiHandler(new URLSearchParams({ text: "a", l0: "a" }));
  const headers = response.headers;
  const svg = await response.text();
  assertEquals(
    headers.entries(),
    apiHeaders.entries(),
  );
  assertEquals(
    svg,
    loadErrorSvg(errorMessages.invalidColor),
  );
});

Deno.test("[apiHandler] success", async () => {
  const successSvg = await Deno.readTextFile(
    "./resources/tests/test_render.svg",
  );

  // replace l0-l4 to 'level' to avoid random output
  const levels = /l[1-4]/g;

  const params = {
    text: "This is text ",
    l0: "000000",
    l1: "00ff00",
    l2: "0000ff",
    l3: "ffff00",
    l4: "00ffff",
    bg: "ff0000",
    frame: "ff00ff",
    comment: "super comment",
  };

  const response = apiHandler(new URLSearchParams(params));
  const headers = response.headers;
  const svg = await response.text();
  assertEquals(
    headers.entries(),
    apiHeaders.entries(),
  );
  assertEquals(
    svg.replace(levels, "level"),
    successSvg.trim().replace(levels, "level"),
  );
});

Deno.test("[getValidColor] check colors", () => {
  assertEquals(
    getValidColor("abc123"),
    "#abc123",
  );
  assertEquals(
    getValidColor("a91"),
    "#a91",
  );
  assertEquals(
    getValidColor("floralwhite"),
    "floralwhite",
  );
  assertEquals(
    getValidColor("none"),
    "none",
  );
  assertEquals(
    getValidColor("#123"),
    null,
  );
  assertEquals(
    getValidColor("12345"),
    null,
  );
  assertEquals(
    getValidColor("firered"),
    null,
  );
});
