import React,{useEffect, useState} from 'react';

const {request} = require('graphql-request')


const Contacts = () => {

    const [arr,setArr]=useState()

    const email=sessionStorage.getItem("email")
  useEffect(()=>{
    const querie = `query{user(email:"${email}"){contacts}}`
      request("/graphql/",querie).then((data)=>{
            setArr(data.user.contacts)
      })
    },[]) 
    return (
        <div>
             {arr[0]}<br/>
            {arr[1]}<br/>{arr[2]}<br/>
        </div>
    );
}

export default Contacts;
