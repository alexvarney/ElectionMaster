const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const candidates = require('./routes/api/candidates');
const issues = require('./routes/api/issues');

const app = express();


//Bodyparser Middleware
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to mongo
mongoose.connect(db)
    .then(()=>console.log("MongoDB Connected..."))
    .catch(err=>console.log(err));

//Use Routes
app.use('/api/candidates', candidates);
app.use('/api/issues', issues);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));