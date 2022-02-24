import React, { useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import Box from "@mui/material/Box"
import Conversations from '../Components/Conversations';
const {request} = require('graphql-request')


const NewConversationModal = ({onClose, selected}) => {
    const roomRef=useRef()

    const myId=sessionStorage.getItem("_id")
    const myEmail=sessionStorage.getItem("email")
    const myUsername=sessionStorage.getItem("user")

    const email=selected.email
    const username=selected.username
    const id=selected._id

    function handleSubmit(e) {
        e.preventDefault()


        const querie=`query{chat(roomName:"${roomRef.current.value}"){roomName}}`

        request("/graphql2/",querie).then((data)=>{
         if(data.chat==null){
            const mut=`mutation{createRoomName(roomName:"${roomRef.current.value}"){roomName}}`
            const mut2=`mutation{addParticipants(roomName:"${roomRef.current.value}", participantID:"${id}",participantEmail:"${email}", participantUsername:"${username}"){roomName}}`
            const mut3=`mutation{addParticipants(roomName:"${roomRef.current.value}", participantID:"${myId}",participantEmail:"${myEmail}", participantUsername:"${myUsername}"){roomName}}`
            


            request("/graphql2/",mut)
            request("/graphql2/",mut2)
            request("/graphql2/",mut3)
            
            const querie2=`query{chats{roomName}}`
            request("/graphql2",querie2).then((data)=>{
            })

            onClose()
         }
         else{return alert("Room Name already in use")}
        })
       


    }


    return (
            <Box component="form" onSubmit={handleSubmit}>
                Create new Room
                <TextField label="Room Name" type="text" inputRef={roomRef} required></TextField>
                <Button type="submit"  >Submit</Button>
                <Button onClick={onClose} >Close</Button>
            </Box>
    );
}

export default NewConversationModal;
