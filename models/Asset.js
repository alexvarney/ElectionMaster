const mongoose = require('mongoose')

const AssetSchema = new mongoose.Schema({
  shortId: { type: String, required: true },
  filename: { type: String, required: true },
  thumbnailFilename: String,
  name: String,
  description: String,
  mime: String
})

module.exports = mongoose.model('Asset', AssetSchema)
