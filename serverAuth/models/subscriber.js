const mongoose = require("mongoose")
const jwt=require("jsonwebtoken")


const subscriberSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required: true
    },
    contacts:{
        type: Array,
        required: false
    },
    token:{
        type:String,
        required:false
    }

})

// subscriberSchema.methods.generateAuthToken=async function () {
    
//     const user=this
//     const token=jwt.sign({_id:user._id.toString()},"myToken")
//     user.tokens=user.token.concat({token })
//     await user.save()
//     return token
// }


module.exports=mongoose.model("subscriber",subscriberSchema)