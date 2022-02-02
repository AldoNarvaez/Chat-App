import React, {useState} from "react";
import Login from "./Login"
import Sidebar from "./sidebar";
import "./App.css"
import Messages from "./Messages";
  
function App() {
  
 //sessionStorage.clear()
  const [id, setId]=useState(sessionStorage.getItem("user"))
//   const [currentChat, setcurrentChat] = useState(true);
//  const [messages, setMessages] = useState([]);
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
                <Messages/>
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
