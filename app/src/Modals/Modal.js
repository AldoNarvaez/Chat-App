import React from 'react';

const MODAL_STYLES={
    position:"fixed",
    top:"20%",
    left:"50%",
    transform: "translate(-50%,50%)",
    backgroundColor:"gray",
    padding:"50px",
    zIndex:1000
}


const Modal = ({open,children}) => {
    if(!open)return null
    return (
        // <div style={OVERLAY_STYLES}>
        <div style={MODAL_STYLES}>
            {children}
        </div>
//{/* </div> */}
    );
}

export default Modal;
