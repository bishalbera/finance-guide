"use client"

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PersonIcon } from "@radix-ui/react-icons";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const AdvisePage = () => {
    const [message, setMessage] = useState("");
    // const [response, setResponse] = useState("");
    const [advisor, setAdvisor] = useState("warren_buffett");
    const [greetings, setGreetings] = useState("");
    const [chat, setChat] = useState<{ message: string, role: string }[]>([]);


    const handleChooseAdvisor = (selecetedAdvisor: string) => {
        setAdvisor(selecetedAdvisor);
    }

    const handleChatMessage = (message: string, role: string) => {
        setChat((prevChat) => [...prevChat, { message, role }]);
    }

    const getGreeting = () => {
        const d = new Date();
        const currentTime = d.getHours();

        if (currentTime >= 6 && currentTime < 12) {
            return "Good morning 🥱"
        } else if (currentTime >= 12 && currentTime < 18) {
            return "Good afternoon ☺️"
        } else if (currentTime >= 18 && currentTime < 22) {
            return "Good evening 😎"
        } else {
            return "Good night 😴"
        }
    }

    const placeholders = [
        "What are the best investment strategies?",
        "How should I diversify my portfolio?",
        "What are the risks of investing in stocks?",
    ]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value);
        setMessage(e.target.value);
    };

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!message) return;

        handleChatMessage(message, "user");

        // Send request to the API
        fetch("/api/finance-guide", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ advisor, message }),
        })
            .then((res) => {
                // Check if the request was successful
                if (!res.ok) {
                    throw new Error(`Request failed with status ${res.status}`);
                }
                return res.json(); // Return the parsed JSON response
            })
            .then((data) => {
                // Set AI message in UI
                handleChatMessage(data.response || "Something went wrong", "ai");
            })
            .catch((error) => {
                // In case of error, set a default message or error message in the UI
                handleChatMessage("Error fetching data, please try again later.", "ai");
                console.error("Fetch error:", error);
            });
    };

    const handleExamplePromptClick = (message: string, advisor: string) => {

        setAdvisor(advisor);
        handleChatMessage(message, "user");

        // Send request to the API
        fetch("/api/finance-guide", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ advisor, message }),
        })
            .then((res) => {
                // Check if the request was successful
                if (!res.ok) {
                    throw new Error(`Request failed with status ${res.status}`);
                }
                return res.json(); // Return the parsed JSON response
            })
            .then((data) => {
                // Set AI message in UI
                handleChatMessage(data.response || "Something went wrong", "ai");
            })
            .catch((error) => {
                // In case of error, set a default message or error message in the UI
                handleChatMessage("Error fetching data, please try again later.", "ai");
                console.error("Fetch error:", error);
            });
    }


    useEffect(() => {
        setGreetings(getGreeting())
    }, [])

    return (


        <div className="min-h-screen w-full p-4">
            <div className="absolute z-10 top-0 left-0 bg-[url('https://www.bypeople.com/wp-content/uploads/2019/11/cool-backgrounds-hd-vector-pack-deals-bypeople-featured.jpg')] bg-cover bg-center min-h-screen w-full flex items-center justify-center bg-no-repeat"></div>
            <div className="relative z-20 min-h-screen w-full bg-white/[0.2] backdrop-blur-lg">

                                <div className="absolute top-4 left-4">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild className="w-48">
                                            <Button variant="outline" className="flex gap-2">
                                                <PersonIcon className="p-0.5 w-6 h-6" />
                                                <span>
                                                    {
                                                        advisor === "warren_buffett" ? "Warren Buffett" : "Ray Dalio"
                                                    }
                                                </span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-48">
                                            <DropdownMenuItem onClick={() => handleChooseAdvisor("warren_buffett")}
                                            >
                                                Warren Buffett
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleChooseAdvisor("ray_dalio")}
                                            >
                                                Ray Dalio
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                {
                    !chat.length ? ( /* If no response */
                        <>
                            <div className="h-full flex flex-col items-center justify-center pt-4">
                                <div className="h-full w-full flex flex-col justify-between">
                                    { /* Top */}
                                    <div className="flex flex-col items-center gap-2 mt-28">
                                        <h1 className="text-[#dddddd] text-4xl font-bold">
                                            {greetings}
                                        </h1>
                                        <h2 className="text-[#f0f0f0] font-semibold text-3xl">
                                            How can I help you today?
                                        </h2>
                                        <p className="text-white max-w-[520px] text-center">
                                            Ready to assist you with anything you need, from answering questions to providing recommendations. Let&apos;s get started
                                        </p>
                                    </div>

                                    { /* Bottom */}
                                    <div className="mb-10 flex flex-col gap-20 pt-[10rem]">
                                        <div className="flex justify-center gap-20">
                                            <div className="bg-white rounded-3xl p-10 max-w-[320px] cursor-pointer shadow-xl" onClick={() => handleExamplePromptClick("What are the best investment strategies?", "warren_buffett")}>
                                                <p className="text-[#464646] text-lg">
                                                    What are the best investment strategies?
                                                </p>
                                                <span className="text-gray-400 text-sm">
                                                    By Warren Buffett
                                                </span>
                                            </div>
                                            <div className="bg-white rounded-3xl p-10 max-w-[320px] cursor-pointer shadow-xl" onClick={() => handleExamplePromptClick("How should I diversify my portfolio?", "ray_dalio")}>
                                                <p className="text-[#464646] text-lg">
                                                    How should I diversify my portfolio?
                                                </p>
                                                <span className="text-gray-400 text-sm">
                                                    By Ray Dalio
                                                </span>
                                            </div>
                                            <div className="bg-white rounded-3xl p-10 max-w-[320px] cursor-pointer shadow-xl" onClick={() => handleExamplePromptClick(" What are the risks of investing in stocks?", "warren_buffett")}>
                                                <p className="text-[#464646] text-lg">
                                                    What are the risks of investing in stocks?
                                                </p>
                                                <span className="text-gray-400 text-sm">
                                                    By Warren Buffett
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mt-20">
                                            <PlaceholdersAndVanishInput
                                                placeholders={placeholders}
                                                onChange={handleChange}
                                                onSubmit={handleOnSubmit}
                                            />
                                            <p className="text-sm text-white text-center mt-2">This is an AI agent. It can make mistakes.</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </>
                    ) : ( /* If response */
                        <>
                            <div className="h-full w-full flex flex-col justify-end gap-5">
                                <div className="h-full max-h-[95%] w-full flex flex-col items-center justify-end shadow-inner">
                                    <div className="h-10/12 w-full max-w-[800px] flex flex-col justify-end pt-10">
                                        {
                                            chat.map((chat, index) => (
                                                <div key={index} className={`flex flex-row w-full gap-2 ${chat.role === "user" ? "justify-end" : "justify-start"} mb-4 pt-10`}>
                                                    <div className={`p-4 rounded-2xl shadow-lg ${chat.role === "user" ? "bg-[#464646] text-white rounded-tr-none" : "bg-[#f0f0f0] text-[black] rounded-tl-none"}`}>
                                                        {
                                                            chat.role === "ai" ? (
                                                                <>
                                                                    <TextGenerateEffect words={chat.message} className="text-base text-black" duration={0.5} />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {chat.message}
                                                                </>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="mb-10">
                                    <PlaceholdersAndVanishInput
                                        placeholders={placeholders}
                                        onChange={handleChange}
                                        onSubmit={handleOnSubmit}
                                    />
                                </div>

                            </div>
                        </>
                    )

                }

            </div>
        </div>
    );
};

export default AdvisePage;
