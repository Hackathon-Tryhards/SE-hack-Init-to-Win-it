import { useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import ChatBox from "./ChatBox";


const socket = io('http://localhost:3000');

const ChatList = ({ chats }) => {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")) || {});
    const [chatID, setChatID] = useState("");
    const [chatType, setChatType] = useState("");
    const [showChat, setShowChat] = useState(false);

    const onChatClick = async (chatID, type) => {
        setChatID(chatID);
        setChatType(type);
        setShowChat(true);
    }

    return (
        <>
            <div className="flex flex-col w-full h-screen bg-gray-100 border-r border-gray-200">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h1 className="text-lg font-semibold">Chats</h1>
                    <button className="text-blue-500">New Chat</button>
                </div>
                <div className="overflow-y-auto">
                    {chats.map((chat, index) => (
                        <div
                            key={index}
                            className="flex items-center p-4 hover:bg-gray-200 cursor-pointer border-b border-gray-200"
                            onClick={() => onChatClick(chat._id, chat.type)}
                        >
                            <img
                                src={chat.avatar}
                                alt="Avatar"
                                className="w-10 h-10 rounded-full mr-4"
                            />
                            <div>
                                <h2 className="font-semibold">{chat.name}</h2>
                                <p className="text-gray-500 truncate">{chat.lastMessage}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {showChat && <ChatBox socket={socket} chatID={chatID} type={chatType} />}
        </>
    );
};

export default ChatList;
