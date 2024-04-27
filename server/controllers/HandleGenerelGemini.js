import dotenv from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

dotenv.config();

const HandleGoogleGenerativeAIChat = async (req, res) => {
  try {
    const { question } = req.body;

    const model = new ChatGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
      model: "gemini-pro",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
      ],
    });

    const outputParser = new StringOutputParser();

    const promptTemplate = PromptTemplate.fromTemplate(
      `you are a student helper chatbot you have to answer questions
      of students these questions should be releated to studies such as
      engineering , medicine and other university programmes or generel
      school and college stuff you should not answer questions that are not
      releated to these things if such questions are asked say i am an educational
      bot and i cannot answer such questions
      \n
      Question: {question}`
    );

    const chain = promptTemplate.pipe(model).pipe(outputParser);

    const result = await chain.invoke({ question });

    res.json({ text: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default HandleGoogleGenerativeAIChat;
