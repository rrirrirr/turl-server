const express = require('express')

const invitationsController = require('../controllers/invitations.controller')
const invitationsRouter = express.Router()

invitationsRouter.get('/invitations', invitationsController.getInvitations)
invitationsRouter.get(
  '/invitations/:tournament',
  invitationsController.getInvitation
)
invitationsRouter.get('/invitations/:id', invitationsController.getInvitation)
invitationsRouter.post('/invitations', invitationsController.addInvitation)
invitationsRouter.delete(
  '/invitations/:id',
  invitationsController.deleteInvitation
)
invitationsRouter.patch(
  '/invitations/:id',
  invitationsController.editInvitation
)
invitationsRouter.put(
  '/invitations/:id',
  invitationsController.replaceInvitation
)

module.exports = invitationsRouter
