import { config } from "dotenv";
import { OpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { LLMChain } from "langchain/chains";

config();

const HandleGenerelOpenAI = async (req, res) => {
  try {
    const { question } = req.body;

    const model = new OpenAI({
      apiKey: process.env.API_KEY,
      temperature: 0
    });

    const template = `
      answer the following Question releted to educational field only
      if the Question is out of education field say i am educational bot
      i can only answer educational releted questions\n
      Question: {question}
    `;

    const prompt = new PromptTemplate({ template, inputVariables: ["question"] });

    const chain = new LLMChain({ llm: model, prompt });

    const result = await chain.call({ question });

    res.json({ text: result.text });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default HandleGenerelOpenAI;
