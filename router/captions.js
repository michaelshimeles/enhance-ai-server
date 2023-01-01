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
      prompt: `I need 5 different instagram captions with the following information in mind
         The product is a: ${req.query.product}
         The description of the product is: ${req.query.description}
         The tone of the captions should be: ${req.query.tone}
        `,
      temperature: 0,
      max_tokens: 256,
    });
    console.log(req.query)
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
