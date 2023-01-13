const { v4: uuidv4 } = require('uuid')
const db = require('../data/database')

const findAll = async () => {
  const result = await db('teams').select()
  return result
}

const findOne = async (id) => {
  const result = await db('teams').select().where({ id: id })
  return result[0]
}

const findByTournament = async (tournamentId) => {
  const result = await db('teams').select().where({ tournament: tournamentId })
  return result
}

const findByCode = async (code) => {
  const result = await db('teams').select().where({ code: code })
  return result
}

const addOne = async (data) => {
  let result
  try {
    result = await db('teams').insert(data, ['id'])
  } catch (error) {
    console.log(error)
    return null
  }
  return result[0]
}

const updateOne = async (id, data) => {
  // const props = Object.keys(data)
  //   .reduce((res, prop) => (res += ` ${prop} = ?,`), '')
  //   .slice(0, -1)
  try {
    result = await db('teams').where({ id: id }).update(data)
  } catch (error) {
    console.log(error)
    return null
  }
  return result
}

const removeOne = async (id) => {
  const result = await db('teams').where({ id: id }).del()
  return result
}

module.exports = {
  findAll,
  addOne,
  findOne,
  findByTournament,
  updateOne,
  removeOne,
}
