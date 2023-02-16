require('dotenv').config()
const app = require('express')()
const body_parser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const userRouter = require('./routes/user')
const imageRouter = require('./routes/image')

//Middlwares
app.use(cors())
app.use(body_parser.json())
app.use(morgan('dev'))


//Routes
app.use('/user' , userRouter)
app.use('/image' , imageRouter)

const port = 5000 || process.env.PORT


//DB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(port , () => {
        console.log('server running on port ' , port)
    })
})
.catch((error)=>{
    console.log(error)
})


