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
            <div className="flex flex-col w-[20%] h-screen bg-darkgrey border-r border-maingreen">
                <div className="flex items-center justify-between p-4 border-b border-maingreen">
                    <h1 className="text-lg font-semibold text-white">Chats</h1>
                </div>
                <div className="overflow-y-auto">
                    {chats.map((chat, index) => (
                        <div
                            key={index}
                            className="flex items-center p-4 hover:bg-gray-200 cursor-pointer border-b border-maingreen"
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
                    <div className="flex items-center justify-between p-4 border-b border-maingreen">
                        <h1 className="text-lg font-semibold text-white">Friends</h1>
                    </div>
                    {userData.friends.map((friend, index) => (
                        <div
                            key={index}
                            className="flex items-center p-4 hover:bg-gray-200 cursor-pointer border-b border-maingreen"
                        // Add functionality for clicking on a friend to start a chat with them
                        >
                            <img
                                src={friend.avatar}
                                alt="Avatar"
                                className="w-10 h-10 rounded-full mr-4"
                            />
                            <div>
                                <h2 className="font-semibold">{friend}</h2>
                                {/* You can display additional information about the friend here */}
                                {/* Example: <p className="text-gray-500 truncate">{friend.status}</p> */}
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
