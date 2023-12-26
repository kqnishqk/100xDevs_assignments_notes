const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, User, Course } = require('../db/index');



// Admin Routes
app.post('/signup', (req, res) => {
    // Implement admin signup logic
    let nameOfAdmin = req.body.username
    let passOfAdmin = req.body.password
    let findAdmin = Admin.find({adminname: nameOfAdmin}).exec()
    findAdmin.then((adminExists) => {
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
            res.status(200).json({
                mssg:'admin created successfully.'
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

app.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    let entry = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        imgLink: req.body.imageLink,
        published: true,
        courseId: Date.now()
    }
    Course.create(entry)
        .then(createdEntry => {
            res.status(200).json({
                message: 'Course created successfully', 
                courseId: createdEntry.courseId
            })
        })
});

app.get('/courses', adminMiddleware, (req, res) => {
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