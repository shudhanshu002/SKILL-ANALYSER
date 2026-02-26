"use client";
import React, { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { saveMockInterview } from "../actions";
import { checkSystemConnectivity } from "../diagnostics";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
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
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. Based on this, provide 5 interview questions with answers in JSON format. The response must be a valid JSON array of objects, where each object has "Question" and "Answer" keys. Do not include any markdown formatting like \`\`\`json or extra text, just the raw JSON array. Keep answers concise (max 2-3 sentences).`;

      const result = await chatSession.sendMessage(InputPrompt);
      const rawText = result.response.text();
      
      // Attempt to clean the response in case AI included markdown
      const MockJsonResp = rawText.replace(/```json|```/g, "").trim();
      
      console.log("Extracted JSON:", MockJsonResp);
      
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
    } catch (err) {
      console.error("Error creating interview:", err);
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
        className="p-10 rounded-lg border bg-secondary hover:scale-105 hover:shadow-sm transition-all cursor-pointer"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className=" text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDailog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interviwing
            </DialogTitle>
            <DialogDescription asChild>
              <div className="text-muted-foreground text-sm">
                <form onSubmit={onSubmit}>
                  <div className="my-3">
                    <h2>
                      Add Details about your job position, job descritpion and
                      years of experience
                    </h2>

                    <div className="mt-7 my-3">
                      <label className="text-black">Job Role/job Position</label>
                      <Input
                        className="mt-1"
                        placeholder="Ex. Full stack Developer"
                        required
                        onChange={(e) => setJobPosition(e.target.value)}
                      />
                    </div>
                    <div className="my-5">
                      <label className="text-black">
                        Job Description/ Tech stack (In Short)
                      </label>
                      <Textarea
                        className="placeholder-opacity-50"
                        placeholder="Ex. React, Angular, Nodejs, Mysql, Nosql, Python"
                        required
                        onChange={(e) => setJobDesc(e.target.value)}
                      />
                    </div>
                    <div className="my-5">
                      <label className="text-black">Years of Experience</label>
                      <Input
                        className="mt-1"
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
                      variant="goast"
                      onClick={() => setOpenDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
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
