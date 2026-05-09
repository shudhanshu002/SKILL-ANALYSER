"use client";
import React from "react";
import PricingPlan from "../_components/PricingPlan";
import { useUser } from "@clerk/nextjs";

const Upgrade = () => {
  const { user } = useUser();
  return (
    <div className="py-12 px-2">
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="text-xs text-violet-400 font-bold uppercase tracking-[0.25em] mb-3">Testing Mode</div>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Upgrade Your Plan</h1>
        <p className="text-sm text-gray-500">Unlock premium features to master your interview preparation.</p>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-10">
          {PricingPlan.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white/[0.02] border border-white/[0.06] rounded-3xl p-8 sm:px-10 sm:py-12 hover:bg-white/[0.04] hover:border-white/[0.15] transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>

              <div className="relative z-10 text-center mb-8">
                <h2 className="text-lg font-semibold text-gray-300 uppercase tracking-widest mb-4">
                  {item.duration} Plan
                </h2>

                <p className="flex items-center justify-center gap-1">
                  <span className="text-4xl font-bold text-white sm:text-5xl">${item.price}</span>
                  <span className="text-sm font-medium text-gray-500 self-end mb-1">/ {item.duration.toLowerCase()}</span>
                </p>
              </div>

              <ul className="relative z-10 mt-6 space-y-4">
                {[
                  "10 mock interviews per month",
                  "Unlimited generated questions",
                  "Detailed AI feedback reports",
                  "Priority support access"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-3.5 h-3.5 text-blue-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={
                  item.link +
                  "?prefilled_email=" +
                  user?.primaryEmailAddress?.emailAddress
                }
                target="_blank"
                className="relative z-10 mt-10 block w-full rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-8 py-3.5 text-center text-sm font-semibold text-white hover:from-blue-400 hover:to-violet-500 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300"
              >
                Get Started Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Upgrade;
