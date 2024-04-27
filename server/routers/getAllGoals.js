import express from 'express'
import HandleGetAllGoals from '../controllers/HandleGetAllGoals.js'

const getAllGoalsRourter = express.Router()

getAllGoalsRourter.get('/', HandleGetAllGoals)

export default getAllGoalsRourter