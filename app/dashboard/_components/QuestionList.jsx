"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { getQuestionsByEmail } from "../actions";
import QuestionItemCard from "./QuestionItemCard";
import { Skeleton } from "@/components/ui/skeleton";

const QuestionList = () => {
  const { user } = useUser();
  const [questionList, setQuestionList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    user && GetQuestionList();
  }, [user]);

  const GetQuestionList = async () => {
    try {
      setLoading(true);
      const result = await getQuestionsByEmail(user?.primaryEmailAddress?.emailAddress);
      if (result.success) {
        setQuestionList(result.data);
      }
    } catch {
      // Error handled silently — empty list shown
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
          {[1, 2, 3].map((item) => (
            <Skeleton key={item} className="h-[160px] w-full rounded-2xl bg-white/[0.05]" />
          ))}
        </div>
      ) : questionList.length > 0 ? (
        <>
          <h2 className="font-medium text-xl text-white mb-4">Previous Generated Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
            {questionList.map((question, index) => (
              <QuestionItemCard key={index} question={question} />
            ))}
          </div>
        </>
      ) : (
        <div className="col-span-full p-8 text-center border border-white/[0.06] bg-white/[0.02] rounded-2xl">
          <p className="text-gray-400">No questions found. Create your first one above!</p>
        </div>
      )}
    </div>
  );
};

export default QuestionList;
