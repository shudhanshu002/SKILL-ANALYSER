"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { getInterviewList } from "../actions"; // Import server action
import { checkSystemConnectivity } from "../diagnostics"; // Import diagnostic action
import InterviewItemCard from "./InterviewItemCard";
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";


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
    } catch (err) {
      console.error("Error fetching interviews:", err);
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
      <div className="my-5 p-6 border-2 border-red-200 bg-red-50 rounded-xl">
        <div className="flex items-center gap-3 text-red-600 font-bold mb-4">
          <AlertCircle />
          <h2>Connection Error</h2>
        </div>
        <p className="text-gray-700 mb-6">{error} This is often caused by local DNS restrictions or a network firewall.</p>
        
        {diagnosticResult && (
          <div className="bg-white p-4 rounded-lg border mb-6 text-sm">
            <h3 className="font-semibold mb-2">Network Diagnostics:</h3>
            <ul className="space-y-2">
              {diagnosticResult.map((res, i) => (
                <li key={i} className="flex justify-between border-b pb-1 last:border-0">
                  <span className="font-medium">{res.name}:</span>
                  <span className={res.status === "Connected" ? "text-green-600" : "text-red-500 font-bold"}>
                    {res.status} {res.error ? `(${res.error})` : ""}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap gap-4">
          <Button variant="outline" onClick={GetInterviewList} className="flex gap-2">
            <RefreshCcw className="h-4 w-4" /> Try Again
          </Button>
          <div className="text-xs text-gray-500 flex flex-col justify-center">
            <p><strong>Tip:</strong> Try changing your DNS to Google (8.8.8.8) or Cloudflare (1.1.1.1)</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock Interview</h2>
  
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
          {[1, 2, 3].map((item) => (
            <Skeleton key={item} className="h-[150px] w-full rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
          {interviewList && interviewList.length > 0 ? (
            interviewList.map((interview, index) => (
              <InterviewItemCard key={index} interview={interview} />
            ))
          ) : (
            <p className="text-gray-500">No interviews found. Create your first one!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default InterviewList;
