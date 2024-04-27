import express from 'express'
import HandleFriend from '../controllers/HandleFriend.js'

const handleFriendRourter = express.Router()

handleFriendRourter.post('/', HandleFriend)

export default handleFriendRourter