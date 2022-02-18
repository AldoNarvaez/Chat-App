import React,{useEffect, useState} from 'react';
import "./navbar.css";
//import Notification from "../img/notification.svg"
import Modal from "../Modals/Modal"
import AddContactModal from '../Modals/AddContactModal';

const Navbar = ({socket}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [user1, setUser1] = useState("");
    const [user2, setUser2] = useState("");
    const [myEmail, setMyEmail] = useState("");
    const [email, setEmail] = useState("");



    useEffect(() => {
        socket.on("added",({user1,user2, myEmail,email})=>{
            const myUsername=sessionStorage.getItem("user")
            if(user2===myUsername){
            setUser1(user1)
            setUser2(user2)
            setMyEmail(myEmail)
            setEmail(email)
            setIsOpen(true)
        }
        })
      }, []);
//      socket.on("Added",(msg)=>{
//       console.log(msg)
//    })

    return (
        <div className="navbar">
            <h1>Chat App</h1>
            
            <Modal open={isOpen}>
                <AddContactModal OnClose={()=> setIsOpen(false)} user1={user1} user2={user2} myEmail={myEmail} email={email}/>
            </Modal>
        </div>

    );
}

export default Navbar;
