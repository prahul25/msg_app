import { LanguageModel, streamText } from "ai";
import { NextResponse } from "next/server";
import OpenAI, { ClientOptions } from "openai";
import { ChatCompletionStream } from "openai/lib/ChatCompletionStream.mjs";

// Initialize OpenAI client with API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
} as ClientOptions);

export async function POST(req: Request) {
    
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      stream: true,
      max_tokens: 400
    });
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
        async start(controller) {
            for await (const chunk of completion) {
                const text = chunk.choices[0]?.delta?.content || "";
                controller.enqueue(encoder.encode(text));
            }
            controller.close();
        },
    });
    
    
    return new Response(readableStream);
    
} catch (error: any) {
    if (error instanceof OpenAI.APIError) {
      // OpenAI API error handling
      const { name, status, headers, message } = error;
      return NextResponse.json({ name, status, headers, message }, { status });
    } else {
      // General error handling
      console.error('An unexpected error occurred:', error);
      return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
  }
}
