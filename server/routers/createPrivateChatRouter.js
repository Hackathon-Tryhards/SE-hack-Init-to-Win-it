import express from 'express'
import HandleCreatePrivateChatRoom from '../controllers/HandleCreatePrivateChatRoom.js'

const privateChatRouter = express.Router()

privateChatRouter.post('/', HandleCreatePrivateChatRoom)

export default privateChatRouter