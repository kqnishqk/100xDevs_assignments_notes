function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.Authorization
    try {
        const result = jwt.verify(token, jwtPassword)
        req.username = result['username']
        next()
    } catch (error) {
        res.status(401).json({
            mssg:'authorization failed.'
        })
    }
}

module.exports = userMiddleware;