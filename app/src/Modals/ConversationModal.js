import React from 'react';

    
const ConversationModal = ({OnClose}) => {

   
    return (
        <div>
        <button onClick={OnClose} type="submit">Create</button>
        <button onClick={OnClose} >Close</button>
        </div>
    );
}

export default ConversationModal;
