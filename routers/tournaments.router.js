const express = require('express')

const tournamentsController = require('../controllers/tournaments.controller')
const tournamentsRouter = express.Router()

tournamentsRouter.get('/tournaments', tournamentsController.getTournaments)
tournamentsRouter.get('/tournaments/:id', tournamentsController.getTournament)
tournamentsRouter.post('/tournaments', tournamentsController.addTournament)
tournamentsRouter.delete(
  '/tournaments/:id',
  tournamentsController.deleteTournament
)
tournamentsRouter.patch(
  '/tournaments/:id',
  tournamentsController.editTournament
)
tournamentsRouter.put(
  '/tournaments/:id',
  tournamentsController.replaceTournament
)

module.exports = tournamentsRouter
