// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.Authorization
    try {
        const result = jwt.verify(token, jwtPassword)
        next()
    } catch (error) {
        res.status(401).json({
            mssg:'authorization failed.'
        })
    }
}

module.exports = adminMiddleware;