import { assertStrictEquals } from "./deps.ts";
import tag from "../api/tag.ts";

Deno.test({
  name: "simple tag",
  fn() {
    const generated = tag("span", {}, "hello world");
    assertStrictEquals(generated, "<span>hello world</span>");
  },
});

Deno.test({
  name: "tag with attribute",
  fn() {
    const generated = tag("a", { href: "https://example.com" }, "test link");
    assertStrictEquals(
      generated,
      '<a href="https://example.com">test link</a>',
    );
  },
});

Deno.test({
  name: "void tag",
  fn() {
    const generated = tag("img", { src: "test.png" });
    assertStrictEquals(generated, '<img src="test.png">');
  },
});

Deno.test({
  name: "nested tag",
  fn() {
    const generated = tag(
      "a",
      { href: "https://example.com" },
      tag("img", { src: "test.png" }),
    );
    assertStrictEquals(
      generated,
      '<a href="https://example.com"><img src="test.png"></a>',
    );
  },
});

Deno.test({
  name: "multiple children",
  fn() {
    const generated = tag(
      "ul",
      {},
      tag("li", {}, "item 1"),
      tag("li", {}, "item 2"),
    );
    assertStrictEquals(generated, "<ul><li>item 1</li><li>item 2</li></ul>");
  },
});
