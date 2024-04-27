import express from 'express'
import HandleGoogleGenerativeAIChatSummary from '../controllers/HandleSummary.js'

const summaryRouter = express.Router()

summaryRouter.post('/', HandleGoogleGenerativeAIChatSummary)

export default summaryRouter