const express = require('express')

const router = express.Router()

const {
    loginUser, signupUser
} = require('../controllers/UserController')


//login - we send information when any of the route activates, so POST req
router.post('/login', loginUser);

//signup
router.post('/signup', signupUser);

// router.get('/test', (req, res) => {
//     res.send('This is the test route');
// });

module.exports = router
