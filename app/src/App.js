import React, {useState} from "react";
import Login from "./Login"
import Sidebar from "./sidebar";
import "./App.css"
import Message from "./Message";

function App() {
 //sessionStorage.clear()
  const [id, setId]=useState(sessionStorage.getItem("user"))
 
  if (id){

    return (
           <>
          <div>
            <h1>Chat App</h1>
            <h2>{"Hola "+id}</h2>
          </div>
            <div className="chat" >
              <div className="sidebar"  >
                <Sidebar id={id}/>
              </div>
              <div className="chatBox" style={{flex:5.5}}>
                <div className="chatBoxTop">
                    <Message/>
                    <Message own={true}/>
                    <Message/>
                    <Message/>
                </div>
                <div className="chatBoxBotton">
                  <textarea className="chatMessageInput" placeholder="Write something..." ></textarea>
                  <button className="chatSubmitButton">Send</button>
                </div>
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
