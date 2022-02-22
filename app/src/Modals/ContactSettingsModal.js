import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Modal from "./Modal.js"
import NewConversationModal from './NewConversationModal.js';
import AddContactModal from './AddContactModal.js';

const {request} = require('graphql-request')


const ContactSettingsModal =({OnClose,selected}) => {
    const [isOpen, setIsOpen] = useState(false);


     function deleteContact() {
        const myEmail=sessionStorage.getItem("email");
        const mut1 = `mutation{deleteContact(myEmail:"${myEmail}",email:"${selected.email}"){username}}`
        const mut2 = `mutation{deleteContact(myEmail:"${selected.email}",email:"${myEmail}"){username}}`

        request("/graphql/",mut1)
        request("/graphql/",mut2)

    }


    return (
        <div>
        <Button onClick={()=> {setIsOpen(true)}} >New Conversation</Button>
        <Button onClick={()=>{OnClose(); deleteContact(); }} >Delete Contact</Button>
        <Button onClick={()=>{OnClose(); }} >Cancel/Continue</Button>
        <Modal open={isOpen}>
            <NewConversationModal onClose={()=>{setIsOpen(false)}} />
        </Modal>
        </div>
    );
}

export default ContactSettingsModal;
