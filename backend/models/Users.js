const { model } = require('mongoose');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator');
const { response } = require('express');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})

//static signup method
UserSchema.statics.signup = async function (name, email, password) {

    //validation
    if (!name || !email || !password) {
        throw Error('All the fields need to be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough')
    }
    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('This email is already in Use')
    }

    //hashing the password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ name, email, password: hash })

    return user

}

UserSchema.statics.login = async function (email, password) {
    if (!email && !password) {
        throw new Error('Fill all details')
    }
    const user = await this.findOne({ email })

    if (!user) {
        throw new Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)


    if (!match) {
        throw Error('Incorrect password')
    }

    return user

}

module.exports = mongoose.model('User', UserSchema)