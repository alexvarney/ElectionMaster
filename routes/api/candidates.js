const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//Import candidate model
const Candidate = require('../../models/Candidate');


// GET api/candidates
// All candidates
router.get('/', (req, res)=>{
    Candidate.find()
        .then(items => res.json(items));
})

/* POST new candidate to the db */
router.post('/', auth, (req, res) =>{
    const newItem = new Candidate(req.body);
    newItem.save((error)=>{
        if (error) {console.log("Oh no! An error occured.")}
        else{
            res.send(newItem);
        };
    });
})

//GET api/candidates/:id
router.get('/:id', (req, res) =>{
    Candidate.findById(req.params.id).exec((error, doc)=>{
        if (error) return "An error occured";

        res.send(doc);
    })
})

// PUT api/candidates/:id 
// Body: JSON of new Candidate object
router.put('/:id', auth, (req, res) =>{
    Candidate.findByIdAndUpdate(req.params.id, req.body).exec((error, doc)=>{
        if (error) {
            console.log(error)
            return res.send(500);
        }
        
        Candidate.findById(req.params.id).exec((err, newDoc)=>{
            res.send(newDoc);
        })
    })
})

router.delete('/:id', auth, (req, res)=>{
    Candidate.findByIdAndDelete(req.params.id).exec((error, doc) => {
        if(error){
            console.log(error);
            return res.send(500);
        }
    })
})

module.exports = router;