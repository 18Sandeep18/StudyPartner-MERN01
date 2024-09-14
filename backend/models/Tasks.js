const mongoose = require('mongoose')
const { model } = require('mongoose')

const Schema = mongoose.Schema

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    timereq: {
        type: Number,
        required: true
    },
    due: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }

},
    {
        timestamps: true
    })


module.exports = mongoose.model('Task', taskSchema)