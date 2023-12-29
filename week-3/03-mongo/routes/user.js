const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Admin, User, Course } = require('../db/index');



// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    let nameOfUser = req.body.username
    let passOfUser = req.body.password
    User.findOne({username:nameOfUser})
        .then(userExists => {
            if(userExists){
                res.status(409).json({
                    mssg: ' this name already exists.'
                })
                return
            }
            User.create({
                username: nameOfUser,
                password: passOfUser
            })
            res.status(200).json({
                mssg:'user created successfully.'
            })
        })
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Course.find({published: true})
    .then(documents => {
        res.status(200).json({
            courses: documents
        })
    })
});

router.post('/courses/:courseId', userMiddleware, async function(req, res){
    // Implement course purchase logic
    let givenCourseId = req.params.courseId 

    let userUpdation = await User.findOneAndUpdate(
        {
            username: req.headers.username, 
            password: req.headers.password
        }, 
        {$push: {courses: givenCourseId}}
    );
    res.status(200).json({ 
        message: 'Course purchased successfully'
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({username: req.headers.username, password: req.headers.password})
    const courses = await Course.find({_id:{"$in": user.courses}})
    res.status(200).json({
        purchasedCourses: courses
    })

});

module.exports = router;
