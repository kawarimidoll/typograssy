import { assertEquals } from "./deps.ts";
import { apiHandler, apiHeaders } from "./api_handler.ts";

Deno.test("error", async () => {
  const resultSvg = await Deno.readTextFile(
    "./resources/tests/test_error.svg",
  );
  const response = apiHandler(new URLSearchParams(""));
  const headers = response.headers;
  const svg = await response.text();
  assertEquals(
    headers.entries(),
    apiHeaders.entries(),
  );
  assertEquals(
    svg,
    resultSvg.trim(),
  );
});

Deno.test("success", async () => {
  const resultSvg = await Deno.readTextFile(
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
    resultSvg.trim().replace(levels, "level"),
  );
});
