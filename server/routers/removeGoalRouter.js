import express from 'express'
import HandleRemoveGoal from '../controllers/HandleRemoveGoal.js'

const removeGoalRourter = express.Router()

removeGoalRourter.post('/', HandleRemoveGoal)

export default removeGoalRourter