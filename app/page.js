import React from 'react';
import Link from 'next/link';
import { FaGithub } from "react-icons/fa";
import Contect from './_components/Contect';

export const metadata = {
  title: 'SKILL ANALYSER — AI-Powered Mock Interviews',
  description: 'Practice with AI-powered mock interviews tailored to your role. Get instant feedback and ace your next interview.',
};

const features = [
  { icon: '🤖', title: 'AI Question Generation', desc: 'Gemini 2.5 Flash generates 5 tailored questions based on your job role, tech stack, and years of experience.' },
  { icon: '🎙️', title: 'Voice Answer Recording', desc: 'Answer naturally via microphone. Your speech is transcribed in real-time using Google multimodal AI.' },
  { icon: '📊', title: 'Instant AI Feedback', desc: 'Receive detailed ratings and improvement suggestions for each answer, benchmarked against ideal responses.' },
  { icon: '📚', title: 'PYQ Practice Sets', desc: 'Build custom question packs filtered by company and question type — ideal for targeted preparation.' },
  { icon: '🔐', title: 'Secure & Private', desc: 'Sessions are tied to your account via Clerk authentication. All data stored securely in Neon PostgreSQL.' },
  { icon: '📈', title: 'Track Your Progress', desc: 'Review past interviews and feedback reports from your dashboard to measure improvement over time.' },
];

const steps = [
  { step: '01', title: 'Set up your interview', desc: 'Enter your target job role, tech stack, and experience level. Our AI tailors 5 questions just for you.' },
  { step: '02', title: 'Answer with your voice', desc: 'Enable your microphone and answer each question naturally. Gemini AI transcribes your speech in real-time.' },
  { step: '03', title: 'Get your feedback', desc: 'Receive a full report — ratings, your answers vs ideal answers, and actionable improvement tips.' },
];

const testimonials = [
  { name: 'Rahul S.', role: 'Frontend Developer at Google', text: 'The AI mock interviews were incredibly helpful. I felt much more confident going into my real interview. Got the offer!', rating: 5 },
  { name: 'Priya M.', role: 'Backend Engineer at Amazon', text: 'Voice transcription + instant feedback is a game changer. It pinpointed exactly where my answers were weak.', rating: 5 },
  { name: 'Alex J.', role: 'Full Stack Dev at Startup', text: 'Best interview prep tool I have used. Questions are spot-on for my stack and ratings are surprisingly accurate.', rating: 5 },
];

