const { v4: uuidv4 } = require('uuid')
const db = require('../data/database')

const findAll = async () => {
  const result = await db('tournaments').select()
  return result
}

const findOne = async (id) => {
  const result = await db('tournaments').select().where({ id: id })
  return result[0]
}

const addOne = async (data) => {
  let result
  try {
    result = await db('tournaments').insert(data, ['id'])
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
  console.log('update t')
  try {
    result = await db('tournaments').where({ id: id }).update(data)
  } catch (error) {
    console.log(error)
    return null
  }
  return result
}

const removeOne = async (id) => {
  const result = await db('tournaments').where({ id: id }).del()
  return result
}

module.exports = {
  findAll,
  addOne,
  findOne,
  updateOne,
  removeOne,
}
