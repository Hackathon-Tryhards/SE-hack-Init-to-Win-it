import dotenv from "dotenv";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { NomicEmbeddings } from "@langchain/nomic";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { TextLoader } from "langchain/document_loaders/fs/text";

dotenv.config();

const loader = new TextLoader("./data.txt");
const docs = await loader.load();

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 200,
  chunkOverlap: 50,
});

const documents = await splitter.splitDocuments(docs);

const embeddings = new NomicEmbeddings({
  apiKey: process.env.NOMIC_API_KEY,
  modelName: "nomic-embed-text-v1.5"
});

const vectorstore = await FaissStore.fromDocuments(documents, embeddings);
await vectorstore.save("./faiss2.index");

console.log("Vectors saved successfully.");
