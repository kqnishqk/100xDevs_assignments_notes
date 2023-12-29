const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config')
function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization
    const words = token.split(" ")
    const jwtToken = words[1]
    try {
        const result = jwt.verify(jwtToken, JWT_SECRET)
        req.username = result['nameOfUser']
        next()
    } catch (error) {
        res.status(401).json({
            mssg:'authorization failed.'
        })
    }
}

module.exports = userMiddleware;