const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT;

// Routers
const grammarRouter = require("./router/grammar");
const captionsRouter = require("./router/captions");
const genericCaptionRouter = require("./router/generic");

// app.use(function (req, res, next) {

//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000',);

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// });
app.use(cors())
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
