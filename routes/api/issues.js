const express = require('express');
const router = express.Router();

const Issue = require('../../models/Issue');
const auth = require('../../middleware/auth');

// GET api/issues
// All Issues
router.get('/', (req, res)=>{
    Issue.find()
        .then(items => res.json(items));
})

/* POST new issue to the db */
router.post('/', auth, (req, res) =>{
    const newItem = new Issue(req.body);
    newItem.save((error)=>{
        if (error) {console.log("Oh no! An error occured.")}
        else{
            res.send(newItem);
        };
    });
})

//GET api/issues/:id
router.get('/:id', (req, res) =>{
    Issue.findById(req.params.id).exec((error, doc)=>{
        if (error) return "An error occured";

        res.send(doc);
    })
})

// PUT api/issues/:id
// Update an issue
router.put('/:id', auth, (req, res) =>{

    Issue.findByIdAndUpdate(req.params.id, req.body).exec((error, doc)=>{
        if (error) {
            console.log(error)
            return res.send(500);
        }
        
        Issue.findById(req.params.id).exec((err, newDoc)=>{
            console.log(newDoc);
            res.send(newDoc);
        })
    })
})

router.delete('/:id', auth, (req, res)=>{

    Issue.findByIdAndRemove(req.params.id).exec((error, doc)=>{
        if(error){
            console.log(error);
            return res.send(500);
        }
        
        return res.send(200);
    })  

})

module.exports = router;