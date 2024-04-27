import express from 'express'
import HandleAddGoal from '../controllers/HandleAddGoal.js'

const addGoalRourter = express.Router()

addGoalRourter.post('/', HandleAddGoal)

export default addGoalRourter