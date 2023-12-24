const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:12hellohello12@cluster0.plynh7s.mongodb.net/');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    adminname: String,
    password: String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String,
    courses: [{type: Number}]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published:Boolean,
    courseId: Number
});

const Adminjwt = mongoose.model('Adminjwt', AdminSchema);
const Userjwt = mongoose.model('Userjwt', UserSchema);
const Coursejwt = mongoose.model('Coursejwt', CourseSchema);

module.exports = {
    Adminjwt,
    Userjwt,
    Coursejwt
}