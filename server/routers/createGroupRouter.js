import express from 'express'
import HandleCreateGroup from '../controllers/HandleCreateGroup.js'

const createGroupRouter = express.Router()

createGroupRouter.get('/', HandleCreateGroup)

export default createGroupRouter