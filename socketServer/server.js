const express=require("express")
const path=require("path")
const http=require("http")
const {Server}=require("socket.io")
const socket=require("socket.io")


const port = 5000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  path: "/mysocket"
 });

//  so a user could look like:
//  {
//    "id": "123",
//    "name": "Ivan"
//  }
 
//  and when that user connects, you should be able to execute:
 
//  // user 123 is connecting
//  io.on("connection", (socket)=> {
//     const userID =    /* code to get userID from cookie or some other means goes here */
//     socket.join(userID); // joined room "123"
//     /* code to join every conversation goes here */
//  });



 const message="Hello world";
io.on("connection",(socket)=>{           //Función que corre cuando el evento "connection" ocurre
    console.log("New webSocket connection")//An it wil run for every user (or connection)
     

    socket.on("sendMessage",(message)=>{
      console.log(message)
      io.emit("message", message)
      
    })


     socket.on("addContact",({user1,user2, myEmail,email})=>{
       console.log(`adding...`)
       io.emit("added",{user1,user2,myEmail,email})
     })

    // socket.on("disconnect",()=>{
    //   io.emit("message", "A user has left")
    // })
   
})
server.listen(port, () => console.log(`Listening on port ${port}`));

