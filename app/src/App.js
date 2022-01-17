import React, {useState} from "react";
import Login from "./Login"
import Sidebar from "./sidebar";

function App() {
  const [id, setId]=useState()
  if (id){
    return (
           <>
          <div>
            <h1>Chat App</h1>
          </div>
          <h2>{"Hola "+id}</h2>
          <div style={{display:"flex", height:"100vh"}}>
          <Sidebar/>
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
