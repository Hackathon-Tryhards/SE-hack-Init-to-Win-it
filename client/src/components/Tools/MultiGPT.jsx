import ChatGPT from '../../assets/download.png'
import Gemini from '../../assets/download.png'
import axios from 'axios'
import { ReactTyped } from "react-typed";
import { useState } from 'react';

const MultiGPTMessage = ({ chatGPTMsg, geminiMsg }) => {
    const [userQuery, setUserQuery] = useState("")
    const [chatGPTMessage, setChatGPTMessage] = useState(chatGPTMsg || "Lorem Ipsum")
    const [geminiMessage, setGeminiMessage] = useState(geminiMsg || "Lorem Ipsums")

    const onButtonClick = async () => {
        const question = userQuery;
        setUserQuery("");
        let request = await axios.post("http://localhost:3000/solveGenerelOpenAI", { question })
        setChatGPTMessage(request.data.text)

        request = await axios.post("http://localhost:3000/solveGenerelGemini", { question })
        setGeminiMessage(request.data.text);
    }

    const onEnterKeyPress = (e) => {
        if (e.key === 'Enter') {
            onButtonClick();
        }
    }

    return (
        <>
            <div className='flex justify-between'>
                <div className="w-1/2 bg-darkgrey p-4 m-6 h-[700px] scroll-auto rounded-xl gap-4 text-3xl">
                    <div className='flex justify-center'>
                        <img src={ChatGPT} alt="" className='w-11 h-10 rounded-full ' />
                        <span className='text-3xl text-maingreen'>
                            Chat GPT 3.5
                        </span>
                    </div>
                    <div className='text-2xl text-white mt-4'>
                        <ReactTyped strings={[chatGPTMessage]} typeSpeed={40} />
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
                        <ReactTyped strings={[geminiMessage]} typeSpeed={40} />
                    </div>
                </div>


            </div>
            <div className="flex justify-center items-center">
                <input type="text" className="border border-maingreen p-2 w-full max-w-xl bg-lightgrey text-white rounded-lg" placeholder="Enter text..." onChange={(e) => setUserQuery(e.target.value)} onKeyPress={onEnterKeyPress} />
                <button className='p-3 bg-maingreen rounded-xl ml-4' onClick={onButtonClick}>Generate</button>
            </div>
        </>
    )
}

export default MultiGPTMessage  