const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const keys = require('./config/keys')

const candidates = require('./routes/api/candidates')
const issues = require('./routes/api/issues')
const users = require('./routes/api/users')
const contests = require('./routes/api/contests')
const assets = require('./routes/api/assets')
const app = express()

// Middleware
app.use(bodyParser.json())
app.use(cors({origin: '*'}))

// DB Config
const db = keys.mongoURI

//Wait 5 seconds to attempt to connect to MongoDB service as it may be launching simultaneously
setTimeout(() => {
  mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))
}, 5000);

// Use Routes
app.use('/api/candidates', candidates)
app.use('/api/issues', issues)
app.use('/api/users', users)
app.use('/api/contests', contests)
app.use('/api/assets', assets)

let port = process.env.PORT || 5000

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {

  console.log('Node is serving in production.')

  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}


app.listen(port, () => console.log(`Server started on port ${port}`))
