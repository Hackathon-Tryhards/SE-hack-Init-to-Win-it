import { OpenAIEmbeddings } from "@langchain/openai";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { OpenAI } from "@langchain/openai";
import { RetrievalQAChain, loadQAStuffChain } from "langchain/chains";

const HandleOpenAIRAGAgent = async (req, res) => {
  try {
    const { prompt } = req.body;

    const embeddings = new OpenAIEmbeddings({ apiKey: process.env.API_KEY });
    const vectorStore = await FaissStore.load("./", embeddings);

    const model = new OpenAI({ apiKey: process.env.API_KEY, temperature: 0 });

    const chain = new RetrievalQAChain({
      combineDocumentsChain: loadQAStuffChain(model),
      retriever: vectorStore.asRetriever(),
      returnSourceDocuments: true,
    });

    const response = await chain.call({
      query: prompt,
    });

    res.json({ text: response.text });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default HandleOpenAIRAGAgent;
