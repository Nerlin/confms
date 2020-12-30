import { CookieSerializeOptions, parse, serialize } from "cookie";

export const serializeCookie = (
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {
    path: "/",
  }
) => {
  if (typeof value === "undefined") {
    return removeCookie(name);
  }

  const stringValue =
    typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);

  if ("maxAge" in options) {
    options.expires = new Date(Date.now() + options.maxAge);
    options.maxAge /= 1000;
  }

  return serialize(name, String(stringValue), options);
};

export const getCookie = <T>(cookies: string, name: string): T | undefined => {
  if (cookies) {
    const values = parse(cookies);
    const value = values[name];
    return value?.startsWith("j:") ? JSON.parse(value.substr(2)) : value;
  }
};

export const removeCookie = (name: string) => {
  return serialize(name, "", { maxAge: 0, path: "/" });
};
