const mongoose = require("mongoose")

const subscriberSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true
    }
})



module.exports=mongoose.model("subscriber",subscriberSchema)