const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    adminname:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    courses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    imageLink:{
        type: String,
        required: true
    },
    published:{
        type: Boolean,
        required: true
    }
});

const Adminjwt = mongoose.model('Adminjwt', AdminSchema);
const Userjwt = mongoose.model('Userjwt', UserSchema);
const Coursejwt = mongoose.model('Coursejwt', CourseSchema);

module.exports = {
    Adminjwt,
    Userjwt,
    Coursejwt
}