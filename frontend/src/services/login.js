import axios from 'axios'
const baseUrl = 'https://cooldown-backend.onrender.com/api/login'

let token = null

const login = async credentials => {
  console.log('in login')
  const config = {
    headers: { 
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'},
  }
  const res = await axios.post(baseUrl, credentials, config)
  console.log('login res', res)
  return res.data
}

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export default { login, setToken }