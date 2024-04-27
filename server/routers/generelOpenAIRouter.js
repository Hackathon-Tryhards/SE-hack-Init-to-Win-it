import express from 'express'
import HandleGenerelOpenAI from '../controllers/HandleGenerelOpenAI.js'

const generelOpenAIRouter = express.Router()

generelOpenAIRouter.post('/', HandleGenerelOpenAI)

export default generelOpenAIRouter