"use client";
import { getFeedback } from "../../../actions";
import React, { useEffect, useState, useMemo } from "react";
import { ChevronDown, Trophy, Home } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

const Feedback = ({ params }) => {
  const router = useRouter();
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    try {
      setLoading(true);
      const result = await getFeedback(params.interviewId);
      if (result.success) {
        setFeedbackList(result.data);
      }
    } catch {
      // silently handle — UI shows empty state
    } finally {
      setLoading(false);
    }
  };

  const overallRating = useMemo(() => {
    if (feedbackList && feedbackList.length > 0) {
      const totalRating = feedbackList.reduce(
        (sum, item) => sum + Number(item.rating),
        0
      );
      return (totalRating / feedbackList.length).toFixed(1);
    }
    return 0;
  }, [feedbackList]);

  if (loading) {
    return (
      <div className="py-12 px-2 max-w-4xl mx-auto space-y-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <Skeleton key={item} className="h-16 w-full rounded-xl bg-white/[0.05]" />
        ))}
      </div>
    );
  }

  return (
    <div className="py-12 px-2 max-w-4xl mx-auto">
      {feedbackList?.length == 0 ? (
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-12 text-center backdrop-blur-sm">
          <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-300 mb-2">
            No Feedback Found
          </h2>
          <p className="text-gray-500 mb-8">It seems no answers were recorded during this interview session.</p>
          <Button onClick={() => router.replace("/dashboard")} className="bg-white/[0.04] text-white hover:bg-white/[0.08] border border-white/[0.1]">
            Return to Dashboard
          </Button>
        </div>
      ) : (
        <>
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-8 md:p-12 mb-8 backdrop-blur-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-20 text-green-500">
               <Trophy className="w-32 h-32" />
             </div>
             
             <div className="relative z-10">
               <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-4">
                 Congratulations!
               </h2>
               <h2 className="font-semibold text-2xl text-white mb-6">Here is your interview feedback</h2>
               
               <div className="inline-flex items-center gap-4 bg-white/[0.04] border border-white/[0.1] rounded-2xl p-4 pr-6 shadow-lg">
                 <div className={`flex items-center justify-center w-16 h-16 rounded-xl text-2xl font-bold text-white shadow-inner ${overallRating >= 5 ? "bg-gradient-to-br from-green-400 to-emerald-600" : "bg-gradient-to-br from-red-400 to-rose-600"}`}>
                   {overallRating}
                 </div>
                 <div>
                   <p className="text-sm text-gray-400 font-medium uppercase tracking-wider mb-0.5">Overall Rating</p>
                   <p className="text-xl font-bold text-white">Out of 10</p>
                 </div>
               </div>
             </div>
          </div>

          <div className="mb-6 px-2">
            <h3 className="text-lg font-medium text-white mb-2">Detailed Review</h3>
            <p className="text-sm text-gray-500">
              Review your answers compared to the ideal responses, along with personalized improvement tips.
            </p>
          </div>
          
          <div className="space-y-4 mb-10">
            {feedbackList &&
              feedbackList.map((item, index) => (
                <Collapsible key={index} className="border border-white/[0.06] bg-white/[0.02] rounded-2xl overflow-hidden transition-all duration-300">
                  <CollapsibleTrigger className="p-5 w-full flex items-start justify-between gap-4 text-left hover:bg-white/[0.02] transition-colors">
                    <div className="flex gap-4">
                       <span className="text-blue-400 font-bold mt-0.5 whitespace-nowrap">Q{index + 1}.</span>
                       <span className="text-gray-200 font-medium leading-relaxed pr-4">{item.question}</span>
                    </div>
                    <ChevronDown className="h-5 w-5 text-gray-500 shrink-0 mt-0.5" />
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="p-5 pt-0 border-t border-white/[0.05] mt-2 bg-black/20">
                    <div className="flex flex-col gap-4 mt-4">
                      
                      <div className="flex items-center gap-3">
                         <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">AI Rating:</span>
                         <span className={`px-3 py-1 rounded-full text-sm font-bold ${Number(item.rating) >= 5 ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                           {item.rating} / 10
                         </span>
                      </div>

                      <div className="space-y-3 mt-2">
                        <div className="p-4 border border-red-500/20 rounded-xl bg-red-500/5">
                          <strong className="text-red-400 text-sm mb-1 block uppercase tracking-wider">Your Answer: </strong>
                          <p className="text-red-200/80 text-sm leading-relaxed">{item.userAns}</p>
                        </div>
                        
                        <div className="p-4 border border-green-500/20 rounded-xl bg-green-500/5">
                          <strong className="text-green-400 text-sm mb-1 block uppercase tracking-wider">Ideal Answer: </strong>
                          <p className="text-green-200/80 text-sm leading-relaxed">{item.correctAns}</p>
                        </div>
                        
                        <div className="p-4 border border-blue-500/20 rounded-xl bg-blue-500/5">
                          <strong className="text-blue-400 text-sm mb-1 block uppercase tracking-wider">Feedback & Improvement: </strong>
                          <p className="text-blue-200/80 text-sm leading-relaxed">{item.feedback}</p>
                        </div>
                      </div>
                      
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
          </div>
        </>
      )}

      <div className="flex justify-center md:justify-end">
        <Button onClick={() => router.replace("/dashboard")} className="px-8 py-6 bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold rounded-xl hover:from-blue-400 hover:to-violet-500 shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2">
          <Home className="w-5 h-5" /> Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Feedback;
