import { ServerRequest } from "./deps.ts";
import { Svg } from "./svg.ts";

export default (req: ServerRequest) => {
  const headers = new Headers({ "Content-Type": "image/svg+xml" });

  req.respond({ status: 200, headers, body: new Svg("Hello world!").render() });
};
