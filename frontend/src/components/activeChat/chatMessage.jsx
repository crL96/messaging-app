function ChatMessage({ message, currentUser }) {
    const formattedTime = new Date(message.timestamp).toLocaleString("en-GB");

    let messageClass = "recievedMessage";
    if (currentUser === message.sender.username) {
        messageClass = "sentMessage";
    }

    return (
        <div className={messageClass}>
            <h4>{message.sender.username}</h4>
            <p>{message.text}</p>
            <p>{formattedTime}</p>
        </div>
    );
}

export default ChatMessage;
