import axios from 'axios'
const baseUrl = '/api/login'

let token = null

const login = async credentials => {
  const res = await axios.post(baseUrl, credentials)
  return res.data
}

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export default { login, setToken }