const mongoose = require("mongoose")
//const jwt=require("jsonwebtoken")


const chatSchema = new mongoose.Schema({
    roomName:{
        type:String,
        required: true
    },
    participants:{
        type:Array,
        required:false
    },
    messages:{
        type:Array,
        required: false
    }

})



module.exports=mongoose.model("chat",chatSchema)