const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());
const { Configuration, OpenAIApi } = require("openai");

const PORT = process.env.PORT;

const apiKey = process.env.OPENAI_API_KEY;
const configuration = new Configuration({
  apiKey: apiKey,
});

app.get("/", (_req, res) => {
  res.status(200).json("Welcome to OpenAI Express Server");
});

app.get("/prompt", async (req, res) => {
  const openai = new OpenAIApi(configuration);
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      //   prompt: `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly. \n\n ${req.query.prompt}`,
      prompt: `Correct this to standard English:\n\n ${req.query.prompt}`,
      temperature: 0,
      max_tokens: 256,
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, (_req, _res) => {
  console.log("Server is live");
});
