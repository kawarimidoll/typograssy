import { getPixelPositions } from "./get_pixel_positions.ts";
import { randomInteger, range, tag as h } from "./deps.ts";

const svgID = "typograssy";
const xmlns = "http://www.w3.org/2000/svg";

const weeks = 53;
const days = 7;
const rectSize = 10;
const rectSpan = 3;
const rectRadius = 2;
const rectStep = rectSize + rectSpan;

const rectStyle = `#${svgID} .pixel{` +
  `width:${rectSize}px;height:${rectSize}px;` +
  `rx:${rectRadius}px;ry:${rectRadius}px;` +
  "stroke:rgba(27,31,35,0.06);stroke-width:2px;}" +
  `#${svgID} text{font-family:monospace;}`;

const rect = (
  x: number,
  y: number,
  level: number,
): string =>
  h("rect", {
    class: `pixel l${level}`,
    x: x * rectStep,
    y: y * rectStep,
  });

const g = (
  first: Record<string, string | number | boolean> | string,
  ...rest: string[]
) => h("g", first, ...rest);

const width = rectStep * (weeks + 2) - rectSpan;
const height = rectStep * (days + 3) - rectSpan;

const legendPos = { x: width - rectStep * 7, y: height - rectSize * 2 };

export class Svg {
  static render(
    text: string,
    colors: string[],
    bg: string,
    frame: string,
    speed: number,
    comment: string,
  ): string {
    const pixelPositions = getPixelPositions(text);

    const steps = pixelPositions.length;
    const needScroll = steps > weeks;
    const translateX = steps * rectStep;
    const ms = speed * steps;
    const scrollStyle = needScroll
      ? `#${svgID} #text-pixels{animation:step ${ms}ms steps(${steps}) infinite;}` +
        `@keyframes step{to{transform:translateX(-${translateX}px);}}`
      : "";

    const offset = needScroll ? 1 : Math.ceil((weeks - steps) / 2);

    const textRects = pixelPositions.map((line, x) =>
      line.map((y) => {
        const color = randomInteger(1, colors.length - 1);
        const ret = rect(x + offset, y, color);
        if (needScroll && x < weeks - offset) {
          return ret + rect(x + offset + steps, y, color);
        }
        return ret;
      }).join("")
    ).join("");

    const baseRects = range(weeks * days).map((i) =>
      rect(Math.floor(i / days), i % days, 0)
    ).join("");

    return h(
      "svg",
      { width, height, xmlns, id: svgID },
      h(
        "style",
        scrollStyle,
        rectStyle,
        ...colors.map((color, idx) => `#${svgID} .l${idx}{fill:${color};}`),
      ),
      h("rect", { width, height, stroke: frame, fill: bg }),
      h(
        "svg",
        {
          x: rectStep,
          y: rectStep,
          width: width - rectStep * 2,
          height: height - rectStep * 2,
        },
        g(baseRects),
        g({ id: "text-pixels" }, textRects),
      ),
      g(
        { transform: `translate(${rectStep}, ${height - rectSize})` },
        h("text", { "font-size": rectStep }, comment),
      ),
      g(
        { transform: `translate(${legendPos.x}, ${legendPos.y})` },
        ...colors.map((_, idx) => rect(idx, 0, idx)),
      ),
    );
  }

  static error(message: string): string {
    return h(
      "svg",
      { width, height, xmlns, id: svgID },
      g(
        { transform: `translate(${width / 2}, ${height / 2 + rectSize})` },
        h(
          "text",
          { "font-size": rectSize * 2, "text-anchor": "middle" },
          message,
        ),
      ),
    );
  }
}
