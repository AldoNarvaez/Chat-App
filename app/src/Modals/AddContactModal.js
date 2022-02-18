import React from 'react';
const {request} = require('graphql-request')


const AddContactModal = ({OnClose, user1,user2,myEmail, email}) => {

    function handleSubmit(e) {
        e.preventDefault()

        const mut = `mutation{deleteContact(myEmail:"${myEmail}",email:"${email}"){username}}`
        const mut2 = `mutation{deleteContact(myEmail:"${email}",email:"${myEmail}"){username}}`

        request("/graphql/",mut)
         request("/graphql/",mut2)




    }
   
    return (
        <div>
    
    <form onSubmit={handleSubmit}>
         <span>{user1+" wants to add you, "+ user2}</span>
        <button onClick={()=>{OnClose(); window.location.reload()}} >Accept</button>
        <button onClick={()=>{window.location.reload()}} type="submit" >Decline</button>
    </form>
        </div>
    );
}

export default AddContactModal;
