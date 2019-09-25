const express = require('express')
const router = express.Router()
const formidable = require('express-formidable')

const auth = require('../../middleware/auth')
const shortid = require('shortid')
const path = require('path')
const fs = require('fs')
const sharp = require('sharp')

const filePath = require('../../config/keys').assetPath

// Import asset model
const Asset = require('../../models/Asset')

router.get('/', (req, res) => {
  Asset.find().then(items => res.json(items))
})

router.get('/file/:shortId', (req, res) => {
  Asset.find({ shortId: req.params.shortId }).exec((error, doc) => {
    if (error) {
      res.status(500)
      return res.send('An error occured!')
    }
    if (doc.length === 0) {
      res.status(404)
      return res.send('Document not found!')
    }

    const { filename, thumbnailFilename } = doc[0]

    if (req.query.thumbnail) {
      if (thumbnailFilename) {
        return res.sendFile(path.join(filePath, thumbnailFilename))
      } else {
        const newThumbFilename = `${filename}_${shortid.generate()}.jpeg`

        sharp(path.join(filePath, filename))
          .resize(256)
          .toFormat('jpeg')
          .toBuffer()
          .then(data => {
            fs.writeFile(path.join(filePath, newThumbFilename), data, err => {
              doc[0].thumbnailFilename = newThumbFilename
              doc[0].save()
              return res
                .status(200)
                .sendFile(path.join(filePath, newThumbFilename))
            })
          })
      }
    } else {
      return res.sendFile(path.join(filePath, filename))
    }
  })
})

router.get('/:shortId', (req, res) => {
  Asset.find({ shortId: req.params.shortId }).exec((error, doc) => {
    if (error) {
      res.status(500)
      return res.send('An error occured!')
    }
    if (doc.length === 0) {
      res.status(404)
      return res.send('Document not found!')
    }
    return res.status(200).send(doc[0])
  })
})

router.post('/', formidable(), (req, res) => {
  if (!req.files.image) {
    res.status(400)
    return res.send('Expected image upload!')
  }

  const fields = req.fields
  const image = req.files.image

  const mime = image.type
  const name = fields.name ? fields.name : image.name
  const description = fields.description

  const [type, extension] = mime.split('/')

  if (type !== 'image') {
    return res.status(415).send('File is not an image!')
  }

  const shortId = shortid.generate()
  const filename = `${shortId}.${extension}`
  const imagePath = path.join(filePath, filename)

  // save the image
  fs.copyFile(image.path, imagePath, err => {
    if (err) {
      return res.status(500).send('An issue occured saving the image.')
    }
  })

  const asset = new Asset({
    shortId,
    filename,
    name,
    description,
    mime
  })

  asset.save((error, doc) => {
    if (error) {
      console.log(error)
      return res.send(500)
    } else {
      return res.status(200).send(doc)
    }
  })
})

module.exports = router
