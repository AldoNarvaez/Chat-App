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

 const message="Hello world";
io.on("connection",(socket)=>{           //Función que corre cuando el evento "connection" ocurre
    console.log("New webSocket connection")//An it wil run for every user (or connection)

    socket.emit("message´",message)
    //socket.broadcast.emit("message", "A new user has joined")

    socket.on("sendMessage",(message, callback)=>{
      io.emit("message", message)
      callback()
    })

    // socket.on("disconnect",()=>{
    //   io.emit("message", "A user has left")
    // })
   
})
server.listen(port, () => console.log(`Listening on port ${port}`));

