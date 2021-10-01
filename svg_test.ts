import { assertEquals } from "./deps.ts";
import { Svg } from "./svg.ts";

Deno.test("error", async () => {
  const resultSvg = await Deno.readTextFile(
    "./resources/tests/test_error.svg",
  );
  assertEquals(
    Svg.error("'text' parameter is required. e.g. 'text=Hello%20world!'"),
    resultSvg.trim(),
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
// /api
// api?text=This%20is%20text%20&l0=000000&l1=000000&l2=000000&l3=000000&l4=000000&bg=ff0000&frame=00ff00&comment=super%20comment
