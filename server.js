const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const keys = require('./config/keys');

const candidates = require('./routes/api/candidates');
const issues = require('./routes/api/issues');
const users = require('./routes/api/users');
const contests = require('./routes/api/contests');

const app = express();


//Middleware
app.use(bodyParser.json());
app.use(cors());
//DB Config
const db = keys.mongoURI;

//Connect to mongo
mongoose.connect(db)
    .then(()=>console.log("MongoDB Connected..."))
    .catch(err=>console.log(err));

//Use Routes
app.use('/api/candidates', candidates);
app.use('/api/issues', issues);
app.use('/api/users', users);
app.use('/api/contests', contests);

//Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));