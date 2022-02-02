import React,{useRef} from 'react';
import Button from '@material-ui/core/Button';
import Box from "@mui/material/Box"
import { TextField } from '@material-ui/core';
const {request} = require('graphql-request')

const ContactModel = ({OnClose}) => {

    const emailRef=useRef()

    function handleSubmit(e) {
        e.preventDefault()
        const email=emailRef.current.value
        const myEmail=sessionStorage.getItem("email")
        const querie = `query{user(email:"${myEmail}"){contacts}}`;
        const querie2 = `query{user(email:"${email}"){ _id username email}}`;

          request("/graphql/",querie).then((data1)=>{

              request("/graphql/",querie2).then((data2)=>{
                console.log(data1.user.contacts)
                const ar=data1.user.contacts
                if(data2.user==null){
                    return alert("Unexisting user")
                }
                console.log(data2)
                const {_id, username,email}=data2.user
                const objStr=JSON.stringify({_id,username,email})
                console.log(objStr)
                 if(ar.indexOf(objStr)===-1){
                     const mut = `mutation{addContact(emailFrom:"${email}",emailTo:"${myEmail}"){username}}`
                     window.location.reload()
                   return  request("/graphql/",mut)
                 }
                return alert("User already saved")
    
            })

          })
         

        
        
    }

    return (
        <div>
            <h2>Add new contact</h2>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField label="E-mail" type="text"  inputRef={emailRef} required></TextField>
                <Button type="submit" >Create</Button>
                <Button onClick={OnClose} >Close</Button>
            </Box>
            
        </div>
    );
}

export default ContactModel;
