const express = require('express');
const router = express.Router();

const Contest = require('../../models/Contest');
const auth = require('../../middleware/auth');

// GET api/contests
// All Contests
router.get('/', (req, res)=>{
    Contest.find()
        .then(items => res.json(items));
})

/* POST new contest to the db */
router.post('/', auth, (req, res) =>{
    const newItem = new Contest(req.body);
    newItem.save((error)=>{
        if (error) {console.log("Oh no! An error occured.")}
        else{
            res.send(newItem);
        };
    });
})

//GET api/contests/:id
router.get('/:id', (req, res) =>{
    Contest.findById(req.params.id).exec((error, doc)=>{
        if (error) return "An error occured";

        res.send(doc);
    })
})

// PUT api/contests/:id
// Update a contest
router.put('/:id', auth, (req, res) =>{

    Contest.findByIdAndUpdate(req.params.id, req.body).exec((error, doc)=>{
        if (error) {
            console.log(error)
            return res.send(500);
        }
        
        Contest.findById(req.params.id).exec((err, newDoc)=>{
            console.log(newDoc);
            res.send(newDoc);
        })
    })
})

router.delete('/:id', auth, (req, res)=>{

    Contest.findByIdAndRemove(req.params.id).exec((error, doc)=>{
        if(error){
            console.log(error);
            return res.send(500);
        }
        
        return res.send(200);
    })  

})

module.exports = router;