import getPixelPositions from "./get-pixel-positions.ts";
import h from "./tag.ts";

const svgID = "typograssy";

const weeks = 53;
const days = 7;
const rectSize = 10;
const rectSpan = 3;
const rectRadius = 2;
const rectStep = rectSize + rectSpan;

const rectStyle = `#${svgID} .pixel {
  width: ${rectSize}px;
  height: ${rectSize}px;
  rx: ${rectRadius}px;
  ry: ${rectRadius}px;
  stroke: rgba(27,31,35,0.06);
  stroke-width: 2px;
}`;

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

const width = rectStep * (weeks + 2) - rectSpan;
const height = rectStep * (days + 3) - rectSpan;

const legendPos = { x: width - rectStep * 7, y: height - rectSize * 2 };

export class Svg {
  private textRects: string;
  private baseRects: string;
  private style: string;

  constructor(
    private text: string,
    private colors: string[],
    private bg: string,
    private frame: string,
    private speed: number,
    private comment: string,
  ) {
    const pixelPositons = getPixelPositions(this.text);

    const steps = pixelPositons.length;
    const needScroll = steps > weeks;
    const translateX = steps * rectStep;
    const ms = this.speed * steps;
    const scrollStyle = needScroll
      ? `#${svgID} #text-pixels { animation: step ${ms}ms steps(${steps}) infinite; }
          @keyframes step { to { transform:  translateX(-${translateX}px); } }`
      : "";

    this.style = h(
      "style",
      {},
      scrollStyle,
      rectStyle,
      ...this.colors.map((color, idx) =>
        `#${svgID} .l${idx} { fill: ${color}; }`
      ),
    );

    const offset = needScroll ? 1 : Math.ceil((weeks - steps) / 2);
    const getRandomColor = () =>
      Math.floor(Math.random() * (this.colors.length - 1)) + 1;
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
      rect(Math.floor(i / days), i % days, 0)
    ).join("");
  }

  render(): string {
    return h(
      "svg",
      { width, height, xmlns: "http://www.w3.org/2000/svg", id: svgID },
      this.style,
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
        h("g", { id: "text-pixels" }, this.textRects),
      ),
      h(
        "g",
        { transform: `translate(${rectStep}, ${height - rectSize})` },
        h("text", { "font-size": rectStep }, this.comment),
      ),
      h(
        "g",
        { transform: `translate(${legendPos.x}, ${legendPos.y})` },
        this.colors.map((_, idx) => rect(idx, 0, idx)).join(""),
      ),
    );
  }

  static error(message: string): string {
    return h(
      "svg",
      { width, height, xmlns: "http://www.w3.org/2000/svg", id: svgID },
      h(
        "g",
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
