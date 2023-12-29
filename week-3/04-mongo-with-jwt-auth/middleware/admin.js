const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config')
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization
    const words = token.split(" ")
    const jwtToken = words[1]
    try {
        const result = jwt.verify(jwtToken, JWT_SECRET)
        next()
    } catch (error) {
        res.status(401).json({
            mssg:'authorization failed.'
        })
    }
}

module.exports = adminMiddleware;