import React from 'react';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import Box from "@mui/material/Box"

    
const ConversationModal = ({OnClose}) => {

   
    return (
        
        <Box component="form">
                Create new Room
                <TextField label="Room Name" type="text" required></TextField>
                <TextField label="Contact" type="text" required></TextField>
                <Button type="submit" >Create</Button>
                <Button onClick={OnClose} >Close</Button>
            </Box>
    );
}

export default ConversationModal;
