import { serve } from "./api/deps.ts";
import requestHandler from "./api/server.ts";

const port = 8080;
const server = serve({ port });
console.log(
  `HTTP webserver running. Access it at: http://localhost:${port}/?text=Hello%20world!`,
);

for await (const request of server) {
  requestHandler(request);
}
