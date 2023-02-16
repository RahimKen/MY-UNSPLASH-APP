const Users = require('../models/userModel')
const Images = require('../models/imageModel')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')


const postImage = async (req , res) => {
    const {label , url} = req.body
    try{
        if(!label || !url){
            throw Error('All Fields Must Be Filled !')
        }
        const user_id = req.user._id
        const image = await Images.create({label , url , user_id})
        res.status(200).json(image)
    }catch(error){
        res.status(400).json({error : error.message})
    }
    
}

const getImage = async (req , res) => {
    const {id} = req.params;
    const user_id = req.user._id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such image'})
      }
    try{
      const image = await Images.findOne({_id : id, user_id})
      if(!image){
        throw Error('No Such Image')
      }
      res.status(200).json(image)
    }catch(error){
      res.status(400).json({error : error.message})
    }
}

const getImages = async (req , res) => {

    try{
      const user_id = req.user._id;
      const images = await Images.find({user_id}).select({user_id : 0})
      res.status(200).json(images)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

const deleteImage = async (req , res) => {
    const {id} = req.params;
    const user_id = req.user._id;
    const {password} = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such image'})
      }
    try{
        const user = await Users.findById({_id : user_id})
        const match = await bcrypt.compare(password , user.password)
        if(!match){
            throw Error('Wrong Password !')
        }
        const image = await Images.findOneAndDelete({_id : id , user_id})
        if(!image){
            throw Error('No Such Image To Delete')
        }
        res.status(200).json(image)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}



module.exports = {postImage , getImage , deleteImage , getImages}