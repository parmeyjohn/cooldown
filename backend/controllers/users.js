const mongoose = require('mongoose')
const { response } = require('../app')
const express = require('express')
const User = require('../models/user.js')
const userRouter = express.Router()
const logger = require('../utils/logger')
const bcrypt = require('bcryptjs')
const { expressjwt: jwt } = require("express-jwt")

userRouter.get('/', jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }), async (request, response) => {
    const users = await User.find({}).populate('journals')
    response.status(200).json(users)
})

userRouter.post('/', jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }), async (request, response) => {
    const { username, name, password } = request.body
    console.log(request.auth)
    // check if the user already exists in the DB
    const prevUser = await User.findOne({ username: username })

    if (!password || password.length < 3 || prevUser) {
        response.status(400).json({error: 'username or password incorrect or duplicate'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
        username,
        name,
        passwordHash
    })

    try {
        const newUser = await user.save()
        response.status(201).json(newUser)
    } catch (error) {
        response.status(400).end()
    }
})

module.exports = userRouter