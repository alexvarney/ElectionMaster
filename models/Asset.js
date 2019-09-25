const mongoose = require('mongoose')

const AssetSchema = new mongoose.Schema({
  shortId: { type: String, required: true },
  fileName: { type: String, required: true },
  name: String,
  description: String,
  mime: String
})

module.exports = mongoose.model('Asset', AssetSchema)
