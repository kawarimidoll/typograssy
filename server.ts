import { apiHandler } from "./api_handler.ts";

async function handler(request: Request) {
  const { pathname, searchParams } = new URL(request.url);
  console.log({ pathname, searchParams: [...searchParams.entries()] });

  if (pathname === "/") {
    return new Response(await Deno.readFile("./index.html"), {
      headers: { "Content-Type": "text/html" },
    });
  }
  if (pathname === "/favicon.svg") {
    return new Response(await Deno.readFile("./favicon.svg"), {
      headers: { "Content-Type": "image/svg+xml" },
    });
  }
  if (pathname === "/api") {
    return apiHandler(searchParams);
  }

  return new Response("404 Not Found", {
    status: 404,
    statusText: "Not Found",
  });
}

Deno.serve(async (request: Request) => {
  return await handler(request);
});
