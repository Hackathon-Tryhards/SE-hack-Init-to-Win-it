import React from 'react'
import ChatList from './ChatList'

const Tools = () => {
  const chats = [
    {
      name: "John Doe",
      avatar: "https://via.placeholder.com/50",
      lastMessage: "Hello there!",
    },
    {
      name: "Jane Smith",
      avatar: "https://via.placeholder.com/50",
      lastMessage: "How are you?",
    },
    // Add more chat objects as needed
  ];

  return (
    <>
      <div className='w-[20%] h-[100vh] bg-darkgrey flex flex-col items-center'>
        <ChatList chats={chats} />
      </div>
      <div className='w-full h-screen flex flex-col justify-between'>
        <div className="flex justify-between">
          <div className="w-1/2 bg-gray-200 p-4 m-6 h-[500px]">
            Option 1
          </div>
          <div className="w-1/2 bg-gray-200 p-4 m-6 h-[500px]">
            Option 2
          </div>
        </div>
        <div className="flex justify-center items-center">
          <input type="text" className="border border-gray-300 p-2 w-full max-w-xl" placeholder="Enter text..." />
        </div>
      </div>
    </>
  )
}

export default Tools
