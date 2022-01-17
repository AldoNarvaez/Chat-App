const mongoose = require("mongoose")

const passwordsSchema = new mongoose.Schema({
    password:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true
    }
})



module.exports=mongoose.model("password",passwordsSchema)