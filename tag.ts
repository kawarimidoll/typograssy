export default (
  tagName: string,
  attributes: { [attr: string]: string | number },
  ...children: string[]
): string => {
  const isVoidTag = [
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
  ].includes(tagName);

  const attrs = Object.entries(attributes)
    .map(([k, v]) => ` ${k}="${v}"`)
    .join("");

  const close = isVoidTag ? "" : `${children.join("")}</${tagName}>`;

  return `<${tagName}${attrs}>${close}`;
};
