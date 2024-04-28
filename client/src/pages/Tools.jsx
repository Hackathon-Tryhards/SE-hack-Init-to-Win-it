import { useState } from 'react'
import ToolList from '../pages/ToolList'
import MultiGPT from '../components/Tools/MultiGPT'
import SolverGPT from '../components/Tools/SolverGPT'

const Tools = () => {
  const [toolState, setToolState] = useState(0);


  const chats = [
    {
      name: "Multi GPT",
      avatar: "https://via.placeholder.com/50",
      lastMessage: "Get answers from all AI's",
    },
    {
      name: "Solver GPT",
      avatar: "https://via.placeholder.com/50",
      lastMessage: "How are you?",
    },
    // Add more chat objects as needed
  ];



  return (
    <>
      <div className='w-[20%] h-[100vh] bg-darkgrey flex flex-col items-center'>
        <ToolList chats={chats} setToolState={setToolState} />
      </div>
      <div className='w-full h-screen flex flex-col justify-between'>
        <div className="flex flex-col justify-between">
          {
            toolState === 0 && (
              <MultiGPT chatGPTMessage="Lorem Ipsum" geminiMessage="Lorem Ipsum" />
            )
          }
          {
            toolState === 1 && (
              <SolverGPT geminiMessage="Lorem Ipsum" />
            )
          }
          {
            toolState === 2 && (
              <ChatList chats={chats} />
            )
          }
        </div>
      </div>
    </>
  )
}

export default Tools