// https://github.com/ryo-ma/github-profile-trophy/blob/master/src/utils.ts

import { ServerRequest } from "./deps.ts";

export class CustomURLSearchParams extends URLSearchParams {
  constructor(
    init?: string[][] | Record<string, string> | string | URLSearchParams,
  ) {
    super(init);
  }
  getStringValue(key: string, defaultValue: string): string {
    if (super.has(key)) {
      const param = super.get(key);
      if (param !== null) {
        return param.toString();
      }
    }
    return defaultValue.toString();
  }
  getNumberValue(key: string, defaultValue: number): number {
    if (super.has(key)) {
      const param = super.get(key);
      if (param !== null) {
        const parsedValue = parseInt(param);
        if (isNaN(parsedValue)) {
          return defaultValue;
        }
        return parsedValue;
      }
    }
    return defaultValue;
  }
  getBooleanValue(key: string, defaultValue: boolean): boolean {
    if (super.has(key)) {
      const param = super.get(key);
      return param !== null && param.toString() === "true";
    }
    return defaultValue;
  }
}

export function parseParams(req: ServerRequest): CustomURLSearchParams {
  const splitedURL = req.url.split("?");
  if (splitedURL.length < 2) {
    return new CustomURLSearchParams();
  }
  return new CustomURLSearchParams(splitedURL[1]);
}
