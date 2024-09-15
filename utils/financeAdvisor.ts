import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";

export type FinanceAgentRole = "user" | "advisor"; 

export interface FinanceMessage {
  role: FinanceAgentRole;
  content: string;
}

export interface FinanceAIStreamPayload {
  model: string;
  messages: FinanceMessage[]; // Reflecting financial conversations
  temperature: number;
  stream: boolean;
}

export async function FinanceAdvisorAIStream(payload: FinanceAIStreamPayload) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const url =
    process.env.LLAMAEDGE_BASE_URL || "https://llama.us.gaianet.network/v1";

  let res = await fetch(url + "/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.LLAMAEDGE_API_KEY ?? ""}`,
    },
    method: "POST",
    body: JSON.stringify(payload), // Financial context in payload
  });

  const readableStream = new ReadableStream({
    async start(controller) {
      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === "event") {
          const data = event.data;
          controller.enqueue(encoder.encode(data)); // Sending response data to stream
        }
      };

      if (res.status !== 200) {
        const data = {
          status: res.status,
          statusText: res.statusText,
          body: await res.text(),
        };
        console.log(
          `Error: received non-200 status code, ${JSON.stringify(data)}`
        );
        controller.close();
        return;
      }

      const parser = createParser(onParse);
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk)); // Parsing the streaming data
      }
    },
  });

  let counter = 0;
  const transformStream = new TransformStream({
    async transform(chunk, controller) {
      const data = decoder.decode(chunk);

      if (data === "[DONE]") {
        controller.terminate();
        return;
      }

      try {
        const json = JSON.parse(data);
        const text = json.choices[0].delta?.content || "";

        if (counter < 2 && (text.match(/\n/) || []).length) {
          return;
        }

        const financeAdvice = { text: `Finance Advisor: ${text}` };
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(financeAdvice)}\n\n`)
        );
        counter++;
      } catch (e) {
        controller.error(e);
      }
    },
  });

  return readableStream.pipeThrough(transformStream);
}
