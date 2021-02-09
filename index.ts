import { ServerRequest } from "./deps.ts";
import { parseParams } from "./utils.ts";
import { Svg } from "./svg.ts";

export default (req: ServerRequest) => {
  const params = parseParams(req);

  const text = params.get("text");
  if (text === null) {
    req.respond({
      status: 404,
      headers: new Headers({ "Content-Type": "text" }),
      body: "'text' parameter is required",
    });
    return;
  }
  const headers = new Headers({ "Content-Type": "image/svg+xml" });

  req.respond({ status: 200, headers, body: new Svg(text).render() });
};
