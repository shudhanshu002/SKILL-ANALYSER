"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { motion, useInView } from "framer-motion";
import Contect from "./_components/Contect";

const features = [
  { icon: "🤖", title: "AI Question Generation", desc: "Gemini 2.5 Flash generates 5 tailored questions based on your job role, tech stack, and years of experience." },
  { icon: "🎙️", title: "Voice Answer Recording", desc: "Answer naturally via microphone. Your speech is transcribed in real-time using Google multimodal AI." },
  { icon: "📊", title: "Instant AI Feedback", desc: "Receive detailed ratings and improvement suggestions for each answer, benchmarked against ideal responses." },
  { icon: "📚", title: "PYQ Practice Sets", desc: "Build custom question packs filtered by company and question type — ideal for targeted preparation." },
  { icon: "🔐", title: "Secure & Private", desc: "Sessions are tied to your account via Clerk authentication. All data stored securely in Neon PostgreSQL." },
  { icon: "📈", title: "Track Your Progress", desc: "Review past interviews and feedback reports from your dashboard to measure improvement over time." },
];

const steps = [
  { step: "01", title: "Set up your interview", desc: "Enter your target job role, tech stack, and experience level. Our AI tailors 5 questions just for you." },
  { step: "02", title: "Answer with your voice", desc: "Enable your microphone and answer each question naturally. Gemini AI transcribes your speech in real-time." },
  { step: "03", title: "Get your feedback", desc: "Receive a full report — ratings, your answers vs ideal answers, and actionable improvement tips." },
];

const testimonials = [
  { name: "Rahul S.", role: "Frontend Developer at Google", text: "The AI mock interviews were incredibly helpful. I felt much more confident going into my real interview. Got the offer!", rating: 5 },
  { name: "Priya M.", role: "Backend Engineer at Amazon", text: "Voice transcription + instant feedback is a game changer. It pinpointed exactly where my answers were weak.", rating: 5 },
  { name: "Alex J.", role: "Full Stack Dev at Startup", text: "Best interview prep tool I have used. Questions are spot-on for my stack and ratings are surprisingly accurate.", rating: 5 },
];

const stats = [
  { value: 10000, suffix: "+", label: "Interviews completed" },
  { value: 98, suffix: "%", label: "User satisfaction" },
  { value: 5, suffix: "", label: "AI questions per session" },
  { value: 3, suffix: "s", prefix: "< ", label: "Feedback generation" },
];

