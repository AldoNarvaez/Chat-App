import React,{useRef} from 'react';
const {request} = require("graphql-request")


const SinginModal = ({OnClose}) => {

    const emailRef=useRef()
    const nameRef=useRef()
    const passRef=useRef()
    
   const handleSubmit=  function (e) {
       e.preventDefault()
        const newUser=nameRef.current.value;
        const newEmail=emailRef.current.value;
        const newPassword=passRef.current.value;
        
        const mut = `mutation{addUser(username:"${newUser}",email:"${newEmail}"){username}}`
        const mut2 = `mutation{createPassword(password:"${newPassword}",email:"${newEmail}"){email}}`
        request("/graphql2/",mut2)
       request("/graphql/",mut).then((data)=>{
           if(data.addUser==null){return alert("email already in use")}
            else{
                OnClose()
                return alert("Email succesfully created")
            }
        }
       
       )
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter an E-mail</label>
                <input type="text"  ref={emailRef} required></input>
                <label>Enter a Username</label>
                <input type="text"  ref={nameRef} required></input>
                <label>Create a password</label>
                <input type="text"  ref={passRef} required></input>
                <button type="submit">Create</button>
            </form>

            <button onClick={OnClose} >Close</button>
        </div>
    );
}

export default SinginModal;
