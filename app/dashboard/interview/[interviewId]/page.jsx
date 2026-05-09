"use client";
import { getInterviewById } from "../../actions";
import { Lightbulb, WebcamIcon } from "lucide-react";
import React, { useEffect, useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import Webcam from "react-webcam";
import Link from "next/link";
import { WebCamContext } from "../../layout";

const Interview = ({ params }) => {
  const { webCamEnabled, setWebCamEnabled } = useContext(WebCamContext);
  const [interviewData, setInterviewData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    GetInterviewDetails();
  }, []);
  
  const GetInterviewDetails = async () => {
    try {
      setLoading(true);
      const result = await getInterviewById(params.interviewId);
        
      if (!result.success || !result.data) {
        throw new Error("Interview details not found.");
      }
      setInterviewData(result.data);
    } catch {
      setError("Failed to load interview. Please verify your database connection.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] text-red-400 gap-4">
        <p className="text-xl font-medium">{error}</p>
        <Button 
          className="bg-white/[0.04] border border-white/[0.1] text-white hover:bg-white/[0.08]" 
          onClick={() => window.location.reload()}
        >
          Retry Connection
        </Button>
      </div>
    );
  }
  return (
    <div className="py-12 px-2 max-w-5xl mx-auto">
      <div className="mb-10 text-center">
        <div className="text-xs text-blue-400 font-bold uppercase tracking-[0.25em] mb-3">Preparation</div>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Let's Get Started</h1>
        <p className="text-sm text-gray-500">Review your details and setup your environment before beginning.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm gap-5">
            <h2 className="text-gray-300">
              <strong className="text-white block mb-1 text-sm uppercase tracking-wider">Job Role/Job Position</strong>
              <span className="text-lg">{interviewData?.jobPosition}</span>
            </h2>
            <div className="w-full h-px bg-white/[0.05]" />
            <h2 className="text-gray-300">
              <strong className="text-white block mb-1 text-sm uppercase tracking-wider">Job Description/Tech Stack</strong>
              <span className="text-lg">{interviewData?.jobDesc}</span>
            </h2>
            <div className="w-full h-px bg-white/[0.05]" />
            <h2 className="text-gray-300">
              <strong className="text-white block mb-1 text-sm uppercase tracking-wider">Years of Experience</strong>
              <span className="text-lg">{interviewData?.jobExperience}</span>
            </h2>
          </div>

          <div className="p-6 border border-yellow-500/20 rounded-2xl bg-yellow-500/5 backdrop-blur-sm">
            <h2 className="flex gap-2 items-center text-yellow-400 mb-3 font-semibold text-lg">
              <Lightbulb className="w-5 h-5" />
              Information
            </h2>
            <h2 className="text-yellow-200/80 leading-relaxed text-sm">
              {process.env.NEXT_PUBLIC_INFORMATION}
            </h2>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex-grow flex flex-col justify-center">
            {webCamEnabled ? (
              <div className="flex items-center justify-center p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl backdrop-blur-sm overflow-hidden mb-6">
                <Webcam
                  onUserMedia={() => setWebCamEnabled(true)}
                  onUserMediaError={() => setWebCamEnabled(false)}
                  className="rounded-xl w-full max-w-[400px] shadow-2xl"
                  mirrored={true}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center p-12 bg-white/[0.02] border border-white/[0.06] rounded-2xl backdrop-blur-sm mb-6 aspect-video">
                <WebcamIcon className="h-24 w-24 text-gray-500" />
              </div>
            )}
            
            <Button
              variant="outline"
              className={`w-full py-6 text-sm font-semibold rounded-xl border transition-all duration-300 ${
                webCamEnabled 
                  ? "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20 hover:text-red-300" 
                  : "bg-white/[0.04] text-white border-white/[0.08] hover:bg-white/[0.08]"
              }`}
              onClick={() => setWebCamEnabled((prev) => !prev)}
            >
              {webCamEnabled ? "Disable Camera & Microphone" : "Enable Camera & Microphone"}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center md:justify-end mt-12 pt-8 border-t border-white/[0.06]">
        <Link href={"/dashboard/interview/" + params.interviewId + "/start"}>
          <Button className="px-10 py-6 bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold rounded-xl hover:from-blue-400 hover:to-violet-500 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-105 transform transition-all duration-300 text-base">
            Start Interview →
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Interview;
