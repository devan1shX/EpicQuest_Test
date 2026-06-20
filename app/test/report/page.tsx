"use client";

import WavyUnderline from "@/components/ui/WavyUnderline";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Printer,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Compass,
  TrendingUp,
  Target,
  Award,
  RotateCcw,
  Users,
  Lightbulb,
  FileText,
  Scroll,
  BookOpen,
  UserCheck,
  Briefcase,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  Zap
} from "lucide-react";
import { ReportData } from "../engine";
import { evaluateProfessionSuitability, type ProfessionSuitabilityResult } from "../professionSuitability";
import { professionProfilesConfig } from "../professionProfiles";

const localFallbackData: ReportData = {
  candidate: {
    name: "Ms. Hetvi Bhanushali",
    status: "Sophomore Year Student",
    university: "UC Santa Barbara, California, USA",
    reportDate: "June 20, 2025",
    preparedBy: "Tilak Mishra, Founder & CEO, EpicQuest Learning (UPenn 2009)"
  },
  framework: {
    name: "Gunaity Epicometer™ Framework",
    description: "The Gunaity Epicometer™ describes behavior in four styles. Everyone uses all four, but most rely on one or two. Two axes: Active/Receptive (vertical) and Skeptical/Agreeable (horizontal).",
    styles: [
      { code: "D", name: "Drive (Assertive)", description: "Action-oriented decisive leaders. Take charge, make decisions. Thrive in entrepreneurship, management, competitive environments." },
      { code: "I", name: "Influence (Hustler)", description: "Enthusiastic communicators. Inspire and persuade. Excel in sales, marketing, media, PR, performing arts." },
      { code: "S", name: "Support (Helper)", description: "Dependable, empathetic team builders. Best for healthcare, education, social work, HR." },
      { code: "C", name: "Clarity (Intellectual)", description: "Analytical, detail-focused thinkers. Natural fit for STEM, research, finance, data science." }
    ]
  },
  foundationScores: {
    pacePosture: {
      active: 60,
      receptive: 40,
      insight: "Leans decisively Active — quick to speak up, ready to lead, comfortable moving fast in group settings."
    },
    orientation: {
      agreeable: 62,
      skeptical: 38,
      insight: "Primary focus on quality of work relationships and wellbeing of people. Fosters consensus, cooperation and shared enthusiasm."
    },
    combinedResult: {
      formula: "Active + Agreeable = I Quadrant",
      type: "Influence / Hustler / Relationship Builder"
    }
  },
  primaryType: {
    code: "I",
    name: "Influence (Hustler)",
    labels: ["The Hustler", "The Relationship Builder", "The Energiser"],
    description: "Fast-paced, collaborative, outgoing. Uses enthusiasm to bring people together. Enjoys meeting people, hearing their stories, and sharing excitement for ideas. Natural energy and optimism create environments where everyone feels included.",
    atTheirBest: "Upbeat, persuasive, expressive, engaging. Infuses a sense of excitement and possibility into projects.",
    potentialWeakness: "Can be seen as disorganised, overly expressive, in a hurry, easily distracted. May get distracted from dull tasks. Struggles to slow down to assess risks.",
    traitPills: ["Enthusiastic", "Talkative", "Collaborative", "Charming", "Impulsive", "Goal-oriented", "Confident", "Influential", "Optimistic", "Sociable"]
  },
  workplacePriorities: [
    { title: "Relationship Building", description: "Building wide professional networks, regular catch-ups, inclusive environments." },
    { title: "Creative Action", description: "Spotting new opportunities, championing bold untested ideas, encouraging quick action." },
    { title: "Inspiring Momentum", description: "Lifting team spirit in tough moments, persuading stakeholders, promoting meaningful change." }
  ],
  situations: {
    thrive: [
      "Fast-paced, creative, innovative workplaces",
      "Roles that involve connecting with and influencing people",
      "Collaborative projects with room for their own ideas",
      "Networking and social professional events",
      "Environments that welcome enthusiasm and energy"
    ],
    difficult: [
      "Slow-paced, steady, highly traditional environments",
      "Inflexible rules and rigid procedures",
      "Detailed analysis or very slow, methodical workflows",
      "Isolated tasks with little human interaction",
      "Colleagues who don't appreciate their effervescent style"
    ]
  },
  strengthsAndBlindSpots: {
    strengths: [
      "Confident communicator",
      "Building professional networks",
      "Being approachable",
      "Being enthusiastic",
      "Persuading others",
      "Lifting team spirit",
      "Inspiring others",
      "Seeing new opportunities",
      "Promoting change",
      "Creating fun atmosphere",
      "Making quick decisions"
    ],
    blindSpots: [
      "Being cautious",
      "Analyzing risks",
      "Following procedures",
      "Being modest",
      "Being methodical",
      "Staying focused",
      "Being even-tempered and calm",
      "Quietly listening",
      "Working independently",
      "Giving constructive feedback",
      "Being systematic"
    ]
  },
  styleDepth: {
    core: { code: "I", name: "Influence/Hustler", status: "Primary Mode", description: "Engaging, enthusiastic, persuasive. Reaches out to build excitement. Thrives on human connection. Withers in isolated, impersonal tasks. Useful for: teachers, managers, marketing, media, salespeople." },
    helper1: { code: "D", name: "Drive/Assertive", status: "Helper Style", description: "Accessible when needed. Can step into decisive, assertive leadership when required — not a natural default. Use strategically." },
    helper2: { code: "S", name: "Support/Helper", status: "Helper Style", description: "Accessible when needed. Empathy and care manifest as genuine helpfulness in one-on-one or high-trust relationships." },
    challenge: { code: "C", name: "Clarity/Intellectual", status: "Challenge Style", description: "Most effortful mode. Precise, systematic, detail-focused work takes the most mental energy. Extended time here may cause stress and motivational dips — but developing this area is meaningful growth." }
  },
  workplaceDescriptorTable: {
    moreLikely: ["Enthusiastic", "Talkative & expressive", "Collaborative", "Charming & persuasive", "Impulsive & spontaneous", "Goal-oriented", "Confident", "Optimistic", "Sociable"],
    lessLikely: ["Cautious", "Analytical", "Organised & systematic", "Reflective & measured", "Soft-spoken", "Self-controlled", "Reliable in routine tasks", "Detailed & precise", "Modest"]
  },
  careerMap: {
    introduction: "As an Influence type, you naturally gravitate toward fields where human connection, communication, and creative energy are core.",
    domains: [
      { id: "01", title: "Media & Communications", description: "Journalism, broadcasting, content creation, PR, and marketing leverage natural expressiveness and ability to connect with audiences at scale." },
      { id: "02", title: "Policy & Public Leadership", description: "Advocacy, diplomacy, and public policy offer the stage to persuade, inspire change, and build coalitions around important ideas." },
      { id: "03", title: "Entrepreneurship & Startups", description: "Founding, pitching, and team-building demands of startup life are a natural playground for someone with this charisma and bias for action." },
      { id: "04", title: "Education & Mentorship", description: "Teaching, coaching, and curriculum design channel enthusiasm to uplift and inspire — creating the inclusive environments they naturally build." },
      { id: "05", title: "Sales & Business Development", description: "Persuasiveness, network-building, and optimism are precisely the traits separating exceptional salespeople from average ones." },
      { id: "06", title: "Social Impact & NGOs", description: "Mission-driven organisations thrive on people who can mobilise communities and inspire action — a natural fit for the Influence orientation." }
    ]
  },
  closing: {
    headline: "Ready to Build Your Portfolio?",
    body: "Your diagnostic is just the beginning. EpicQuest can design a fully personalised, psychometric-aligned portfolio journey built around your Influence strengths — from applied research to apprenticeships.",
    ctaButton1: "Generate Your Ivy League Plan →",
    ctaButton2: "Book Free Consultation"
  },
  branding: {
    company: "EpicQuest Learning LLP",
    address: "8/11, 1st Floor, Sarvapriya Vihar, New Delhi 110016, India",
    phone: "+91 9971125276",
    email: "contact@epicquestlearning.com",
    tagline: "We transform extraordinary high school students into Ivy League-ready candidates through structured research, patent filing, and real-world apprenticeships."
  },
  advancedAnalytics: {
    behavioralCapabilities: [
      { code: "I", name: "Influence", score: 62, description: "Focuses on relationships, communication, and enthusiasm.", rank: 1 },
      { code: "D", name: "Drive", score: 45, description: "Focuses on results, taking action, and asserting influence.", rank: 2 },
      { code: "S", name: "Support", score: 40, description: "Focuses on cooperation, sincerity, and dependability.", rank: 3 },
      { code: "C", name: "Clarity", score: 20, description: "Focuses on quality, accuracy, and systematic processes.", rank: 4 }
    ],
    primaryStyle: "Influence",
    secondaryStyle: "Drive",
    combinedStyleCode: "ID",
    combinedStyleExplanation: "Results-driven and communicative. Excels at driving change through persuasion and energetic leadership.",
    personalityStrength: {
      score: 11,
      level: "Moderate",
      explanation: "Your distinct behavioral preferences show a moderate crystallization, indicating how strongly you default to your primary modes."
    },
    careerFits: [
      { name: "Sales", fitPercentage: 85, colorStatus: "Green", description: "Results-driven, persuasive." },
      { name: "Marketing", fitPercentage: 82, colorStatus: "Green", description: "Fast-paced, highly collaborative." },
      { name: "Consulting", fitPercentage: 75, colorStatus: "Orange", description: "Strategic, communicative, fast-paced." },
      { name: "Teacher", fitPercentage: 58, colorStatus: "Yellow", description: "Empathetic, supportive, structured." },
      { name: "NGO", fitPercentage: 55, colorStatus: "Yellow", description: "Mission-driven, collaborative." },
      { name: "Government", fitPercentage: 42, colorStatus: "Red", description: "Structured, policy-driven, methodical." },
      { name: "Data Analyst", fitPercentage: 35, colorStatus: "Red", description: "Detail-oriented, objective, systematic." },
      { name: "Software Engineer", fitPercentage: 30, colorStatus: "Red", description: "Analytical, independent, quality-focused." }
    ]
  }
};

