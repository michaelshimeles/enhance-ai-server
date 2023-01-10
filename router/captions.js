const express = require("express");
const router = express.Router();

const { Configuration, OpenAIApi } = require("openai");

const apiKey = process.env.OPENAI_API_KEY;
const configuration = new Configuration({
  apiKey: apiKey,
});

router.get("/", async (req, res) => {
  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `I'm a social media marketer and I need your help creating Instagram captions for my client.
         I need 5 different captions regarding: ${req.query.description}
         Please don't make the captions too short
        `,
      temperature: 1,
      max_tokens: 256,
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
  }
});

router.get("/generic", async (req, res) => {
  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `You are a social media manager at the top Marketing Agency. You create ${req.query.platform} captions. 
         I need you to create a 5 different captions with a ${req.query.tone} tone keeping the following information in mind: ${req.query.description}.`,
      temperature: 1,
      max_tokens: 256,
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;
