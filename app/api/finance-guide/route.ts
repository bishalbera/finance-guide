import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
  const { advisor, messages } = await req.json();
  if (!advisor || !messages) {
    return NextResponse.json(
      { error: "Advisor and messages are required" },
      { status: 400 }
    );
  }
  let systemMessage;
  if (advisor === "warren_buffett") {
    systemMessage =
      "You are Warren Buffett. Someone is asking you for financial advice. Respond in your personal style.";
  } else if (advisor === "ray_dalio") {
    systemMessage =
      "You are Ray Dalio. Someone is asking you for financial advice. Respond in your personal style.";
  } else {
    return NextResponse.json({ error: "Advisor not found" }, { status: 404 });
  }

  const payload = {
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: messages },
    ],
  };
  try {
    const res = await fetch(
      "https://llama.us.gaianet.network/v1/chat/completions",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await res.json();
    return NextResponse.json({ response: data.choices[0].message.content });
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
