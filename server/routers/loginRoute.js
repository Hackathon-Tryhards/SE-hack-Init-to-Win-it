import express from 'express'
import  handleLogin  from '../controllers/HandleLogin.js'

const loginRouter = express.Router()

loginRouter.post('/', handleLogin)

export default loginRouter