export default function Page() {
  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">

      {/* Background grid */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none z-0" />

      {/* Gradient orbs */}
      <div className="fixed top-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-700/20 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed top-[30%] right-[10%] w-[400px] h-[400px] bg-violet-700/15 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* ── NAVIGATION ── */}
      <nav className="relative z-20 border-b border-white/[0.06] bg-black/60 backdrop-blur-xl sticky top-0">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm font-semibold tracking-tight">SKILL ANALYSER</span>
          </div>

          <div className="hidden md:flex items-center gap-7">
            {['#features', '#how-it-works', '#testimonials', '#contact'].map((href, i) => (
              <a key={i} href={href} className="text-sm text-gray-400 hover:text-white transition-colors capitalize">
                {href.replace('#', '').replace('-', ' ')}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="https://github.com/shudhanshu002/Ai-mock-interviewer" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-500 hover:text-white transition-colors">
              <FaGithub className="w-5 h-5" />
            </a>
            <Link href="/sign-in" className="text-sm text-gray-300 hover:text-white transition-colors px-3 py-1.5">Sign in</Link>
            <Link href="/sign-up" className="text-sm bg-white text-black font-medium hover:bg-gray-100 transition-colors px-3 py-1.5 rounded-md">Get started</Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative z-10 pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-gray-400 font-medium">Powered by Gemini 2.5 Flash</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.08]">
            <span className="text-white">Ace your next</span><br />
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">interview with AI</span>
          </h1>

          <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
            Practice with AI-generated mock interviews tailored to your role. Get voice-based answers transcribed, rated, and reviewed — instantly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/dashboard" className="w-full sm:w-auto px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-all text-sm shadow-lg shadow-white/10">
              Start for free →
            </Link>
            <a href="#how-it-works" className="w-full sm:w-auto px-6 py-3 bg-white/[0.04] text-white font-medium rounded-lg border border-white/[0.1] hover:bg-white/[0.08] transition-all text-sm">
              See how it works
            </a>
          </div>
        </div>

        {/* Dashboard mockup */}
        <div className="max-w-4xl mx-auto mt-16 relative">
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 mb-5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              <div className="flex-1 bg-white/[0.04] rounded h-5 mx-4" />
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: 'Overall Rating', value: '8.4/10', color: 'text-green-400' },
                { label: 'Questions Done', value: '5 / 5', color: 'text-blue-400' },
                { label: 'Status', value: 'Completed ✓', color: 'text-violet-400' },
              ].map((c, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                  <div className="text-[10px] text-gray-600 mb-1.5">{c.label}</div>
                  <div className={`text-xl font-bold ${c.color}`}>{c.value}</div>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {['What is closure in JavaScript?', 'Explain React hooks in depth', 'Difference between REST and GraphQL'].map((q, i) => (
                <div key={i} className="flex items-center justify-between bg-white/[0.02] border border-white/[0.05] rounded-lg px-4 py-2.5">
                  <span className="text-sm text-gray-400">{q}</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${i === 0 ? 'bg-green-500/10 text-green-400' : i === 1 ? 'bg-blue-500/10 text-blue-400' : 'bg-violet-500/10 text-violet-400'}`}>
                    {i === 0 ? '9/10' : '8/10'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="relative z-10 border-y border-white/[0.06] py-12 px-6 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '10,000+', label: 'Interviews completed' },
            { value: '98%', label: 'User satisfaction' },
            { value: '5', label: 'AI questions per session' },
            { value: '< 3s', label: 'Feedback generation' },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-[10px] text-blue-400 font-bold uppercase tracking-[0.2em] mb-3">Features</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Everything you need to prepare</h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto">From AI question generation to voice transcription and instant feedback — all in one platform.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {features.map((f, i) => (
              <div key={i} className="group bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300">
                <div className="text-2xl mb-4">{f.icon}</div>
                <h3 className="text-sm font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="relative z-10 py-24 px-6 border-t border-white/[0.06] bg-white/[0.01]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-[10px] text-violet-400 font-bold uppercase tracking-[0.2em] mb-3">How it works</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Three steps to interview mastery</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((s, i) => (
              <div key={i} className="relative">
                <div className="text-5xl font-bold text-white/[0.05] mb-3 leading-none">{s.step}</div>
                <h3 className="text-sm font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="relative z-10 py-24 px-6 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-[10px] text-green-400 font-bold uppercase tracking-[0.2em] mb-3">Testimonials</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Loved by candidates</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex gap-0.5 mb-4">
                    {Array(t.rating).fill(0).map((_, j) => <span key={j} className="text-yellow-400 text-xs">★</span>)}
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-gray-600 mt-0.5">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="relative z-10 py-24 px-6 border-t border-white/[0.06] bg-white/[0.01]">
        <div className="max-w-lg mx-auto text-center mb-10">
          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-3">Contact</div>
          <h2 className="text-3xl font-bold text-white mb-3">Get in touch</h2>
          <p className="text-sm text-gray-500">Have questions or feedback? We&rsquo;d love to hear from you.</p>
        </div>
        <Contect dark />
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 py-24 px-6 border-t border-white/[0.06]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Ready to ace your<br />
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">next interview?</span>
          </h2>
          <p className="text-sm text-gray-500 mb-8">Join thousands of candidates already using SKILL ANALYSER to land their dream roles.</p>
          <Link href="/dashboard" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-all text-sm shadow-xl shadow-white/10">
            Start for free →
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t border-white/[0.06] py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-white rounded flex items-center justify-center shrink-0">
              <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-gray-500">SKILL ANALYSER</span>
          </div>
          <p className="text-xs text-gray-700">© 2024 SKILL ANALYSER. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="https://github.com/shudhanshu002/Ai-mock-interviewer" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-600 hover:text-white transition-colors">GitHub</a>
            <a href="#features" className="text-xs text-gray-600 hover:text-white transition-colors">Features</a>
            <a href="#contact" className="text-xs text-gray-600 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}