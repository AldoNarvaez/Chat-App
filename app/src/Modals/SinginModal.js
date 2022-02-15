import Button from '@material-ui/core/Button';
import Box from "@mui/material/Box"
import { TextField } from '@material-ui/core';
import React,{useRef} from 'react';
const {request} = require("graphql-request")

const SinginModal = ({OnClose}) => {

    const emailRef=useRef()
    const nameRef=useRef()
    const passRef=useRef()
    
   const handleSubmit=  function (e) {
       e.preventDefault()
        const newUser=nameRef.current.value;
        const newEmail=emailRef.current.value;
        const newPassword=passRef.current.value;
        
        const mut = `mutation{addUser(username:"${newUser}",email:"${newEmail}", password:"${newPassword}"){username}}`
       request("/graphql/",mut).then((data)=>{
           if(data.addUser==null){return alert("email already in use")}
            else{
                OnClose()
                return alert("Email succesfully created")
            }
        }
       
       )
    }

    return (
        <div>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField label="Enter an Email" type="text"  inputRef={emailRef} required/>
                <TextField label="Enter Username" type="text"  inputRef={nameRef} required/>
                <TextField label="Create a password" type="text"  inputRef={passRef} required/>
                <Button type="submit">Create</Button>
            </Box>

            <Button onClick={OnClose} >Close</Button>
        </div>
    );
}

export default SinginModal;
