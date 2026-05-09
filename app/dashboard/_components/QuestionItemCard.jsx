import React from "react";
import { useRouter } from "next/navigation";

const QuestionItemCard = ({ question }) => {
  const router = useRouter();
  const onStart = () => {
    router.push("/dashboard/pyq/" + question?.mockId);
  };
  return (
    <div className="group relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.05] hover:border-white/[0.15] transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-violet-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative">
        <h2 className="font-semibold text-white text-lg mb-1">{question?.jobPosition}</h2>
        <h2 className="text-sm text-gray-500">
          {question?.jobExperience} Years of experience
        </h2>
        <h2 className="text-xs text-gray-600 mt-1">Created At: {question.createdAt}</h2>

        <div className="flex justify-between mt-4 gap-3">
          <button onClick={onStart} className="w-full px-4 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:from-blue-400 hover:to-violet-500 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 text-center">
            Start Practice
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionItemCard;
