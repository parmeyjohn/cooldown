const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
  entryTitle: String,
  duration: Number,
  increment: Number,
  incrementType: String,
  mediaObj: Object,
  mediaType: String,
  startDate: Date,
  text: String,
  textAsHTML: String,
  textAsJSON: Object,
  tags: [String],
  sentiment: String,
  journalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Journal",
  },
});

entrySchema.set("toJSON", {
  transform: (document, returnObject) => {
    if (returnObject._id) {
      console.log(returnObject._id);
      returnObject.id = returnObject._id.toString();
    } else {
      console.log(returnObject, "no id");
    }
    delete returnObject._id;
    delete returnObject.__v;
  },
});

module.exports = mongoose.model("Entry", entrySchema);
