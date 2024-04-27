import express from 'express'
import handleUpload from '../controllers/HandleUpload.js'
import multer from 'multer'
import storage from '../config/multerOptions.js'

const upload = multer({ storage: storage })

const uploadRouter = express.Router()

uploadRouter.post('/', upload.single('image'), handleUpload)

export default uploadRouter