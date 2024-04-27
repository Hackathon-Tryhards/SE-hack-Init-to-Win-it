import express from 'express'
import HandleGoogleGenerativeAIChat from '../controllers/HandleGeminiRAGAgent.js'

const geminiRAGAgentRouter = express.Router()

geminiRAGAgentRouter.post('/', HandleGoogleGenerativeAIChat)

export default geminiRAGAgentRouter