import React, {useState,useEffect} from "react";
import Login from "./Components/Login"
import Sidebar from "./Components/sidebar";
import "./App.css"
import Messages from "./Components/Messages";
import NavBar from "./NavBar/NavBar"
import {io} from "socket.io-client"

   const socket=io(undefined, {
      path:"/mysocket",
    });
    

function App() {

  const [id, setId]=useState(sessionStorage.getItem("user"))

  // useEffect(() => {
  //   socket.on("added",(msg)=>{
  //       console.log(msg)
  //   })
  // }, []);

  if (id){

    return (
           <>
          <div>
            <NavBar socket={socket}/>
            <h2>{"Hola "+id}</h2>
          </div>
            <div className="chat" >
              <div className="sidebar"  >
                <Sidebar id={id} socket={socket}/>
              </div>
              <div className="chatBox" style={{flex:5.5}}>
                <Messages socket={socket}/>
              </div> 

             
          </div>
            </>)}
  return(
            <>
          <div>
          Chat App
          </div>          
          <Login IdSubmit={setId} />
          </>
    
         );
}

export default App;
