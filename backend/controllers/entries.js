const express = require('express')
const { response } = require('../app.js')
const Entry = require('../models/entry.js')
const User = require('../models/user.js')
const Journal = require('../models/journal.js')
const entryRouter = express.Router()
// add login and jwt later


entryRouter.get('/', async (request, response) => {
    const entries = await Entry.find({})
    response.status(200).json(entries)
})

entryRouter.post('/', async (request, response) => {
    const entry = new Entry(request.body)
    console.log(request.body)
    const result = await entry.save()
    response.status(201).json(result)
})

entryRouter.delete('/:id', async (request, response) => {
    await Entry.findOneAndDelete(request.params.id)
    response.status(204).end()
})

//add update for existing entry

module.exports = entryRouter