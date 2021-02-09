const weeks = new Array(53).fill(0).map((_, i) => i);
const days = new Array(7).fill(0).map((_, i) => i);
const rectSize = 10;
const rectSpan = 3;
const rectRadius = 2;
const rectStep = rectSize + rectSpan;
const rectStroke = "rgba(27,31,35,0.06)";
const rectStrokeWidth = 2;
const genRect = (x: number, y: number, fill: string): string =>
  `<rect
    x="${x * rectStep}"
    y="${y * rectStep}"
    fill="${fill}"
    width="${rectSize}"
    height="${rectSize}"
    rx="${rectRadius}"
    ry="${rectRadius}"
    stroke="${rectStroke}"
    stroke-width="${rectStrokeWidth}"
  ></rect>`;

const colors = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];

const width = rectStep * (weeks.length + 2) - rectSpan;
const height = rectStep * (days.length + 3) - rectSpan;

const baseRects = weeks.map((week) =>
  days.map((day) => genRect(week, day, colors[0])).join("")
).join("");

const colorRects = colors.map((color, idx) => genRect(idx, 0, color)).join("");

export class Svg {
  constructor(
    private message: string,
  ) {
    console.log(this.message);
  }

  render(): string {
    return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" stroke="#000" fill="none"></rect>
  <g transform="translate(${rectStep}, ${rectStep})">${baseRects}</g>
  <g transform="translate(${width - rectStep * 7}, ${height - rectSize * 2})">
    ${colorRects}
  </g></svg>`;
  }
}
