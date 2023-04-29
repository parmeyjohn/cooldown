const express = require('express')
const axios = require('axios')

const gamesRouter = express.Router()

gamesRouter.get('/', async (request, response) => {    
    const games = await axios.get(`https://api.mobygames.com/v1/games?api_key=moby_Tk4r7bCXPkojxrTHEKnmYYkM72N`)
    response.status(200).json(games.data)
})

gamesRouter.get('/:title', async (request, response) => {    
    const games = await axios.get(`https://api.mobygames.com/v1/games?title=${request.params.title}&limit=10&api_key=moby_Tk4r7bCXPkojxrTHEKnmYYkM72N`)
    response.status(200).json(games.data)
})

module.exports = gamesRouter