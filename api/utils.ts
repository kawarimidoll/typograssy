// https://github.com/ryo-ma/github-profile-trophy/blob/master/src/utils.ts

import { ServerRequest } from "./deps.ts";

export class CustomURLSearchParams extends URLSearchParams {
  constructor(
    init?: string[][] | Record<string, string> | string | URLSearchParams,
  ) {
    super(init);
  }
  getStringValue(key: string, defaultValue: string): string {
    return super.get(key)?.toString() ?? defaultValue;
  }
  getNumberValue(key: string, defaultValue: number): number {
    const param = super.get(key);
    if (param !== null) {
      const parsedValue = parseInt(param);
      if (!isNaN(parsedValue)) {
        return parsedValue;
      }
    }
    return defaultValue;
  }
  getBooleanValue(key: string, defaultValue: boolean): boolean {
    const param = super.get(key);
    return param !== null ? param.toString() === "true" : defaultValue;
  }
}

export function parseParams(req: ServerRequest): CustomURLSearchParams {
  const splitedURL = req.url.split("?");
  return (splitedURL.length < 2)
    ? new CustomURLSearchParams()
    : new CustomURLSearchParams(splitedURL[1]);
}
