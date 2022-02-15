//const express=require("express")
//const app = express()
const mongoose =require("mongoose")
const jwt=require("jsonwebtoken")

mongoose.connect("mongodb://127.0.0.1:27017/users")

const db=mongoose.connection


 db.on("error", (error)=> console.log(error))
 db.once("open", ()=> console.log("Connected to data base!"))

// app.use(express.json())

// const subscribersRouter=require("./routes/subscribers")
// app.use("/subscribers",subscribersRouter)

//app.listen(3100,()=> console.log("server Started"))