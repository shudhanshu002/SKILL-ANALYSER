"use client";
import React from "react";
import Header from "./_components/Header";
import logo from "../../public/logo.svg";
import { createContext, useState } from "react";
export const WebCamContext = createContext();

const DashboardLayout = ({ children }) => {
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background grid */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none z-0" />
      {/* Animated gradient orbs */}
      <div className="fixed top-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-700/20 rounded-full blur-[140px] pointer-events-none z-0 animate-float" />
      <div className="fixed top-[30%] right-[10%] w-[400px] h-[400px] bg-violet-700/15 rounded-full blur-[140px] pointer-events-none z-0 animate-float-delayed" />
      <div className="fixed bottom-[10%] left-[40%] w-[350px] h-[350px] bg-purple-700/10 rounded-full blur-[160px] pointer-events-none z-0 animate-pulse-glow" />

      <div className="relative z-10">
        <Header logo={logo} />
        <div className="mx-5 md:mx-20 lg:mx-36">
          <WebCamContext.Provider value={{ webCamEnabled, setWebCamEnabled }}>
            {children}
          </WebCamContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
