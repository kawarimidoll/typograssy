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
      body: "'text' parameter is required. e.g. '?text=Hello%20world!'",
    });
    return;
  }

  const l0 = "#" + params.getStringValue("l0", "ebedf0");
  const l1 = "#" + params.getStringValue("l1", "9be9a8");
  const l2 = "#" + params.getStringValue("l2", "40c463");
  const l3 = "#" + params.getStringValue("l3", "30a14e");
  const l4 = "#" + params.getStringValue("l4", "216e39");
  const bg = "#" + params.getStringValue("bg", "ffffff");
  const frame = "#" + params.getStringValue("frame", "000000");

  req.respond({
    status: 200,
    headers: new Headers({ "Content-Type": "image/svg+xml" }),
    body: new Svg(text, [l0, l1, l2, l3, l4], bg, frame).render(),
  });
};
