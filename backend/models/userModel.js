const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    username : {
        type : String,
        required : true
    }
},{timestamps : true ,
   statics : {
   async login (email , password){

     if(!email || !password){
        throw Error('All fields must be filled !')
     }
     
     const user = await this.findOne({email})

     if(!user){
        throw Error('Incorrect Email')
     }

     const match = await bcrypt.compare(password , user.password)

     if(!match){
        throw Error('Incorrect Password')
     }

     return user

   },

   async signup(email , password , username){

    if(!email || !password || !username){
        throw Error('All fields must be filled !')
     }
     
     if(!validator.isEmail(email)){
        throw Error('You Need To Enter A Valid Email Address !')
     }
     if(password.length<8){
        throw Error('Password Too Short !')
     }
     const exist = await this.findOne({email})

     if(exist){
        throw Error('Email Already Exists !')
     }
     
     const salt = await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hash(password , salt)

     const user = await this.create({email , password : hashedPassword , username})

     return user
   }
}})

module.exports = mongoose.model('User', userSchema)