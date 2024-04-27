import express from 'express'
import HandleGoogleGenerativeAIChat from '../controllers/HandleGenerelGemini.js'

const generelGeminiRouter = express.Router()

generelGeminiRouter.post('/', HandleGoogleGenerativeAIChat)

export default generelGeminiRouter