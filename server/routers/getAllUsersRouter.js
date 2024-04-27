import express from 'express'
import HandleGetAllUsers from '../controllers/HandleGetAllUsers.js'

const getAllUsersRouter = express.Router()

getAllUsersRouter.get('/', HandleGetAllUsers)

export default getAllUsersRouter