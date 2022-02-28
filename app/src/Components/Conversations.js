import React,{useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import { Socket } from 'socket.io-client';

const {request} = require('graphql-request')

const Conversations = ({socket}) => {
const [rooms, setRooms] = useState([]);

const ar=[]

  useEffect(() => {
    const myUser=sessionStorage.getItem("user")
  const querie2=`query{chats{roomName participants _id}}`
  request("/graphql2",querie2).then((data)=>{

    const datum= data.chats
    datum.map((r)=>{
      socket.emit("newRoom",r._id)
      return console.log(r._id)
    })

    datum.map((c)=>c.participants.map((d)=>{let k = d.indexOf(myUser)
      if(k!==-1){
        return ar.push(c.roomName)
      }
      return false
    })
    )
    setRooms(ar)
  })
  }, []);
 

  return (
    <ul>
    {rooms.map(c =>{
     return <li key={c}><Button>
       {c}</Button></li>
    })}
  </ul>
    );
}

export default Conversations;
