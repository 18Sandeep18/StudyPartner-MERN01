const express = require('express')

const mongoose = require('mongoose')
//for more security when we push our codes for deployment - 'dotenv'file will 
// add to gitignore which will be hidden
require('dotenv').config()
const app = express();
const taskRoutes = require('./routes/tasks')
const userRoutes = require('./routes/user')


//listening for requests


//middleware

app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes

app.use('/api/tasks', taskRoutes)
app.use('/api/user', userRoutes)



mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Connected to Db,server is listening to port ${process.env.PORT}`)
        })
    })
    .catch((Err) => {
        console.log(Err);
    })


// let's start out server...which is running on localhost 8080

// i'm using nodemon -> it will automatically restarts the server when new changes occurred