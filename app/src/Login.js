import React, {useRef, useState} from 'react';
import Modal from './Modals/Modal';
import SinginModal from './Modals/SinginModal';
import Button from '@material-ui/core/Button';
import Box from "@mui/material/Box"
import { TextField } from '@material-ui/core';


const {request} = require('graphql-request')
//import {v4 as uuidv4} from "uuid" //FOR CREATING UNINQUES ID'S

const Login = ({IdSubmit}) => {
    const idEmail=useRef()
    const idPassword=useRef()

    const [isOpen, setIsOpen] = useState(false);
    function handleSubmit(e){
        const email=idEmail.current.value
        const passSubmited=idPassword.current.value;

        e.preventDefault();
        const querie = `query{user(email:"${email}"){username email}}`
        const querie2 = `query{password(email:"${email}"){password email}}`

        request("/graphql/",querie).then((data1)=>{
            if(data1.user==null){
                IdSubmit(data1.user)
                return alert("Unexisting User")
            }else{
                request("/graphql2/",querie2).then((data)=>{

            if(data.password.password===passSubmited){
                IdSubmit(data1.user.username)
                sessionStorage.setItem("user",data1.user.username);
                sessionStorage.setItem("email",data1.user.email);
               // console.log("submitted!!")
            }else{alert("Wrong password")
                return IdSubmit(null)}
                })
                
            }
        })
    }
    // function createNewId(){
    //   //  IdSubmit(uuidv4())
    // }
    return (<>
            
                <div>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField label="User e-mail" type="text" inputRef={idEmail} required /><br/>
                <TextField label="Password" type="text" inputRef={idPassword} required/><br/>
                <Button type="submit" >Login</Button><br/>
            </Box>

                <Button onClick={()=> setIsOpen(true)} style={{width:"250px"}}>
                    Sign in
                </Button>
                <Modal open={isOpen} >
                    <SinginModal OnClose={()=> setIsOpen(false)}/>
                </Modal>
            
            
        </div>
        </>
        
    );
}

export default Login;
