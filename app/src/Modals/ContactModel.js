import React,{useRef, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Box from "@mui/material/Box"
import { TextField } from '@material-ui/core';


const {request} = require('graphql-request')


const ContactModel = ({socket ,OnClose}) => {
    
    // useEffect(() => {
    //     socket.on("added",(msg)=>{
    //         console.log(msg)
    //     })
    //   }, []);
    const emailRef=useRef()

      

    function handleSubmit(e) {
        e.preventDefault()

        const email=emailRef.current.value
        const myEmail=sessionStorage.getItem("email")
        const myUsername=sessionStorage.getItem("user")
        const queryUser1 = `query{user(email:"${myEmail}"){contacts}}`;
        const queryUser2 = `query{user(email:"${email}"){ _id username email}}`;
        const queryAuth = `query{user(email:"${myEmail}"){username}}`;

        request("/graphql/", queryAuth).then((data)=>{
            if(data){
                request("/graphql/",queryUser1).then((data1)=>{

                    request("/graphql/",queryUser2).then((data2)=>{
                      const ar=data1.user.contacts
                      if(data2.user==null){
                          return alert("Unexisting user")
                      }
                      const {_id, username,email}=data2.user
                      const objStr=JSON.stringify({_id,username,email})
                       if(ar.indexOf(objStr)===-1){
                          
                          socket.emit("addContact",{user1:myUsername,user2:username, myEmail:myEmail, email:email})
                            const mut = `mutation{addContact(emailFrom:"${email}",emailTo:"${myEmail}"){username}}`
                            const mut2 = `mutation{addContact(emailFrom:"${myEmail}",emailTo:"${email}"){username}}`
                            window.location.reload()
                            request("/graphql/",mut2)
                         return  request("/graphql/",mut)
                       }
                     return alert("User already saved")
          
                  })
      
                })
               

            }
            

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
