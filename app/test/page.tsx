"use client";

import WavyUnderline from "@/components/ui/WavyUnderline";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  User,
  GraduationCap,
  School,
  CheckCircle2,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
  Award,
  Shield,
  Activity,
  UserCheck,
  BookOpen
} from "lucide-react";
import {
  adjectivePairsList,
  singleTraitsList,
  forcedChoicesList,
  compileReport
} from "./engine";

export default function DiagnosticTestPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [testStarted, setTestStarted] = useState(false);

  // Onboarding metadata form states
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [university, setUniversity] = useState("");

  // Answers maps Record<qKey, value>
  // Starts empty/blank as requested
  const [answers, setAnswers] = useState<Record<string, any>>({});

  // Validation state
  const [validationError, setValidationError] = useState("");
  const [highlightedUnanswered, setHighlightedUnanswered] = useState<string[]>([]);

  // FAQ Accordion active indices state
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Check if user already has an active report in localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedReport = localStorage.getItem("eq_diagnostic_report");
      if (savedReport) {
        router.replace("/test/report");
      } else {
        setLoading(false);
      }
    }
  }, [router]);

  const toggleFaq = (index: number) => {
    setActiveFaq(prev => (prev === index ? null : index));
  };

  // Helper to check what questions belong to a step
  const getQuestionsForStep = (currentStep: number) => {
    if (currentStep === 1) return adjectivePairsList.slice(0, 8);
    if (currentStep === 2) return adjectivePairsList.slice(8, 16);
    if (currentStep === 3) return adjectivePairsList.slice(16, 24);
    if (currentStep === 4) return singleTraitsList;
    if (currentStep === 5) return forcedChoicesList;
    return [];
  };

  const handleNextStep = () => {
    setValidationError("");
    setHighlightedUnanswered([]);

    if (step === 0) {
      if (!name.trim()) {
        setValidationError("Please enter your name to personalize your admissions report.");
        return;
      }
      if (!status.trim()) {
        setValidationError("Please enter your school year (e.g. Sophomore, Grade 11).");
        return;
      }
      if (!university.trim()) {
        setValidationError("Please enter your target university (e.g. UC Berkeley, Ivy League).");
        return;
      }
      setStep(1);
      return;
    }

    // Psychometric validations - ensure all options are filled
    const stepQuestions = getQuestionsForStep(step);
    const unanswered = stepQuestions
      .map(q => q.id)
      .filter(qId => answers[qId] === undefined || answers[qId] === null);

    if (unanswered.length > 0) {
      setValidationError("Please answer all questions on this page before moving to the next step.");
      setHighlightedUnanswered(unanswered);
      return;
    }

    if (step < 5) {
      setStep(prev => prev + 1);
      // Smooth scroll back to top of the questionnaire card
      const element = document.getElementById("test-portal");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      handleSubmitTest();
    }
  };

  const handlePrevStep = () => {
    setValidationError("");
    setHighlightedUnanswered([]);
    if (step > 0) {
      setStep(prev => prev - 1);
      const element = document.getElementById("test-portal");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleAnswerSelect = (qId: string, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [qId]: value
    }));
    // Remove from highlighted unanswered list on select
    setHighlightedUnanswered(prev => prev.filter(id => id !== qId));
  };

  const handleSubmitTest = () => {
    const reportData = compileReport(name, status, university, answers);
    localStorage.setItem("eq_diagnostic_report", JSON.stringify(reportData));
    router.push("/test/report");
  };

  // Calculate completion progress metrics
  const totalQuestionsCount = adjectivePairsList.length + singleTraitsList.length + forcedChoicesList.length;
  const answeredCount = Object.keys(answers).length;
  const percentComplete = Math.round((answeredCount / totalQuestionsCount) * 100) || 0;

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-[#F6EBD4] text-[#4A4333]">
        <div className="flex flex-col items-center gap-4 select-none">
          <span className="h-9 w-9 bg-[#DCA543]/20 text-[#DCA543] rounded-full animate-ping" />
          <p className="font-serif italic text-xs">Preparing Diagnostic Environment...</p>
        </div>
      </main>
    );
  }

  // FAQ Data List
  const faqData = [
    {
      q: "What does the DISC assessment measure?",
      a: "The DISC assessment is a measure of interpersonal behavior that is often used in workplace and elite academic settings. It classifies how we interact in terms of four personality styles: Drive, Influence, Support, and Clarity.\n\nBased on the theories of psychologist William Moulton Marston, the DISC assessment is a simple yet powerful way to unlock your strengths and help your team work better together."
    },
    {
      q: "What are the four DISC personality types?",
      a: "The DISC personality model describes four types: D for Drive, I for Influence, S for Support, and C for Clarity. Each type describes a particular approach to getting work done and contributing to a team.\n\n• Drive: taking charge and making key decisions\n• Influence: engaging others to work together\n• Support: assisting others to achieve group goals\n• Clarity: working independently to produce correct results\n\nEach of the four DISC personality types is equally valuable, and each has its own strengths and weaknesses. Discovering your own type can help you to better understand how to bring your strongest talents to your work, while minimizing your blind spots."
    },
    {
      q: "What are DISC subtypes?",
      a: "DISC subtypes represent a blend of two styles. Each of us has a primary DISC type, but some of us also incorporate quite a bit of an adjacent style into our behavior at work. These styles are referred to as DISC subtypes or hybrid types.\n\nFor example, a person who is primarily a Drive type, but who also has a high level of Influence behavior, would be labeled as a D/i type (DISC + Influence). When we include the subtypes with the four primary DISC types, we are able to accurately describe people whose behavior is primarily driven by one DISC style, as well as people whose behavior is typically a mix of two styles.\n\nThe eight DISC subtypes are:\n• D/i (Drive + Influence)\n• D/c (Drive + Clarity)\n• I/d (Influence + Drive)\n• I/s (Influence + Support)\n• S/i (Support + Influence)\n• S/c (Support + Clarity)\n• C/s (Clarity + Support)\n• C/d (Clarity + Drive)"
    },
    {
      q: "What will I learn from my DISC report?",
      a: "Your DISC profile will show which of the four DISC types fits you best, as well as your scores for the other three types. It will describe how the DISC model can be used to better understand your strengths on a team, as well as the way you like to work.\n\nWhen completing the EpicQuest DISC assessment, you will first see a brief, free report showing a basic overview of your DISC personality type. Then, you have the option of unlocking your full report for a small fee."
    },
    {
      q: "Can I have my employees, team or group take the DISC test?",
      a: "Absolutely. Our EpicQuest @Work platform is designed to make it easy to give the DISC assessment to your team or group. See discounted group pricing and learn how to quickly and easily set up testing for your group on the Testing for Business page."
    },
    {
      q: "How long is this DISC assessment?",
      a: "The test consists of 38 questions and takes about 5 minutes to complete."
    },
    {
      q: "Is this DISC assessment scientifically validated?",
      a: "The DISC has been extensively researched and validated using a large global sample. The assessment has been shown to have excellent reliability according to standard psychometric measures, as well as real-world correlations with key workplace outcomes (see DISC Technical Documentation)."
    },
    {
      q: "Is the DISC personality test really free?",
      a: "You do not need to purchase or register to take this test and view an overview of your results. If you would like, you can purchase a more comprehensive full report for a small fee."
    },
    {
      q: "Do I need to complete this assessment all at once?",
      a: "If you've created an account and are logged in when you take the test, your responses will be saved as you go through the test. If you do not log in to an EpicQuest account before starting the test, your progress will not be saved and you will need to complete the test all at once."
    },
    {
      q: "Is the DISC personality test appropriate for children?",
      a: "None of our tests are appropriate for children under the age of 14. Some of our tests may have mature content, and anyone younger than 18 should only take the test with parental guidance."
    },
  ];

  return (

    <main className="flex flex-col w-full bg-[#F6EBD4] min-h-screen text-[#4A4333] font-sans selection:bg-[#DCA543] selection:text-[#1F2C16]">

      {/* ═════ HERO SECTION ════ */}
      <section className="relative w-full border-b border-[#4A4333]/10 py-16 sm:py-24">
        {/* Ambient blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#566544]/5 blur-3xl -translate-y-1/3 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-[#DCA543]/8 blur-3xl translate-y-1/2 -translate-x-1/4" />
          <div className="absolute inset-0 bg-[radial-gradient(#566544_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.06]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* LEFT COLUMN */}
            <div className="lg:col-span-7">

              <div className="self-start">
                <span className="inline-flex items-center justify-center px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-[#EAEDDE] text-[#403011] text-[13px] sm:text-[14px] font-serif uppercase tracking-widest w-fit mb-6 border border-[#403011]/15">
                  LEADERSHIP DIAGNOSTIC ASSESSMENT
                </span>
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-[#403011] tracking-tight leading-[1.1]">
                  Know Your Child&apos;s{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10">Potential.</span>
                    <svg className="absolute -bottom-1.5 left-0 w-full" height="8" viewBox="0 0 120 8" preserveAspectRatio="none" fill="none">
                      <path d="M2 6 Q30 2 60 5 Q90 8 118 3" stroke="#DCA543" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </h1>
                <p className="text-sm sm:text-base text-[#4A4333] font-serif leading-relaxed mt-4 pl-4 border-l-2 border-[#DCA543]">
                  Science-backed career &amp; personality mapping for high school and college students — combining two globally validated frameworks in one powerful report.
                </p>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="bg-[#FDFBF7] border border-[#4A4333]/10 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-serif font-bold text-[#403011] mb-2 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#566544]" />
                    Gunaity Epicometer™
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A4333] font-serif leading-relaxed mb-3">
                    DISC-based personality assessment adapted for students — mapping behavioural styles across Drive, Influence, Support, and Clarity dimensions with 12 unique hybrid types.
                  </p>
                  <div className="text-[10px] font-bold text-[#566544] bg-[#566544]/10 px-2 py-1 rounded w-fit uppercase tracking-wider">
                    D · Drive &nbsp; I · Influence &nbsp; S · Support &nbsp; C · Clarity
                  </div>
                </div>

                <div className="bg-[#FDFBF7] border border-[#4A4333]/10 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-serif font-bold text-[#403011] mb-2 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#DCA543]" />
                    Karmattitude™
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A4333] font-serif leading-relaxed mb-3">
                    Career interest &amp; aptitude profiling across 6 career domains — linking personality strengths to real-world profession pathways.
                  </p>
                  <div className="text-[10px] font-bold text-[#DCA543] bg-[#DCA543]/10 px-2 py-1 rounded w-fit uppercase tracking-wider">
                    6 Career Domains
                  </div>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="mt-6 relative pl-8 py-2">
                <span className="absolute top-0 left-0 text-5xl text-[#DCA543]/30 font-serif leading-none select-none">&ldquo;</span>
                <p className="text-[#4A4333] font-serif text-sm sm:text-base leading-relaxed italic mb-3 relative z-10">
                  Dual assessment, one report — no other tool combines behavioural personality mapping with career interest scoring so elegantly.
                </p>
                <footer className="text-xs font-bold text-[#8A8373] uppercase tracking-wider font-sans flex items-center gap-2">
                  <span className="w-6 h-px bg-[#DCA543]"></span>
                  Tilak Mishra, Founder (UPenn Alumnus)
                </footer>
              </blockquote>

              {/* Learn More Button */}
              <div className="mt-6 mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <button
                  onClick={() => {
                    const el = document.getElementById('deep-dive');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center text-center gap-2 sm:gap-2.5 px-6 py-3.5 sm:px-8 sm:py-4 bg-[#5C7146] hover:bg-[#4A5C38] text-white rounded-full font-bold text-[13px] sm:text-sm tracking-wide transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 group shrink-0"
                >
                  Learn More
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </button>
                <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-[#8A8373] font-serif uppercase tracking-widest font-bold">
                  <CheckCircle2 className="w-4 h-4 text-[#566544] shrink-0" />
                  4 DISC Styles · 12 Hybrid Types · 6 Career Areas
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Hero Image */}
            <div className="lg:col-span-5 w-full hidden lg:flex flex-col gap-6">
              <div className="relative rounded-3xl overflow-hidden border-2 border-[#DCA543]/20 shadow-2xl bg-white w-full">
                <Image
                  src="/images/diagnostic_test/Diagnostic_Hero.png"
                  alt="EpicQuest Diagnostic Report Preview"
                  width={600}
                  height={800}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═════ DEEP DIVE SECTION ════ */}
      <section id="deep-dive" className="w-full bg-[#F6EBD4] py-20 sm:py-28 border-t border-[#4A4333]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* ── LEFT COLUMN: Framework Details ── */}
            <div className="flex flex-col gap-10">

              {/* Section Header */}
              <div>
                <span className="inline-flex items-center justify-center px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-[#EAEDDE] text-[#403011] text-[13px] sm:text-[14px] font-serif uppercase tracking-widest w-fit mb-6 border border-[#403011]/15">
                  THE EPICQUEST PSYCHOMETRIC TOOL
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-serif font-medium text-[#403011] tracking-tight leading-tight mb-4">
                  🧠 Leadership Diagnostic Assessment — <WavyUnderline>Deep Dive</WavyUnderline>
                </h2>
                <p className="text-sm sm:text-base text-[#4A4333] font-serif leading-relaxed border-l-2 border-[#DCA543] pl-5">
                  <strong className="text-[#403011]">Science-Backed. Student-Focused. Career-Defining.</strong> The EpicQuest Leadership Diagnostic Assessment combines two proprietary frameworks — <em>Gunaity Epicometer™</em> and <em>Karmattitude™</em> — to deliver a single, powerful report that maps your child&apos;s personality to their ideal career pathway.
                </p>
              </div>

              {/* 4 DISC Quadrant Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {[
                  { num: "01", letter: "D", title: "Drive · Assertive", desc: "Goal-oriented, decisive leaders. Excel in entrepreneurship, management, law, and competitive environments.", color: "#566544" },
                  { num: "02", letter: "I", title: "Influence · Hustler", desc: "Enthusiastic communicators. Thrive in sales, marketing, media, public relations, and performing arts.", color: "#DCA543" },
                  { num: "03", letter: "S", title: "Support · Helper", desc: "Dependable, empathetic team-builders. Suited for healthcare, education, social work, and HR roles.", color: "#D4856A" },
                  { num: "04", letter: "C", title: "Clarity · Intellectual", desc: "Analytical, detail-focused thinkers. Natural fit for STEM, research, finance, and data science.", color: "#5D7A8C" },
                ].map((q) => (
                  <div key={q.num} className="bg-[#FDFBF7] rounded-2xl border border-[#DCA543]/60 p-5 sm:p-6 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="h-9 w-9 rounded-xl flex items-center justify-center font-serif font-bold text-white text-sm" style={{ backgroundColor: q.color }}>
                        {q.letter}
                      </span>
                      <span className="text-2xl font-serif text-[#403011]/15 leading-none select-none">{q.num}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-[#403011] tracking-tight leading-snug">{q.title}</h3>
                    <p className="text-[13px] sm:text-[14px] text-[#4A4333]/80 font-serif leading-relaxed">{q.desc}</p>
                  </div>
                ))}
              </div>

              {/* Why Choose EpicQuest */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#403011] tracking-tight leading-tight mb-6">
                  Why Choose EpicQuest?
                </h3>
                <div className="flex flex-col gap-4">
                  {[
                    { tag: "DUAL FRAMEWORK", title: "Dual Framework, One Report", desc: "Combines personality profiling AND career mapping — no other Indian tool does both in a single student-focused assessment.", icon: Compass },
                    { tag: "GLOBALLY VALIDATED", title: "Globally Validated", desc: "Built on DISC and career selection models used by leading universities and corporates worldwide.", icon: Shield },
                    { tag: "ACTIONABLE", title: "Actionable Guidance", desc: "Delivers personalised career planning, matched profession lists, and growth strategies.", icon: Activity },
                    { tag: "BUILT FOR SCHOOLS", title: "Built for Schools", desc: "Bulk programs for institutions. Counsellor companion guides included for interpretation and action.", icon: BookOpen },
                    { tag: "IVY LEAGUE LEGACY", title: "Ivy League — Founded", desc: "Developed with rigorous academic grounding — not a generic quiz, but a research-backed instrument.", icon: Award },
                  ].map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <div key={item.tag} className="bg-[#FDFBF7] rounded-2xl border border-[#DCA543]/60 p-5 sm:p-6 flex flex-col gap-2">
                        <div className="mb-1">
                          <span className="inline-flex items-center gap-2 text-[10px] font-bold text-[#8A7340] uppercase tracking-[0.12em] bg-[#FDFBF7] border border-[#DCA543]/60 px-3 py-1.5 rounded-full">
                            <ItemIcon className="w-3.5 h-3.5 text-[#DCA543]" strokeWidth={2} />
                            {item.tag}
                          </span>
                        </div>
                        <h4 className="text-base sm:text-lg font-serif font-bold text-[#403011] tracking-tight">{item.title}</h4>
                        <p className="text-[13px] sm:text-[14px] text-[#4A4333]/80 font-serif leading-relaxed">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Closing Quote */}
              <blockquote className="relative pl-6 sm:pl-8 py-2 border-l-2 border-[#DCA543]">
                <p className="text-base sm:text-lg text-[#403011] font-serif leading-relaxed italic">
                  Most students never discover their true strengths. EpicQuest students know exactly who they are — and where they&apos;re going.
                </p>
              </blockquote>
            </div>

            {/* ── RIGHT COLUMN: Report Preview Collage ── */}
            <div className="flex flex-col gap-6 lg:sticky lg:top-24">

              <div className="flex flex-col gap-3 mb-2">
                <span className="inline-flex items-center justify-center px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-[#EAEDDE] text-[#403011] text-[13px] sm:text-[14px] font-serif uppercase tracking-widest w-fit border border-[#403011]/15">SAMPLE REPORT PREVIEW
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#403011] tracking-tight">
                  What Your Report Looks Like
                </h3>
                <p className="text-xs sm:text-sm text-[#4A4333]/80 font-serif leading-relaxed">
                  A 30+ page personalised dossier covering personality mapping, career alignment, and profession suitability.
                </p>
              </div>

              {/* Creative Overlapping Collage */}
              <div className="relative">
                {/* Ambient color glow */}
                <div className="absolute -top-10 -left-8 w-52 h-52 rounded-full bg-[#DCA543]/15 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-6 -right-6 w-60 h-60 rounded-full bg-[#566544]/15 blur-3xl pointer-events-none" />

                {/* Dot-grid backdrop — echoes the quadrant data underneath */}
                <div
                  className="absolute -top-4 -right-3 w-full h-[320px] rounded-[2rem] border border-[#566544]/15 pointer-events-none"
                  style={{
                    backgroundImage: "radial-gradient(#566544 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                    backgroundColor: "rgba(86,101,68,0.03)",
                  }}
                />

                {/* 01 — Epicometer */}
                <div className="relative rotate-[-1.5deg] rounded-2xl overflow-hidden border-2 border-[#DCA543]/40 bg-white z-10 shadow-[0_20px_45px_-12px_rgba(86,101,68,0.3)] transition-all duration-500 hover:rotate-0 hover:shadow-[0_28px_55px_-12px_rgba(86,101,68,0.4)]">
                  <span className="absolute top-3 left-3 z-10 bg-white text-[#566544] text-[10px] font-bold font-serif px-2.5 py-1 rounded-full border border-[#DCA543]/40 shadow-sm">
                    01 · DISC Quadrant Map
                  </span>
                  <Image
                    src="/images/diagnostic_test/Report_Epicometer.png"
                    alt="Gunaity Epicometer™ — DISC Quadrant Chart"
                    width={900}
                    height={1050}
                    className="w-full h-auto"
                  />
                </div>

                {/* 02 — Career Alignment */}
                <div className="relative -mt-10 ml-4 sm:ml-8 mr-2 rotate-[1deg] rounded-2xl overflow-hidden border-2 border-[#566544]/25 bg-white z-20 shadow-[0_20px_45px_-12px_rgba(86,101,68,0.3)] transition-all duration-500 hover:rotate-0 hover:shadow-[0_28px_55px_-12px_rgba(86,101,68,0.4)]">
                  <span className="absolute top-3 right-3 z-10 bg-white text-[#566544] text-[10px] font-bold font-serif px-2.5 py-1 rounded-full border border-[#566544]/30 shadow-sm">
                    02 · Career Fit %
                  </span>
                  <Image
                    src="/images/diagnostic_test/Report_Career_Alignment.png"
                    alt="Career Alignment Report — Career Fit Percentages"
                    width={900}
                    height={525}
                    className="w-full h-auto"
                  />
                </div>

                {/* 03 — Four Quadrants */}
                <div className="relative -mt-10 mr-4 sm:mr-8 ml-2 rotate-[-1deg] rounded-2xl overflow-hidden border-2 border-[#DCA543]/35 bg-white z-30 shadow-[0_20px_45px_-12px_rgba(86,101,68,0.3)] transition-all duration-500 hover:rotate-0 hover:shadow-[0_28px_55px_-12px_rgba(86,101,68,0.4)]">
                  <span className="absolute top-3 left-3 z-10 bg-white text-[#566544] text-[10px] font-bold font-serif px-2.5 py-1 rounded-full border border-[#DCA543]/40 shadow-sm">
                    03 · Framework Core
                  </span>
                  <Image
                    src="/images/diagnostic_test/Report_Four_Quadrants.png"
                    alt="The Four Quadrants — Framework Core"
                    width={900}
                    height={750}
                    className="w-full h-auto"
                  />
                </div>

                {/* 04 — Profession Suitability */}
                <div className="relative -mt-10 ml-3 sm:ml-6 rotate-[0.75deg] rounded-2xl overflow-hidden border-2 border-[#566544]/20 bg-white z-40 shadow-[0_20px_45px_-12px_rgba(86,101,68,0.3)] transition-all duration-500 hover:rotate-0 hover:shadow-[0_28px_55px_-12px_rgba(86,101,68,0.4)]">
                  <span className="absolute top-3 right-3 z-10 bg-white text-[#566544] text-[10px] font-bold font-serif px-2.5 py-1 rounded-full border border-[#566544]/30 shadow-sm">
                    04 · Role Suitability
                  </span>
                  <Image
                    src="/images/diagnostic_test/Report_Profession_Suitability.png"
                    alt="Profession Suitability Assessment"
                    width={900}
                    height={514}
                    className="w-full h-auto"
                  />
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER + TEST PORTAL ═══ */}
      <section id="assessment-portal" className="w-full bg-[#F6EBD4] border-t border-[#4A4333]/10">

        {/* CTA Banner */}
        <div className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center flex flex-col items-center gap-6">
            <span className="inline-flex items-center justify-center px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-[#EAEDDE] text-[#403011] text-[13px] sm:text-[14px] font-serif uppercase tracking-widest w-fit border border-[#403011]/15">
              {testStarted ? 'ASSESSMENT IN PROGRESS' : 'READY TO BEGIN?'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-serif font-medium text-[#403011] tracking-tight leading-tight">
              Discover Your Child&apos;s{" "}
              <span className="relative inline-block">
                <span className="relative z-10">True <WavyUnderline>Potential</WavyUnderline></span>
                <svg className="absolute -bottom-1.5 left-0 w-full" height="8" viewBox="0 0 120 8" preserveAspectRatio="none" fill="none">
                  <path d="M2 6 Q30 2 60 5 Q90 8 118 3" stroke="#DCA543" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#4A4333] font-serif leading-relaxed max-w-2xl">
              {testStarted
                ? 'Complete the assessment below to receive your personalised 30+ page diagnostic report instantly.'
                : 'Take the EpicQuest Leadership Diagnostic Assessment — a 5-minute, science-backed tool that maps personality to career pathways. Get your 30+ page personalised report instantly.'
              }
            </p>
            {!testStarted && (
              <button
                onClick={() => {
                  setTestStarted(true);
                  setTimeout(() => {
                    const el = document.getElementById('test-portal');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center text-center gap-2 sm:gap-2.5 px-6 py-3.5 sm:px-8 sm:py-4 bg-[#5C7146] hover:bg-[#4A5C38] text-white rounded-full font-bold text-[13px] sm:text-base tracking-wide transition-all duration-300 shadow-lg hover:shadow-[0_8px_30px_rgba(92,113,70,0.35)] hover:-translate-y-0.5 group"
              >
                Get Your Assessment
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            )}
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-[#8A8373] font-serif uppercase tracking-widest font-bold">
              <CheckCircle2 className="w-4 h-4 text-[#566544] shrink-0" />
              Free · 5 Minutes · Instant 30+ Page Report
            </div>
          </div>
        </div>

        {/* Test Portal — visible only after CTA is clicked */}
        {testStarted && (
          <div id="test-portal" className="py-16 sm:py-24 relative">

            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#DCA543]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#566544]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
            </div>

            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col lg:flex-row gap-12 lg:gap-16 items-start relative z-10">

              {/* ── LEFT COLUMN: Title & Progress ── */}
              <div className="lg:w-5/12 flex flex-col lg:sticky lg:top-32 gap-10">

                <div>
                  {/* Header Pill */}
                  <div className="self-start">
                    <span className="inline-flex items-center justify-center px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-[#EAEDDE] text-[#403011] text-[13px] sm:text-[14px] font-serif uppercase tracking-widest w-fit mb-6 border border-[#566544]/10 shadow-sm">
                      <Compass className="w-4 h-4 text-[#566544] mr-2" />
                      EPICQUEST LEADERSHIP DIAGNOSTIC
                    </span>
                  </div>

                  {/* Step Header */}
                  <div>
                    <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-serif font-medium text-[#403011] tracking-tight leading-[1.05]">
                      Establish Your{" "}
                      <span className="relative inline-block mt-2">
                        <span className="relative z-10">Diagnostic Profile</span>
                        <svg className="absolute -bottom-1.5 left-0 w-full" height="8" viewBox="0 0 120 8" preserveAspectRatio="none" fill="none">
                          <path d="M2 6 Q30 2 60 5 Q90 8 118 3" stroke="#DCA543" strokeWidth="2.5" strokeLinecap="round" />
                        </svg>
                      </span>
                    </h1>
                    <p className="text-base sm:text-lg text-[#4A4333]/90 font-serif leading-relaxed mt-6 pl-5 border-l-2 border-[#DCA543]">
                      Map your default behavioral vectors to design highly competitive Ivy League academic research and patent portfolio alignments.
                    </p>
                  </div>
                </div>

                {/* STEP PROGRESS TRACKER */}
                <div className="w-full bg-white rounded-3xl p-6 sm:p-8 border border-[#4A4333]/8 shadow-lg flex flex-col gap-6 select-none relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#F6EBD4]/50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3" />

                  <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#8A7340] flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Assessment Progress
                  </div>

                  <div className="flex flex-col gap-5 relative z-10">
                    {/* Step 1 indicator */}
                    <div className={`flex items-center gap-4 transition-opacity ${step >= 0 ? "opacity-100" : "opacity-40"}`}>
                      <span className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center font-bold font-sans transition-all shadow-sm ${step === 0 ? "bg-[#566544] text-white ring-4 ring-[#566544]/20" : step > 0 ? "bg-[#566544] text-white" : "bg-[#F6EBD4] text-[#4A4333]/50"
                        }`}>
                        {step > 0 ? <CheckCircle2 className="w-5 h-5" /> : "1"}
                      </span>
                      <div className="flex flex-col">
                        <span className={`font-bold font-serif text-base ${step === 0 ? "text-[#403011]" : step > 0 ? "text-[#566544]" : "text-[#4A4333]/50"}`}>
                          Candidate Registration
                        </span>
                        <span className="text-[11px] uppercase tracking-wider text-[#4A4333]/60 font-medium">Basic details</span>
                      </div>
                    </div>

                    {/* Connector line */}
                    <div className="w-0.5 h-8 bg-[#4A4333]/10 ml-5 rounded-full relative overflow-hidden">
                      <div className={`absolute top-0 w-full bg-[#566544] transition-all duration-700 ease-in-out ${step > 0 ? 'h-full' : 'h-0'}`} />
                    </div>

                    {/* Step 2 indicator */}
                    <div className={`flex items-center gap-4 transition-opacity ${step >= 1 ? "opacity-100" : "opacity-40"}`}>
                      <span className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center font-bold font-sans transition-all shadow-sm ${step >= 1 && step < 5 ? "bg-[#DCA543] text-white ring-4 ring-[#DCA543]/20" : step === 5 ? "bg-[#566544] text-white" : "bg-[#FDFBF7] border border-[#4A4333]/20 text-[#4A4333]/50"
                        }`}>
                        {step === 5 ? <CheckCircle2 className="w-5 h-5" /> : "2"}
                      </span>
                      <div className="flex flex-col">
                        <span className={`font-bold font-serif text-base ${step >= 1 ? "text-[#403011]" : "text-[#4A4333]/50"}`}>
                          Psychometric Matrix
                        </span>
                        <span className="text-[11px] uppercase tracking-wider text-[#4A4333]/60 font-medium">
                          {step >= 1 && step < 5 ? `${percentComplete}% Complete` : step === 5 ? "100% Complete" : "Behavioral assessment"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* ── RIGHT COLUMN: The Form ── */}
              <div className="lg:w-7/12 flex flex-col gap-6 w-full pt-2 lg:pt-0">

                {/* INLINE VALIDATION ERROR */}
                {validationError && (
                  <div className="p-4 rounded-2xl bg-[#D4856A]/10 border border-[#D4856A]/20 text-[#D4856A] text-xs sm:text-sm font-medium flex items-start gap-2.5 shadow-sm">
                    <Info className="w-4.5 h-4.5 shrink-0 mt-0.5" />
                    <span>{validationError}</span>
                  </div>
                )}

                {/* ═══ STEP 0: CANDIDATE INFO FORM ═══ */}
                {step === 0 && (
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#4A4333]/8 shadow-md relative overflow-hidden transition-all duration-300">
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#566544] to-[#DCA543]" />
                    <h2 className="text-xl sm:text-2xl font-serif font-medium text-[#403011] mb-6 flex items-center gap-2.5">
                      <Compass className="w-5 h-5 text-[#DCA543]" />
                      Candidate <WavyUnderline>Registration</WavyUnderline>
                    </h2>
                    <p className="text-xs sm:text-sm text-[#4A4333]/85 font-serif leading-relaxed mb-6 border-b border-[#4A4333]/8 pb-4">
                      Please enter your profile details. We interpolate these values dynamically across your 30+ page custom dossier, tactical research directions, and admissions priority roadmaps.
                    </p>

                    <div className="space-y-5">
                      {/* Full Name */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="student-name" className="text-[10px] font-extrabold uppercase tracking-wider text-[#4A4333]/70">
                          Candidate Full Name <span className="text-[#D4856A]">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A4333]/45" />
                          <input
                            id="student-name"
                            type="text"
                            placeholder="e.g. Hetvi Bhanushali"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-[#FDFBF7] border border-[#4A4333]/15 rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm focus:outline-none focus:border-[#566544] focus:ring-1 focus:ring-[#566544] transition-all font-serif"
                          />
                        </div>
                      </div>

                      {/* Grade Status */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="student-status" className="text-[10px] font-extrabold uppercase tracking-wider text-[#4A4333]/70">
                          Academic Grade / Class Status <span className="text-[#D4856A]">*</span>
                        </label>
                        <div className="relative">
                          <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A4333]/45" />
                          <input
                            id="student-status"
                            type="text"
                            placeholder="e.g. Sophomore Year Student, Grade 11"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full bg-[#FDFBF7] border border-[#4A4333]/15 rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm focus:outline-none focus:border-[#566544] focus:ring-1 focus:ring-[#566544] transition-all font-serif"
                          />
                        </div>
                      </div>

                      {/* Target Aspirations */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="target-university" className="text-[10px] font-extrabold uppercase tracking-wider text-[#4A4333]/70">
                          Target Universities / Admissions Focus <span className="text-[#D4856A]">*</span>
                        </label>
                        <div className="relative">
                          <School className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A4333]/45" />
                          <input
                            id="target-university"
                            type="text"
                            placeholder="e.g. UC Santa Barbara (or Ivy League)"
                            value={university}
                            onChange={(e) => setUniversity(e.target.value)}
                            className="w-full bg-[#FDFBF7] border border-[#4A4333]/15 rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm focus:outline-none focus:border-[#566544] focus:ring-1 focus:ring-[#566544] transition-all font-serif"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-5 border-t border-[#4A4333]/8 flex justify-end">
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="w-full sm:w-auto inline-flex items-center justify-center text-center gap-2 sm:gap-2.5 px-6 py-3.5 sm:px-8 sm:py-4 bg-[#5C7146] hover:bg-[#4A5C38] text-white rounded-full font-bold text-[13px] sm:text-sm tracking-wide transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 group"
                      >
                        Start Assessment
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ═══ STEP 1, 2, 3: BIPOLAR ADJECTIVE PAIRS ═══ */}
                {(step === 1 || step === 2 || step === 3) && (
                  <div className="flex flex-col gap-5">
                    <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#4A4333]/8 shadow-md">
                      <div className="flex items-center justify-between border-b border-[#4A4333]/8 pb-4 mb-4 select-none">
                        <span className="text-xs text-[#566544] font-extrabold uppercase tracking-wider font-sans">
                          Adjective Pair Block {step} of 3
                        </span>
                        <span className="text-[10px] text-[#4A4333]/60 italic font-serif">
                          Select a point leaning toward your natural default
                        </span>
                      </div>

                      {/* Rating Scale Labels */}
                      <div className="flex items-center justify-between px-2 sm:px-6 pb-2 select-none gap-2 sm:gap-4">
                        <span className="flex-1 min-w-0"></span>
                        <div className="flex items-center justify-between w-[160px] sm:w-[210px] shrink-0">
                          <div className="w-6 sm:w-7 flex justify-center text-[7px] sm:text-[9px] font-extrabold uppercase tracking-widest sm:tracking-wider text-[#4A4333]/45 whitespace-nowrap">Strong</div>
                          <div className="hidden sm:flex w-6 sm:w-7 justify-center text-[7px] sm:text-[9px] font-extrabold uppercase tracking-widest sm:tracking-wider text-[#4A4333]/45 whitespace-nowrap">Lean</div>
                          <div className="w-6 sm:w-7 flex justify-center text-[7px] sm:text-[9px] font-extrabold uppercase tracking-widest sm:tracking-wider text-[#4A4333]/45 whitespace-nowrap">Neutral</div>
                          <div className="hidden sm:flex w-6 sm:w-7 justify-center text-[7px] sm:text-[9px] font-extrabold uppercase tracking-widest sm:tracking-wider text-[#4A4333]/45 whitespace-nowrap">Lean</div>
                          <div className="w-6 sm:w-7 flex justify-center text-[7px] sm:text-[9px] font-extrabold uppercase tracking-widest sm:tracking-wider text-[#4A4333]/45 whitespace-nowrap">Strong</div>
                        </div>
                        <span className="flex-1 min-w-0"></span>
                      </div>

                      <div className="divide-y divide-[#4A4333]/8">
                        {adjectivePairsList.slice((step - 1) * 8, step * 8).map((q) => {
                          const score = answers[q.id];
                          const isHighlighted = highlightedUnanswered.includes(q.id);
                          return (
                            <div
                              key={q.id}
                              className={`flex items-center justify-between py-5.5 px-2 sm:px-6 gap-2 sm:gap-4 rounded-xl transition-all ${isHighlighted
                                ? "bg-[#D4856A]/5 border border-dashed border-[#D4856A]/25"
                                : "hover:bg-[#FDFBF7]/40"
                                }`}
                            >
                              {/* Left Bipolar term */}
                              <span className="flex-1 min-w-0 text-right font-serif font-bold text-[10px] sm:text-sm text-[#403011] select-none leading-tight break-words">
                                {q.left}
                              </span>

                              {/* Rating Circles */}
                              <div className="flex items-center justify-between w-[160px] sm:w-[210px] shrink-0 select-none">
                                {[1, 2, 3, 4, 5].map((val) => {
                                  const isSelected = score === val;
                                  return (
                                    <button
                                      key={val}
                                      type="button"
                                      onClick={() => handleAnswerSelect(q.id, val)}
                                      className="relative focus:outline-none cursor-pointer"
                                      aria-label={`Rate ${q.left} to ${q.right} as ${val}`}
                                    >
                                      <div className={`h-6 w-6 sm:h-7 sm:w-7 rounded-full border-2 flex items-center justify-center transition-all ${isSelected
                                        ? "bg-[#566544] border-[#566544] scale-110 shadow"
                                        : "border-[#4A4333]/20 bg-[#FDFBF7] hover:border-[#DCA543]"
                                        }`}>
                                        {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white animate-fade-in" />}
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>

                              {/* Right Bipolar term */}
                              <span className="flex-1 min-w-0 text-left font-serif font-bold text-[10px] sm:text-sm text-[#403011] select-none leading-tight break-words">
                                {q.right}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Navigation Actions */}
                    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#4A4333]/8 shadow-sm flex items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#FDFBF7] hover:bg-[#F6EBD4]/40 border border-[#4A4333]/15 text-[#4A4333] rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Back
                      </button>

                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#5C7146] hover:bg-[#4A5C38] text-white rounded-xl text-[13px] sm:text-sm font-bold transition-all cursor-pointer hover:-translate-y-0.5 shadow-sm hover:shadow-md"
                      >
                        Next
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ═══ STEP 4: SINGLE BEHAVIORAL TRAITS ═══ */}
                {step === 4 && (
                  <div className="flex flex-col gap-5">
                    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#4A4333]/8 shadow-md">
                      <div className="flex items-center justify-between border-b border-[#4A4333]/8 pb-4 mb-5 select-none">
                        <span className="text-xs text-[#566544] font-extrabold uppercase tracking-wider font-sans">
                          Step 4 of 5 — Traits Matrix
                        </span>
                        <span className="text-[10px] text-[#4A4333]/60 italic font-serif">
                          Identify how well each descriptor applies to your behaviors
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {singleTraitsList.map((q) => {
                          const score = answers[q.id];
                          const isHighlighted = highlightedUnanswered.includes(q.id);
                          return (
                            <div
                              key={q.id}
                              className={`p-4 bg-[#FDFBF7]/60 rounded-2xl border transition-all ${isHighlighted
                                ? "bg-[#D4856A]/5 border-dashed border-[#D4856A]/25"
                                : "border-[#4A4333]/8 hover:border-[#DCA543]/20"
                                }`}
                            >
                              <h3 className="font-serif font-bold text-xs sm:text-sm text-[#403011] text-center select-none mb-3">
                                {q.text}
                              </h3>

                              <div className="flex flex-col gap-1.5">
                                <div className="flex justify-between items-center text-[9px] font-extrabold uppercase tracking-wider text-[#4A4333]/45 px-1 select-none">
                                  <span>Not Like Me</span>
                                  <span>Strongly Like Me</span>
                                </div>

                                <div className="flex items-center justify-between bg-white px-2 py-2 rounded-xl border border-[#4A4333]/6 w-full select-none">
                                  {[1, 2, 3, 4, 5].map((val) => {
                                    const isSelected = score === val;
                                    return (
                                      <button
                                        key={val}
                                        type="button"
                                        onClick={() => handleAnswerSelect(q.id, val)}
                                        className="focus:outline-none cursor-pointer"
                                        aria-label={`Rate trait ${q.text} as ${val}`}
                                      >
                                        <div className={`h-6 w-6 rounded-full border flex items-center justify-center transition-all ${isSelected
                                          ? "bg-[#566544]/12 border-[#566544] scale-105 shadow-inner"
                                          : "border-[#4A4333]/15 bg-white hover:border-[#DCA543]"
                                          }`}>
                                          {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-[#566544]" />}
                                        </div>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Navigation Actions */}
                    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#4A4333]/8 shadow-sm flex items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#FDFBF7] hover:bg-[#F6EBD4]/40 border border-[#4A4333]/15 text-[#4A4333] rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Back
                      </button>

                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#5C7146] hover:bg-[#4A5C38] text-white rounded-xl text-[13px] sm:text-sm font-bold transition-all cursor-pointer hover:-translate-y-0.5 shadow-sm hover:shadow-md"
                      >
                        Next
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ═══ STEP 5: BINARY FORCED CHOICES ═══*/}
                {step === 5 && (
                  <div className="flex flex-col gap-5">
                    <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#4A4333]/8 shadow-md">
                      <div className="flex items-center justify-between border-b border-[#4A4333]/8 pb-4 mb-5 select-none">
                        <span className="text-xs text-[#566544] font-extrabold uppercase tracking-wider font-sans">
                          Step 5 of 5 — Scenario Alignment
                        </span>
                        <span className="text-[10px] text-[#4A4333]/60 italic font-serif">
                          Choose the scenario statement that matches you closest
                        </span>
                      </div>

                      <div className="space-y-4">
                        {forcedChoicesList.map((q) => {
                          const opt = answers[q.id];
                          const isHighlighted = highlightedUnanswered.includes(q.id);
                          return (
                            <div
                              key={q.id}
                              className={`p-4 bg-[#FDFBF7]/40 rounded-2xl border transition-all ${isHighlighted
                                ? "bg-[#D4856A]/5 border-dashed border-[#D4856A]/25"
                                : "border-[#4A4333]/8"
                                }`}
                            >
                              <h3 className="font-serif font-bold text-xs sm:text-sm text-[#403011] leading-relaxed border-b border-[#4A4333]/5 pb-2 mb-3">
                                {q.text}
                              </h3>

                              <div className="flex flex-col gap-2.5 select-none">
                                {/* Option 1 */}
                                <button
                                  type="button"
                                  onClick={() => handleAnswerSelect(q.id, "opt1")}
                                  className={`p-3 rounded-xl border text-left text-[11px] sm:text-xs font-serif leading-relaxed transition-all flex items-start gap-3 cursor-pointer hover:bg-white/60 ${opt === "opt1"
                                    ? "bg-[#566544]/5 border-[#566544] text-[#403011] font-bold"
                                    : "bg-white border-[#4A4333]/10 text-[#4A4333]/80"
                                    }`}
                                >
                                  <div className={`h-4.5 w-4.5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${opt === "opt1" ? "bg-[#566544] border-[#566544] text-white" : "border-[#4A4333]/25 bg-white"
                                    }`}>
                                    {opt === "opt1" && (
                                      <svg className="w-3 h-3 stroke-white" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                      </svg>
                                    )}
                                  </div>
                                  <span>{q.opt1}</span>
                                </button>

                                {/* Option 2 */}
                                <button
                                  type="button"
                                  onClick={() => handleAnswerSelect(q.id, "opt2")}
                                  className={`p-3 rounded-xl border text-left text-[11px] sm:text-xs font-serif leading-relaxed transition-all flex items-start gap-3 cursor-pointer hover:bg-white/60 ${opt === "opt2"
                                    ? "bg-[#566544]/5 border-[#566544] text-[#403011] font-bold"
                                    : "bg-white border-[#4A4333]/10 text-[#4A4333]/80"
                                    }`}
                                >
                                  <div className={`h-4.5 w-4.5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${opt === "opt2" ? "bg-[#566544] border-[#566544] text-white" : "border-[#4A4333]/25 bg-white"
                                    }`}>
                                    {opt === "opt2" && (
                                      <svg className="w-3 h-3 stroke-white" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                      </svg>
                                    )}
                                  </div>
                                  <span>{q.opt2}</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Navigation Actions */}
                    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#4A4333]/8 shadow-sm flex items-center justify-between gap-4 mt-2">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#FDFBF7] hover:bg-[#F6EBD4]/40 border border-[#4A4333]/15 text-[#4A4333] rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Back
                      </button>

                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#5C7146] hover:bg-[#4A5C38] text-white rounded-xl text-[13px] sm:text-sm font-bold transition-all cursor-pointer hover:-translate-y-0.5 shadow-sm hover:shadow-md"
                      >
                        Get Results
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}
      </section>

      {/* ═════ FAQ SECTION ════ */}
      <section className="w-full py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col gap-12">

          {/* FAQ Header */}
          <div className="text-center">
            <span className="inline-flex items-center justify-center px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-[#EAEDDE] text-[#403011] text-[13px] sm:text-[14px] font-serif uppercase tracking-widest w-fit mb-6 border border-[#403011]/15">Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#403011] mt-4 leading-tight">
              DISC <WavyUnderline>Assessment FAQ</WavyUnderline>
            </h2>
            <p className="text-xs sm:text-sm text-[#4A4333]/70 font-serif italic mt-2">
              Everything you need to know about the science, timelines, and reporting details
            </p>
          </div>

          {/* ACCORDION ITEMS */}
          <div className="flex flex-col border border-[#4A4333]/8 rounded-3xl overflow-hidden divide-y divide-[#4A4333]/8 shadow-sm">
            {faqData.map((item, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="bg-[#FDFBF7]/40 hover:bg-[#FDFBF7]/70 transition-colors">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-5 sm:px-8 py-4.5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                  >
                    <span className="font-serif font-bold text-xs sm:text-sm text-[#403011] pr-4">
                      {item.q}
                    </span>
                    <span className="text-[#4A4333]/45 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[300px] border-t border-[#4A4333]/5 bg-white" : "max-h-0"
                    }`}>
                    <div className="px-5 sm:px-8 py-5 text-xs sm:text-sm text-[#4A4333]/90 font-serif leading-relaxed whitespace-pre-line">
                      {item.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>


        </div>
      </section>

    </main>
  );
}