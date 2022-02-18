import React,{useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Modal from "../Modals/Modal.js"
import ContactSettingsModal from '../Modals/ContactSettingsModal.js';

const {request} = require('graphql-request')


const Contacts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

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
          return <li key={m._id}><Button 
          onClick={()=>{setSelected({_id:m._id, username:m.username, email:m.email}); 
          setIsOpen(true)}} >
            {m.username}</Button></li>
         })}
       </ul>
       <Modal open={isOpen} >
              <ContactSettingsModal OnClose={()=> setIsOpen(false)} selected={selected} />
       </Modal> 
       </>
       
    );
}

export default Contacts;
