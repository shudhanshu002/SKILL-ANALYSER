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
    ? "w-full px-4 py-3 mb-4 text-sm bg-white/[0.04] border border-white/[0.08] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white/20 transition-colors"
    : "w-full px-4 py-3 mb-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition";

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
      <form onSubmit={onSubmit}>
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
          placeholder="Your Message"
          value={message}
          required
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className={inputClass}
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
            dark
              ? "bg-white text-black hover:bg-gray-100 disabled:opacity-50"
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
