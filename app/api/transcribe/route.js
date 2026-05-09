import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  try {
    const { audioData, mimeType } = await request.json();

    if (!audioData || typeof audioData !== "string") {
      return NextResponse.json(
        { error: "Valid audio data is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI service is not configured." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent([
      "Transcribe the following audio accurately. Return only the transcribed text, nothing else.",
      {
        inlineData: {
          data: audioData,
          mimeType: mimeType || "audio/webm",
        },
      },
    ]);

    const transcription = result.response.text();

    return NextResponse.json({ text: transcription });
  } catch {
    return NextResponse.json(
      { error: "Transcription failed. Please try again." },
      { status: 500 }
    );
  }
}
