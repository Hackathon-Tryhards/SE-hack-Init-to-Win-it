import React, { useState } from 'react';
import ChatBox from './ChatBox';
import axios from 'axios';
import './Chat.css';
import { io } from 'socket.io-client';
const socket = io('http://localhost:3000');

const Chat = () => {
    const [username, setUsername] = useState(localStorage.getItem("username") || "");
    const [chatID, setChatID] = useState("");
    const [showCreateButton, setShowCreateButton] = useState(false);
    const [showChat, setShowChat] = useState(false);

    const getGrpCode = async () => {
        const response = await axios.get("http://localhost:3000/createGroup");
        setChatID(response.data._id);
        setShowCreateButton(true);
    }

    const joinRoom = () => {
        if (chatID !== '') {
            socket.emit("join_group_chat", { username, chatID });
            setShowChat(true);
        }
    };

    return (
        <div className="Chat-App">
            {!showChat ? (
                showCreateButton ? (
                    <div className="joinChatContainer">
                        <h3 className='h3'>Create A Chat</h3>
                        <input
                            type="text"
                            placeholder="Group Code..."
                            value={chatID}
                            disabled
                        />
                        <button className='button' onClick={joinRoom}>Create A Group</button>
                    </div>
                ) : (
                    <div className="joinChatContainer">
                        <h3 className='h3'>Join A Chat</h3>
                        <input className='input'
                            type="text"
                            placeholder="Room ID..."
                            value={chatID}
                            onChange={(event) => {
                                setChatID(event.target.value);
                            }}
                        />
                        <button className='button' onClick={joinRoom}>Join A Group</button>
                        <button className='button' onClick={getGrpCode}>Create A Group</button>
                    </div>
                )
            ) : (
                <ChatBox socket={socket} chatID={chatID} />
            )}
        </div>
    );
}


export default Chat;