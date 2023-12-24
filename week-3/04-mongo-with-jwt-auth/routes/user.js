const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';

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
            Userjwt.create({
                username: nameOfUser,
                password: passOfUser
            })
            res.status(200).json({
                mssg:'user created successfully.'
            })
        })
});

app.post('/signin', async function(req, res){
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
            const token = jwt.sign({'username':nameOfuser},jwtPassword)
            res.status(200).json({
                token:token
            })
        }
});

app.get('/courses',userMiddleware, (req, res) => {
    // Implement listing all courses logic
    Coursejwt.find({})
    .then(documents => {
        res.status(200).json({
            courses: documents
        })
    })
});

app.post('/courses/:courseId', userMiddleware, async function(req, res){
    // Implement course purchase logic
    let givenCourseId = req.params.courseId 

    let userUpdation = await Userjwt.findOneAndUpdate({username: req.username}, {$push: {courses: givenCourseId}});
    res.status(200).json({
        message: 'Course purchased successfully'
    })
});

app.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
    Userjwt.findOne({username: req.username})
    .then(user =>  {
        let purchCourseIds = user.courses
        let infopurchCourseIds = []
        purchCourseIds.forEach(element => {
            Coursejwt.findOne({courseId: element})
                .then(neededCourse =>{
                    infopurchCourseIds.push(neededCourse)
                })
        })
        res.status(200).json({
            purchasedCourses: infopurchCourseIds
        })
    })
});
