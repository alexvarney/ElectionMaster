const mongoose = require('mongoose')

const ContestSchema = new mongoose.Schema({
  name: String,
  description: String,
  url: String,
  country: String,
  candidates: [mongoose.Schema.Types.ObjectId],
  issues: [mongoose.Schema.Types.ObjectId],
  default: { type: Boolean, default: false },
  polling: [{
    date: Date,
    values: [{
      candidate: mongoose.Schema.Types.ObjectId,
      value: Number
    }]
  }],
  bannerImage: String
})

module.exports = mongoose.model('Contest', ContestSchema)
