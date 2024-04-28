import { useState } from "react";
import { io } from "socket.io-client";



const socket = io('http://localhost:3000');

const ToolList = ({ chats, setToolState }) => {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")) || {});
    // const [chatID, setChatID] = useState("");

    return (
        <>
            <div className="flex flex-col w-full h-screen bg-darkgrey">
                <div className="flex items-center justify-between p-4 border-b border-lightgrey">
                    <h1 className="text-lg font-semibold">Tools</h1>
                </div>
                <div className="overflow-y-auto">
                    {chats.map((chat, index) => (
                        <div
                            key={index}
                            className="flex items-center p-4 hover:bg-maingreen cursor-pointer border-b border-maingreen"
                            onClick={() => setToolState(index)}
                        >
                            {/* <img
                                src={chat.avatar}
                                alt="Avatar"
                                className="w-10 h-10 rounded-full mr-4"
                            /> */}
                            <div>
                                <h2 className="font-semibold text-white">{chat.name}</h2>
                                <p className="text-gray-500 truncate">{chat.lastMessage}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ToolList;
