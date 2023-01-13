const express = require('express')

const teamsController = require('../controllers/teams.controller')
const teamsRouter = express.Router()

teamsRouter.get('/teams', teamsController.getTeams)
teamsRouter.get('/teams/:tournament', teamsController.getTeam)
teamsRouter.get('/teams/:id', teamsController.getTeam)
teamsRouter.post('/teams', teamsController.addTeam)
teamsRouter.delete('/teams/:id', teamsController.deleteTeam)
teamsRouter.patch('/teams/:id', teamsController.editTeam)
teamsRouter.put('/teams/:id', teamsController.replaceTeam)

module.exports = teamsRouter
