import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

const QuestionSection = ({ mockInterviewQuestion, activeQuestionIndex }) => {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text to speech.");
    }
  };
  return (
    mockInterviewQuestion && (
      <div className="flex flex-col justify-between p-6 md:p-8 bg-white/[0.02] border border-white/[0.06] rounded-3xl backdrop-blur-sm h-full">
        <div>
          <div className="flex flex-wrap gap-2 md:gap-3 mb-8">
            {mockInterviewQuestion &&
              mockInterviewQuestion.map((question, index) => (
                <div
                  key={index}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-300 cursor-pointer ${
                    activeQuestionIndex == index
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                      : "bg-white/[0.04] text-gray-500 border border-white/[0.05] hover:bg-white/[0.08]"
                  }`}
                >
                  Q{index + 1}
                </div>
              ))}
          </div>
          
          <h2 className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-6">
            {mockInterviewQuestion[activeQuestionIndex]?.Question}
          </h2>
          
          <button 
            onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.Question)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-gray-300 hover:text-white hover:bg-white/[0.08] transition-all"
            aria-label="Listen to question"
          >
            <Volume2 className="w-4 h-4" />
            <span className="text-sm font-medium">Listen</span>
          </button>
        </div>

        <div className="mt-10 border border-blue-500/20 rounded-2xl p-5 bg-blue-500/5 backdrop-blur-sm">
          <h2 className="flex gap-2 items-center text-blue-400 mb-3 font-semibold">
            <Lightbulb className="w-5 h-5" />
            Instructions
          </h2>
          <p className="text-sm text-blue-200/70 leading-relaxed">
            {process.env.NEXT_PUBLIC_QUESTION_NOTE}
          </p>
        </div>
      </div>
    )
  );
};

export default QuestionSection;
