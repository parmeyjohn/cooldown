const mongoose = require("mongoose");

const statisticSchema = new mongoose.Schema({
  general: { type: String },
  genres: [{ type: Object }],
  titles: [{ type: Object }],
  tags: [{ type: Object }],
});

const totalStatisticSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  audio: {
    type: mongoose.ObjectId,
    ref: "Statistic",
  },
  books: {
    type: mongoose.ObjectId,
    ref: "Statistic",
  },
  films: {
    type: mongoose.ObjectId,
    ref: "Statistic",
  },
  games: {
    type: mongoose.ObjectId,
    ref: "Statistic",
  },
  other: {
    type: mongoose.ObjectId,
    ref: "Statistic",
  },
});

statisticSchema.set("toJSON", {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString();
    delete returnObject._id;
    delete returnObject.__v;
  },
});

totalStatisticSchema.set("toJSON", {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString();
    delete returnObject._id;
    delete returnObject.__v;
  },
});

module.exports = mongoose.model("Statistic", statisticSchema);
module.exports = mongoose.model("TotalStatistics", totalStatisticSchema);
