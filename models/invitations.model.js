const { v4: uuidv4 } = require('uuid')
const db = require('../data/database')

const findAll = async () => {
  const result = await db('invitations').select()
  return result
}

const findOne = async (id) => {
  const result = await db('invitations').select().where({ id: id })
  return result[0]
}

const findByTournament = async (tournamentId) => {
  const result = await db('invitations')
    .select()
    .where({ tournament: tournamentId })
  return result
}

const findByCode = async (code) => {
  const result = await db('invitations').select().where({ code: code })
  return result[0]
}

const addOne = async (data) => {
  let result
  try {
    result = await db('invitations').insert(data, ['id', 'code'])
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
    result = await db('invitations').where({ id: id }).update(data)
  } catch (error) {
    console.log(error)
    return null
  }
  return result
}

const removeOne = async (id) => {
  const result = await db('invitations').where({ id: id }).del()
  return result
}

module.exports = {
  findAll,
  addOne,
  findOne,
  findByTournament,
  findByCode,
  updateOne,
  removeOne,
}
