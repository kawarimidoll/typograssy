/// <reference path="./_deploy.d.ts" />

const listener = Deno.listen({ port: 8080 });
if (!Deno.env.get("DENO_DEPLOYMENT_ID")) {
  const { hostname, port } = listener.addr;
  console.log(`HTTP server listening on http://${hostname}:${port}`);
}

async function handleConn(conn: Deno.Conn) {
  const httpConn = Deno.serveHttp(conn);
  for await (const e of httpConn) {
    e.respondWith(handler(e.request));
  }
}

async function handler(request: Request) {
  const { href, origin, host, pathname, hash, search } = new URL(request.url);
  console.log({ href, origin, host, pathname, hash, search });

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
    return new Response(await Deno.readFile("./favicon.svg"), {
      headers: { "Content-Type": "image/svg+xml" },
    });
  }

  return new Response("404 Not Found", {
    status: 404,
    statusText: "Not Found",
  });
}

for await (const conn of listener) {
  handleConn(conn);
}
