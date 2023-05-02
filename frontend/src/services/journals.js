import axios from 'axios'
const baseUrl = 'https://cooldown-backend.onrender.com/api/journals'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token},
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

const getOneById = async (id) => {
  const config = {
    headers: { Authorization: token},
  }
  const response = await axios.get(`${baseUrl}/${id}`, config)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token},
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token},
  }
  const response = await axios.patch(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token},
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}


export default { getAll, getOneById, create, update, remove, setToken }