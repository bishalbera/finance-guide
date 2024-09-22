"use client"

import { useState } from "react";

const AdvisePage = () => {
        const [messages, setMessage] = useState("");

        const [response, setResponse] = useState("");

        const [advisor, setAdvisor] = useState("");

        const handleChooseAdvisor = (selecetedAdvisor) => {

                setAdvisor(selecetedAdvisor)
        }

        const handleSendMessage = async () => {
                const res = await fetch("/api/finance-guide", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ advisor, messages }),
                });
                const data = await res.json();
                setResponse(data.response)
        };

        const handleExampleClick = ( exampleMessage, exampleAdvisor)=> {
                setMessage(exampleMessage)
                setAdvisor(exampleAdvisor)
                handleSendMessage()
        }

        return (

                
                <div className="bg-gradient-to-r from-pink-200 to-pink-500 min-h-screen">
                        <div className="flex flex-col items-center justify-center pt-4">
                                <div className="absolute top-4 left-4">
                                        <select onChange={(e)=> handleChooseAdvisor(e.target.value)} className="p-2 rounded bg-gray-500"
                                                >
                                                        <option value="" className="text-lg ">Select Advisor</option>
                                                        <option value="warren_buffett" className="text-lg ">Warren Buffett</option>
                                                        <option value="ray_dalio" className="text-lg ">Ray Dalio</option>
                                        </select>
                                </div>
                                <h1 className="text-5xl font-bold font-mono mt-[10rem] mb-[20rem]">How can I help you?</h1>
                                <div className="w-full max-w-md mb-4 flex gap-4">
                                        <div className="bg-cus-white p-4 rounded shadow mb-2  cursor-pointer"
                                        onClick={()=> handleExampleClick("What are the best investment strategies?", "warren_buffett")}> 
                                        <p className="text-black font-mono font-bold text-lg"> What are the best investment strategies?  - Warren Buffett</p>
                                        </div>
                                        <div className="bg-cus-white p-4 rounded shadow mb-2  cursor-pointer"
                                        onClick={()=> handleExampleClick("How should I diversify my portfolio?", "ray_dalio")}> 
                                        <p className="text-black font-mono font-bold text-lg"> How should I diversify my portfolio?  - Ray Dalio</p>
                                        </div>
                                        <div className="bg-cus-white p-4 rounded shadow mb-2  cursor-pointer"
                                        onClick={()=> handleExampleClick("What are the risks of investing in stocks?", "warren_buffett")}> 
                                        <p className="text-black font-mono font-bold text-lg"> What are the risks of investing in stocks?  - Warren Buffett</p>
                                        </div>
                                </div>
                                <div className="w-full max-w-md flex items-center absolute bottom-4">
                                        <input type="text"
                                        value={messages}
                                        onChange={(e)=> setMessage(e.target.value)}
                                        placeholder="Ask for financial guidance"
                                        className="flex-grow p-2 rounded-l bg-cus-white"
                                        />
                                        <button onClick={handleSendMessage}
                                        className="p-2 bg-blue-600 text-cus-white rounded-r"
                                        >
                                               ➤ 
                                        </button>

                                </div>
                                <p className="mt-4 text-cus-white">{response}</p> 
                        </div>
                </div>
        );
};

export default AdvisePage;
