const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT;

// Routers
const grammarRouter = require("./router/grammar");
const captionsRouter = require("./router/captions");
const resumeRouter = require("./router/resume")

app.use(cors())
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json("Welcome to OpenAI Express Server");
});

app.use("/prompt", grammarRouter);
app.use("/captions", captionsRouter);
app.use('/resume', resumeRouter)

app.listen(PORT, (_req, _res) => {
  console.log("Server is live");
});
