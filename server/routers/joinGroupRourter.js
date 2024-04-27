import express from 'express'
import HandleJoinGroup from '../controllers/HandleJoinGroup.js'

const handleJoinGroupRourter = express.Router()

handleJoinGroupRourter.post('/', HandleJoinGroup)

export default handleJoinGroupRourter