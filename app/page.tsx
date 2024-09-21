"use client"

import { useState } from "react";

const AdvisePage = () => {
        const [message, setMessage] = useState("");

        const [response, setResponse] = useState("");

        const [advisor, setAdvisor] = useState("");

        const handleChooseAdvisor = (selecetedAdvisor) => {

                setAdvisor(selecetedAdvisor)
        }

        const handleSendMessage = async () => {
                const res = await fetch("/api/financial-guide", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ advisor, message }),
                });
                const data = await res.json();
                setResponse(data.response)
        };
        return (

                // TODO: Add dropdown button to  choose the advisor
                <div>
                        <h1>Ask for financial guidance</h1>
                        <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Ask for financial guidance"
                        />
                        <button onClick={handleSendMessage}>Get Guidance</button>
                        <p>{response}</p>
                </div>
        );
};

export default AdvisePage;
