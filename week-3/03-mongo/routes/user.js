const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");



// User Routes
app.post('/signup', (req, res) => {
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

app.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Course.find({})
    .then(documents => {
        res.status(200).json({
            courses: documents
        })
    })
});

app.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    let givenCourseId = req.params.courseId 

    User.findOneAndUpdate({username: req.headers.username, password: req.headers.password}, {$push: {courses: givenCourseId}});
    res.status(200).json({
        message: 'Course purchased successfully'
    })
});

app.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
    User.findOne({username: req.headers.username, password: req.headers.password})
        .then(user =>  {
            let purchCourseIds = user.courses
            let infopurchCourseIds = []
            purchCourseIds.array.forEach(element => {
                Course.findOne({courseId: element})
                    .then(neededCourse =>{
                        infopurchCourseIds.push(neededCourse)
                    })
            })
            res.status(200).json({
                purchasedCourses: infopurchCourseIds
            })
        })
});
