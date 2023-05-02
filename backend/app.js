const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')

//put routers below
const userRouter = require('./controllers/users')
const entryRouter = require('./controllers/entries')
const journalRouter = require('./controllers/journals')
const loginRouter = require('./controllers/login')
const gamesRouter = require('./controllers/games')

const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to mongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to mongoDB:', error.message)
  })


const corsConfig ={
    origin: [
      'https://www.usecooldown.com/*',
      'https://usecooldown.com/*',
      'https://api.mobygames.com'], 
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      allowedHeaders: ['Content-Type', 'Authorization']
}



app.use(cors(corsConfig))
app.use(express.json())
app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/api/entries', entryRouter)
app.use('/api/journals', journalRouter)
app.use('/api/games', gamesRouter)


module.exports = app

