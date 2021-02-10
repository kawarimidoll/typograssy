import getPixelPositions from "./get-pixel-positions.ts";
import h from "./tag.ts";

const weeks = new Array(53).fill(0).map((_, i) => i);
const days = new Array(7).fill(0).map((_, i) => i);
const rectSize = 10;
const rectSpan = 3;
const rectRadius = 2;
const rectStep = rectSize + rectSpan;
const rectStroke = "rgba(27,31,35,0.06)";
const rectStrokeWidth = 2;
const rect = (x: number, y: number, fill: string): string =>
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
  });

const width = rectStep * (weeks.length + 2) - rectSpan;
const height = rectStep * (days.length + 3) - rectSpan;

const legendPos = { x: width - rectStep * 7, y: height - rectSize * 2 };

export class Svg {
  private textRects: string;
  private baseRects: string;
  constructor(
    private text: string,
    private colors: string[],
    private bg: string,
    private frame: string,
  ) {
    const pixelPositons = getPixelPositions(this.text);

    const steps = pixelPositons.length;
    const offset = Math.ceil((weeks.length - steps) / 2);
    const getRandomColor = () =>
      this.colors[Math.floor(Math.random() * (this.colors.length - 1)) + 1];
    this.textRects = pixelPositons.map((line, x) =>
      days.map((day) => {
        if (!line.includes(day)) {
          return "";
        }
        const color = getRandomColor();
        const ret = rect(x + offset, day, color);
        return ret;
      }).join("")
    ).join("");

    this.baseRects = weeks.map((week) =>
      days.map((day) => rect(week, day, this.colors[0])).join("")
    ).join("");
  }

  render(): string {
    return h(
      "svg",
      { width, height, xmlns: "http://www.w3.org/2000/svg" },
      h("rect", { width, height, stroke: this.frame, fill: this.bg }),
      h(
        "g",
        { transform: `translate(${rectStep}, ${rectStep})` },
        this.baseRects,
        this.textRects,
      ),
      h(
        "g",
        { transform: `translate(${rectStep}, ${height - rectSize})` },
        h("text", { "font-size": rectStep }, "kawarimidoll/typograssy"),
      ),
      h(
        "g",
        { transform: `translate(${legendPos.x}, ${legendPos.y})` },
        ...this.colors.map((color, idx) => rect(idx, 0, color)),
      ),
    );
  }
}
