import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import { FaTools } from "react-icons/fa";
import { IoIosChatboxes } from "react-icons/io";
import Profile from './Profile';
import Tools from './Tools';
import ChatList from './ChatList';
import axios from 'axios';

const Dashboard = () => {
  const [pageState, setPageState] = useState(0);

  const chats = [
    {
      name: "Untitled",
      avatar: "https://via.placeholder.com/50",
      lastMessage: "Hello there!",
      timestamp: "2024-04-10T00:00:00Z",
      type: "group",
      _id: "662d33bda8bcf7d00d051d30",
    },
    {
      name: "Untitled 2",
      avatar: "https://via.placeholder.com/50",
      lastMessage: "Hello there!",
      timestamp: "2024-04-05T00:00:00Z",
      type: "group",
      _id: "662d33c9a8bcf7d00d051d40",
    },
    {
      name: "John",
      avatar: "https://via.placeholder.com/50",
      lastMessage: "Hello there!",
      timestamp: "2024-04-4T00:00:00Z",
      type: "dm",
    },
    {
      name: "John",
      avatar: "https://via.placeholder.com/50",
      lastMessage: "Hello there!",
      timestamp: "2024-04-4T00:00:00Z",
      type: "dm",
    },
    {
      name: "John",
      avatar: "https://via.placeholder.com/50",
      lastMessage: "Hello there!",
      timestamp: "2024-04-4T00:00:00Z",
      type: "dm",
    },
    {
      name: "John",
      avatar: "https://via.placeholder.com/50",
      lastMessage: "Hello there!",
      timestamp: "2024-04-4T00:00:00Z",
      type: "dm",
    },
    {
      name: "John",
      avatar: "https://via.placeholder.com/50",
      lastMessage: "Hello there!",
      timestamp: "2024-04-4T00:00:00Z",
      type: "dm",
    },
  ];


  return (
    <>
      <div className='w-full flex bg-lightgrey'>
        <div className={`w-[5rem] h-screen bg-lightgrey border-r-[1px] border-maingreen `}>
          <div className={`flex justify-center items-center h-20 ${pageState === 0 ? "bg-maingreen" : "bg-lightgrey"} text-white text-2xl font-bold`}>
            <button onClick={() => setPageState(0)} >
              <CgProfile className={`text-4xl ${pageState === 0 ? "text-lightgrey" : "text-maingreen"}`} />
            </button>

          </div>
          <div className={`flex justify-center items-center h-20 ${pageState === 1 ? "bg-maingreen" : "bg-lightgrey"} text-white text-2xl font-bold`}>
            <button onClick={() => setPageState(1)} >
              <FaTools className={`text-3xl ${pageState === 1 ? "text-lightgrey" : "text-maingreen"}`} />
            </button>

          </div>
          <div className={`flex justify-center items-center h-20 ${pageState === 2 ? "bg-maingreen" : "bg-lightgrey"} text-white text-2xl font-bold`}>
            <button onClick={() => setPageState(2)} >
              <IoIosChatboxes className={`text-3xl ${pageState === 2 ? "text-lightgrey" : "text-maingreen"}`} />
            </button>

          </div>
        </div>


        {
          pageState === 0 && (
            <Profile />
          )
        }
        {
          pageState === 1 && (
            <Tools />
          )
        }
        {
          pageState === 2 && (
            <ChatList chats={chats} />
          )
        }





      </div>

    </>

  )
}

export default Dashboard