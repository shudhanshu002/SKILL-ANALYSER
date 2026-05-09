"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { getInterviewList } from "../actions"; // Import server action
import { checkSystemConnectivity } from "../diagnostics"; // Import diagnostic action
import InterviewItemCard from "./InterviewItemCard";
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, RefreshCcw } from "lucide-react";

const InterviewList = () => {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [diagnosticResult, setDiagnosticResult] = useState(null);

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    try {
      setLoading(true);
      setError(null);
      setDiagnosticResult(null);
      const result = await getInterviewList(user?.primaryEmailAddress?.emailAddress); // Use server action

      if (result.success) {
        setInterviewList(result.data);
      } else {
        throw new Error(result.error);
      }
    } catch {
      setError("Unable to connect to the database.");
      
      // Run diagnostic on failure
      const diag = await checkSystemConnectivity();
      setDiagnosticResult(diag);
    } finally {
      setLoading(false);
    }
  };
  
  if (error) {
    return (
      <div className="my-5 p-6 border border-red-500/30 bg-red-500/10 rounded-2xl backdrop-blur-sm">
        <div className="flex items-center gap-3 text-red-400 font-bold mb-4">
          <AlertCircle />
          <h2>Connection Error</h2>
        </div>
        <p className="text-gray-300 mb-6">{error} This is often caused by local DNS restrictions or a network firewall.</p>
        
        {diagnosticResult && (
          <div className="bg-black/50 p-4 rounded-xl border border-white/10 mb-6 text-sm">
            <h3 className="font-semibold text-white mb-2">Network Diagnostics:</h3>
            <ul className="space-y-2">
              {diagnosticResult.map((res, i) => (
                <li key={i} className="flex justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0">
                  <span className="font-medium text-gray-300">{res.name}:</span>
                  <span className={res.status === "Connected" ? "text-green-400" : "text-red-400 font-bold"}>
                    {res.status} {res.error ? `(${res.error})` : ""}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap gap-4 items-center">
          <button onClick={GetInterviewList} className="flex gap-2 items-center px-4 py-2 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-colors">
            <RefreshCcw className="h-4 w-4" /> Try Again
          </button>
          <div className="text-xs text-gray-400">
            <p><strong>Tip:</strong> Try changing your DNS to Google (8.8.8.8) or Cloudflare (1.1.1.1)</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <h2 className="font-medium text-xl text-white mb-4">Previous Mock Interviews</h2>
  
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
          {[1, 2, 3].map((item) => (
            <Skeleton key={item} className="h-[160px] w-full rounded-2xl bg-white/[0.05]" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
          {interviewList && interviewList.length > 0 ? (
            interviewList.map((interview, index) => (
              <InterviewItemCard key={index} interview={interview} />
            ))
          ) : (
            <div className="col-span-full p-8 text-center border border-white/[0.06] bg-white/[0.02] rounded-2xl">
                <p className="text-gray-400">No interviews found. Create your first one above!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InterviewList;
