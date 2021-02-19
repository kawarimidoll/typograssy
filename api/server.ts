import { ServerRequest } from "./deps.ts";
import { parseParams } from "./utils.ts";
import { Svg } from "./svg.ts";
import colorNames from "./color_names.ts";

// cache two hours
const CACHE_MAX_AGE = 7200;
const MAX_STRING_LENGTH = 70;

const getValidColor = (str: string): string | null =>
  /^[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(str)
    ? `#${str}`
    : colorNames.includes(str)
    ? str
    : null;

export default function (req: ServerRequest) {
  const headers = new Headers({
    "Content-Type": "image/svg+xml",
    "Cache-Control": `public, max-age=${CACHE_MAX_AGE}`,
  });

  const errorRes = (message: string): void => {
    req.respond({
      status: 400,
      headers,
      body: Svg.error(message),
    });
    return;
  };

  const params = parseParams(req);

  const text = params.get("text");
  if (text === null) {
    return errorRes("'text' parameter is required. e.g. 'text=Hello%20world!'");
  } else if (text.length > MAX_STRING_LENGTH) {
    return errorRes(
      `'text' parameter is too long. Fix it less than ${MAX_STRING_LENGTH} characters.`,
    );
  }

  const l0 = getValidColor(params.getStringValue("l0", "ebedf0"));
  const l1 = getValidColor(params.getStringValue("l1", "9be9a8"));
  const l2 = getValidColor(params.getStringValue("l2", "40c463"));
  const l3 = getValidColor(params.getStringValue("l3", "30a14e"));
  const l4 = getValidColor(params.getStringValue("l4", "216e39"));
  const bg = getValidColor(params.getStringValue("bg", "ffffff"));
  const frame = getValidColor(params.getStringValue("frame", "000000"));
  if (
    l0 === null || l1 === null || l2 === null || l3 === null || l3 === null ||
    l4 === null || bg === null || frame === null
  ) {
    return errorRes("invalid color is detected.");
  }
  const speed = params.getNumberValue("speed", 200);
  const comment = params.getStringValue(
    "comment",
    "Generated by kawarimidoll/typograssy",
  );
  if (comment.length > MAX_STRING_LENGTH) {
    return errorRes(
      `'comment' parameter is too long. Fix it less than ${MAX_STRING_LENGTH} characters.`,
    );
  }

  req.respond({
    status: 200,
    headers,
    body: Svg.render(text, [l0, l1, l2, l3, l4], bg, frame, speed, comment),
  });
}
