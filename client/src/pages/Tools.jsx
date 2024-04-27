import React from 'react'
import ToolList from './ToolList'
import { useState } from 'react'
import ChatGPT from '../assets/download.png'
import Gemini from '../assets/gemini.png'
import { ReactTyped } from "react-typed";

const Tools = () => {
  const chats = [
    {
      name: "Multi GPT",
      avatar: "https://via.placeholder.com/50",
      lastMessage: "Get answers from all AI's",
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
        <ToolList chats={chats} />
      </div>
      <div className='w-full h-screen flex flex-col justify-between'>
        <div className="flex flex-col justify-between">
          <div className='flex justify-between'>
            <div className="w-1/2 bg-darkgrey p-4 m-6 h-[700px] scroll-auto rounded-xl gap-4 text-3xl">
              <div className='flex justify-center'>
                <img src={ChatGPT} alt="" className='w-11 h-10 rounded-full ' />
                <span className='text-3xl text-maingreen'>
                  Chat GPT 3.5
                </span>
              </div>
              <div className='text-2xl text-white mt-4'>
                <ReactTyped strings={["Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic, perferendis sint, deleniti provident harum ipsa debitis quia et eos est, quas incidunt reprehenderit?"]} typeSpeed={40} />                
              </div>
            </div>



            <div className="w-1/2 bg-darkgrey p-4 m-6 h-[700px] scroll-auto rounded-xl gap-4 text-3xl">
              <div className='flex justify-center'>
                {/* <img src={ChatGPT} alt="" className='w-11 h-10 rounded-full ' /> */}
                <span className='text-3xl text-maingreen'>
                  Gemini
                </span>
              </div>
              <div className='text-2xl text-white mt-4'>
              <ReactTyped strings={["Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic, perferendis sint, deleniti provident harum ipsa debitis quia et eos est, quas incidunt reprehenderit?"]} typeSpeed={40} /> 
              </div>
            </div>

          </div>

          <div className="flex justify-center items-center">
            <input type="text" className="border border-maingreen p-2 w-full max-w-xl bg-lightgrey text-white rounded-lg" placeholder="Enter text..." />
            <button className='p-3 bg-maingreen rounded-xl ml-4'>Generate</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Tools