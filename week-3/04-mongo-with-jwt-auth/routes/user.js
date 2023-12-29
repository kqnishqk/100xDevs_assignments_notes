const { Router } = require("express");
const userMiddleware = require("../middleware/user");
const router = Router();
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config')
const { Adminjwt, Userjwt, Coursejwt } = require('../db/index');

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    let nameOfUser = req.body.username
    let passOfUser = req.body.password
    Userjwt.findOne({username:nameOfUser})
        .then(userExists => {
            if(userExists){
                res.status(409).json({
                    mssg: ' this name already exists.'
                })
                return
            }
            Userjwt.create({
                username: nameOfUser,
                password: passOfUser
            })
            res.status(200).json({
                mssg:'user created successfully.'
            })
        })
});

router.post('/signin', async function(req, res){
    // Implement user signin logic
    let nameOfUser = req.body.username
    let passOfUser = req.body.password
    let userExists = await Userjwt.findOne({username: nameOfUser, password: passOfUser})
        if(!userExists){
            res.status(401).json({
                mssg: 'username or password incorrect.'
            })
        }
        else{
            const token = jwt.sign({nameOfUser},JWT_SECRET)
            res.status(200).json({
                token:'Bearer ' + token
            })
        }
});

router.get('/courses',userMiddleware, (req, res) => {
    // Implement listing all courses logic
    Coursejwt.find({published: true})
    .then(documents => {
        res.status(200).json({
            courses: documents
        })
    })
});

router.post('/courses/:courseId', userMiddleware, async function(req, res){
    // Implement course purchase logic
    let givenCourseId = req.params.courseId 
    let username = req.username

    let userUpdation = await Userjwt.findOneAndUpdate(
        {
            username
        },
        {$push: {courses: givenCourseId}}
    );

    res.status(200).json({
        message: 'Course purchased successfully'
    })
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    let username = req.username
    const user = await Userjwt.findOne({username})
    const courses = await Coursejwt.find({_id:{"$in": user.courses}})
    res.status(200).json({
        purchasedCourses: courses
    })

});

module.exports = router;