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
      prompt: `You are a social media manager at the top Marketing Agency and I need your help creating Instagram captions for a client.
         I need 5 different captions regarding: ${req.query.description}
         Please don't make the captions too short and don't add any hashtags.
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
         I need you to create a 5 different captions with a ${req.query.tone} tone. Here's the information I want you to use to create captions with: ${req.query.description}.`,
      temperature: 1,
      max_tokens: 256,
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
  }
});

router.get("/hashtags", async (req, res) => {
  const openai = new OpenAIApi(configuration);

  console.log(req.query)
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `I need you to generate 10 instagram hashtags for a post I'm creating. My post is in regards to the ${req.query.niche} niche`,
      temperature: 0,
      max_tokens: 256,
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
