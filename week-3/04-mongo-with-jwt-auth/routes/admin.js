const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config')
const { Adminjwt, Userjwt, Coursejwt } = require('../db/index');

// Admin Routes
router.post('/signup', async function(req, res){
    // Implement admin signup logic
    let nameOfAdmin = req.body.adminname
    let passOfAdmin = req.body.password
    let adminExists = await Adminjwt.findOne({adminname: nameOfAdmin})
        if(adminExists){
            res.status(409).json({
                mssg: ' this name already exists.'
            })
        }
        else{
            Adminjwt.create({
                adminname: nameOfAdmin,
                password: passOfAdmin
            })
            res.status(200).json({
                message:'Admin created successfully.'
            })
        }
});

router.post('/signin', async function(req, res){
    // Implement admin signup logic
    let nameOfAdmin = req.body.adminname
    let passOfAdmin = req.body.password
    let adminExists = await Adminjwt.findOne({adminname: nameOfAdmin, password: passOfAdmin})
        if(!adminExists){
            res.status(401).json({
                mssg: 'username or password incorrect.'
            })
        }
        else{
            const token = jwt.sign({
                nameOfAdmin
            },JWT_SECRET)
            res.status(200).json({
                token: 'Bearer ' + token
            })
        }
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    let entry = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        imageLink: req.body.imageLink,
        published: req.body.published,
    }
    Coursejwt.create(entry)
        .then(createdEntry => {
            res.status(200).json({
                message: 'Course created successfully', 
                courseId: createdEntry._id
            })
        })
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    Coursejwt.find({})
    .then(documents => {
        res.status(200).json({
            courses: documents
        })
    })
});

module.exports = router;