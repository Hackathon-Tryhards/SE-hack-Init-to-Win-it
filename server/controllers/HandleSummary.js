import dotenv from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

dotenv.config();

const HandleGoogleGenerativeAIChatSummary = async (req, res) => {
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
      ` you are an expert in summarization you have to
        summarize the text as nicely as possible without
        losing any imporant points
      \n
      Text: {question}`
    );

    const chain = promptTemplate.pipe(model).pipe(outputParser);

    const result = await chain.invoke({ question });

    res.json({ text: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default HandleGoogleGenerativeAIChatSummary;
