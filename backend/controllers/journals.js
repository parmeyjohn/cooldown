const express = require('express')
const Journal = require('../models/journal.js')
const User = require('../models/user.js')

const journalRouter = express.Router()
const mongoose = require('mongoose')
const user = require('../models/user.js')


journalRouter.get('/', async (request, response) => {
    const journals = await Journal.find({}).sort({date: -1}).populate('entries')
    response.status(200).json(journals)
})

journalRouter.get('/:id', async (request, response) => {
    const journal = await Journal.findById(request.params.id).populate('entries')
    response.status(200).json(journal)
})

journalRouter.post('/', async (request, response) => {
    const body = request.body
    const userObj = User.findById(body.user)

    const journal = new Journal(request.body)
    const savedNote = await journal.save()
    userObj.journals = userObj.journals.concat(savedNote._id)
    await userObj.save()
    response.status(201).json(result)
})

journalRouter.delete('/:id', async (request, response) => {
    await Journal.findOneAndDelete({_id: request.params.id})
    response.status(204).end()
})

journalRouter.patch('/:id', async (request, response) => {
    console.log('body',request.body)
    console.log('id', request.params.id)
    await Journal.findOneAndUpdate({ _id: request.params.id }, request.body )
    response.status(204)
})

module.exports = journalRouter