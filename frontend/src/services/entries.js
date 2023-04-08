import axios from 'axios'
const baseUrl = '/api/entries'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOneById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token},
  }
  
  console.log('new entry: ', newObject)
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const remove = async (id) => {
  console.log('client removing ', id)
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

const removeAll = async (id) => {
  const response = await axios.delete(`${baseUrl}/entries/${id}`)
  return response.data
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, getOneById, create, update, remove, removeAll, setToken }