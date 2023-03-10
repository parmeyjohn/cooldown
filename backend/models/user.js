const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {type: String, unique: true, minLength: 3},
  passwordHash: {type: String},
  name: {type: String},
  journals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Journal'
  }]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)