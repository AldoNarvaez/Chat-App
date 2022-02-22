import React from 'react';
import Button from '@material-ui/core/Button';
import Box from "@mui/material/Box"

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
    
    <Box component="form" onSubmit={handleSubmit}>
         <div>{user1+" wants to add you, "+ user2}</div>
        <Button onClick={()=>{OnClose(); window.location.reload()}} >Accept</Button>
        <Button onClick={()=>{window.location.reload()}} type="submit" >Decline</Button>
    </Box>
        </div>
    );
}

export default AddContactModal;
