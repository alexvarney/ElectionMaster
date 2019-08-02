const express = require('express');
const router = express.Router();

const Issue = require('../../models/Issue');

// GET api/issues
// All Issues
router.get('/', (req, res)=>{
    Issue.find()
        .then(items => res.json(items));
})

module.exports = router;