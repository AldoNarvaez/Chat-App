import React,{useEffect, useState} from 'react';

const {request} = require('graphql-request')


const Conversations = () => {

    const [arr,setArr]=useState()

    const email=sessionStorage.getItem("email")
  useEffect(()=>{
    const querie = `query{user(email:"${email}"){contacts}}`
      request("/graphql/",querie).then((data)=>{
            setArr(data.user.contacts)
      })
    },[]) 
    console.log(arr)
    return (
        <div>
            Conversations
        </div>
    );
}

export default Conversations;
