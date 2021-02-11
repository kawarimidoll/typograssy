import getPixelPositions from "./get-pixel-positions.ts";
import h from "./tag.ts";

const weeks = 53;
const days = 7;
const rectSize = 10;
const rectSpan = 3;
const rectRadius = 2;
const rectStep = rectSize + rectSpan;
const rectStroke = "rgba(27,31,35,0.06)";
const rectStrokeWidth = 2;
const rect = (
  x: number,
  y: number,
  fill: string,
  attrs?: { [key: string]: string },
): string =>
  h("rect", {
    x: x * rectStep,
    y: y * rectStep,
    fill,
    width: rectSize,
    height: rectSize,
    rx: rectRadius,
    ry: rectRadius,
    stroke: rectStroke,
    "stroke-width": rectStrokeWidth,
    ...attrs,
  });

const width = rectStep * (weeks + 2) - rectSpan;
const height = rectStep * (days + 3) - rectSpan;

const legendPos = { x: width - rectStep * 7, y: height - rectSize * 2 };

export class Svg {
  private textRects: string;
  private baseRects: string;
  private scrollStyle: string;

  constructor(
    private text: string,
    private colors: string[],
    private bg: string,
    private frame: string,
    private speed: number,
  ) {
    const pixelPositons = getPixelPositions(this.text);

    const steps = pixelPositons.length;
    const needScroll = steps > weeks;
    const translateX = steps * rectStep;
    const ms = this.speed * steps;
    this.scrollStyle = needScroll
      ? h(
        "style",
        {},
        `#typograssy-pixels { animation: step ${ms}ms steps(${steps}) infinite; }`,
        `@keyframes step { to { transform:  translateX(-${translateX}px); } }`,
      )
      : "";

    const offset = needScroll ? 1 : Math.ceil((weeks - steps) / 2);
    const getRandomColor = () =>
      this.colors[Math.floor(Math.random() * (this.colors.length - 1)) + 1];
    this.textRects = pixelPositons.map((line, x) =>
      line.map((y) => {
        const color = getRandomColor();
        const ret = rect(x + offset, y, color);
        if (needScroll && x < weeks - offset) {
          return ret + rect(x + offset + steps, y, color);
        }
        return ret;
      }).join("")
    ).join("");

    this.baseRects = new Array(weeks * days).fill(0).map((_, i) =>
      rect(Math.floor(i / days), i % days, this.colors[0])
    ).join("");
  }

  render(): string {
    return h(
      "svg",
      { width, height, xmlns: "http://www.w3.org/2000/svg" },
      this.scrollStyle,
      h("rect", { width, height, stroke: this.frame, fill: this.bg }),
      h(
        "svg",
        {
          x: rectStep,
          y: rectStep,
          width: width - rectStep * 2,
          height: height - rectStep * 2,
        },
        h("g", {}, this.baseRects),
        h("g", { id: "typograssy-pixels" }, this.textRects),
      ),
      h(
        "g",
        { transform: `translate(${rectStep}, ${height - rectSize})` },
        h("text", { "font-size": rectStep }, "kawarimidoll/typograssy"),
      ),
      h(
        "g",
        { transform: `translate(${legendPos.x}, ${legendPos.y})` },
        this.colors.map((color, idx) => rect(idx, 0, color)).join(""),
      ),
    );
  }
}
