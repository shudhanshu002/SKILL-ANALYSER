import Head from "next/head";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HowItWorks = () => {
  return (
    <>
      <Head>
        <title>How It Works - SKILL ANALYSER</title>
        <meta
          name="description"
          content="Learn how our SKILL ANALYSER works."
        />
      </Head>
      <main className="py-12 px-2 max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <div className="text-xs text-blue-400 font-bold uppercase tracking-[0.25em] mb-3">Guide</div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">How It Works</h1>
          <p className="text-sm text-gray-500">Three simple steps to master your next interview.</p>
        </div>

        <section className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-6 md:p-10 backdrop-blur-sm">
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border border-white/[0.06] bg-white/[0.02] rounded-xl px-6 data-[state=open]:bg-white/[0.04] transition-colors duration-300">
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-lg shrink-0">1</div>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-200">
                    Prepare for the Interview
                  </h2>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-gray-400 pl-14">
                <p className="leading-relaxed">
                  Get ready by selecting the type of interview and providing
                  some details about the job position, your experience, and the tech stack. Our AI uses this to generate tailored questions.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border border-white/[0.06] bg-white/[0.02] rounded-xl px-6 data-[state=open]:bg-white/[0.04] transition-colors duration-300">
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-violet-500/10 text-violet-400 flex items-center justify-center font-bold text-lg shrink-0">2</div>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-200">
                    Start the AI Interview
                  </h2>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-gray-400 pl-14">
                <p className="leading-relaxed">
                  Our AI will ask you a series of generated questions. Enable your microphone and webcam to answer naturally. We transcribe your speech in real-time for evaluation.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border border-white/[0.06] bg-white/[0.02] rounded-xl px-6 data-[state=open]:bg-white/[0.04] transition-colors duration-300">
              <AccordionTrigger className="text-left hover:no-underline py-6">
                 <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-lg shrink-0">3</div>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-200">
                    Receive Instant Feedback
                  </h2>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-gray-400 pl-14">
                <p className="leading-relaxed">
                  Get detailed feedback on your performance instantly. The AI rates your answers against ideal responses and provides actionable tips on areas for improvement.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>
    </>
  );
};

export default HowItWorks;
