import React,{useRef} from 'react';
import Button from '@material-ui/core/Button';
import Box from "@mui/material/Box"
import { TextField } from '@material-ui/core';
const {request} = require('graphql-request')

const ContactModel = ({OnClose}) => {

    const emailRef=useRef()
    const nameRef=useRef()


    function handleSubmit(e) {
        e.preventDefault()
        const email=emailRef.current.value
        const myEmail=sessionStorage.getItem("email")
        console.log("¿entramos?")
        const mut = `mutation{addContact(emailFrom:"${email}",emailTo:"${myEmail}"){username}}`
        request("/graphql/",mut)
        //createContact(idRef.current.value,nameRef.current.value)
    }

    return (
        <div>
            <h2>Add new contact</h2>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField label="E-mail" type="text"  inputRef={emailRef} required></TextField>
                <TextField label="Name" type="text"  inputRef={nameRef} required></TextField>
                <Button type="submit" >Create</Button>
                <Button onClick={OnClose} >Close</Button>
            </Box>
            
        </div>
    );
}

export default ContactModel;
