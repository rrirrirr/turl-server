const { v4: uuidv4 } = require('uuid')

const { validateId, validateData } = require('../validation')

const model = require('../models/tournaments.model')
// const { books } = model

async function getTournaments(_, res, next) {
  try {
    const result = await model.findAll()
    res.json(result)
  } catch (err) {
    next(err)
  }
}

async function getTournament({ params: { id } }, res, next) {
  try {
    // validateId(id)
    const foundTournament = await model.findOne(id)
    res.json(foundTournament)
  } catch (err) {
    next(err)
  }
}

async function addTournament({ body: data }, res, next) {
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

async function deleteTournament({ params: { id } }, res, next) {
  try {
    // validateId(id)
    // await tournamentExists(id)
    await model.removeOne(id)
    res.status(204).json({ info: 'deleted' })
  } catch (err) {
    next(err)
  }
}

async function editTournament({ body: data, params: { id } }, res, next) {
  try {
    // validateData(data, { task: 'partial' })
    // validateId(id)
    // await tournamentExists(id)
    // if (data.id && data.id != id) await idExists(data.id)
    await model.updateOne(id, data)
    const result = await model.findOne(id)
    res.json(result)
  } catch (err) {
    next(err)
  }
}

async function replaceTournament({ body: data, params: { id } }, res, next) {
  try {
    validateData(data, { task: 'replace' })
    validateId(id)
    await bookExists(id)
    if (data.id != id) await idExists(data.id)
    await model.updateOne(id, data)
    const result = await model.findOne(data.id)
    res.json(result)
  } catch (err) {
    next(err)
  }
}

async function tournamentExists(id) {
  return new Promise(async (resolve, reject) => {
    const foundTournament = await model.findOne(id)
    if (!foundTournament)
      reject(
        new Error('id not found', {
          cause: `Could not find book with id: ${id}`,
        })
      )
    resolve(foundTournament)
  })
}

async function idExists(id) {
  return new Promise(async (resolve, reject) => {
    const foundTournament = await model.findOne(id)
    if (foundTournament)
      reject(
        new Error('id exists', {
          cause: `Tournament with id: ${id} already exists`,
        })
      )
    resolve(true)
  })
}

module.exports = {
  getTournaments,
  getTournament,
  editTournament,
  deleteTournament,
  addTournament,
  replaceTournament,
}
