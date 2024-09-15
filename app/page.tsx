"use client"

import { useState } from "react";

const AdvisePage = () => {
  const [message, setMessage] = useState("");

  const [buffetResponse, setBuffetResponse] = useState("");

  const [dalioResponse, setDalioResponse] = useState("");

  const handleSendMessage = async () => {
    const res = await fetch("/api/financial-guide", {
      method: "POST",
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    setBuffetResponse(data.warren_buffet);
    setDalioResponse(data.ray_dalio);
  };
  return (
    <div>
      <h1>Ask for financial guidance</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask for financial guidance"
      />
      <button onClick={handleSendMessage}>Get Guidance</button>
      <div>
        <h2>Warren Buffet's Guidance</h2>
        <p>{buffetResponse}</p>
        <h2>Ray Dalio's Guidance</h2>
        <p>{dalioResponse}</p>
      </div>
    </div>
  );
};

export default AdvisePage;
