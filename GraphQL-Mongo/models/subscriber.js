const mongoose = require("mongoose")

const subscriberSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    contacts:{
        type: Array,
        required: false
    }
})



module.exports=mongoose.model("subscriber",subscriberSchema)