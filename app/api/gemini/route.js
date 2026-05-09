import { NextResponse } from "next/server";
import { chatSession } from "@/utils/GeminiAIModal";

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "A valid prompt is required." },
        { status: 400 }
      );
    }

    if (prompt.length > 10000) {
      return NextResponse.json(
        { error: "Prompt exceeds maximum length." },
        { status: 400 }
      );
    }

    const result = await chatSession.sendMessage(prompt);
    const responseText = result.response.text();

    return NextResponse.json({ text: responseText });
  } catch {
    return NextResponse.json(
      { error: "AI service unavailable. Please try again later." },
      { status: 500 }
    );
  }
}
