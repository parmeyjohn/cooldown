import axios from 'axios'
const baseUrl = 'https://cooldown-backend.onrender.com/api/games'


const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getTitle = async (title) => {
  const response = await axios.get(`${baseUrl}/${title}`)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, getTitle }