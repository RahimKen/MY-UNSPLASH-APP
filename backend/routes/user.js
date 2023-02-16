const express = require('express')
const {LoginUser , SignupUser} = require('../controllers/userController')
const router = express.Router()

router.post('/login' , LoginUser)

router.post('/signup' , SignupUser)

module.exports = router