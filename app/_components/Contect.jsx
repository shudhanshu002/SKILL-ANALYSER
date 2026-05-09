"use client";
import { saveNewsletterResponse } from "@/app/dashboard/actions";
import { LoaderCircle } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "sonner";

const Contect = ({ dark = false }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const inputClass = dark
    ? "w-full px-4 py-3.5 mb-4 text-sm bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all duration-300"
    : "w-full px-4 py-3.5 mb-4 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300";

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const data = {
        newName: name,
        newEmail: email,
        newMessage: message,
        createdAt: moment().format("YYYY-MM-DD"),
      };

      const result = await saveNewsletterResponse(data);

      if (result.success) {
        toast.success("Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <form onSubmit={onSubmit} className={dark ? "p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm" : ""}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
        <textarea
          placeholder="How can we help you?"
          value={message}
          required
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className={`${inputClass} resize-none`}
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3.5 text-sm font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 mt-2 ${
            dark
              ? "bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:from-blue-400 hover:to-violet-500 shadow-lg shadow-blue-500/20 border-0 disabled:opacity-50"
              : "bg-black text-white hover:bg-gray-800 disabled:opacity-50"
          }`}
        >
          {loading ? <LoaderCircle className="animate-spin w-4 h-4" /> : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default Contect;
