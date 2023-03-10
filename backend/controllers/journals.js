const express = require('express')
const { response } = require('../app.js')
const Entry = require('../models/entry.js')
const User = require('../models/user.js')
const Journal = require('../models/journal.js')
const journalRouter = express.Router()
// add login and jwt later


journalRouter.get('/', async (request, response) => {
    const journals = await Journal.find({})
    response.status(200).json(journals)
})

journalRouter.post('/', async (request, response) => {
    const journal = new Journal(request.body)
    const result = await journal.save()
    response.status(201).json(result)
})

journalRouter.delete('/:id', async (request, response) => {
    await Journal.findOneAndDelete({_id: request.params.id})
    response.status(204).end()
})

journalRouter.put('/:id', async (request, response) => {
    await Journal.findOneAndUpdate({_id: request.params.id}, request.body)
    response.status(204)
})


module.exports = journalRouter