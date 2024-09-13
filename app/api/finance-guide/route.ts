import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const client = new OpenAI({
      baseURL: process.env.BASE_URL as string,
      apiKey: "",
    });

    const { advisor, message } = await req.json();

    const aiResponse = await client.chat.completions.create({
      model: "Meta-Llama-3-8B-Instruct-Q5_K_M",
      messages: [
        {
          role: "system",
          content: `You are ${advisor}. Someone is asking you for financial advice. Respond inyour personal style.`,
        },
        {
          role: "user",
          content: message,
        },
      ],

      temperature: 0.7,
      max_tokens: 500,
    });
    return NextResponse.json({
      response: aiResponse.choices[0].message.content,
    });
  } catch (error) {
    console.error("an error occured", error);
    return NextResponse.json("some error occurred", { status: 500 });
  }
};
