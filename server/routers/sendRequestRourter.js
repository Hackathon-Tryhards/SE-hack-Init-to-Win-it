import express from 'express'
import HandleSendRequest from '../controllers/HandleSendRequest.js'

const sendRequestRourter = express.Router()

sendRequestRourter.post('/', HandleSendRequest)

export default sendRequestRourter