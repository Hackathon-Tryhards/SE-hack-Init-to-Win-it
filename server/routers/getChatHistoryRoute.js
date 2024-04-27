import express from 'express'
import HandleGetChatHistory from '../controllers/HandleGetChatHistory.js'

const getChatHistoryRourter = express.Router()

getChatHistoryRourter.post('/', HandleGetChatHistory)

export default getChatHistoryRourter