import "./Message.css"
import React, {useState, useEffect} from "react";
import Button from '@material-ui/core/Button';
// import Box from "@mui/material/Box"
 //import { TextField } from '@material-ui/core';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';

const {request} = require('graphql-request')


const Messages = ({socket}) => {

    const [msg, setMsg] = useState("");
    const [messages, setMessages] = useState([]);
    //  socket.on("message",(message)=>{
    //    console.log(message)
    //    setMessages([...messages,message])

    //  })
    const myEmail=sessionStorage.getItem("email")
    const queryAuth = `query{user(email:"${myEmail}"){username}}`;

    useEffect(() => {
      socket.on("message",(message)=>{
        console.log(message)
        setMessages([...messages,message])

      })
    }, []);
   
   // const idText=useRef()
  //  socket.on("message",(message)=>{
  //   setMessages(message)
  // })
    function onChangeHandler(e){
        e.preventDefault()
       const message=e.target.value
       setMsg(message)
    }
    function handler(e) {
        e.preventDefault()
        // setMessages([...messages,msg])
        // setMsg("")
        request("/graphql/", queryAuth).then((data)=>{
          console.log(data.user.username)
          socket.emit("sendMessage", msg)

        })
      //console.log("message submitted")
    }


    return (

           <>

        <div className="chatBoxTop">
            <div className="messageTop">
            {messages.map(c =>{
          return(<p key={Math.random()} className="messageText">{c}</p>)
         })}
             </div>
        </div>
        <FormControl component="form" onSubmit={handler} sx={{m:1, width: '100%' }} >
          <InputLabel >Write something</InputLabel>
          <OutlinedInput  onChange={onChangeHandler} required
            endAdornment={
              <InputAdornment position="end">

                <Button type="submit" >Send
                </Button>
              </InputAdornment>
            }
          />
        </FormControl>
        </>

    );
}

export default Messages;
