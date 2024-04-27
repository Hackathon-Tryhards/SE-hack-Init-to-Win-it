import express from 'express'
import HandleSendDocument from '../controllers/HandleSendDocument.js'

const sendDocumentRouter = express.Router()

sendDocumentRouter.get('/:id', HandleSendDocument)

export default sendDocumentRouter