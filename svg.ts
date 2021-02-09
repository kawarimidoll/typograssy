export class Svg {
  constructor(
    private message: string,
  ) {
  }

  render(): string {
    return `<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="300" height="100" fill="#830"></rect>
  <g transform="translate(50, 300)">
  <text>${this.message}</text>
  </g>
  </svg>`;
  }
}
