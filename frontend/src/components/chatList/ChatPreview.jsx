import userIcon from "../../assets/user-icon.png";
import styles from "./chatPreview.module.css";

function ChatPreview({ chat, setActiveChat }) {
    function handleChatSelect() {
        setActiveChat(chat.id);
    }

    return (
        <div className={styles.container} onClick={handleChatSelect}>
            <img src={userIcon} alt="User icon" />
            <h3>{chat.users[0].username}</h3>
        </div>
    );
}

export default ChatPreview;
