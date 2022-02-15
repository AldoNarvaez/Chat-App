import React,{useEffect} from 'react';
import "./navbar.css";
//import Notification from "../img/notification.svg"

const Navbar = ({socket}) => {
    useEffect(() => {
        socket.on("added",(msg)=>{
            console.log(msg)
        })
      }, []);
//      socket.on("Added",(msg)=>{
//       console.log(msg)
//    })

    return (
        <div className="navbar">
            <h1>Chat App</h1>
            <div className="icons">
                <div className="icon">
                    <div className="notification">Notification</div>
                   <div className="counter">2</div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
