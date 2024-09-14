const express = require('express')
const {
    createTask,
    getTasks,
    getTask,
    deleteTask,
    updateTask,
} = require('../controllers/TasksController')
const requireAuth = require('../middlewares/requireAuth')
const router = express.Router()

router.use(requireAuth)
//GET all tasks
router.get('/', getTasks)

//GET one single task
router.get('/:id', getTask)

//POST a new document
router.post('/', createTask)

//DELETE a document
router.delete('/:id', deleteTask)

//Update a document
router.patch('/:id', updateTask)


module.exports = router