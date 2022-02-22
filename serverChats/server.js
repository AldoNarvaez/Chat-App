const mongoose =require("mongoose")
//const jwt=require("jsonwebtoken")

mongoose.connect("mongodb://127.0.0.1:27017/chats")

const db=mongoose.connection


 db.on("error", (error)=> console.log(error))
 db.once("open", ()=> console.log("Connected to data base!"))