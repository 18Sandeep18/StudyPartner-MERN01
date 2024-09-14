const Task = require('../models/Tasks')
const mongoose = require('mongoose')
// get all workouts
const getTasks = async (req, res) => {
    const user_id = req.user._id
    const tasks = await Task.find({ user_id })
    res.status(200).json(tasks)
}


//get a single workout
const getTask = async (req, res) => {
    const { id } = req.params

    //if id entered is invalid, then dont look for it and make sure, app wont crash
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid Id' })
    }
    const task = await Task.findById(id)

    if (!task) {
        return res.status(404).json({ error: 'No such task available' })
    }
    res.status(200).json(task)
}


// create a new workout
const createTask = async (req, res) => {
    const { title, priority, timereq, due } = req.body
    //add document to db
    try {
        const user_id = req.user._id
        const task = await Task.create({ title, priority, timereq, due, user_id })
        res.status(200).json(task)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


// delete a workout
const deleteTask = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid Id' })
    }
    const task = await Task.findById(id)
    if (!task) {
        return res.status(404).json({ error: 'No such data to delete' })
    }
    await Task.deleteOne(task)
    res.status(200).json(task)
}


// update a workout

const updateTask = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid Id' })
    }
    const task = await Task.findOneAndUpdate({ _id: id }, {
        ...req.body
    })
    res.status(200).json(task)
}

module.exports = {
    createTask,
    getTasks,
    getTask,
    deleteTask,
    updateTask
}