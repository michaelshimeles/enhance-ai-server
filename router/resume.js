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
      //   prompt: `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly. \n\n ${req.query.prompt}`,
      prompt: `I'm working on my resume. My job title is ${req.query.title}. The company name is ${req.query.company}. Here are the things I did at that job: ${req.query.skills}. Give me 3 different responses and make it professional and resume friendly`,
      temperature: 1,
      max_tokens: 256,
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
  }
});

router.get("/coverletter", async (req, res) => {
  const openai = new OpenAIApi(configuration);
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      //   prompt: `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly. \n\n ${req.query.prompt}`,
      prompt: `
            Summarize my job description: ${req.params.description}.        `,
      temperature: 1,
      max_tokens: 256,
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
