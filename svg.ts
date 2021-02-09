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

const colors = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];

const width = rectStep * (weeks.length + 2) - rectSpan;
const height = rectStep * (days.length + 3) - rectSpan;

const baseRects = weeks.map((week) =>
  days.map((day) => rect(week, day, colors[0])).join("")
).join("");

const colorRects = colors.map((color, idx) => rect(idx, 0, color)).join("");
const legendPos = { x: width - rectStep * 7, y: height - rectSize * 2 };

export class Svg {
  private messageRects: string;
  constructor(
    private message: string,
  ) {
    console.log(this.message);

    const pixelPositons = getPixelPositions(message);

    const steps = pixelPositons.length;
    const offset = Math.ceil((weeks.length - steps) / 2);
    const getRandomColor = () =>
      colors[Math.floor(Math.random() * (colors.length - 1)) + 1];
    this.messageRects = pixelPositons.map((line, x) =>
      days.map((day) => {
        if (line.includes(day)) {
          const color = getRandomColor();
          return rect(x + offset, day, color);
        }
        return "";
      })
    ).join("");
  }

  render(): string {
    return h(
      "svg",
      { width, height, xmlns: "http://www.w3.org/2000/svg" },
      h("rect", { width, height, stroke: "#000", fill: "none" }),
      h(
        "g",
        { transform: `translate(${rectStep}, ${rectStep})` },
        baseRects,
        this.messageRects,
      ),
      h(
        "g",
        { transform: `translate(${rectStep}, ${height - rectSize})` },
        h("text", { "font-size": rectStep }, "kawarimidoll/typograssy"),
      ),
      h(
        "g",
        { transform: `translate(${legendPos.x}, ${legendPos.y})` },
        colorRects,
      ),
    );
  }
}
