const http = require("http");
const { routes: rentRoutes } = require("./controller/rentController");

const routes = {
  ...rentRoutes,
  default(req, res) {
    res.writeHead(404);
    return res.end("Page not found");
  },
};

function handler(req, res) {
  const { url, method } = req;

  const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`;
  const chosen = routes[routeKey] || routes.default;

  return chosen(req, res);
}

const app = http.createServer(handler).listen(4100, () => {
  console.log("Server is running on port 4100");
});

module.exports = app;
