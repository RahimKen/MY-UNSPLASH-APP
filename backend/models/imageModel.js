const mongoose = require('mongoose')

const Schema = mongoose.Schema

const imageSchema = new Schema ({
    label : {
        type : String ,
        required : true 
    },
    url : {
        type : String ,
        required : true
    },
    user_id : {
        type : Schema.Types.ObjectId,
        required : true
    }
})

module.exports = mongoose.model('Image' , imageSchema)