import { assertEquals } from "./deps.ts";
import { CustomURLSearchParams } from "./custom_url_search_params.ts";

const url = "https://test.com/api?text=hello&speed=100&flg=true";
const { searchParams } = new URL(url);
const customSearchParams = new CustomURLSearchParams(searchParams);

Deno.test("getString", () => {
  assertEquals(
    customSearchParams.getString("text"),
    "hello",
  );

  assertEquals(
    customSearchParams.getString("message"),
    "",
  );

  assertEquals(
    customSearchParams.getString("message", "default"),
    "default",
  );
});

Deno.test("getNumber", () => {
  assertEquals(
    customSearchParams.getNumber("speed"),
    100,
  );

  assertEquals(
    customSearchParams.getNumber("velocity"),
    0,
  );

  assertEquals(
    customSearchParams.getNumber("velocity", 10),
    10,
  );
});

Deno.test("getBoolean", () => {
  assertEquals(
    customSearchParams.getBoolean("flg"),
    true,
  );

  assertEquals(
    customSearchParams.getBoolean("ok"),
    false,
  );

  assertEquals(
    customSearchParams.getBoolean("ok", true),
    true,
  );
});
