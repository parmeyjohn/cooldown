const express = require('express')
const Journal = require('../models/journal.js')
const User = require('../models/user.js')

const journalRouter = express.Router()
const mongoose = require('mongoose')
const user = require('../models/user.js')
const { expressjwt: jwt } = require('express-jwt')

const getToken = req => {
    const auth = req.get('auth')
    if (auth && auth.startsWith('Bearer ')) {
        return auth.replace('Bearer ', '')
    } else {
        return null
    }
}



journalRouter.get('/', jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }), async (request, response) => {
    console.log(request.auth)
    const journals = await Journal.find({ user: request.auth.id }).sort({date: -1}).populate('entries')
    response.status(200).json(journals)
})

journalRouter.get('/:id', jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }), async (request, response) => {
    const journal = await Journal.findById(request.params.id).populate('entries')
    response.status(200).json(journal)
})

journalRouter.post('/', jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }), async (request, response) => {
    console.log(request.auth)
    const body = request.body
    
    //put this in error middleware
    if (!request.auth.id) {
        return response.status(401).json({error: 'Token invalid'})
    }
    const userObj = await User.findById(request.auth.id)
    console.log('journalRouter body', body)
    
    const journalObj = {
        journalName: body.journalName,
        entries: body.entries,
        user: userObj.id
    }

    const journal = new Journal(journalObj)
    const savedJournal = await journal.save()
    userObj.journals = userObj.journals.concat(savedJournal._id)
    await userObj.save()
    console.log('journal', journal, 'savedJournal', savedJournal)

    response.status(201).json(savedJournal)
})

journalRouter.delete('/:id', jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }), async (request, response) => {
    await Journal.findOneAndDelete({_id: request.params.id})
    response.status(204).end()
})

journalRouter.patch('/:id', jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }), async (request, response) => {
    console.log('body',request.body)
    var update = request.body
    await Journal.findOneAndUpdate({ _id: request.params.id }, update )
    response.status(204)
})

module.exports = journalRouter