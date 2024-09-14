const jwt = require('jsonwebtoken')
const User = require('../models/Users')
const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization is required' })
    }

    const token = authorization.split(' ')[1]
    try {

        const { _id } = jwt.verify(token, process.env.SECRET)
        req.user = await User.findOne({ _id }).select('_id')
        next()

    } catch (err) {
        res.status(400).json({ error: 'Authorizaton is failed' })
    }
}

module.exports = requireAuth