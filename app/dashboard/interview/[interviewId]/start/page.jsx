"use client";
import { getInterviewById } from "../../../actions";
import React, { useState } from "react";
import { useEffect } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
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
        throw new Error("Interview not found");
      }

      const jsonMockResp = JSON.parse(result.data.jsonMockResp);
      setMockInterviewQuestion(jsonMockResp);
      setInterviewData(result.data);
    } catch (err) {
      setError(err.message || "Failed to load interview details.");
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
    <div className="py-8 px-2 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Interview Session</h1>
          <p className="text-sm text-gray-500">{interviewData?.jobPosition}</p>
        </div>
        <div className="bg-white/[0.04] border border-white/[0.08] px-4 py-2 rounded-full backdrop-blur-sm">
          <span className="text-sm font-medium text-gray-300">
            Progress: <span className="text-blue-400">{activeQuestionIndex + 1}</span> / {mockInterviewQuestion?.length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-10">
        {/* Questin Section */}
        <QuestionSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />

        {/* Video/audio Recording */}
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-8 border-t border-white/[0.06]">
        <div>
          {activeQuestionIndex > 0 && (
            <Button
              variant="outline"
              className="bg-white/[0.02] border-white/[0.08] text-white hover:bg-white/[0.06] hover:text-white px-6 py-5 rounded-xl transition-all"
              onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
            >
              ← Previous Question
            </Button>
          )}
        </div>
        
        <div className="flex gap-4">
          {activeQuestionIndex != mockInterviewQuestion?.length - 1 && (
            <Button
              className="bg-white/[0.08] hover:bg-white/[0.12] text-white border border-white/[0.1] px-8 py-5 rounded-xl transition-all font-medium"
              onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
            >
              Next Question →
            </Button>
          )}
          {activeQuestionIndex == mockInterviewQuestion?.length - 1 && (
            <Link
              href={"/dashboard/interview/" + interviewData?.mockId + "/feedback"}
            >
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white shadow-lg shadow-green-500/20 hover:shadow-green-500/40 border-0 px-8 py-5 rounded-xl transition-all font-bold">
                End & View Feedback
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default StartInterview;
