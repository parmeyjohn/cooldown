const express = require('express')
const Journal = require('../models/journal.js')
const journalRouter = express.Router()
const mongoose = require('mongoose')


journalRouter.get('/', async (request, response) => {
    const journals = await Journal.find({}).sort({date: -1}).populate('entries')
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


journalRouter.patch('/:id', async (request, response) => {
    console.log('body',request.body)
    await Journal.findOneAndUpdate({_id: request.params.id}, request.body )
    response.status(204)
})

module.exports = journalRouter