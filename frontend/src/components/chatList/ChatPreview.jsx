import userIcon from "../../assets/user-icon.png";
import styles from "./chatPreview.module.css";

function ChatPreview({ chat, setActiveChat, activeChat }) {
    function handleChatSelect() {
        setActiveChat(chat.id);
    }

    let selectStatus = "";
    if (activeChat === chat.id) {
        selectStatus = styles.active
    }

    return (
        <div className={`${styles.container} ${selectStatus}`} onClick={handleChatSelect}>
            <img src={chat.users[0].imgUrl ? chat.users[0].imgUrl : userIcon} alt="User icon" />
            <h3>{chat.users[0].username}</h3>
        </div>
    );
}

export default ChatPreview;
