"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useContext, useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import { Mic, Loader2, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { WebCamContext } from "@/app/dashboard/layout";
import { saveUserAnswer } from "@/app/dashboard/actions";

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const { webCamEnabled, setWebCamEnabled } = useContext(WebCamContext);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      updateUserAnswer();
    }
  }, [userAnswer]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        await transcribeAudio(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch {
      toast.error("Could not start recording. Please check microphone permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const transcribeAudio = async (audioBlob) => {
    try {
      setLoading(true);
      
      // Convert audio blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64Audio = reader.result.split(',')[1];
        
        const response = await fetch("/api/transcribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            audioData: base64Audio,
            mimeType: "audio/webm",
          }),
        });

        if (!response.ok) {
          throw new Error("Transcription failed.");
        }

        const { text: transcription } = await response.json();
        setUserAnswer((prevAnswer) => prevAnswer + " " + transcription);
        setLoading(false);
      };
    } catch {
      toast.error("Could not transcribe audio. Please try again.");
      setLoading(false);
    }
  };

  const updateUserAnswer = async () => {
    try {
      setLoading(true);
      const feedbackPrompt =
        "Question:" +
        mockInterviewQuestion[activeQuestionIndex]?.Question +
        ", User Answer:" +
        userAnswer +
        " , Depends on question and user answer for given interview question" +
        " please give us rating for answer and feedback as area of improvement if any " +
        "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: feedbackPrompt }),
      });

      if (!response.ok) {
        throw new Error("AI service unavailable.");
      }

      const { text: rawText } = await response.json();
      const match = rawText.match(/```json\n?([\s\S]*?)\n?```/) || rawText.match(/\{([\s\S]*)\}/);
      let MockJsonResp = match ? (match[0].startsWith('{') ? match[0] : match[1]).trim() : rawText.trim();

      // Attempt to parse JSON
      let jsonFeedbackResp;
      try {
        jsonFeedbackResp = JSON.parse(MockJsonResp);
      } catch {
        throw new Error("Invalid JSON response from AI.");
      }

      const data = {
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.Question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.Answer,
        userAns: userAnswer,
        feedback: jsonFeedbackResp?.feedback,
        rating: jsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-yyyy"),
      };

      const saveResult = await saveUserAnswer(data);

      if (saveResult.success) {
        toast.success("User Answer recorded successfully");
        setUserAnswer("");
      } else {
        throw new Error(saveResult.error);
      }
    } catch {
      toast.error("Failed to save answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white/[0.02] border border-white/[0.06] rounded-3xl backdrop-blur-sm">
      <div className="relative w-full max-w-[400px] aspect-[4/3] rounded-2xl overflow-hidden bg-black/50 border border-white/[0.1] shadow-2xl mb-8 flex items-center justify-center">
        {webCamEnabled ? (
          <Webcam
            mirrored={true}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-4 opacity-50">
            <Image src={"/camera.jpg"} width={120} height={120} alt="Camera placeholder" className="rounded-2xl grayscale" />
            <span className="text-sm font-medium text-gray-400">Camera Disabled</span>
          </div>
        )}
        
        {/* Recording indicator overlay */}
        {isRecording && (
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-red-500/30">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-semibold text-red-400 tracking-wider">REC</span>
          </div>
        )}
      </div>

      <div className="flex flex-col w-full max-w-[400px] gap-4">
        <Button
          variant="outline"
          className={`w-full py-6 text-sm font-semibold rounded-xl border transition-all duration-300 ${
            isRecording
              ? "bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
              : "bg-gradient-to-r from-blue-500 to-violet-600 text-white border-0 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:from-blue-400 hover:to-violet-500"
          }`}
          onClick={isRecording ? stopRecording : startRecording}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" /> Saving...
            </span>
          ) : isRecording ? (
            <span className="flex items-center gap-2">
              <StopCircle className="w-5 h-5" /> Stop Recording
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Mic className="w-5 h-5" /> Record Answer
            </span>
          )}
        </Button>
        
        <Button 
          variant="ghost" 
          onClick={() => setWebCamEnabled((prev) => !prev)}
          className="text-gray-400 hover:text-white hover:bg-white/[0.05]"
        >
          {webCamEnabled ? "Disable Camera" : "Enable Camera"}
        </Button>
      </div>
    </div>
  );
};

export default RecordAnswerSection;
