const http = require("http");

const DEFAULT_USER = {
  username: "johndoe",
  password: "password123",
};

const { once } = require("events");

const routes = {
  "/contact:get": (req, res) => {
    res.write("Contact us page");
    return res.end();
  },
  "/login:post": async (req, res) => {
    const data = await once(req, "data");
    const user = JSON.parse(data);
    const toLower = (text) => text.toLowerCase();

    const userIsIncorrect =
      toLower(user.username) !== toLower(DEFAULT_USER.username);
    const passwordIsIncorrect = user.password !== DEFAULT_USER.password;

    if (userIsIncorrect || passwordIsIncorrect) {
      res.writeHead(401);
      return res.end("Invalid credentials");
    }

    return res.end("Login successful");
  },
  default(req, res) {
    res.writeHead(404);
    return res.end("Page not found");
  },
};

function handler(req, res) {
  const { url, method } = req;

  console.log("entered on handler");

  const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`;
  const chosen = routes[routeKey] || routes.default;

  return chosen(req, res);
}

const app = http
  .createServer(handler)
  .listen(3000, () => console.log("Server is running on port 3000"));

module.exports = app;
