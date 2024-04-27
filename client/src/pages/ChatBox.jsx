/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";  
import ScrollToBottom from "react-scroll-to-bottom";

function ChatBox({ socket, chatID, type }) {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")) || {});
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.post("http://localhost:3000/getChatHistory", { chatID, type });
            setMessageList(response.data);
        }
        fetchData();
    }, [chatID, type])

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                chatID: chatID,
                author: userData.username,
                content: currentMessage,
                timestamp: new Date(Date.now()).toISOString()
            };

            console.log(messageData);

            await socket.emit("send_group_message", { chatID, message: messageData });
            setMessageList([...messageList, messageData]);
            setCurrentMessage("");
        }
    };

    useEffect(() => {
        socket.on("receive_group_message", (data) => {
            setMessageList([...messageList, data]);
        });
    }, [socket, messageList]);

    return (
        <div className="Box-window">
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {messageList.map((messageContent, index) => {
                        return (
                            <div
                                className="message"
                                id={userData.username === messageContent.author ? "you" : "other"}
                                key={index}
                            >
                                <div>
                                    <div className="message-content">
                                        <p className="p">{messageContent.content}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{new Date(messageContent.timestamp).toISOString().slice(11, 16)}</p>
                                        <p id="author">{messageContent.author}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input className="input"
                    type="text"
                    value={currentMessage}
                    placeholder="Hey..."
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            event.preventDefault();
                            sendMessage();
                        }
                    }}
                />
                <button className="button" onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    );
}

export default ChatBox;