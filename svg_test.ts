import { assertEquals, assertStringIncludes } from "@std/assert";
import { Svg } from "./svg.ts";

Deno.test("error", async () => {
  const resultSvg = await Deno.readTextFile(
    "./resources/tests/test_error.svg",
  );
  const msg = "this is an error message!";
  assertEquals(
    Svg.error(msg),
    resultSvg.trim().replace("ERROR_MESSAGE", msg),
  );
});

Deno.test("success", async () => {
  const resultSvg = await Deno.readTextFile(
    "./resources/tests/test_render.svg",
  );

  // replace l0-l4 to 'level' to avoid random output
  const levels = /l[1-4]/g;

  const text = "This is text ";
  const colors = [
    "#000000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#00ffff",
  ];
  const bg = "#ff0000";
  const frame = "#ff00ff";
  // const speed = 200;
  const comment = "super comment";

  assertEquals(
    Svg.render({ text, colors, bg, frame, comment }).replace(
      levels,
      "level",
    ),
    resultSvg.trim().replace(levels, "level"),
  );
});

Deno.test("scroll", () => {
  // text long enough to exceed 53 columns (weeks) and trigger scrolling
  const text = "This is a long scrolling text! ";
  const svg = Svg.render({ text });

  assertStringIncludes(svg, "animation:step");
  assertStringIncludes(svg, "@keyframes step");
  assertStringIncludes(svg, "translateX(");
  assertStringIncludes(svg, 'id="text-pixels"');
});
