const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema({
    entryTitle: {type: String},
    mediaTitle: {type: String },
    date: Date,
    text: {type: String},
    tags: [{type: String }]
})

entrySchema.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id.toString()
        delete returnObject._id
        delete returnObject.__v
    }
})

module.exports = mongoose.model('Entry', entrySchema)