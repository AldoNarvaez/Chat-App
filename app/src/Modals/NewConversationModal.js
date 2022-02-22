import React from 'react';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import Box from "@mui/material/Box"

const NewConversationModal = ({onClose}) => {
    return (
            <Box component="form">
                Create new Room
                <TextField label="Room Name" type="text" required></TextField>
                <Button type="submit" >Submit</Button>
                <Button onClick={onClose} >Close</Button>
            </Box>
    );
}

export default NewConversationModal;
