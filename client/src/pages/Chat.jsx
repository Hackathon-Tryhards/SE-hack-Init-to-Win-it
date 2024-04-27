import React, { useState } from 'react';
import ChatBox from './ChatBox';
import './Chat.css';
import { io } from 'socket.io-client';
const socket = io('http://localhost:3000');

const Chat = () => {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

    const joinRoom = () => {
        if (username !== "" && room !== "") {
            socket.emit("join_room", room);
            setShowChat(true);
        }
    };

    return (
        <div className="Chat-App">
            {!showChat ? (
                <div className="joinChatContainer">
                    <h3 className='h3'>Join A Chat</h3>
                    <input
                        type="text"
                        placeholder="John..."
                        value={username}
                        onChange={(event) => {
                            setUsername(event.target.value);
                        }}
                    />
                    <input className='input'
                        type="text"
                        placeholder="Room ID..."
                        value={room}
                        onChange={(event) => {
                            setRoom(event.target.value);
                        }}
                    />
                    <button className='button' onClick={joinRoom}>Join A Room</button>
                </div>
            ) : (
                <ChatBox socket={socket} username={username} room={room} />
            )}
        </div>
    );
}

export default Chat;