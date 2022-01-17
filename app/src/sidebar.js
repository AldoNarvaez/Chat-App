import React, {useState} from 'react';
import ContactModel from './Modals/ContactModel';
import Contacts from './Contacts';
import ConversationModal from './Modals/ConversationModal';
import Conversations from './Conversations';
import Modal from './Modals/Modal';

const Sidebar = () => {

  const [toggleState, setToggleState] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (

    
    <div style={{width:"250px",border:" 1px solid"}}>
      <div style={{borderBottom:"1px solid"}}>
        <button style={{width:"125px"}}
          onClick={() => toggleTab(1)} >
            Conversations
        </button>
        <button style={{width:"125px"}}
            onClick={() => toggleTab(2)}>
              Contacts
        </button>
      </div>

      <div style={{border:"right", overflow:"auto"}}>
            <div
            style={toggleState===1 ? {display: "inline"}: {display:"none"}}>
                <h2 style={{borderBottom:"1px solid"}}>Conversations</h2>
                    <Conversations/>
            </div>

            <div
            style={toggleState===2 ? {display: "inline"}: {display:"none"}}>
                <h2 style={{borderBottom:"1px solid"}}> Contacts</h2>
                    <Contacts/>
            </div>
      </div>
      <div style={{borderTop:"1px solid", borderBottom:"1px solid"}}>
          <button onClick={()=> setIsOpen(true)} style={{width:"250px"}}>
            New {toggleState===1 ? "Conversations": "Contacts"}
          </button>
          <Modal open={isOpen} >
              {toggleState===1 ? <ConversationModal OnClose={()=> setIsOpen(false)}/> : <ContactModel OnClose={()=> setIsOpen(false)}/>}
          </Modal>
      </div>



    </div>
  );
}

export default Sidebar;

