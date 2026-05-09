import React from "react";
import AddQuestions from "../_components/AddQuestions";
import QuestionList from "../_components/QuestionList";

const Questions = () => {
  return (
    <div className="py-12 px-2" >
      <div className="mb-10">
        <div className="text-xs text-blue-400 font-bold uppercase tracking-[0.25em] mb-3">Questions</div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2" >Master Your Interviews</h2>
        <h2 className="text-sm text-gray-500" >Comprehensive Question Preparation with AI</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 my-5 gap-5" >
        <AddQuestions/>
      </div>

      <QuestionList/>
    </div>
  );
};

export default Questions;