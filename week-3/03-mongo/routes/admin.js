const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, User, Course } = require('../db/index');



// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    let nameOfAdmin = req.body.adminname
    let passOfAdmin = req.body.password
    Admin.findOne({adminname: nameOfAdmin})
    .then((adminExists) => {
        if(adminExists){
            res.status(409).json({
                mssg: ' this name already exists.'
            })
        }
        else{
            Admin.create({
                adminname: nameOfAdmin,
                password: passOfAdmin
            })
            .then(() => {
                res.status(200).json({
                    mssg:'admin created successfully.'
                })
            })
        }
    }).catch((err) => {
        if(err){
            console.log('trouble retrieving info from the database.');
            console.error(err);
            return
        }
    })
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    let entry = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        imageLink: req.body.imageLink,
        published: true,
    }
    Course.create(entry)
        .then(createdEntry => {
            res.status(200).json({
                message: 'Course created successfully', 
                courseId: createdEntry._id
            })
        })
});

router.get('/courses', adminMiddleware, (req, res) => {
   // Implement fetching all courses logic
   Course.find({})
    .then(documents => {
        res.status(200).json({
            courses: documents
        })
    })
    .catch(error => {
        console.error(error);
    })
});

module.exports = router;