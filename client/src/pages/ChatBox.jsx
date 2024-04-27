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
        <div className="w-full h-screen bg-darkgrey flex flex-col">
            <div className="box-border rounded-lg border-maingreen">
                    <div className="bg-maingreen p-2 rounded-t-lg flex justify-between">
                        <p className="text-xl font-semibold">Live Chat</p>
                        <button onClick={() => window.location.href = "/document"}
                            className="text-xl font-semibold mr-5 bg-darkgrey text-white p-2 rounded-full">Docs</button>
                    </div>
                    {/* <div className="overflow p-4">
                            <div className="message-container flex flex-col ">
                        {messageList.map((messageContent, index) => {
                        return (
                            <div className={`flex w-[100px] message ${userData.username === messageContent.author ? "justify-end bg-lightgrey" : "justify-start bg-maingreen"}`} key={index}>
                                <div className="flex max-w-[500px] flex-col">
                                    <div className="message-content p-2">
                                        <p className="text-lg">{messageContent.content}</p>
                                    </div>
                                    <div className="message-meta flex justify-between p-2">
                                        <p className="text-sm text-gray-500" id="time">{new Date(messageContent.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                        <p className="text-sm text-gray-500" id="author">{messageContent.author}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    </div>
                    </div> */}

                    <div className="max-h-screen flex flex-col">
                        {
                            messageList.map((messageContent, index) => {
                                return (
                                    <div className={`h-screen flex w-full ${userData.username === messageContent.author ? "items-end " : "items-start"}`}>
                                        <div className="bg-violet-800 p-4">
                                            {messageContent.content}

                                        </div>
                                    </div>
                                );
                            }
                            )
                        }

                    </div>


                    {/* <div className="bg-gray-200 p-2 rounded-b-lg">
                        <input
                    className="input flex-1 rounded-full py-2 px-4 mr-2 focus:outline-none focus:ring focus:border-blue-300"
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
                        <button
                            className="button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring focus:border-blue-300"
                            onClick={sendMessage}
                        >
                            &#9658;
                        </button>
                    </div> */}
               
            </div>
        </div>

    );
}

export default ChatBox;