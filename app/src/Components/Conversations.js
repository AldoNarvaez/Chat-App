import React,{useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';

const {request} = require('graphql-request')

const Conversations = () => {
const [rooms, setRooms] = useState([]);

const ar=[]

  useEffect(() => {
    const myUser=sessionStorage.getItem("user")
  const querie2=`query{chats{roomName participants}}`
  request("/graphql2",querie2).then((data)=>{
    const datum= data.chats
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
