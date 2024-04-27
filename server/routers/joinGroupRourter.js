import express from 'express'
import HandleJoinGroup from '../controllers/HandleJoinGroup.js'

const handleJoinGroupRouter = express.Router()

handleJoinGroupRouter.post('/', HandleJoinGroup)

export default handleJoinGroupRouter