import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import WavyUnderline from "./ui/WavyUnderline";

interface ProgramCTAProps {
  title: string;
  description: string;
}

export default function ProgramCTA({ title, description }: ProgramCTAProps) {
  const words = title.split(" ");
  const numWordsToWrap = words.length >= 3 ? 2 : 1;
  const wrapIndex = words.length - numWordsToWrap;
  const prefix = words.slice(0, wrapIndex).join(" ");
  const wrapped = words.slice(wrapIndex).join(" ");

  return (
    <section className="w-full bg-[#F6EBD4] py-20 sm:py-28 relative overflow-hidden">
      {/* Dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(#4A4333_1px,transparent_1px)]
                   [background-size:24px_24px] opacity-[0.03] pointer-events-none"
      />

      <div className="max-w-5xl mx-auto px-5 sm:px-8 relative">
        <div
          className="relative overflow-hidden bg-gradient-to-br
                     from-[#2D3E1C] via-[#374D23] to-[#455434]
                     rounded-[2.5rem] px-8 py-16 sm:px-16 sm:py-20
                     shadow-2xl border border-[#5C7146]/20"
        >
          {/* Decorative corner arcs */}
          <div
            aria-hidden
            className="absolute top-0 right-0 w-64 h-64 rounded-full
                       border border-[#DCA543]/10 -translate-y-1/2 translate-x-1/2"
          />
          <div
            aria-hidden
            className="absolute top-0 right-0 w-44 h-44 rounded-full
                       border border-[#DCA543]/8 -translate-y-1/3 translate-x-1/3"
          />
          <div
            aria-hidden
            className="absolute bottom-0 left-0 w-80 h-80 rounded-full
                       bg-[#F6EBD4]/4 blur-3xl translate-y-1/2 -translate-x-1/4"
          />

          <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
            <span className="inline-flex items-center justify-center px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-[#EAEDDE] text-[#403011] text-[13px] sm:text-[14px] font-serif uppercase tracking-widest w-fit mb-6 border border-[#403011]/15">
              THE ULTIMATE OUTCOME
            </span>

            <h2
              className="text-3xl sm:text-4xl lg:text-[2.6rem] font-serif font-medium
                         text-[#F6EBD4] tracking-tight leading-[1.15] mb-5"
            >
              {prefix} <WavyUnderline>{wrapped}</WavyUnderline>
            </h2>

            <p
              className="text-base sm:text-lg text-[#F6EBD4]/80 font-serif leading-relaxed
                         italic max-w-xl mb-10"
            >
              {description}
            </p>

            {/* Two CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto mb-10">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center text-center gap-2 sm:gap-2.5 px-6 py-3.5 sm:px-8 sm:py-4 bg-[#DCA543] hover:bg-[#E8B555] text-[#2D3E1C] rounded-full font-bold text-[13px] sm:text-base transition-all duration-300 shadow-lg hover:shadow-[0_8px_30px_rgba(220,165,67,0.35)] hover:-translate-y-0.5 group shrink-0"
              >
                Schedule a Diagnostic Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/programs"
                className="w-full sm:w-auto inline-flex items-center justify-center text-center gap-2 sm:gap-2.5 px-6 py-3.5 sm:px-8 sm:py-4 border border-[#F6EBD4]/25 text-[#F6EBD4] hover:bg-[#F6EBD4]/10 hover:border-[#F6EBD4]/40 rounded-full font-bold text-[13px] sm:text-base transition-all duration-300 hover:-translate-y-0.5 group shrink-0"
              >
                Explore All Programmes
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              {["No commitment required", "60-min deep-dive session", "Expert advisor assigned"].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-[#DCA543] flex items-center justify-center shrink-0">
                    <svg className="w-2.5 h-2.5 text-[#2D3E1C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[12px] sm:text-[13px] text-[#F6EBD4]/80 font-serif">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
