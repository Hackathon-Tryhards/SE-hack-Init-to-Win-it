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
      temperature: 0,
    });

    const template = `
        you are a student helper chatbot you have to answer questions
        of students these questions should be releated to studies such as
        engineering , medicine and other university programmes or generel
        school and college stuff you should not answer questions that are not
        releated to these things if such questions are asked say i am an educational
        bot and i cannot answer such questions
        \n
        Question: {question}`;
    const prompt = new PromptTemplate({
      template,
      inputVariables: ["question"],
    });

    const chain = new LLMChain({ llm: model, prompt });

    const result = await chain.call({ question });

    res.json({ text: result.text });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default HandleGenerelOpenAI;
