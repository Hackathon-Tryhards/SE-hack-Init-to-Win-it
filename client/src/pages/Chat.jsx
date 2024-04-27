import React, { useState } from 'react';
import io from 'socket.io-client';
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
        <div className="App">
            {!showChat ? (
                <div className="joinChatContainer">
                    <h3>Join A Chat</h3>
                    <input
                        type="text"
                        placeholder="John..."
                        value={username}
                        onChange={(event) => {
                            setUsername(event.target.value);
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Room ID..."
                        value={room}
                        onChange={(event) => {
                            setRoom(event.target.value);
                        }}
                    />
                    <button onClick={joinRoom}>Join A Room</button>
                </div>
            ) : (
                <Chat socket={socket} username={username} room={room} />
            )}
        </div>
    );
}

export default Chat;