const mongoose = require('mongoose')
const { model } = require('./user')

const ContactSchema = mongoose.Schema({

name: {
    type: String,
    required: true 
},    
user: {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'user'
},
email:{
    type:String,
    required:true 
},
phone:{
    type: String
},
type:{
    type:String,
    default:'personal'
},
date:{
    type: Date,
    default: Date.now
}

})


module.exports = mongoose.model('contact' , ContactSchema)