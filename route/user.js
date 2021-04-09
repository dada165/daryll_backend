const router = require('express').Router();
let user = require('../model/user-model')

//HOME
router.route('/').get((req, res) =>{
    user.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err))
})

//add
router.route('/add').post((req, res) =>{
    const fullname = req.body.fullname;
    const occupation = req.body.occupation;
    const email = req.body.email;
    const phonenumber = req.body.phonenumber;

    const newUser = new User ({fullname, occupation, email, phonenumber})

    newUser.save()
            .then(user => res.json('New record added'))
            .catch(err => res.status("Error: " + err))
});

//deatail
router.route('/:id').get((req, res) => {
    user.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status("Erroe: " + err))
})

//delete
router.route("/:id").delete((req, res) => {
    user.findByIdAndDelete(req.params.id)
        .then(user => res.json('Record was deleted'))
        .catch(err => res.status("Erroe: " + err))
})

//update
router.route("/update/:id").post((req, res)=>{
    user.findByIdAndDelete(req.params.id)
    .then(user => {
        user.fullname = req.body.fullname;
        user.occupation = req.body.occupation;
        user.email = req.body.email;
        user.phonenumber = req.body.phonenumber;

        user.save()
            .then(user => res.json('Record was updated,'))
            .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json("Error: " + err));  
})
module.exports = router;