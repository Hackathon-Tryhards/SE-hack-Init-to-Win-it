import express from 'express'
import HandleGetUserChat from '../controllers/HandleGetUserChats.js'

const getUserChatRouter = express.Router()

getUserChatRouter.post('/', HandleGetUserChat)

export default getUserChatRouter