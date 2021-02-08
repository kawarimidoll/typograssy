import {
  serve,
  ServerRequest,
} from "https://deno.land/std@0.86.0/http/server.ts";

const server = serve({ port: 8080 });
console.log(`HTTP webserver running.  Access it at:  http://localhost:8080/`);

const requestHandler = (req: ServerRequest) => {
  const headers = new Headers({ "Content-Type": "image/svg+xml" });
  const body =
    `<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="300" height="100" fill="#830"></rect>
  </svg>`;

  req.respond({ status: 200, headers, body });
};

for await (const request of server) {
  requestHandler(request);
}
