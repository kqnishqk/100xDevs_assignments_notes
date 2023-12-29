// Middleware for handling auth
const { User } = require('../db/index');
function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    let entry = {
        username: req.headers.username,
        password: req.headers.password
    }
    
    User.findOne(entry)
    .then((document) => {
        if(document == null){
            res.status(401).json({
                mssg:"wrong credentials/user doesnt exist."
            })
            return
        }
        next()
    })
    .catch((err => {
        console.log('trouble retrieving info from the database.');
        console.error(err);
        res.status(500).json({
            mssg:'trouble retrieving info from the database.'
        })
        return
    }))
}

module.exports = userMiddleware;