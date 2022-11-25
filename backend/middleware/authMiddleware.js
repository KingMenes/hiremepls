import jwt from 'jsonwebtoken'
import asynchandler from 'express-async-handler'
import User from '../models/userModel.js'

export const protect = asynchandler(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //Get token from header
            token = req.headers.authorization.split(' ')[1] //splits between bearer and token, second one will be token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //get user from the token
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (err) {
            console.log(err)
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})
