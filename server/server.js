import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  const openai = new OpenAIApi(configuration);
  
  const app = express();
  app.use(cors());
  app.use(express.json());
  
  app.get("/", async (req, res) => {
    res.status(200).send({
      message: "Hello from Turing!",
    });
  });
  
  function isStemCellRelated(prompt) {
    const keywords = ["stem cell", "stem cells", "stem-cell", "stem-cells"];
    return keywords.some((keyword) => prompt.toLowerCase().includes(keyword));
  }
  
  app.post("/", async (req, res) => {
    try {
      const prompt = req.body.prompt;
  
      if (!isStemCellRelated(prompt)) {
        res.status(200).send({
          bot: "I'm only allowed to discuss stem cell-related questions. Please ask a question related to stem cells.",
        });
        return;
      }
  
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${prompt}`,
        temperature: 0.7,
        max_tokens: 3000,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      });
  
      res.status(200).send({
        bot: response.data.choices[0].text,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error || "Something went wrong");
    }
  });
  


app.listen(5000, () => console.log('AI server started on http://localhost:5000'))