function AnimatedCounter({ value, suffix = "", prefix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">

      {/* Background grid */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none z-0" />

      {/* Animated gradient orbs */}
      <div className="fixed top-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-700/20 rounded-full blur-[140px] pointer-events-none z-0 animate-float" />
      <div className="fixed top-[30%] right-[10%] w-[400px] h-[400px] bg-violet-700/15 rounded-full blur-[140px] pointer-events-none z-0 animate-float-delayed" />
      <div className="fixed bottom-[10%] left-[40%] w-[350px] h-[350px] bg-purple-700/10 rounded-full blur-[160px] pointer-events-none z-0 animate-pulse-glow" />

      {/* ── NAVIGATION ── */}
      <nav className="relative z-20 border-b border-white/[0.06] bg-black/60 backdrop-blur-xl sticky top-0">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-600 rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">SKILL ANALYSER</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {["#features", "#how-it-works", "#testimonials", "#contact"].map((href, i) => (
              <a key={i} href={href} className="text-sm text-gray-400 hover:text-white transition-colors duration-300 capitalize relative group">
                {href.replace("#", "").replace("-", " ")}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-400 to-violet-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="https://github.com/shudhanshu002/Ai-mock-interviewer" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-500 hover:text-white transition-colors duration-300 hover:scale-110 transform">
              <FaGithub className="w-5 h-5" />
            </a>
            <Link href="/sign-in" className="text-sm text-gray-300 hover:text-white transition-colors duration-300 px-3 py-1.5 hidden sm:inline">Sign in</Link>
            <Link href="/sign-up" className="text-sm bg-gradient-to-r from-blue-500 to-violet-600 text-white font-medium hover:from-blue-400 hover:to-violet-500 transition-all duration-300 px-4 py-2 rounded-lg shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-105 transform">
              Get started
            </Link>
            {/* Mobile menu button */}
            <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                }
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden border-t border-white/[0.06] bg-black/90 backdrop-blur-xl px-6 py-4 space-y-3">
            {["#features", "#how-it-works", "#testimonials", "#contact"].map((href, i) => (
              <a key={i} href={href} onClick={() => setMobileMenuOpen(false)} className="block text-sm text-gray-400 hover:text-white transition-colors capitalize py-1">
                {href.replace("#", "").replace("-", " ")}
              </a>
            ))}
            <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-gray-300 py-1">Sign in</Link>
          </motion.div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative z-10 pt-24 sm:pt-32 pb-20 px-6">
        <motion.div className="max-w-4xl mx-auto text-center" initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-full px-4 py-1.5 mb-8 hover:bg-white/[0.06] transition-colors duration-300">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-gray-400 font-medium">Powered by Gemini 2.5 Flash</span>
          </motion.div>

          <motion.h1 variants={fadeUp} custom={1} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.05]">
            <span className="text-white">Ace your next</span><br />
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent animate-gradient">interview with AI</span>
          </motion.h1>

          <motion.p variants={fadeUp} custom={2} className="text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
            Practice with AI-generated mock interviews tailored to your role. Get voice-based answers transcribed, rated, and reviewed — instantly.
          </motion.p>

          <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/dashboard" className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold rounded-xl hover:from-blue-400 hover:to-violet-500 transition-all duration-300 text-sm shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transform text-center">
              Start for free →
            </Link>
            <a href="#how-it-works" className="w-full sm:w-auto px-8 py-3.5 bg-white/[0.04] text-white font-medium rounded-xl border border-white/[0.1] hover:bg-white/[0.08] hover:border-white/[0.2] transition-all duration-300 text-sm text-center">
              See how it works
            </a>
          </motion.div>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="max-w-4xl mx-auto mt-16 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
          <div className="relative bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 mb-5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <div className="flex-1 bg-white/[0.04] rounded-md h-6 mx-4" />
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: "Overall Rating", value: "8.4/10", color: "text-green-400" },
                { label: "Questions Done", value: "5 / 5", color: "text-blue-400" },
                { label: "Status", value: "Completed ✓", color: "text-violet-400" },
              ].map((c, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 hover:bg-white/[0.05] transition-colors duration-300">
                  <div className="text-[10px] text-gray-600 mb-1.5 uppercase tracking-wider">{c.label}</div>
                  <div className={`text-xl font-bold ${c.color}`}>{c.value}</div>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {["What is closure in JavaScript?", "Explain React hooks in depth", "Difference between REST and GraphQL"].map((q, i) => (
                <div key={i} className="flex items-center justify-between bg-white/[0.02] border border-white/[0.05] rounded-lg px-4 py-3 hover:bg-white/[0.04] transition-colors duration-300">
                  <span className="text-sm text-gray-400">{q}</span>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${i === 0 ? "bg-green-500/10 text-green-400" : i === 1 ? "bg-blue-500/10 text-blue-400" : "bg-violet-500/10 text-violet-400"}`}>
                    {i === 0 ? "9/10" : "8/10"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section className="relative z-10 border-y border-white/[0.06] py-16 px-6 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                <AnimatedCounter value={s.value} suffix={s.suffix} prefix={s.prefix || ""} />
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="relative z-10 py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="text-xs text-blue-400 font-bold uppercase tracking-[0.25em] mb-4">Features</div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Everything you need to prepare</h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto">From AI question generation to voice transcription and instant feedback — all in one platform.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="group relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-7 hover:bg-white/[0.05] hover:border-white/[0.15] transition-all duration-500 cursor-default">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-violet-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="text-3xl mb-5 group-hover:scale-110 transition-transform duration-300">{f.icon}</div>
                  <h3 className="text-sm font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="relative z-10 py-28 px-6 border-t border-white/[0.06] bg-white/[0.01]">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="text-xs text-violet-400 font-bold uppercase tracking-[0.25em] mb-4">How it works</div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Three steps to interview mastery</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="relative group">
                <div className="text-6xl font-bold bg-gradient-to-b from-white/[0.08] to-transparent bg-clip-text text-transparent mb-4 leading-none group-hover:from-blue-400/20 transition-all duration-500">{s.step}</div>
                <h3 className="text-base font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                {i < 2 && <div className="hidden md:block absolute top-8 -right-5 w-10 h-px bg-gradient-to-r from-white/10 to-transparent" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="relative z-10 py-28 px-6 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="text-xs text-green-400 font-bold uppercase tracking-[0.25em] mb-4">Testimonials</div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Loved by candidates</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group bg-white/[0.02] border border-white/[0.06] rounded-2xl p-7 flex flex-col justify-between hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-500">
                <div>
                  <div className="flex gap-1 mb-5">
                    {Array(t.rating).fill(0).map((_, j) => <span key={j} className="text-yellow-400 text-sm">★</span>)}
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold">{t.name[0]}</div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-gray-600">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="relative z-10 py-28 px-6 border-t border-white/[0.06] bg-white/[0.01]">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-lg mx-auto text-center mb-10">
          <div className="text-xs text-gray-400 font-bold uppercase tracking-[0.25em] mb-4">Contact</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Get in touch</h2>
          <p className="text-sm text-gray-500">Have questions or feedback? We&rsquo;d love to hear from you.</p>
        </motion.div>
        <Contect dark />
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 py-28 px-6 border-t border-white/[0.06]">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
            Ready to ace your<br />
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">next interview?</span>
          </h2>
          <p className="text-sm text-gray-500 mb-10">Join thousands of candidates already using SKILL ANALYSER to land their dream roles.</p>
          <Link href="/dashboard" className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold rounded-xl hover:from-blue-400 hover:to-violet-500 transition-all duration-300 text-sm shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transform">
            Start for free →
          </Link>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t border-white/[0.06] py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-violet-600 rounded-md flex items-center justify-center shrink-0">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-gray-500">SKILL ANALYSER</span>
          </div>
          <p className="text-xs text-gray-700">© 2025 SKILL ANALYSER. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="https://github.com/shudhanshu002/Ai-mock-interviewer" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-600 hover:text-white transition-colors duration-300">GitHub</a>
            <a href="#features" className="text-xs text-gray-600 hover:text-white transition-colors duration-300">Features</a>
            <a href="#contact" className="text-xs text-gray-600 hover:text-white transition-colors duration-300">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}