InjectHttpInterceptor();

import http from "http";
import { InjectHttpInterceptor } from "../index.js";

// curl -i http://localhost:3000
function handleRequest(req, res) {
  res.end("hello");
}

const server = http.createServer(handleRequest);
const port = 3000;

server.listen(port, () =>
  console.log(`Server running at http://localhost:${server.address().port}`)
);
