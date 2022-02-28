import React, {useState} from 'react';
import ContactModel from '../Modals/ContactModel';
import ConversationModal from '../Modals/ConversationModal';
import Contacts from './Contacts';
import Conversations from './Conversations';
import Modal from '../Modals/Modal';
import Button from '@material-ui/core/Button';
import Box from '@mui/material/Box';
//const {request} = require('graphql-request')


const Sidebar = ({socket}) => {

  const [toggleState, setToggleState] = useState(2);
  const [isOpen, setIsOpen] = useState(false);
  // const [arr,setArr]=useState()

  const toggleTab = (index) => {
    setToggleState(index);
  };

  // const email=sessionStorage.getItem("email")
  // useEffect(()=>{
  //   const querie = `query{user(email:"${email}"){contacts}}`
  //     request("/graphql/",querie).then((data)=>{
  //           setArr(data.user.contacts)
  //     })
  //   },[]) 
  //   console.log(arr)
  // const querie = `query{user(email:"${email}"){contacts}}`
  // request("/graphql/",querie).then((data)=>{
  //       setArr(data.user.conects)
  // })

  return (

    
    <Box style={{height:"100%", width:"250px",border:" 1px solid"}}>
      <Box style={{borderBottom:"1px solid"}}>
        <Button style={{width:"125px"}}
          onClick={() => toggleTab(1)} >
            Conversations
        </Button>
        <Button style={{width:"125px"}}
            onClick={() => toggleTab(2)}>
              Contacts
        </Button>
      </Box>

      <Box style={{border:"right", overflow:"auto"}}>
            <Box
            style={toggleState===1 ? {display: "inline"}: {display:"none"}}>
                <h2 style={{borderBottom:"1px solid"}}>Conversations</h2>
                    <Conversations socket={socket}/>
            </Box>

            <Box
            style={toggleState===2 ? {display: "inline"}: {display:"none"}}>
                <h2 style={{borderBottom:"1px solid"}}> Contacts</h2>
                   
                   <Contacts />
                  
            </Box>
      </Box>
      <div style={{borderTop:"1px solid", borderBottom:"1px solid"}}>
          <Button onClick={()=> setIsOpen(true)} style={{width:"250px"}}>
            New {toggleState===1 ? "Conversations": "Contacts"}
          </Button>
          <Modal open={isOpen} >
              {toggleState===1 ? <ConversationModal OnClose={()=> setIsOpen(false)} /> : <ContactModel OnClose={()=> setIsOpen(false)} socket={socket}/>}
          </Modal>
      </div>



    </Box>
  );
}

export default Sidebar;

