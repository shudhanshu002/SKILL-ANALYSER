import { UserButton } from "@clerk/nextjs";
import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";

const Dashboard = () => {
  return (
    <div className="py-12 px-2">
      {/* Page header */}
      <div className="mb-10">
        <div className="text-xs text-blue-400 font-bold uppercase tracking-[0.25em] mb-3">Dashboard</div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Welcome Back</h1>
        <p className="text-sm text-gray-500">Create and start your AI Mock Interview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 my-5 gap-5">
        <AddNewInterview />
      </div>

      <InterviewList />
    </div>
  );
};

export default Dashboard;
