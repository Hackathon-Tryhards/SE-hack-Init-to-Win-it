import express from 'express'
import HandleRejectRequest from '../controllers/HandleRejectRequest.js'

const rejectRequestRourter = express.Router()

rejectRequestRourter.post('/', HandleRejectRequest)

export default rejectRequestRourter