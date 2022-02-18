import React, { useEffect } from 'react';
const {request} = require('graphql-request')

const ContactSettingsModal =({OnClose,selected}) => {
    

     function deleteContact() {
        const myEmail=sessionStorage.getItem("email");
        const mut1 = `mutation{deleteContact(myEmail:"${myEmail}",email:"${selected.email}"){username}}`
        const mut2 = `mutation{deleteContact(myEmail:"${selected.email}",email:"${myEmail}"){username}}`

        request("/graphql/",mut1)
        request("/graphql/",mut2)

    }


    return (
        <div>
            {`user email is ${selected.email}`}
        <button onClick={OnClose} >New Conversation</button>
        <button onClick={()=>{OnClose(); deleteContact(); }} >Delete Contact</button>
        </div>
    );
}

export default ContactSettingsModal;
