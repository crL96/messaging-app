function ChatMessage({ message, currentUser }) {
    
    let messageClass = "recievedMessage";
    if (currentUser === message.sender.username) {
        messageClass = "sentMessage";
    }
    
    return (
        <div className={messageClass}>
            <h4>{message.sender.username}</h4>
            <p>{message.text}</p>
            <p>{message.timestamp}</p>
        </div>
    );
}

export default ChatMessage;