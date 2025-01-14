require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_KEY = process.env.REFRESH_TOKEN_SECRET;

const posts = [
  { id: 1, title: "Post 1", username: "Kyle" },
  { id: 2, title: "Post 2", username: "Sally" },
  { id: 3, title: "Post 3", username: "Kyle" },
  { id: 4, title: "Post 4", username: "Sally" },
  { id: 5, title: "Post 5", username: "Arthur" },
  { id: 6, title: "Post 6", username: "Sally" },
  { id: 7, title: "Post 7", username: "Arthur" },
  { id: 8, title: "Post 8", username: "Sally" },
  { id: 9, title: "Post 9", username: "Arthur" },
];

app.get("/posts", authenticateToken, (req, res) => {
  const postByUser = posts.filter((post) => post.username === req.user.name);

  return res.json(postByUser);
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

app.listen(3000);
