import AddUserToChat from "../addUserToChat/AddUserToChat";
import userIcon from "../../assets/user-icon.png";
import "./chatHeader.css";

function ChatHeader({ users, chatId, setUsers }) {
    const usernameArr = users.map((user) => user.username);
    const usersString = usernameArr.join(", ");

    return (
        <div className="chatHeader">
            {usersString ? (
                <>
                    <div>
                        <img
                            src={users[0].imgUrl ? users[0].imgUrl : userIcon}
                            alt="User icon"
                        />
                        <h3>{usersString}</h3>
                    </div>
                    <AddUserToChat chatId={chatId} setUsers={setUsers} />
                </>
            ) : (
                <h3>Welcome to SendIT!</h3>
            )}
        </div>
    );
}

export default ChatHeader;
