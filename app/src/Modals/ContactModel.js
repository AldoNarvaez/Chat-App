import React,{useRef} from 'react';

const ContactModel = ({OnClose}) => {

    const idRef=useRef()
    const nameRef=useRef()
    
    function handleSubmit(e) {
        e.preventDefault()
        
        //createContact(idRef.current.value,nameRef.current.value)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>E-mail</label>
                <input type="text"  ref={idRef} required></input>
                <label>Name</label>
                <input type="text"  ref={nameRef} required></input>
            </form>
            <button onClick={OnClose} type="submit">Create</button>
            <button onClick={OnClose} >Close</button>
        </div>
    );
}

export default ContactModel;
