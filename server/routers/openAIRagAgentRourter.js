import express from 'express'
import HandleOpenAIRAGAgent from '../controllers/HandleOpenAIRagAgent.js'

const openAIRAGAgentRouter = express.Router()

openAIRAGAgentRouter.post('/', HandleOpenAIRAGAgent)

export default openAIRAGAgentRouter