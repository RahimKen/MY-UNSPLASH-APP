const Users = require('../models/userModel')
const jwt = require('jsonwebtoken')


const LoginUser = async (req , res) => {

  const {email , password} = req.body
  try{
    const user = await Users.login(email , password)
    const _id  = user._id
    const username = user.username
    const token = jwt.sign({_id},process.env.SECRET,{expiresIn : '7d'})
    res.status(200).json({token , email , username})
  }
  catch(error){
    res.status(400).json({error : error.message})
  }
}

const SignupUser = async(req , res) => {
    const {email , password , username} = req.body;

    try{
       const user = await Users.signup(email , password , username)
       const _id = user._id
       const token = jwt.sign({_id},process.env.SECRET,{expiresIn : '7d'})
       res.status(200).json({token})
    }catch(error){
       res.status(400).json({error : error.message})
    }
}

module.exports= {LoginUser , SignupUser}