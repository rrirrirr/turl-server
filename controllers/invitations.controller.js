const { v4: uuidv4 } = require('uuid')
const { validateId, validateData } = require('../validation')

const model = require('../models/invitations.model')

async function getInvitationByTournament(tournament, res, next) {
  try {
    const result = await model.findByTournament()
    res.json(result)
  } catch (err) {
    next(err)
  }
}

async function getInvitations(params, res, next) {
  try {
    // validateId(id)
    const foundInvitations = params.query?.tournament
      ? await model.findByTournament(params.query.tournament)
      : params.query?.code
      ? await model.findByCode(params.query.code)
      : await model.findAll()
    res.json(foundInvitations)
  } catch (err) {
    next(err)
  }
}

async function getInvitation({ params: { id } }, res, next) {
  try {
    // validateId(id)
    const foundInvitation = await model.findOne(id)
    res.json(foundInvitation)
  } catch (err) {
    next(err)
  }
}

async function addInvitation({ body: data }, res, next) {
  try {
    // validateData(data, { task: 'new' })
    const result = await model.addOne({
      ...data,
      id: uuidv4(),
      code: uuidv4(),
      created_at: new Date().toISOString(),
    })
    // const result = await model.findLastInserted()
    res.status(201).json(result)
  } catch (err) {
    next(err)
  }
}

async function deleteInvitation({ params: { id } }, res, next) {
  try {
    // validateId(id)
    // await tournamentExists(id)
    await model.removeOne(id)
    res.status(204).json({ info: 'deleted' })
  } catch (err) {
    next(err)
  }
}

async function editInvitation({ body: data, params: { id } }, res, next) {
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

async function replaceInvitation({ body: data, params: { id } }, res, next) {
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

async function inviteExists(id) {
  return new Promise(async (resolve, reject) => {
    const foundInvitation = await model.findOne(id)
    if (!foundInvitation)
      reject(
        new Error('id not found', {
          cause: `Could not find book with id: ${id}`,
        })
      )
    resolve(foundInvitation)
  })
}

async function idExists(id) {
  return new Promise(async (resolve, reject) => {
    const foundInvitation = await model.findOne(id)
    if (foundInvitation)
      reject(
        new Error('id exists', {
          cause: `Invitation with id: ${id} already exists`,
        })
      )
    resolve(true)
  })
}

module.exports = {
  getInvitations,
  getInvitation,
  editInvitation,
  deleteInvitation,
  addInvitation,
  replaceInvitation,
}
