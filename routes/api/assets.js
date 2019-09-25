const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

const filePath = null;

//Import asset model
const Asset = require('../../models/Asset')



router.post('/', (req, res) => {
  if (!req.files.image) {
    res.status(400)
    res.send('Expected image upload')
    return
  }

  const fields = req.fields
  const image = req.files.image

  const mime = image.type
  const name = image.name
  const [type, extension] = mime.split('/')

  if (type !== 'image') {
    res.status(415)
    res.send('File is not an image')
    return
  }

  res.status(200)
  res.send({ name, type, extension, fields })
})

module.exports = router
