function ChatMessage({ message }) {
    return (
        <div>
            <h4>{message.sender.username}</h4>
            <p>{message.text}</p>
            <p>{message.timestamp}</p>
        </div>
    );
}

export default ChatMessage;