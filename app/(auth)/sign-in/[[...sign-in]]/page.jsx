import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  // Check if user is already signed in
  const { userId } = await auth();

  // If user is already signed in, redirect to dashboard
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <section className="bg-black text-white min-h-screen relative overflow-hidden">
      {/* Background grid */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none z-0" />

      {/* Animated gradient orbs */}
      <div className="fixed top-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-700/20 rounded-full blur-[140px] pointer-events-none z-0 animate-float" />
      <div className="fixed top-[30%] right-[10%] w-[400px] h-[400px] bg-violet-700/15 rounded-full blur-[140px] pointer-events-none z-0 animate-float-delayed" />
      <div className="fixed bottom-[10%] left-[40%] w-[350px] h-[350px] bg-purple-700/10 rounded-full blur-[160px] pointer-events-none z-0 animate-pulse-glow" />

      <div className="lg:grid lg:min-h-screen lg:grid-cols-12 relative z-10">
        {/* Left Side - Hero Section */}
        <section className="relative flex h-32 items-end lg:col-span-5 lg:h-full xl:col-span-6 overflow-hidden">
          {/* Subtle gradient background instead of solid blue */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950/20 to-black z-0" />

          {/* Content */}
          <div className="relative z-10 hidden lg:flex lg:flex-col lg:justify-center lg:h-full lg:p-12 xl:p-16 w-full">
            <a
              className="block text-white hover:opacity-80 transition-opacity mb-16"
              href="/"
            >
              <span className="sr-only">SKILL ANALYSER</span>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-violet-600 rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">SKILL ANALYSER</span>
              </div>
            </a>

            <div className="space-y-8">
              <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight">
                Master Your <br/>
                <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Interview Skills</span>
              </h2>

              <p className="text-lg text-gray-400 max-w-md">
                Practice with intelligent AI interviewers and get real-time
                feedback to boost your confidence.
              </p>

              {/* Feature Highlights */}
              <div className="space-y-5 pt-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/[0.04] border border-white/[0.08] rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="text-xl">🎙️</span>
                  </div>
                  <span className="text-gray-300 font-medium">Real-time AI voice feedback</span>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/[0.04] border border-white/[0.08] rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="text-xl">🎯</span>
                  </div>
                  <span className="text-gray-300 font-medium">
                    Industry-specific questions
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/[0.04] border border-white/[0.08] rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="text-xl">📈</span>
                  </div>
                  <span className="text-gray-300 font-medium">Performance analytics</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Side - Sign In Form */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 relative">
          <div className="w-full max-w-md relative z-10">
            {/* Mobile Header */}
            <div className="relative -mt-16 block lg:hidden text-center mb-10">
              <a
                className="inline-flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
                href="/"
              >
                <span className="sr-only">SKILL ANALYSER</span>
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </a>

              <h1 className="mt-6 text-2xl font-bold text-white sm:text-3xl">
                Welcome back
              </h1>
              <p className="mt-2 text-gray-400 text-sm">
                Sign in to continue your preparation
              </p>
            </div>

            {/* Sign In Form */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-6 sm:p-8 backdrop-blur-sm shadow-2xl">
              <SignIn appearance={{
                elements: {
                  formButtonPrimary: "bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-400 hover:to-violet-500 text-white shadow-lg shadow-blue-500/20 border-0",
                  card: "bg-transparent shadow-none",
                  headerTitle: "text-white hidden",
                  headerSubtitle: "text-gray-400 hidden",
                  socialButtonsBlockButton: "border-white/[0.1] bg-white/[0.04] text-white hover:bg-white/[0.08]",
                  socialButtonsBlockButtonText: "text-white font-medium",
                  dividerLine: "bg-white/[0.1]",
                  dividerText: "text-gray-500",
                  formFieldLabel: "text-gray-300",
                  formFieldInput: "bg-white/[0.04] border-white/[0.1] text-white focus:border-blue-500/50",
                  footerActionText: "text-gray-400",
                  footerActionLink: "text-blue-400 hover:text-blue-300",
                  identityPreviewText: "text-gray-300",
                  identityPreviewEditButton: "text-blue-400 hover:text-blue-300",
                  formFieldSuccessText: "text-green-400",
                  formFieldErrorText: "text-red-400",
                  footer: "hidden" // Hide clerk's footer since we have our own
                }
              }} />
            </div>

            {/* Additional Info */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-400">
                New to SKILL ANALYSER?{" "}
                <a
                  href="/sign-up"
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  Create an account
                </a>
              </p>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
