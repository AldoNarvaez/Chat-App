import React, {useRef, useState} from 'react';
import Modal from './Modals/Modal';
import SinginModal from './Modals/SinginModal';

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
                console.log("submitted!!")
            }else{alert("Wrong password")
                return IdSubmit(null)}
                })
                
            }
        })
    }
    // function createNewId(){
    //   //  IdSubmit(uuidv4())
    // }
    return (
                <div>
            <form onSubmit={handleSubmit}>
                <label>Enter your user e-mail</label>
                <input type="text" ref={idEmail} required /><br/>
                <label>Password</label>
                <input type="text" ref={idPassword} required/><br/>
                <button type="submit" >Login</button><br/>
            </form>

                <button onClick={()=> setIsOpen(true)} style={{width:"250px"}}>
                    Sign in
                </button>
                <Modal open={isOpen} >
                    <SinginModal OnClose={()=> setIsOpen(false)}/>
                </Modal>
            
            
        </div>
        
    );
}

export default Login;
