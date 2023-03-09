const jwt = require('jsonwebtoken')
const ENV = require('../config')

const auth = async(req, res, next) => {
    try {
        console.log(req.headers.authorization)
        const token = req.headers.authorization.split(" ")[1]
        console.log(token)

        const decodedToken = jwt.verify(token, ENV.JWT_SECRET)

        req.user = decodedToken
        
        next()
    } catch (error) {
         res.status(401).json({err: 'Authentication fail'})
    }
};

const localVariables = (req, res, next) => {
    req.app.locals = {
        OTP: null,
        resetSession: false
    }
    next()
};

module.exports = {auth, localVariables}