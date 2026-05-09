"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getQuestionById } from "../../actions";
import { Skeleton } from "@/components/ui/skeleton";

const page = ({ params }) => {
  const [questionData, setQuestionData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQuestionDetails();
  }, []);

  const getQuestionDetails = async () => {
    try {
      setLoading(true);
      const result = await getQuestionById(params.pyqId);
      
      if (result.success && result.data) {
        const questionData = JSON.parse(result.data.MockQuestionJsonResp);
        setQuestionData(questionData);
      }
    } catch {
      // Error handled silently — empty state shown
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 my-10 max-w-4xl mx-auto space-y-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <Skeleton key={item} className="h-16 w-full rounded-xl bg-white/[0.05]" />
        ))}
      </div>
    );
  }

  return (
    questionData && (
    <div className="py-12 px-2 max-w-4xl mx-auto">
      <div className="mb-10 text-center">
        <div className="text-xs text-blue-400 font-bold uppercase tracking-[0.25em] mb-3">Practice</div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Previous Year Questions</h1>
        <p className="text-sm text-gray-500">Review generated questions and their suggested answers.</p>
      </div>

      <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-6 md:p-10 backdrop-blur-sm">
        <Accordion type="single" collapsible className="w-full space-y-4">
          {questionData &&
            questionData.map((item, index) => (
              <AccordionItem 
                value={`item-${index + 1}`} 
                key={index} 
                className="border border-white/[0.06] bg-white/[0.02] rounded-xl px-6 data-[state=open]:bg-white/[0.04] transition-colors duration-300"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <div className="flex items-start gap-4 pr-4">
                    <span className="text-blue-400 font-bold mt-0.5">Q{index + 1}.</span>
                    <span className="text-gray-200 font-medium leading-relaxed">{item?.Question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6 pt-2 text-gray-400 pl-10 border-t border-white/[0.05] mt-2">
                  <div className="flex gap-2 items-start mt-4">
                    <span className="text-green-400 font-bold">A.</span>
                    <p className="leading-relaxed">{item?.Answer}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </div>
    </div>
    )
  );
};

export default page;
