// const fs = require('fs/promises')
// const { v4: uuidv4 } = require('uuid')
// const tournamentsModel = require('./models/tournaments.model')
// const teamsModel = require('./models/teams.model')
// const usersModel = require('./models/users.model')
// const resultsModel = require('./models/results.model')

const express = require('express')
const bodyParser = require('body-parser')
const handleError = require('./errorHandling')
const cors = require('cors')

const app = express()

const tournamentsRouter = require('./routers/tournaments.router')
const invitationsRouter = require('./routers/invitations.router')
const teamsRouter = require('./routers/teams.router')

app.use(cors())
app.use(bodyParser.json())
app.use(tournamentsRouter)
app.use(invitationsRouter)
app.use(teamsRouter)

app.all('*', (req, res) =>
  handleError(
    new Error('no route', { cause: `Route: ${req.url} does not exist` }),
    res
  )
)

app.use((err, req, res, next) => {
  console.log(req)
  handleError(err, res)
})

app.listen(5001, () => {
  console.log('Servern körs på port 5001')
})
