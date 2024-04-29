import dotenv from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { NomicEmbeddings } from "@langchain/nomic";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";
import { PromptTemplate } from "@langchain/core/prompts";
import { formatDocumentsAsString } from "langchain/util/document";
dotenv.config();

const HandleGoogleGenerativeAIChat = async (req, res) => {
  try {
    const { question } = req.body;

    
const embeddings = new NomicEmbeddings({
    apiKey: process.env.NOMIC_API_KEY,
    modelName: "nomic-embed-text-v1.5"
  });
  
  const vectorStore = await FaissStore.load("./faiss2.index", embeddings);
  const vectorStoreRetriever = vectorStore.asRetriever();
  
  const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
    model: "gemini-pro",
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    ],
    verbose: true,
  });
  
  const prompt = PromptTemplate.fromTemplate(
    `Answer the question 
  
  Question: {question}`
  );
  
  
  const chain = RunnableSequence.from([
    {
      context: vectorStoreRetriever.pipe(formatDocumentsAsString),
      question: new RunnablePassthrough(),
    },
    prompt,
    model,
    new StringOutputParser(),
  ]);
  
  
  const response = await chain.invoke(question);
  res.json({ text: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default HandleGoogleGenerativeAIChat;
