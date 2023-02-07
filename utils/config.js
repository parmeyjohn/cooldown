require('dotenv').config()

const PORT = 3003
const MONGODB_URI = 'mongodb+srv://fullstack:fullstack@journal-entries.4pbpfza.mongodb.net/?retryWrites=true&w=majority'

module.exports = {
  MONGODB_URI,
  PORT
}
