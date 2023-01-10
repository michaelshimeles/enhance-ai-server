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
         I need 5 unique instagram captions with the following information in mind.
         No need to add any hashtags.
         The product is a: ${req.query.product}
         The description of the product is: ${req.query.description}
         The tone of the captions should be: ${req.query.tone}
        `,
      temperature: 0.5,
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
      prompt: `I'm a social media marketer and I need your help creating Instagram captions for my client.
         I need 5 different generic captions regarding: ${req.query.description}
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

module.exports = router;
