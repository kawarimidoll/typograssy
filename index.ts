import {
  serve,
  ServerRequest,
} from "https://deno.land/std@0.86.0/http/server.ts";

const server = serve({ port: 8080 });
console.log(`HTTP webserver running.  Access it at:  http://localhost:8080/`);

const requestHandler = (req: ServerRequest) => {
  const bodyContent = "Your user-agent is:\n\n" +
    (req.headers.get("user-agent") || "Unknown");

  req.respond({ status: 200, body: bodyContent });
};

for await (const request of server) {
  requestHandler(request);
}
