import express from 'express'
import  handleRegister  from '../controllers/HandleRegister.js'

const registerRouter = express.Router()

registerRouter.post('/', handleRegister)

export default registerRouter