const jwt = require('jsonwebtoken')
const sercrets = require('../config/secrets');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {

            if (err) {
                res.status(401).json({ message: 'Not Authenticated' })
            } else {
                req.user = { username: decodedToken.username }
                next()
            }
        })
    } else {
        res.status(400).json({ message: 'You do not have credentials'})
    }
}