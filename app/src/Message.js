import "./Message.css"

const Message = ({own}) => {
    return (
        <div className={own ? "message own": "message"}>
            <div className="messageTop">
                <p className="messageText">
                Hello this is a message ver long message. 
                Well, not that longo but very long, folks
                </p>
            </div>
        </div>
    );
}

export default Message;
