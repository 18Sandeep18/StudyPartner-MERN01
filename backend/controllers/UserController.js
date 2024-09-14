const User = require('../models/Users')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '2d' })
}

// Route activity controller
const signupUser = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const user = await User.signup(name, email, password)
        const token = createToken(user.id)
        res.status(200).json({ name, email, token })
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)
        const token = createToken(user.id)
        res.status(200).json({ email, token })
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }

}

module.exports = { loginUser, signupUser }