const express = require('express')
const {postImage , getImage , deleteImage , getImages} = require('../controllers/imageController')
const requireAuth = require('../middleware/Auth')
const router = express.Router()

router.use(requireAuth)

router.post('/post' , postImage)

router.get('/get' , getImages)

router.get('/get/:id' , getImage)

router.delete('/delete/:id' , deleteImage)



module.exports = router