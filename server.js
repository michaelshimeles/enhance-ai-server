const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT;

// Routers
const grammarRouter = require("./router/grammar");
const captionsRouter = require("./router/captions");
const genericCaptionRouter = require("./router/generic");

app.use(function (_req, res, next) {
  res.header("Access-Control-Allow-Origin", [
    "http://localhost:3000/",
    "https://enhanceai.me/",
  ]);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json("Welcome to OpenAI Express Server");
});

app.use("/prompt", grammarRouter);
app.use("/captions", captionsRouter);
app.use("/generic", genericCaptionRouter);

app.listen(PORT, (_req, _res) => {
  console.log("Server is live");
});
