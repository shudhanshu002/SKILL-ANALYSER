"use client";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { saveMockInterview } from "../actions";
import { checkSystemConnectivity } from "../diagnostics";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
  const [openDailog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. Based on this, provide 5 interview questions with answers in JSON format. The response must be a valid JSON array of objects, where each object has "Question" and "Answer" keys. Do not include any markdown formatting like \`\`\`json or extra text, just the raw JSON array. Keep answers concise (max 2-3 sentences).`;

      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: InputPrompt }),
      });

      if (!response.ok) {
        throw new Error("AI service unavailable.");
      }

      const { text: rawText } = await response.json();
      
      // Attempt to clean the response in case AI included markdown
      const MockJsonResp = rawText.replace(/```json|```/g, "").trim();

      // Validate JSON before sending to server
      JSON.parse(MockJsonResp);

      if (MockJsonResp) {
        const data = {
          mockId: uuidv4(),
          jsonMockResp: MockJsonResp,
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("YYYY-MM-DD"),
        };

        const result = await saveMockInterview(data);
        
        if (result.success) {
          setOpenDialog(false);
          toast.success("Interview created successfully!");
          router.push("/dashboard/interview/" + result.data[0]?.mockId);
        } else {
          throw new Error(result.error);
        }
      }
    } catch {
      toast.error("Database connection failed. Check your network or DNS settings.");
      
      // Background diagnostic check
      (async () => {
        const diag = await checkSystemConnectivity();
        const failedHost = diag.find(d => d.status === "Failed");
        if (failedHost) {
          toast.info(`Network Block Detected: Unable to reach ${failedHost.name}. Please check your DNS.`, { duration: 10000 });
        }
      })();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="group relative p-10 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.15] hover:scale-[1.02] transition-all duration-500 cursor-pointer"
        onClick={() => setOpenDialog(true)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-violet-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <h2 className="relative text-lg text-center text-gray-300 group-hover:text-white transition-colors duration-300">+ Add New</h2>
      </div>
      <Dialog open={openDailog}>
        <DialogContent className="max-w-2xl bg-[#0a0a0a] border border-white/[0.08] text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl text-white">
              Tell us more about your job interviewing
            </DialogTitle>
            <DialogDescription asChild>
              <div className="text-gray-400 text-sm">
                <form onSubmit={onSubmit}>
                  <div className="my-3">
                    <h2 className="text-gray-400">
                      Add details about your job position, job description and
                      years of experience
                    </h2>

                    <div className="mt-7 my-3">
                      <label className="text-gray-300 text-sm font-medium">Job Role/Job Position</label>
                      <Input
                        className="mt-1 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-gray-600 focus:border-blue-500/50"
                        placeholder="Ex. Full Stack Developer"
                        required
                        onChange={(e) => setJobPosition(e.target.value)}
                      />
                    </div>
                    <div className="my-5">
                      <label className="text-gray-300 text-sm font-medium">
                        Job Description / Tech Stack (In Short)
                      </label>
                      <Textarea
                        className="mt-1 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-gray-600 focus:border-blue-500/50"
                        placeholder="Ex. React, Angular, Node.js, MySQL, NoSQL, Python"
                        required
                        onChange={(e) => setJobDesc(e.target.value)}
                      />
                    </div>
                    <div className="my-5">
                      <label className="text-gray-300 text-sm font-medium">Years of Experience</label>
                      <Input
                        className="mt-1 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-gray-600 focus:border-blue-500/50"
                        placeholder="Ex. 5"
                        max="50"
                        type="number"
                        required
                        onChange={(e) => setJobExperience(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex gap-5 justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-gray-400 hover:text-white hover:bg-white/[0.05]"
                      onClick={() => setOpenDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={loading} className="bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:from-blue-400 hover:to-violet-500 shadow-lg shadow-blue-500/20 border-0">
                      {loading ? (
                        <>
                          <LoaderCircle className="animate-spin" />
                          Generating From AI
                        </>
                      ) : (
                        "Start Interview"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
