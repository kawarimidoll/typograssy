// https://github.com/ryo-ma/github-profile-trophy/blob/master/src/utils.ts

export class CustomURLSearchParams extends URLSearchParams {
  getString(key: string, defaultValue = ""): string {
    return super.get(key)?.toString() ?? defaultValue;
  }
  getNumber(key: string, defaultValue = 0): number {
    const parsedValue = parseInt(this.getString(key));
    return !isNaN(parsedValue) ? parsedValue : defaultValue;
  }
  getBoolean(key: string, defaultValue = false): boolean {
    const param = this.getString(key);
    return param === "true" ? true : param === "false" ? false : defaultValue;
  }
}
