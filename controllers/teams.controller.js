const { v4: uuidv4 } = require('uuid')
const { validateId, validateData } = require('../validation')

const model = require('../models/teams.model')

async function getTeamByTournament(tournament, res, next) {
  try {
    const result = await model.findByTournament()
    res.json(result)
  } catch (err) {
    next(err)
  }
}

async function getTeams(params, res, next) {
  try {
    // validateId(id)
    const foundTeams = params.query?.tournament
      ? await model.findByTournament(params.query.tournament)
      : params.query?.code
      ? await model.findByTournament(params.query.code)
      : await model.findAll()
    res.json(foundTeams)
  } catch (err) {
    next(err)
  }
}

async function getTeam({ params: { id } }, res, next) {
  try {
    // validateId(id)
    const foundTeam = await model.findOne(id)
    res.json(foundTeam)
  } catch (err) {
    next(err)
  }
}

async function addTeam({ body: data }, res, next) {
  try {
    // validateData(data, { task: 'new' })
    const result = await model.addOne({
      ...data,
      id: uuidv4(),
      created_at: new Date().toISOString(),
    })
    // const result = await model.findLastInserted()
    res.status(201).json(result)
  } catch (err) {
    next(err)
  }
}

async function deleteTeam({ params: { id } }, res, next) {
  try {
    // validateId(id)
    // await tournamentExists(id)
    await model.removeOne(id)
    res.status(204).json({ info: 'deleted' })
  } catch (err) {
    next(err)
  }
}

async function editTeam({ body: data, params: { id } }, res, next) {
  try {
    // validateData(data, { task: 'partial' })
    // validateId(id)
    // await tournamentExists(id)
    // if (data.id && data.id != id) await idExists(data.id)
    await model.updateOne(id, data)
    const result = await model.findOne(data.id || id)
    res.json(result)
  } catch (err) {
    next(err)
  }
}

async function replaceTeam({ body: data, params: { id } }, res, next) {
  try {
    // validateData(data, { task: 'replace' })
    // validateId(id)
    // await bookExists(id)
    // if (data.id != id) await idExists(data.id)
    await model.updateOne(id, data)
    const result = await model.findOne(data.id)
    res.json(result)
  } catch (err) {
    next(err)
  }
}

async function teamExists(id) {
  return new Promise(async (resolve, reject) => {
    const foundTeam = await model.findOne(id)
    if (!foundTeam)
      reject(
        new Error('id not found', {
          cause: `Could not find book with id: ${id}`,
        })
      )
    resolve(foundTeam)
  })
}

async function idExists(id) {
  return new Promise(async (resolve, reject) => {
    const foundTeam = await model.findOne(id)
    if (foundTeam)
      reject(
        new Error('id exists', {
          cause: `Team with id: ${id} already exists`,
        })
      )
    resolve(true)
  })
}

module.exports = {
  getTeams,
  getTeam,
  editTeam,
  deleteTeam,
  addTeam,
  replaceTeam,
}
