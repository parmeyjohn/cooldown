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
    origin: 'http://localhost:3000', 
    credentials: true
}


app.use(cors(corsConfig))
app.use(express.json())
app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/api/entries', entryRouter)
app.use('/api/journals', journalRouter)


module.exports = app

