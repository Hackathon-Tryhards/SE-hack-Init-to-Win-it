import express from 'express'
import HandleGetChatIDByUsername from '../controllers/HandleGetChatIDByUsername.js'

const getChatIDByUsernameRouter = express.Router()

getChatIDByUsernameRouter.post('/', HandleGetChatIDByUsername)

export default getChatIDByUsernameRouter