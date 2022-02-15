import React,{useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';

const {request} = require('graphql-request')


const Contacts = () => {

    const [arr,setArr]=useState([])

    const email=sessionStorage.getItem("email")
  useEffect(()=>{
    const querie = `query{user(email:"${email}"){contacts}}`
      request("/graphql/",querie).then((data)=>{
           const l=data.user.contacts
            setArr(l)
      })
    },[]) 
    return (
      <>
       <ul>
         {arr.map(c =>{
          const m=JSON.parse(c);
          return <li key={m._id}><Button>{m.username}</Button></li>
         })}
       </ul>
       </>
       
    );
}

export default Contacts;