export default function DiagnosticReportResultsPage() {
  const router = useRouter();
  const [data, setData] = useState<ReportData>(localFallbackData);
  const [loading, setLoading] = useState(true);
  const [animating, setAnimating] = useState(false);
  const [isSampleReport, setIsSampleReport] = useState(true);
  const [hoveredQuadrant, setHoveredQuadrant] = useState<string | null>(null);

  // Profession Suitability state
  const [selectedProfession, setSelectedProfession] = useState<string>("");
  const [suitabilityResult, setSuitabilityResult] = useState<ProfessionSuitabilityResult | null>(null);
  const [profDropdownOpen, setProfDropdownOpen] = useState(false);

  // Hydrate report data on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedReport = localStorage.getItem("eq_diagnostic_report");
      if (savedReport) {
        try {
          const parsed = JSON.parse(savedReport);
          setData(parsed);
          setIsSampleReport(false);
          setLoading(false);

          const timer = setTimeout(() => {
            setAnimating(true);
          }, 150);
          return () => clearTimeout(timer);
        } catch (e) {
          console.error("Failed to parse saved report.", e);
          setIsSampleReport(true);
          setLoading(false);
        }
      } else {
        // No saved report: Redirect immediately to /test to take the assessment
        router.push("/test");
      }
    }
  }, []);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleReset = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("eq_diagnostic_report");
      router.push("/test");
    }
  };

  const handleProfessionSelect = (professionName: string) => {
    setSelectedProfession(professionName);
    setProfDropdownOpen(false);

    if (!professionName) {
      setSuitabilityResult(null);
      return;
    }

    try {
      // Calculate exact raw scores from foundation scores
      const active = data.foundationScores?.pacePosture?.active ?? 50;
      const receptive = data.foundationScores?.pacePosture?.receptive ?? 50;
      const agreeable = data.foundationScores?.orientation?.agreeable ?? 50;
      const skeptical = data.foundationScores?.orientation?.skeptical ?? 50;

      const rawD = (active + skeptical) / 2;
      const rawI = (active + agreeable) / 2;
      const rawS = (receptive + agreeable) / 2;
      const rawC = (receptive + skeptical) / 2;

      const result = evaluateProfessionSuitability(
        rawD,
        rawI,
        rawS,
        rawC,
        professionName
      );
      setSuitabilityResult(result);
    } catch (e) {
      console.error("Error calculating profession suitability:", e);
      setSuitabilityResult(null);
    }
  };

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

  return (
    <main className="flex flex-col w-full bg-[#F6EBD4] min-h-screen text-[#4A4333] font-sans selection:bg-[#DCA543] selection:text-[#1F2C16]">

      <div className="screen-report-content">

        {/* SECTION 1 — COVER PAGE HERO (Forest Green) */}
        <section className="w-full bg-[#1F2C16] py-20 sm:py-28 relative overflow-hidden text-[#F6EBD4] border-b border-[#4A4333]/10 min-h-screen flex flex-col justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(#DCA543_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.05] pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full z-10 flex flex-col justify-between min-h-[460px] gap-12 animate-fade-up">

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-white/10 pb-10">
              <div>
                <span className="inline-block uppercase tracking-[0.12em] sm:tracking-[0.2em] text-[10px] font-bold text-[#DCA543] bg-[#DCA543]/10 px-3 py-1.5 rounded-md border border-[#DCA543]/20 leading-relaxed">
                  CONFIDENTIAL COGNITIVE & PERSONALITY DOSSIER
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-[3.8rem] font-serif font-medium mt-6 leading-[1.08] tracking-tight text-[#F6EBD4]">
                  Leadership Diagnostic<br />Report
                </h1>
                <p className="font-serif italic text-[#F6EBD4]/60 text-base mt-4">
                  Powered by Gunaity Epicometer™ & Karmattitude™ Frameworks
                </p>
              </div>

              <div className="shrink-0 flex flex-col gap-3.5 items-start md:items-end">
                <span className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full bg-[#DCA543] text-[#1F2C16] text-xs font-bold shadow-lg print-badge">
                  <Award className="w-3.5 h-3.5" />
                  Type: {data.primaryType.code} – {data.primaryType.name}
                </span>

                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full bg-white/5 hover:bg-[#DCA543] text-[#DCA543] hover:text-[#1F2C16] border border-[#DCA543]/30 hover:border-[#DCA543] transition-all duration-300 font-sans text-xs font-bold shadow-sm hover:shadow-lg hover:-translate-y-0.5 cursor-pointer mt-1 no-print focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DCA543] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F2C16] group active:scale-95"
                  aria-label="Reset and retake diagnostic test"
                >
                  <RotateCcw className="w-3.5 h-3.5 transition-transform duration-500 group-hover:rotate-[-120deg]" />
                  <span>Reset &amp; Retake Diagnostic</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-end mt-4">
              <div className="flex flex-col gap-6">
                <div>
                  <span className="text-[10px] text-[#F6EBD4]/40 uppercase tracking-widest block font-bold mb-1.5">
                    Prepared For
                  </span>
                  <p className="text-2xl sm:text-3xl font-serif font-medium text-white leading-tight">
                    {data.candidate.name}
                  </p>
                  <p className="text-sm text-[#F6EBD4]/80 font-serif mt-1">
                    {data.candidate.status}
                  </p>
                  <p className="text-xs text-[#DCA543] font-serif italic mt-0.5">
                    {data.candidate.university}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] text-[#F6EBD4]/40 uppercase tracking-widest block font-bold mb-1.5">
                    Dossier Issue Date
                  </span>
                  <p className="text-sm font-serif font-medium text-[#F6EBD4]/90">
                    {data.candidate.reportDate}
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-6 md:border-l md:border-white/10 md:pl-10 lg:pl-16">
                <div>
                  <span className="text-[10px] text-[#F6EBD4]/40 uppercase tracking-widest block font-bold mb-1.5">
                    Prepared By
                  </span>
                  <p className="text-sm sm:text-base font-serif font-medium text-[#F6EBD4]/90 leading-relaxed">
                    {data.candidate.preparedBy}
                  </p>
                  <p className="text-xs text-[#F6EBD4]/50 font-serif italic mt-1.5">
                    Office of Psychometric Design, EpicQuest Learning LLP
                  </p>
                </div>

                <div className="pt-5 border-t border-white/5 flex items-center gap-3">
                  <Award className="w-5 h-5 text-[#DCA543] shrink-0" />
                  <p className="text-xs text-[#F6EBD4]/60 leading-relaxed">
                    This diagnostic dossier represents a core strategic framework utilized to design competitive university portfolios for elite applicants.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* SECTION 2 — EXECUTIVE SUMMARY */}
        {data.advancedAnalytics && (
          <section className="w-full bg-[#FDFBF7] py-6 sm:py-8 page-break border-b border-[#4A4333]/10">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
              {/* Report Summary Card */}
              <div className="bg-[#F6EBD4] rounded-2xl border border-[#DCA543]/30 shadow-sm print-card px-6 py-5 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
                <h3 className="text-lg font-serif font-bold text-[#403011] lg:border-r lg:border-[#4A4333]/10 lg:pr-10 shrink-0">
                  Executive Summary
                </h3>
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  <div>
                    <span className="text-[9px] text-[#4A4333]/60 uppercase tracking-widest font-bold block mb-1">Primary Mode</span>
                    <span className="text-sm font-serif font-bold text-[#403011]">{data.primaryType.code} - {data.primaryType.name.split(' ')[0]}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-[#4A4333]/60 uppercase tracking-widest font-bold block mb-1">Style Code</span>
                    <span className="text-sm font-serif font-bold text-[#403011]">{data.advancedAnalytics.combinedStyleCode}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-[#4A4333]/60 uppercase tracking-widest font-bold block mb-1">Strength Level</span>
                    <span className="text-sm font-serif font-bold text-[#403011]">{data.advancedAnalytics.personalityStrength.level}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-[#4A4333]/60 uppercase tracking-widest font-bold block mb-1">Top Career Match</span>
                    <span className="text-sm font-serif font-bold text-[#403011]">{data.advancedAnalytics.careerFits[0]?.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}


        {/* SECTION 3 — PRIMARY TYPE HERO */}
        <section className="w-full bg-[#FDFBF7] py-12 sm:py-16 page-break">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

              {/* Left Column: Intro */}
              <div className="lg:w-5/12 flex flex-col gap-6">
                <span className="inline-block uppercase tracking-[0.18em] text-[9px] font-bold text-[#DCA543] bg-[#DCA543]/10 px-3.5 py-1.5 rounded-full border border-[#DCA543]/20 select-none">
                  PRIMARY TYPE PROFILE
                </span>

                <div>
                  <h2 className="text-4xl sm:text-5xl font-serif font-medium text-[#403011] leading-[1.08] tracking-tight animate-fade-up">
                    You are an{" "}
                    <span className="relative inline-block text-[#5C7146] mt-2 mb-1">
                      <span className="relative z-10 font-serif">{data.primaryType.name}</span>
                    </span>{" "}<WavyUnderline> Type</WavyUnderline>
                  </h2>

                  <div className="flex flex-wrap items-center gap-2 mt-6">
                    {data.primaryType.labels.map((lbl, idx) => (
                      <span
                        key={lbl}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${idx === 0
                            ? "bg-[#DCA543] text-[#1F2C16] border-[#DCA543]"
                            : "bg-[#DCA543]/10 text-[#403011] border-[#DCA543]/25"
                          }`}
                      >
                        {idx === 0 && <UserCheck className="w-3.5 h-3.5" />}
                        {lbl}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-lg text-[#4A4333] font-serif leading-relaxed border-l-2 border-[#DCA543] pl-5 italic mt-2">
                  "{data.primaryType.description}"
                </p>
              </div>

              {/* Right Column: Traits & Dual Panel */}
              <div className="lg:w-7/12 flex flex-col gap-6 w-full lg:sticky lg:top-24 lg:self-start">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-6 bg-white rounded-2xl border border-[#5C7146]/15 shadow-sm">
                    <span className="inline-flex items-center gap-2 text-[#5C7146] font-bold uppercase text-[10px] tracking-wider mb-3">
                      <span className="h-1.5 w-1.5 bg-[#5C7146] rounded-full" />
                      At Their Best
                    </span>
                    <p className="text-sm text-[#4A4333] font-serif leading-relaxed">
                      {data.primaryType.atTheirBest}
                    </p>
                  </div>

                  <div className="p-6 bg-white rounded-2xl border border-[#D4856A]/15 shadow-sm">
                    <span className="inline-flex items-center gap-2 text-[#D4856A] font-bold uppercase text-[10px] tracking-wider mb-3">
                      <span className="h-1.5 w-1.5 bg-[#D4856A] rounded-full" />
                      Potential Weakness
                    </span>
                    <p className="text-sm text-[#4A4333] font-serif leading-relaxed">
                      {data.primaryType.potentialWeakness}
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#4A4333]/10 shadow-sm mt-2">
                  <span className="block text-[10px] text-[#4A4333]/60 uppercase tracking-widest font-bold mb-4">
                    PRIMARY BEHAVIORAL DESCRIPTORS ({data.primaryType.traitPills.length})
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {data.primaryType.traitPills.map((pill) => (
                      <span
                        key={pill}
                        className="inline-block px-3.5 py-1.5 bg-[#F6EBD4]/50 hover:bg-[#DCA543] hover:text-[#1F2C16] border border-[#4A4333]/10 rounded-full text-xs font-bold text-[#403011] transition-colors cursor-default select-none"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 — FRAMEWORK OVERVIEW & 2D MATRIX GRID */}
        <section className="w-full bg-[#FDFBF7] py-12 sm:py-16 border-b border-[#4A4333]/10 relative z-10 page-break">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

            {/* Left Plot Box */}
            <div className="lg:col-span-6 flex flex-col gap-5 p-6 bg-white rounded-2xl border border-[#4A4333]/8 shadow-sm relative overflow-hidden print-card">

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#4A4333]/8 pb-3">
                <div>
                  <span className="uppercase tracking-[0.18em] text-[9px] font-bold text-[#DCA543] bg-[#DCA543]/10 px-2.5 py-1 rounded">
                    2D COORDINATES
                  </span>
                  <h2 className="text-xl font-serif font-medium text-[#403011] mt-1.5">
                    The <WavyUnderline>Gunaity Epicometer™</WavyUnderline>
                  </h2>
                </div>
                <span className="text-[10px] text-[#4A4333]/65 font-serif italic select-none">
                  Mapped Psychometric Matrix
                </span>
              </div>

              {/* Coordinate Grid Container */}
              <div className="relative w-full aspect-square bg-[#FBF9F2] rounded-xl border border-[#4A4333]/10 overflow-hidden flex items-center justify-center p-4 select-none shadow-inner">

                <svg className="w-full h-full" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Concentric grid rings */}
                  <circle cx="150" cy="150" r="120" stroke="#4A4333" strokeWidth="0.5" strokeOpacity="0.1" />
                  <circle cx="150" cy="150" r="80" stroke="#4A4333" strokeWidth="0.5" strokeOpacity="0.1" strokeDasharray="3 3" />

                  {/* Four Quadrant Sectors — interactive */}
                  {/* D - Top Left */}
                  <g onMouseEnter={() => setHoveredQuadrant("D")} onMouseLeave={() => setHoveredQuadrant(null)} className="cursor-pointer">
                    <path d="M 150 150 L 150 50 A 100 100 0 0 0 50 150 Z" fill="#5C7146" fillOpacity={hoveredQuadrant === "D" ? 1 : 0.85} stroke="#FBF9F2" strokeWidth="4" style={{ transition: "fill-opacity 0.25s ease" }} />
                    <text x="105" y="110" fill="#FFFFFF" fontSize="22" fontFamily="Georgia, serif" fontWeight="bold" textAnchor="middle">D</text>
                  </g>
                  {/* I - Top Right */}
                  <g onMouseEnter={() => setHoveredQuadrant("I")} onMouseLeave={() => setHoveredQuadrant(null)} className="cursor-pointer">
                    <path d="M 150 150 L 250 150 A 100 100 0 0 0 150 50 Z" fill="#DCA543" fillOpacity={hoveredQuadrant === "I" ? 1 : 0.85} stroke="#FBF9F2" strokeWidth="4" style={{ transition: "fill-opacity 0.25s ease" }} />
                    <text x="195" y="110" fill="#FFFFFF" fontSize="22" fontFamily="Georgia, serif" fontWeight="bold" textAnchor="middle">I</text>
                  </g>
                  {/* S - Bottom Right */}
                  <g onMouseEnter={() => setHoveredQuadrant("S")} onMouseLeave={() => setHoveredQuadrant(null)} className="cursor-pointer">
                    <path d="M 150 150 L 150 250 A 100 100 0 0 0 250 150 Z" fill="#D4856A" fillOpacity={hoveredQuadrant === "S" ? 1 : 0.85} stroke="#FBF9F2" strokeWidth="4" style={{ transition: "fill-opacity 0.25s ease" }} />
                    <text x="195" y="200" fill="#FFFFFF" fontSize="22" fontFamily="Georgia, serif" fontWeight="bold" textAnchor="middle">S</text>
                  </g>
                  {/* C - Bottom Left */}
                  <g onMouseEnter={() => setHoveredQuadrant("C")} onMouseLeave={() => setHoveredQuadrant(null)} className="cursor-pointer">
                    <path d="M 150 150 L 50 150 A 100 100 0 0 0 150 250 Z" fill="#5D7A8C" fillOpacity={hoveredQuadrant === "C" ? 1 : 0.85} stroke="#FBF9F2" strokeWidth="4" style={{ transition: "fill-opacity 0.25s ease" }} />
                    <text x="105" y="200" fill="#FFFFFF" fontSize="22" fontFamily="Georgia, serif" fontWeight="bold" textAnchor="middle">C</text>
                  </g>

                  {/* Outer Quadrant Labels */}
                  <text x="80" y="44" fill="#5C7146" fontSize="9" fontFamily="Georgia, serif" fontWeight="bold" textAnchor="end">DRIVE</text>
                  <text x="220" y="44" fill="#DCA543" fontSize="9" fontFamily="Georgia, serif" fontWeight="bold" textAnchor="start">INFLUENCE</text>
                  <text x="220" y="262" fill="#D4856A" fontSize="9" fontFamily="Georgia, serif" fontWeight="bold" textAnchor="start">SUPPORT</text>
                  <text x="80" y="262" fill="#5D7A8C" fontSize="9" fontFamily="Georgia, serif" fontWeight="bold" textAnchor="end">CLARITY</text>

                  {/* Axes lines with arrows */}
                  {/* Vertical Axis (Active - Receptive) */}
                  <line x1="150" y1="20" x2="150" y2="280" stroke="#4A4333" strokeWidth="1.5" strokeOpacity="0.4" />
                  <polygon points="150,15 146,23 154,23" fill="#4A4333" fillOpacity="0.5" />
                  <polygon points="150,285 146,277 154,277" fill="#4A4333" fillOpacity="0.5" />

                  {/* Horizontal Axis (Agreeable - Skeptical) */}
                  <line x1="20" y1="150" x2="280" y2="150" stroke="#4A4333" strokeWidth="1.5" strokeOpacity="0.4" />
                  <polygon points="285,150 277,146 277,154" fill="#4A4333" fillOpacity="0.5" />
                  <polygon points="15,150 23,146 23,154" fill="#4A4333" fillOpacity="0.5" />

                  {/* Axis labels */}
                  <text x="150" y="10" fill="#4A4333" fontSize="8" fontWeight="bold" letterSpacing="1" textAnchor="middle">ACTIVE</text>
                  <text x="150" y="297" fill="#4A4333" fontSize="8" fontWeight="bold" letterSpacing="1" textAnchor="middle">RECEPTIVE</text>
                  <text x="295" y="153" fill="#4A4333" fontSize="8" fontWeight="bold" letterSpacing="1" textAnchor="start">A</text>
                  <text x="5" y="153" fill="#4A4333" fontSize="8" fontWeight="bold" letterSpacing="1" textAnchor="end">S</text>
                </svg>

                {/* Quadrant Hover Tooltip */}
                {hoveredQuadrant && (() => {
                  const quadrantData: Record<string, { name: string; color: string; top?: string; bottom?: string; left?: string; right?: string; traits: string; careers: string }> = {
                    D: { name: "Drive (Assertive)", color: "#5C7146", top: "15%", left: "6%", traits: "Decisive · Action-Oriented · Competitive · Results-Driven", careers: "Entrepreneurship, Management, Law, Strategy" },
                    I: { name: "Influence (Hustler)", color: "#DCA543", top: "15%", right: "6%", traits: "Enthusiastic · Persuasive · Inspiring · Collaborative", careers: "Sales, Marketing, Media, PR, Performing Arts" },
                    S: { name: "Support (Helper)", color: "#D4856A", bottom: "15%", right: "6%", traits: "Empathetic · Dependable · Patient · Team-Builder", careers: "Healthcare, Education, Social Work, HR" },
                    C: { name: "Clarity (Intellectual)", color: "#5D7A8C", bottom: "15%", left: "6%", traits: "Analytical · Detail-Focused · Systematic · Quality-Driven", careers: "STEM, Research, Finance, Data Science" },
                  };
                  const q = quadrantData[hoveredQuadrant];
                  const isUserQuadrant = data.primaryType.code === hoveredQuadrant;
                  const score = data.advancedAnalytics?.behavioralCapabilities.find(c => c.code === hoveredQuadrant)?.score;
                  return (
                    <div
                      className="absolute z-30 w-48 bg-white/95 backdrop-blur-md rounded-xl border shadow-xl p-3.5 pointer-events-none"
                      style={{
                        borderColor: q.color + "40",
                        top: q.top,
                        bottom: q.bottom,
                        left: q.left,
                        right: q.right,
                        animation: "fadeIn 0.2s ease forwards"
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: q.color }} />
                        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: q.color }}>{q.name}</span>
                      </div>
                      {isUserQuadrant && (
                        <span className="inline-block text-[8px] font-bold uppercase tracking-wider bg-[#DCA543] text-[#1F2C16] px-2 py-0.5 rounded mb-2">Your Type</span>
                      )}
                      <p className="text-[9px] text-[#4A4333]/80 leading-relaxed mb-2 font-medium">{q.traits}</p>
                      <div className="border-t border-[#4A4333]/8 pt-2 mt-1">
                        <span className="text-[8px] text-[#4A4333]/50 font-bold uppercase tracking-wider block mb-0.5">Best-Fit Careers</span>
                        <span className="text-[9px] text-[#403011] font-medium">{q.careers}</span>
                      </div>
                      {score !== undefined && (
                        <div className="mt-2 pt-2 border-t border-[#4A4333]/8">
                          <div className="flex items-center justify-between text-[9px] mb-1">
                            <span className="text-[#4A4333]/50 font-bold uppercase tracking-wider">Your Score</span>
                            <span className="font-bold" style={{ color: q.color }}>{score}%</span>
                          </div>
                          <div className="h-1.5 bg-[#F6EBD4] rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${score}%`, backgroundColor: q.color }} />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Pulsating Coordinate Marker */}
                <div
                  className="absolute z-20 flex items-center justify-center animate-fade-in"
                  style={{
                    bottom: animating ? `${data.foundationScores.pacePosture.active}%` : "50%",
                    left: animating ? `${data.foundationScores.orientation.agreeable}%` : "50%",
                    transform: "translate(-50%, 50%)"
                  }}
                >
                  <span className="absolute h-12 w-12 bg-[#DCA543]/15 rounded-full animate-ping pointer-events-none" />
                  <span className="absolute h-8 w-8 bg-[#DCA543]/30 rounded-full animate-pulse pointer-events-none" />
                  <div className="relative bg-white rounded-full p-1.5 shadow-lg border-[1.5px] border-[#DCA543] cursor-pointer group z-10">
                    <Lightbulb className="w-4 h-4 text-[#DCA543]" strokeWidth={2.5} />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-52 bg-[#1F2C16] text-[#FDFBF7] rounded-xl p-3 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-3.5 h-3.5 text-[#DCA543]" />
                        <span className="text-[10px] font-bold">{data.candidate.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <span className="text-[8px] font-bold uppercase tracking-wider text-[#DCA543] bg-[#DCA543]/15 px-2 py-0.5 rounded">{data.primaryType.code} — {data.primaryType.name.split('(')[0].trim()}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[9px] border-t border-white/10 pt-2">
                        <div>
                          <span className="block text-[#FDFBF7]/50 font-bold uppercase tracking-wider text-[8px] mb-0.5">Agreeableness</span>
                          <span className="font-bold text-[#DCA543]">{data.foundationScores.orientation.agreeable}%</span>
                        </div>
                        <div>
                          <span className="block text-[#FDFBF7]/50 font-bold uppercase tracking-wider text-[8px] mb-0.5">Activity Level</span>
                          <span className="font-bold text-[#DCA543]">{data.foundationScores.pacePosture.active}%</span>
                        </div>
                      </div>
                      <p className="text-[8px] text-[#FDFBF7]/60 leading-relaxed mt-2 border-t border-white/10 pt-2">
                        This marker shows where you sit on the behavioral matrix based on your pace and orientation scores.
                      </p>
                      <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2.5 h-2.5 bg-[#1F2C16] rotate-45 rounded-sm" />
                    </div>
                  </div>
                </div>

              </div>

              <p className="text-[10px] text-[#4A4333]/65 font-serif leading-relaxed text-center italic border-t border-[#4A4333]/5 pt-2">
                *The diagnostic grid maps behavioral tendency as a precise visual vector coordinate.
              </p>
            </div>

            {/* Right Quadrants Cards */}
            <div className="lg:col-span-6 flex flex-col gap-5 p-6 bg-[#FDFBF7] rounded-2xl border border-[#4A4333]/8 shadow-sm print-card lg:sticky lg:top-24 lg:self-start">
              <div>
                <span className="uppercase tracking-[0.18em] text-[9px] font-bold text-[#566544] bg-[#566544]/10 px-3.5 py-1.5 rounded-full">
                  FRAMEWORK CORE
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#403011] mt-3 mb-2">
                  The Four Quadrants
                </h3>
                <p className="text-xs sm:text-sm text-[#4A4333] font-serif leading-relaxed">
                  {data.framework.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {data.framework.styles.map((style) => {
                  const isHighlight = style.code === data.primaryType.code;
                  const IconComp = style.code === "D" ? Target : style.code === "I" ? Sparkles : style.code === "S" ? Compass : FileText;
                  return (
                    <div
                      key={style.code}
                      className={`p-4 rounded-xl border transition-all duration-300 ${isHighlight
                          ? "bg-[#DCA543]/8 border-[#DCA543] shadow-sm relative overflow-hidden"
                          : "bg-white border-[#4A4333]/8"
                        }`}
                    >
                      {isHighlight && (
                        <div className="absolute top-0 right-0 w-6 h-6 bg-[#DCA543] text-[#1F2C16] flex items-center justify-center rounded-bl-lg select-none">
                          <Sparkles className="w-3 h-3" />
                        </div>
                      )}
                      <div className="flex items-center gap-2.5">
                        <span className={`h-6 w-6 rounded-md flex items-center justify-center text-xs font-bold uppercase ${style.code === "D" ? "bg-[#5C7146]/20 text-[#5C7146]" :
                            style.code === "I" ? "bg-[#DCA543]/20 text-[#DCA543]" :
                              style.code === "S" ? "bg-[#D4856A]/20 text-[#D4856A]" :
                                "bg-[#5D7A8C]/20 text-[#5D7A8C]"
                          }`}>
                          <IconComp className="w-3 h-3" />
                        </span>
                        <h4 className="font-serif font-bold text-sm text-[#403011]">
                          {style.name}
                        </h4>
                      </div>
                      <p className="text-[10px] sm:text-[11px] text-[#4A4333]/80 font-serif leading-relaxed mt-2">
                        {style.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Foundation Scores */}
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mt-12">
            <div className="bg-white rounded-3xl border border-[#4A4333]/8 shadow-sm p-6 sm:p-8 print-card">

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#4A4333]/8 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-4 h-4 text-[#DCA543] shrink-0" />
                  <h3 className="font-serif font-bold text-lg text-[#403011]">Foundation Scores</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#5C7146] font-bold uppercase tracking-wider bg-[#5C7146]/10 px-2 py-0.5 rounded border border-[#5C7146]/20">
                    {data.foundationScores.pacePosture.active >= 50 ? "Active" : "Receptive"}
                  </span>
                  <span className="text-[#4A4333]/30">×</span>
                  <span className="text-[10px] text-[#DCA543] font-bold uppercase tracking-wider bg-[#DCA543]/10 px-2 py-0.5 rounded border border-[#DCA543]/20">
                    {data.foundationScores.orientation.agreeable >= 50 ? "Agreeable" : "Skeptical"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
                {/* Pace & Posture */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs font-bold text-[#403011]">
                    <span>ACTIVE: {data.foundationScores.pacePosture.active}%</span>
                    <span>RECEPTIVE: {data.foundationScores.pacePosture.receptive}%</span>
                  </div>
                  <div className="h-4 w-full bg-[#F6EBD4] rounded-full overflow-hidden flex border border-[#4A4333]/10 shadow-inner">
                    <div
                      className="h-full bg-[#5C7146] transition-all duration-[1200ms] ease-out-back flex items-center justify-end px-2 text-[9px] font-bold text-white"
                      style={{ width: animating ? `${data.foundationScores.pacePosture.active}%` : "0%" }}
                    >
                      {animating && `${data.foundationScores.pacePosture.active}%`}
                    </div>
                    <div
                      className="h-full bg-[#EAE5D9] transition-all duration-[1200ms] ease-out-back flex items-center justify-start px-2 text-[9px] font-bold text-[#403011]"
                      style={{ width: animating ? `${data.foundationScores.pacePosture.receptive}%` : "0%" }}
                    >
                      {animating && `${data.foundationScores.pacePosture.receptive}%`}
                    </div>
                  </div>
                  <p className="text-xs text-[#4A4333]/80 font-serif italic leading-relaxed border-l-2 border-[#5C7146] pl-3">
                    "{data.foundationScores.pacePosture.insight}"
                  </p>
                </div>

                {/* Orientation */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs font-bold text-[#403011]">
                    <span>AGREEABLE: {data.foundationScores.orientation.agreeable}%</span>
                    <span>SKEPTICAL: {data.foundationScores.orientation.skeptical}%</span>
                  </div>
                  <div className="h-4 w-full bg-[#F6EBD4] rounded-full overflow-hidden flex border border-[#4A4333]/10 shadow-inner">
                    <div
                      className="h-full bg-[#DCA543] transition-all duration-[1200ms] ease-out-back flex items-center justify-end px-2 text-[9px] font-bold text-[#1F2C16]"
                      style={{ width: animating ? `${data.foundationScores.orientation.agreeable}%` : "0%" }}
                    >
                      {animating && `${data.foundationScores.orientation.agreeable}%`}
                    </div>
                    <div
                      className="h-full bg-[#E0DDD5] transition-all duration-[1200ms] ease-out-back flex items-center justify-start px-2 text-[9px] font-bold text-[#4A4333]"
                      style={{ width: animating ? `${data.foundationScores.orientation.skeptical}%` : "0%" }}
                    >
                      {animating && `${data.foundationScores.orientation.skeptical}%`}
                    </div>
                  </div>
                  <p className="text-xs text-[#4A4333]/80 font-serif italic leading-relaxed border-l-2 border-[#DCA543] pl-3">
                    "{data.foundationScores.orientation.insight}"
                  </p>
                </div>
              </div>

              {/* Combined Result */}
              <div className="mt-6 pt-4 border-t border-[#4A4333]/8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-4 h-4 text-[#DCA543] shrink-0" />
                  <div>
                    <p className="text-[9px] text-[#4A4333]/50 font-bold uppercase tracking-wider">Combined Result</p>
                    <p className="text-sm font-serif font-bold text-[#403011]">{data.foundationScores.combinedResult.formula}</p>
                  </div>
                </div>
                <div className="px-5 py-2 bg-[#DCA543] text-[#1F2C16] rounded-full text-[11px] font-bold uppercase tracking-widest shadow-sm">
                  {data.foundationScores.combinedResult.type}
                </div>
              </div>

            </div>
          </div>

        </section>

        {/* SECTION 6 — ADVANCED PERSONALITY ANALYTICS */}
        {data.advancedAnalytics && (
          <section className="w-full bg-[#FDFBF7] py-20 sm:py-28 page-break border-t border-[#4A4333]/10">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col gap-16">

              <div className="max-w-3xl">
                <span className="uppercase tracking-[0.18em] text-[9px] font-bold text-[#DCA543] bg-[#DCA543]/10 border border-[#DCA543]/20 px-3.5 py-1.5 rounded-full mb-4 inline-block select-none">
                  ADVANCED PERSONALITY ANALYTICS
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#403011] leading-tight mt-1 mb-3">
                  Behavioral <WavyUnderline>Capability Profile</WavyUnderline>
                </h2>
                <p className="text-sm sm:text-base text-[#4A4333] font-serif leading-relaxed">
                  A granular breakdown of the intensity of {data.candidate.name}'s behavioral modes.
                </p>
              </div>

              {/* Behavioral Capabilities — 2×2 Grid with vertical bars */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data.advancedAnalytics.behavioralCapabilities.map((cap) => {
                  const color = cap.code === "D" ? "#5C7146" : cap.code === "I" ? "#DCA543" : cap.code === "S" ? "#D4856A" : "#5D7A8C";
                  const isPrimary = cap.code === data.primaryType.code;
                  return (
                    <div
                      key={cap.code}
                      className={`relative p-5 rounded-2xl border flex flex-col items-center gap-4 print-card transition-all duration-300 ${isPrimary
                          ? "bg-white border-[#DCA543] shadow-md"
                          : "bg-white border-[#4A4333]/8 shadow-sm hover:shadow-md"
                        }`}
                    >
                      {isPrimary && (
                        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest bg-[#DCA543] text-[#1F2C16] px-2.5 py-0.5 rounded-full shadow-sm whitespace-nowrap">
                          Primary
                        </span>
                      )}

                      {/* Rank badge */}
                      <span className="text-[11px] uppercase font-bold tracking-widest text-[#4A4333]/70">Rank {cap.rank}</span>

                      {/* Vertical bar chart */}
                      <div className="relative w-full flex justify-center">
                        <div className="w-14 h-28 bg-[#F6EBD4] rounded-lg overflow-hidden flex flex-col justify-end border border-[#4A4333]/5">
                          <div
                            className="w-full rounded-t-md transition-all duration-1000 ease-out-back"
                            style={{
                              height: animating ? `${cap.score}%` : "0%",
                              backgroundColor: color,
                            }}
                          />
                        </div>
                      </div>

                      {/* Score */}
                      <span className="text-3xl font-serif font-bold" style={{ color }}>{cap.score}</span>

                      {/* Name */}
                      <div className="text-center">
                        <h4 className="font-serif font-bold text-base text-[#403011] leading-tight">{cap.name}</h4>
                        <p className="text-xs text-[#4A4333] font-serif mt-1.5 leading-relaxed">{cap.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Combined Style + Personality Strength */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {/* Combined Style */}
                <div className="md:col-span-3 p-6 bg-[#1F2C16] text-[#F6EBD4] rounded-2xl print-dark-section border border-white/5 flex items-center gap-6">
                  <div className="shrink-0 h-16 w-16 rounded-xl bg-[#DCA543]/15 border border-[#DCA543]/25 flex items-center justify-center">
                    <span className="text-2xl font-serif font-bold text-[#DCA543]">{data.advancedAnalytics.combinedStyleCode}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] text-[#DCA543] uppercase tracking-widest font-bold block">Combined Style</span>
                    <p className="text-sm font-serif text-white/90 mt-1 leading-relaxed">{data.advancedAnalytics.combinedStyleExplanation}</p>
                    <span className="text-xs text-white/60 mt-1.5 block">{data.advancedAnalytics.primaryStyle} + {data.advancedAnalytics.secondaryStyle}</span>
                  </div>
                </div>

                {/* Personality Strength */}
                <div className="md:col-span-2 p-6 bg-white rounded-2xl border border-[#4A4333]/8 shadow-sm flex items-center gap-5 print-card">
                  {/* Circular score indicator */}
                  <div className="shrink-0 relative h-16 w-16">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                      <circle cx="18" cy="18" r="15.5" fill="none" stroke="#F6EBD4" strokeWidth="3" />
                      <circle
                        cx="18" cy="18" r="15.5" fill="none"
                        stroke={
                          data.advancedAnalytics.personalityStrength.level === "Very Strong" ? "#5C7146" :
                            data.advancedAnalytics.personalityStrength.level === "Strong" ? "#DCA543" :
                              data.advancedAnalytics.personalityStrength.level === "Moderate" ? "#D4856A" : "#5D7A8C"
                        }
                        strokeWidth="3" strokeLinecap="round"
                        strokeDasharray={`${Math.min(100, data.advancedAnalytics.personalityStrength.score * 2.5) * 0.974} 97.4`}
                        className="transition-all duration-1000 ease-out-back"
                        style={{ strokeDasharray: animating ? `${Math.min(100, data.advancedAnalytics.personalityStrength.score * 2.5) * 0.974} 97.4` : "0 97.4" }}
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-lg font-serif font-bold text-[#403011]">{data.advancedAnalytics.personalityStrength.score}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] text-[#4A4333]/70 uppercase tracking-widest font-bold block">Strength</span>
                    <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${data.advancedAnalytics.personalityStrength.level === "Very Strong" ? "bg-[#5C7146]/15 text-[#5C7146]" :
                        data.advancedAnalytics.personalityStrength.level === "Strong" ? "bg-[#DCA543]/15 text-[#DCA543]" :
                          data.advancedAnalytics.personalityStrength.level === "Moderate" ? "bg-[#D4856A]/15 text-[#D4856A]" :
                            "bg-[#5D7A8C]/15 text-[#5D7A8C]"
                      }`}>
                      {data.advancedAnalytics.personalityStrength.level}
                    </span>
                    <p className="text-xs text-[#4A4333] font-serif mt-1.5 leading-relaxed">{data.advancedAnalytics.personalityStrength.explanation}</p>
                  </div>
                </div>
              </div>

              {/* Career Fit Engine — Leaderboard Style */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#403011] leading-tight">
                      Career Alignment Report
                    </h3>
                    <p className="text-sm text-[#4A4333] font-serif leading-relaxed mt-1">
                      Distance-based similarity scoring against archetypal career profiles.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-wider shrink-0">
                    <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#5C7146]" />Strong Fit</span>
                    <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#DCA543]" />Moderate</span>
                    <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#D4856A]" />Low Fit</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-[#4A4333]/8 shadow-sm overflow-hidden print-card">
                  {data.advancedAnalytics.careerFits.map((fit, idx) => {
                    const barColor =
                      fit.colorStatus === "Green" ? "#5C7146" :
                        fit.colorStatus === "Orange" ? "#DCA543" :
                          fit.colorStatus === "Yellow" ? "#DCA543" :
                            "#D4856A";

                    const isTop3 = idx < 3;

                    return (
                      <div
                        key={fit.name}
                        className={`flex items-center gap-4 px-5 sm:px-6 py-3 transition-colors ${idx !== (data.advancedAnalytics?.careerFits.length ?? 0) - 1 ? "border-b border-[#4A4333]/6" : ""
                          } ${isTop3 ? "bg-white" : "bg-[#F6EBD4]/30"}`}
                      >
                        {/* Rank */}
                        <span className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold ${idx === 0 ? "bg-[#5C7146] text-white shadow-sm" :
                            idx === 1 ? "bg-[#DCA543]/20 text-[#DCA543]" :
                              idx === 2 ? "bg-[#D4856A]/15 text-[#D4856A]" :
                                "bg-[#4A4333]/8 text-[#4A4333]/60"
                          }`}>
                          {idx + 1}
                        </span>

                        {/* Name */}
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-serif font-bold leading-tight ${isTop3 ? "text-base text-[#403011]" : "text-sm text-[#4A4333]"}`}>
                            {fit.name}
                          </h4>
                        </div>

                        {/* Bar + Percentage */}
                        <div className="hidden sm:flex items-center gap-3 w-48 shrink-0">
                          <div className="flex-1 h-2.5 bg-[#F6EBD4] rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-1000 ease-out-back"
                              style={{ width: animating ? `${fit.fitPercentage}%` : "0%", backgroundColor: barColor }}
                            />
                          </div>
                          <span className={`text-sm font-bold font-serif w-10 text-right ${isTop3 ? "text-[#403011]" : "text-[#4A4333]/70"}`}>
                            {fit.fitPercentage}%
                          </span>
                        </div>

                        {/* Mobile percentage */}
                        <span className="sm:hidden text-base font-serif font-bold text-[#403011]">{fit.fitPercentage}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 7 — STRENGTHS vs BLIND SPOTS */}
        <section className="w-full bg-[#F6EBD4] py-12 sm:py-16 border-t border-b border-[#4A4333]/10 page-break">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

            <div className="max-w-2xl mb-8">
              <span className="inline-block uppercase tracking-[0.18em] text-[9px] font-bold text-[#DCA543] bg-[#DCA543]/12 px-3.5 py-1.5 rounded-full border border-[#DCA543]/20 select-none">
                COMPETENCY MATRIX
              </span>
              <h2 className="text-3xl font-serif font-medium text-[#403011] tracking-tight mt-3">
                Strengths &amp; <WavyUnderline>Blind Spots</WavyUnderline>
              </h2>
              <p className="text-sm text-[#4A4333] font-serif mt-1">
                A precise breakdown of {data.candidate.name}'s core strengths and actionable growth areas.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

              {/* Strengths Card */}
              <div className="p-6 bg-[#1F2C16] text-[#F6EBD4] rounded-2xl border border-white/5 shadow-sm print-dark-section">
                <div className="flex items-center gap-3 border-b border-white/10 pb-3 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-[#DCA543]" />
                  <h3 className="font-serif font-bold text-lg text-white">Top Strengths &amp; Talents</h3>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
                  {data.strengthsAndBlindSpots.strengths.map((str, idx) => (
                    <li key={str} className="flex gap-2.5 items-start text-xs sm:text-sm font-serif text-white/90">
                      <span className="text-[#DCA543]/60 font-bold text-[10px] mt-0.5">{idx + 1}.</span> {str}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Blind Spots Card */}
              <div className="p-6 bg-[#F9ECE8] rounded-2xl border border-[#D4856A]/20 shadow-sm print-card">
                <div className="flex items-center gap-3 border-b border-[#D4856A]/15 pb-3 mb-4">
                  <AlertCircle className="w-5 h-5 text-[#D4856A]" />
                  <h3 className="font-serif font-bold text-lg text-[#403011]">Growth Areas &amp; Vulnerabilities</h3>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
                  {data.strengthsAndBlindSpots.blindSpots.map((blind, idx) => (
                    <li key={blind} className="flex gap-2.5 items-start text-xs sm:text-sm font-serif text-[#403011]/90">
                      <span className="text-[#D4856A]/60 font-bold text-[10px] mt-0.5">{idx + 1}.</span> {blind}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 8 — STYLE DEPTH (Soft White) */}
        <section className="w-full bg-[#FDFBF7] py-12 sm:py-16 page-break">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

            <div className="mb-8 max-w-2xl">
              <span className="inline-block uppercase tracking-[0.18em] text-[9px] font-bold text-[#DCA543] bg-[#DCA543]/10 px-3.5 py-1.5 rounded-full border border-[#DCA543]/20 select-none">
                STYLE ADAPTABILITY
              </span>
              <h2 className="text-3xl font-serif font-medium text-[#403011] tracking-tight mt-3">
                Style <WavyUnderline>Adaptability Profile</WavyUnderline>
              </h2>
              <p className="text-sm text-[#4A4333] font-serif mt-1">
                Adaptability levels and mental energy expenditure across each behavior mode.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">

              {/* Core */}
              <div className="p-5 bg-white rounded-2xl border border-[#DCA543]/60 shadow-sm flex flex-col print-card">
                <span className="text-[9px] text-[#DCA543] font-bold uppercase tracking-wider block mb-1">
                  {data.styleDepth.core.status}
                </span>
                <h3 className="font-serif font-bold text-base text-[#403011] mb-2">{data.styleDepth.core.name}</h3>
                <p className="text-xs text-[#4A4333]/90 font-serif leading-relaxed flex-1">
                  {data.styleDepth.core.description}
                </p>
                <div className="mt-4 pt-3 border-t border-[#4A4333]/5 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#DCA543]" />
                  <span className="text-[9px] text-[#4A4333]/60 uppercase font-bold">Natural Default</span>
                </div>
              </div>

              {/* Helper 1 */}
              <div className="p-5 bg-white rounded-2xl border border-[#4A4333]/10 shadow-sm flex flex-col print-card">
                <span className="text-[9px] text-[#4A4333]/50 font-bold uppercase tracking-wider block mb-1">
                  {data.styleDepth.helper1.status}
                </span>
                <h3 className="font-serif font-bold text-base text-[#403011] mb-2">{data.styleDepth.helper1.name}</h3>
                <p className="text-xs text-[#4A4333]/80 font-serif leading-relaxed flex-1">
                  {data.styleDepth.helper1.description}
                </p>
                <div className="mt-4 pt-3 border-t border-[#4A4333]/5 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#5C7146]" />
                  <span className="text-[9px] text-[#4A4333]/60 uppercase font-bold">Strategic Helper</span>
                </div>
              </div>

              {/* Helper 2 */}
              <div className="p-5 bg-white rounded-2xl border border-[#4A4333]/10 shadow-sm flex flex-col print-card">
                <span className="text-[9px] text-[#4A4333]/50 font-bold uppercase tracking-wider block mb-1">
                  {data.styleDepth.helper2.status}
                </span>
                <h3 className="font-serif font-bold text-base text-[#403011] mb-2">{data.styleDepth.helper2.name}</h3>
                <p className="text-xs text-[#4A4333]/80 font-serif leading-relaxed flex-1">
                  {data.styleDepth.helper2.description}
                </p>
                <div className="mt-4 pt-3 border-t border-[#4A4333]/5 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4856A]" />
                  <span className="text-[9px] text-[#4A4333]/60 uppercase font-bold">Secondary Helper</span>
                </div>
              </div>

              {/* Challenge */}
              <div className="p-5 bg-[#F9ECE8]/40 rounded-2xl border border-[#D4856A]/25 shadow-sm flex flex-col print-card">
                <span className="text-[9px] text-[#D4856A] font-bold uppercase tracking-wider block mb-1">
                  {data.styleDepth.challenge.status}
                </span>
                <h3 className="font-serif font-bold text-base text-[#403011] mb-2">{data.styleDepth.challenge.name}</h3>
                <p className="text-xs text-[#4A4333]/90 font-serif leading-relaxed flex-1">
                  {data.styleDepth.challenge.description}
                </p>
                <div className="mt-4 pt-3 border-t border-[#D4856A]/15 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4856A] animate-pulse" />
                  <span className="text-[9px] text-[#D4856A] uppercase font-bold">High Energy Effort</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 9 — WORKPLACE & ENVIRONMENTAL ANALYSIS */}
        <section className="w-full bg-[#F6EBD4] py-16 sm:py-24 border-b border-[#4A4333]/10 page-break">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

            <div className="max-w-3xl mb-10">
              <span className="uppercase tracking-[0.18em] text-[9px] font-bold text-[#566544] bg-[#566544]/10 px-3.5 py-1.5 rounded-full inline-block border border-[#566544]/20 select-none">
                ENVIRONMENTAL ANALYSIS
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#403011] tracking-tight leading-tight mt-4">
                Environmental <WavyUnderline>Descriptors</WavyUnderline>
              </h2>
              <p className="text-sm sm:text-base text-[#4A4333] font-serif mt-2 leading-relaxed">
                Comparison detailing descriptions most likely and least likely to describe {data.candidate.name}'s actions, alongside the specific environments where they thrive or struggle.
              </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">

              {/* Left: Descriptor Table */}
              <div className="w-full bg-[#FDFBF7] rounded-3xl border border-[#4A4333]/8 shadow-sm overflow-hidden print-card flex flex-col xl:sticky xl:top-24 xl:self-start">
                <div className="grid grid-cols-2 bg-[#1F2C16] text-[#F6EBD4] font-bold text-xs sm:text-sm uppercase tracking-widest print-dark-section border-b border-[#4A4333]/10 shrink-0">
                  <div className="p-4 sm:p-5 border-r border-white/10 flex items-center justify-between">
                    <span>More Likely</span>
                    <span className="text-[#DCA543]">✦</span>
                  </div>
                  <div className="p-4 sm:p-5 flex items-center justify-between">
                    <span>Less Likely</span>
                    <span className="text-[#D4856A]">✦</span>
                  </div>
                </div>

                <div className="divide-y divide-[#4A4333]/8 flex-1 overflow-auto">
                  {Array.from({ length: Math.max(data.workplaceDescriptorTable.moreLikely.length, data.workplaceDescriptorTable.lessLikely.length) }).map((_, idx) => (
                    <div key={idx} className="grid grid-cols-2 text-xs sm:text-sm font-serif leading-relaxed hover:bg-[#F6EBD4]/20 transition-colors duration-150">
                      <div className="p-4.5 border-r border-[#4A4333]/8 text-[#403011] flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#5C7146] shrink-0" />
                        <span className="font-semibold">{data.workplaceDescriptorTable.moreLikely[idx] || ""}</span>
                      </div>
                      <div className="p-4.5 text-[#4A4333]/65 flex items-center gap-3">
                        <AlertCircle className="w-4 h-4 text-[#D4856A] shrink-0" />
                        <span>{data.workplaceDescriptorTable.lessLikely[idx] || ""}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Environments Grid */}
              <div className="flex flex-col gap-6">

                {/* Thrive */}
                <div className="p-6 sm:p-8 bg-white rounded-3xl border border-[#5C7146]/15 shadow-sm flex flex-col justify-between print-card flex-1">
                  <div>
                    <div className="flex items-center gap-3 border-b border-[#4A4333]/10 pb-4 mb-5">
                      <span className="h-7 w-7 rounded-lg bg-[#5C7146]/10 text-[#5C7146] border border-[#5C7146]/15 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                      <h3 className="font-serif font-bold text-lg text-[#403011]">
                        Environments They Thrive In
                      </h3>
                    </div>
                    <div className="flex flex-col gap-3.5">
                      {data.situations.thrive.map((s, idx) => (
                        <div key={idx} className="flex gap-3.5 items-start">
                          <span className="text-[#5C7146] shrink-0 mt-0.5 select-none">
                            <CheckCircle2 className="w-4 h-4" />
                          </span>
                          <p className="text-sm text-[#4A4333] font-serif leading-relaxed">
                            {s}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Difficult */}
                <div className="p-6 sm:p-8 bg-white rounded-3xl border border-[#D4856A]/15 shadow-sm flex flex-col justify-between print-card flex-1">
                  <div>
                    <div className="flex items-center gap-3 border-b border-[#4A4333]/10 pb-4 mb-5">
                      <span className="h-7 w-7 rounded-lg bg-[#D4856A]/10 text-[#D4856A] border border-[#D4856A]/15 flex items-center justify-center shrink-0">
                        <AlertCircle className="w-4 h-4" />
                      </span>
                      <h3 className="font-serif font-bold text-lg text-[#403011]">
                        Situations They Find Difficult
                      </h3>
                    </div>
                    <div className="flex flex-col gap-3.5">
                      {data.situations.difficult.map((s, idx) => (
                        <div key={idx} className="flex gap-3.5 items-start">
                          <span className="text-[#D4856A] shrink-0 mt-0.5 select-none">
                            <AlertCircle className="w-4 h-4" />
                          </span>
                          <p className="text-sm text-[#4A4333] font-serif leading-relaxed">
                            {s}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* SECTION 10 — PROFESSION SUITABILITY ASSESSMENT */}
        <section className="w-full bg-[#FDFBF7] py-16 sm:py-24 border-b border-[#4A4333]/10 page-break">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

            {/* Section Header */}
            <div className="max-w-3xl mb-10">
              <span className="inline-block uppercase tracking-[0.18em] text-[9px] font-bold text-[#DCA543] bg-[#DCA543]/10 px-3.5 py-1.5 rounded-full border border-[#DCA543]/20 select-none">
                PROFESSION SUITABILITY
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#403011] tracking-tight leading-tight mt-4">
                Profession <WavyUnderline>Suitability Assessment</WavyUnderline>
              </h2>
              <p className="text-sm sm:text-base text-[#4A4333] font-serif mt-2 leading-relaxed">
                Select a current or target profession to see how your DISC profile aligns with its behavioral demands.
              </p>
            </div>

            {/* Profession Dropdown Selector */}
            <div className="mb-10 max-w-md">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#4A4333]/70 block mb-2">
                Select Profession
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfDropdownOpen(prev => !prev)}
                  className="w-full flex items-center justify-between gap-3 bg-white border border-[#4A4333]/15 rounded-xl py-3.5 px-5 text-sm font-serif text-[#403011] hover:border-[#DCA543] focus:outline-none focus:border-[#566544] focus:ring-1 focus:ring-[#566544] transition-all cursor-pointer shadow-sm"
                >
                  <span className="flex items-center gap-2.5">
                    <Briefcase className="w-4 h-4 text-[#DCA543]" />
                    {selectedProfession || "Choose a profession..."}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-[#4A4333]/50 transition-transform duration-200 ${profDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {profDropdownOpen && (
                  <div className="absolute z-50 mt-2 w-full bg-white border border-[#4A4333]/15 rounded-xl shadow-lg max-h-64 overflow-y-auto">
                    {professionProfilesConfig.profiles.map((prof) => (
                      <button
                        key={prof.name}
                        type="button"
                        onClick={() => handleProfessionSelect(prof.name)}
                        className={`w-full text-left px-5 py-3 text-sm font-serif hover:bg-[#F6EBD4]/60 transition-colors cursor-pointer flex items-center justify-between border-b border-[#4A4333]/5 last:border-b-0 ${selectedProfession === prof.name
                            ? 'bg-[#566544]/5 text-[#566544] font-bold'
                            : 'text-[#403011]'
                          }`}
                      >
                        <span>{prof.name}</span>
                        {selectedProfession === prof.name && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#566544]" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Suitability Results */}
            {suitabilityResult && (
              <div className="flex flex-col gap-8">

                {/* Fit Overview Card */}
                <div className="bg-white rounded-3xl border border-[#4A4333]/8 shadow-sm overflow-hidden print-card">
                  <div className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">

                    {/* Fit Percentage Gauge */}
                    <div className="flex flex-col items-center gap-3 shrink-0 lg:border-r lg:border-[#4A4333]/8 lg:pr-10">
                      <div className={`relative w-28 h-28 rounded-full flex items-center justify-center border-4 ${suitabilityResult.fitPercentage >= 80 ? 'border-[#5C7146]' :
                          suitabilityResult.fitPercentage >= 70 ? 'border-[#DCA543]' :
                            suitabilityResult.fitPercentage >= 55 ? 'border-[#DCA543]/60' :
                              'border-[#D4856A]'
                        }`}>
                        {/* Background ring */}
                        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 120 120">
                          <circle cx="60" cy="60" r="52" fill="none" stroke="#F6EBD4" strokeWidth="6" />
                          <circle
                            cx="60" cy="60" r="52" fill="none"
                            stroke={suitabilityResult.fitPercentage >= 80 ? '#5C7146' : suitabilityResult.fitPercentage >= 70 ? '#DCA543' : suitabilityResult.fitPercentage >= 55 ? '#DCA543' : '#D4856A'}
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeDasharray={`${(suitabilityResult.fitPercentage / 100) * 327} 327`}
                            className="transition-all duration-1000 ease-out"
                          />
                        </svg>
                        <div className="relative z-10 flex flex-col items-center">
                          <span className="text-3xl font-serif font-bold text-[#403011]">{suitabilityResult.fitPercentage}%</span>
                          <span className="text-[8px] font-bold uppercase tracking-wider text-[#4A4333]/60">FIT</span>
                        </div>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${suitabilityResult.fitPercentage >= 80 ? 'bg-[#5C7146]/10 text-[#5C7146] border border-[#5C7146]/20' :
                          suitabilityResult.fitPercentage >= 70 ? 'bg-[#DCA543]/10 text-[#DCA543] border border-[#DCA543]/20' :
                            suitabilityResult.fitPercentage >= 55 ? 'bg-[#DCA543]/10 text-[#DCA543]/80 border border-[#DCA543]/15' :
                              'bg-[#D4856A]/10 text-[#D4856A] border border-[#D4856A]/20'
                        }`}>
                        {suitabilityResult.fitClassification}
                      </span>
                    </div>

                    {/* Profession Info */}
                    <div className="flex-1 flex flex-col gap-4">
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#403011] leading-tight">
                          {suitabilityResult.professionName}
                        </h3>
                        <p className="text-xs text-[#4A4333]/70 font-serif mt-1 leading-relaxed">
                          {suitabilityResult.professionDescription}
                        </p>
                      </div>

                      <div className="border-t border-[#4A4333]/8 pt-4">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#DCA543] mb-2">
                          <Zap className="w-3 h-3" />
                          Why This Profession?
                        </span>
                        <p className="text-sm text-[#4A4333] font-serif leading-relaxed">
                          {suitabilityResult.whyThisProfession}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* DISC Comparison Bar */}
                  <div className="border-t border-[#4A4333]/6 px-6 sm:px-8 py-4 bg-[#F6EBD4]/30">
                    <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-wider text-[#4A4333]/50 mb-3 select-none">
                      <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#566544]"></span>Your Profile</span>
                      <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#DCA543]"></span>Profession Ideal</span>
                    </div>
                    <div className="grid grid-cols-4 gap-3 sm:gap-4">
                      {(["D", "I", "S", "C"] as const).map((dim) => {
                        const userVal = suitabilityResult.normalizedUser[dim];
                        const profVal = suitabilityResult.professionProfile[dim];
                        const dimNames = { D: "Drive", I: "Influence", S: "Support", C: "Clarity" };
                        return (
                          <div key={dim} className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-[#403011]">{dim}</span>
                              <span className="text-[9px] text-[#4A4333]/60 font-serif hidden sm:inline">{dimNames[dim]}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                              <div className="h-2 bg-[#F6EBD4] rounded-full overflow-hidden">
                                <div className="h-full bg-[#566544] rounded-full transition-all duration-700" style={{ width: `${userVal}%` }} />
                              </div>
                              <div className="h-2 bg-[#F6EBD4] rounded-full overflow-hidden">
                                <div className="h-full bg-[#DCA543] rounded-full transition-all duration-700" style={{ width: `${profVal}%` }} />
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-[9px] font-serif text-[#4A4333]/60">
                              <span>{userVal}%</span>
                              <span>{profVal}%</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Strengths + Development Areas  */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                  {/* Strengths */}
                  {suitabilityResult.strengths.length > 0 && (
                    <div className="p-6 bg-[#1F2C16] text-[#F6EBD4] rounded-2xl border border-white/5 shadow-sm print-dark-section">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-3 mb-5">
                        <ArrowUpRight className="w-5 h-5 text-[#DCA543]" />
                        <h3 className="font-serif font-bold text-lg text-white">Strengths</h3>
                      </div>
                      <div className="flex flex-col gap-4">
                        {suitabilityResult.strengths.map((s) => (
                          <div key={s.dimension} className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between">
                              <span className="font-serif font-bold text-sm text-white">
                                {s.label} ({s.dimension})
                              </span>
                              <span className="text-[10px] font-bold text-[#DCA543]">
                                +{s.surplus}% surplus
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-white/70 font-serif">
                              <span>You: {s.userScore}%</span>
                              <span className="text-white/30">|</span>
                              <span>Required: {s.requiredScore}%</span>
                            </div>
                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full bg-[#5C7146] rounded-full" style={{ width: `${Math.min(s.userScore, 100)}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Development Areas */}
                  {suitabilityResult.developmentAreas.length > 0 && (
                    <div className="p-6 bg-[#F9ECE8] rounded-2xl border border-[#D4856A]/20 shadow-sm print-card">
                      <div className="flex items-center gap-3 border-b border-[#D4856A]/15 pb-3 mb-5">
                        <ArrowDownRight className="w-5 h-5 text-[#D4856A]" />
                        <h3 className="font-serif font-bold text-lg text-[#403011]">Development Areas</h3>
                      </div>
                      <div className="flex flex-col gap-4">
                        {suitabilityResult.developmentAreas.map((d) => (
                          <div key={d.dimension} className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between">
                              <span className="font-serif font-bold text-sm text-[#403011]">
                                {d.label} ({d.dimension})
                              </span>
                              <span className="text-[10px] font-bold text-[#D4856A]">
                                −{d.deficit}% gap
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-[#403011]/70 font-serif">
                              <span>You: {d.userScore}%</span>
                              <span className="text-[#403011]/30">|</span>
                              <span>Required: {d.requiredScore}%</span>
                            </div>
                            <div className="h-1.5 bg-[#D4856A]/15 rounded-full overflow-hidden">
                              <div className="h-full bg-[#D4856A] rounded-full" style={{ width: `${Math.min(d.userScore, 100)}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Improvement Suggestions */}
                {suitabilityResult.improvementSuggestions.length > 0 && (
                  <div className="bg-white rounded-2xl border border-[#4A4333]/8 shadow-sm p-6 print-card">
                    <div className="flex items-center gap-3 border-b border-[#4A4333]/8 pb-3 mb-5">
                      <Lightbulb className="w-5 h-5 text-[#DCA543]" />
                      <h3 className="font-serif font-bold text-lg text-[#403011]">Improvement Suggestions</h3>
                    </div>
                    <div className="flex flex-col gap-3">
                      {suitabilityResult.improvementSuggestions.map((suggestion, idx) => {
                        const dimNames: Record<string, string> = { D: "Drive", I: "Influence", S: "Support", C: "Clarity" };
                        return (
                          <div key={idx} className="flex gap-3.5 items-start p-4 bg-[#F6EBD4]/30 rounded-xl border border-[#4A4333]/5 hover:bg-[#F6EBD4]/50 transition-colors">
                            <span className={`shrink-0 flex items-center justify-center w-7 h-7 rounded-lg text-[10px] font-bold ${idx === 0 ? 'bg-[#DCA543]/15 text-[#DCA543]' : 'bg-[#4A4333]/8 text-[#4A4333]/60'
                              }`}>
                              {idx + 1}
                            </span>
                            <div className="flex flex-col gap-0.5">
                              <span className="text-[9px] font-bold uppercase tracking-wider text-[#4A4333]/50">
                                {dimNames[suggestion.dimension]} Development
                              </span>
                              <p className="text-sm text-[#403011] font-serif leading-relaxed">
                                {suggestion.title}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Final Recommendation */}
                <div className={`rounded-2xl border shadow-sm overflow-hidden print-card ${suitabilityResult.recommendation.recommended === 'yes'
                    ? 'border-[#5C7146]/20 bg-[#5C7146]/5'
                    : suitabilityResult.recommendation.recommended === 'conditional'
                      ? 'border-[#DCA543]/20 bg-[#DCA543]/5'
                      : 'border-[#D4856A]/20 bg-[#D4856A]/5'
                  }`}>
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <Award className="w-6 h-6 text-[#DCA543]" />
                        <h3 className="font-serif font-bold text-xl text-[#403011]">
                          Recommendation
                        </h3>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${suitabilityResult.recommendation.recommended === 'yes'
                          ? 'bg-[#5C7146] text-white'
                          : suitabilityResult.recommendation.recommended === 'conditional'
                            ? 'bg-[#DCA543] text-[#1F2C16]'
                            : 'bg-[#D4856A] text-white'
                        }`}>
                        {suitabilityResult.recommendation.recommended === 'yes' && <CheckCircle2 className="w-3.5 h-3.5" />}
                        {suitabilityResult.recommendation.recommended === 'conditional' && <AlertCircle className="w-3.5 h-3.5" />}
                        {suitabilityResult.recommendation.recommended === 'no' && <AlertCircle className="w-3.5 h-3.5" />}
                        {suitabilityResult.recommendation.recommended === 'yes' ? 'Recommended' : suitabilityResult.recommendation.recommended === 'conditional' ? 'Consider with Development' : 'Consider Alternatives'}
                      </span>
                    </div>

                    <div className="border-t border-[#4A4333]/8 pt-4">
                      <p className="text-sm font-serif font-bold text-[#403011] mb-1">
                        {suitabilityResult.recommendation.summary}
                      </p>
                      <p className="text-sm text-[#4A4333] font-serif leading-relaxed">
                        {suitabilityResult.recommendation.reason}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>
        </section>

        {/* SECTION 11 — CTA (Karmattitude) */}
        <section className="w-full bg-[#FDFBF7] py-12 sm:py-20 page-break">
          <div className="max-w-4xl mx-auto px-5 sm:px-8">

            <div className="relative bg-[#1F2C16] rounded-[2rem] overflow-hidden shadow-2xl p-8 sm:p-14 text-center flex flex-col items-center border border-[#4A4333]/20">
              {/* Background glowing orbs */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-[#DCA543] opacity-[0.08] rounded-full blur-[60px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#5C7146] opacity-[0.12] rounded-full blur-[50px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center animate-fade-up">
                <span className="uppercase tracking-[0.2em] text-[9px] font-bold text-[#DCA543] bg-[#DCA543]/10 border border-[#DCA543]/20 px-3.5 py-1.5 rounded-full mb-6 inline-block select-none shadow-sm">
                  UPGRADE YOUR DOSSIER
                </span>

                <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-serif font-medium text-white leading-tight mb-4 max-w-lg">
                  Unlock Your <WavyUnderline>Career Map</WavyUnderline>
                </h2>

                <p className="text-sm sm:text-base text-[#F6EBD4]/75 font-serif leading-relaxed max-w-xl mb-8">
                  This dossier currently includes your <strong>Gunaity Personality Assessment</strong>. Take the accompanying <strong>Karmattitude™ Framework</strong> test to discover your precise alignment across six professional domains and receive tailored career matches.
                </p>

                <button className="group relative bg-[#DCA543] hover:bg-white text-[#1F2C16] font-bold uppercase tracking-[0.1em] text-xs px-8 py-4 rounded-full shadow-[0_0_20px_rgba(220,165,67,0.25)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 flex items-center gap-3 no-print overflow-hidden">
                  <span className="relative z-10">Start Assessment</span>
                  <Target className="w-4 h-4 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </button>

                <p className="text-[9px] text-[#F6EBD4]/30 mt-6 uppercase tracking-[0.15em] font-bold print-only hidden">
                  Contact your administrator to unlock this module.
                </p>
              </div>
            </div>

          </div>
        </section>

      </div>

    </main>
  );
}
