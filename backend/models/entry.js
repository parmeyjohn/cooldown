const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema({
    entryTitle: String,
    mediaTitle: String,
    date: Date,
    content: Object,
    text: String,
    tags: [String],
    journalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Journal'
      }
})

entrySchema.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id.toString()
        delete returnObject._id
        delete returnObject.__v
    }
})

module.exports = mongoose.model('Entry', entrySchema)