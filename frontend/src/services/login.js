import axios from 'axios'
const baseUrl = 'https://cooldown-backend.onrender.com/api/login'

let token = null

const login = async credentials => {
  console.log('in login')
  const headers = { withCredentials: true }
  const res = await axios.post(baseUrl, headers, credentials)
  console.log('login res', res)
  return res.data
}

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export default { login, setToken }