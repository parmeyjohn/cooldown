const mongoose = require('mongoose')

const journalSchema = new mongoose.Schema({
    journalName: {type: String},
    entries: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Entry'
      }]
})

journalSchema.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id.toString()
        delete returnObject._id
        delete returnObject.__v
    }
})

module.exports = mongoose.model('Journal', journalSchema)