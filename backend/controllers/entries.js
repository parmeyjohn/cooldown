const express = require('express')
const mongoose = require('mongoose')
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

entryRouter.delete('/entries/:id', async (request, response) => {
    // ID in this function is the journal id
    const deletedEntries = await Entry.deleteMany({ journalId: request.params.id })
    console.log('deletedEntry', deletedEntries)
    response.status(204).end()
})

entryRouter.delete('/:id', async (request, response) => {    
    console.log('deleting ', request.params.id)
    const deletedEntry = await Entry.findOneAndDelete({_id: request.params.id})
    console.log('deletedEntry', deletedEntry)
    response.status(204).end()
})

//add update for existing entry
entryRouter.put('/:id', async (request, response) => {
    console.log('req body',request.body)
    const newEntry = await Entry.findOneAndUpdate({_id: request.params.id}, request.body, {new: true})
    
    console.log('new entry',newEntry)
    response.status(200).json(newEntry)
})


module.exports = entryRouter