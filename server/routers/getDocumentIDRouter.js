import express from 'express'
import HandleGetDocumentID from '../controllers/HandleGetDocumentID.js'

const getDocumentIDRouter = express.Router()

getDocumentIDRouter.post('/', HandleGetDocumentID)

export default getDocumentIDRouter