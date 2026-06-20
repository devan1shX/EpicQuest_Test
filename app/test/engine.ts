// Types matching the Page and API schema
import { careerProfiles } from "./careerProfiles";
export interface Candidate {
  name: string;
  status: string;
  university: string;
  reportDate: string;
  preparedBy: string;
}

export interface Style {
  code: string;
  name: string;
  description: string;
}

export interface Framework {
  name: string;
  description: string;
  styles: Style[];
}

export interface PacePostureScore {
  active: number;
  receptive: number;
  insight: string;
}

export interface OrientationScore {
  agreeable: number;
  skeptical: number;
  insight: string;
}

export interface FoundationScores {
  pacePosture: PacePostureScore;
  orientation: OrientationScore;
  combinedResult: {
    formula: string;
    type: string;
  };
}

export interface PrimaryType {
  code: string;
  name: string;
  labels: string[];
  description: string;
  atTheirBest: string;
  potentialWeakness: string;
  traitPills: string[];
}

export interface WorkplacePriority {
  title: string;
  description: string;
}

export interface Situations {
  thrive: string[];
  difficult: string[];
}

export interface StrengthsAndBlindSpots {
  strengths: string[];
  blindSpots: string[];
}

export interface StyleDepthItem {
  code: string;
  name: string;
  status: string;
  description: string;
}

export interface StyleDepth {
  core: StyleDepthItem;
  helper1: StyleDepthItem;
  helper2: StyleDepthItem;
  challenge: StyleDepthItem;
}

export interface WorkplaceDescriptorTable {
  moreLikely: string[];
  lessLikely: string[];
}

export interface CareerDomain {
  id: string;
  title: string;
  description: string;
}

export interface CareerMap {
  introduction: string;
  domains: CareerDomain[];
}

export interface Closing {
  headline: string;
  body: string;
  ctaButton1: string;
  ctaButton2: string;
}

export interface Branding {
  company: string;
  address: string;
  phone: string;
  email: string;
  tagline: string;
}

export interface BehavioralCapability {
  code: "D" | "I" | "S" | "C";
  name: string;
  score: number;
  description: string;
  rank: number;
}

export interface CareerFitResult {
  name: string;
  fitPercentage: number;
  colorStatus: "Green" | "Orange" | "Yellow" | "Red";
  description: string;
}

export interface PersonalityStrength {
  score: number;
  level: "Mild" | "Moderate" | "Strong" | "Very Strong";
  explanation: string;
}

export interface AdvancedAnalytics {
  behavioralCapabilities: BehavioralCapability[];
  primaryStyle: string;
  secondaryStyle: string;
  combinedStyleCode: string;
  combinedStyleExplanation: string;
  personalityStrength: PersonalityStrength;
  careerFits: CareerFitResult[];
}

export interface ReportData {
  candidate: Candidate;
  framework: Framework;
  foundationScores: FoundationScores;
  primaryType: PrimaryType;
  workplacePriorities: WorkplacePriority[];
  situations: Situations;
  strengthsAndBlindSpots: StrengthsAndBlindSpots;
  styleDepth: StyleDepth;
  workplaceDescriptorTable: WorkplaceDescriptorTable;
  careerMap: CareerMap;
  closing: Closing;
  branding: Branding;
  advancedAnalytics?: AdvancedAnalytics;
}

export interface AdjectivePairQuestion {
  id: string;
  left: string;
  right: string;
}

export interface SingleTraitQuestion {
  id: string;
  text: string;
}

export interface ForcedChoiceQuestion {
  id: string;
  text: string;
  opt1: string;
  opt2: string;
}

// 24 bipolar semantic-differential adjective pairs (Images 1, 2, 3)
export const adjectivePairsList: AdjectivePairQuestion[] = [
  // Block 1 (Image 1)
  { id: "q1", left: "Open", right: "Skeptical" },
  { id: "q2", left: "Cheerful", right: "Methodical" },
  { id: "q3", left: "Reserved", right: "Dynamic" },
  { id: "q4", left: "Humble", right: "Bold" },
  { id: "q5", left: "Generous", right: "Strict" },
  { id: "q6", left: "Lively", right: "Systematic" },
  { id: "q7", left: "Obedient", right: "Outspoken" },
  { id: "q8", left: "Modest", right: "Challenging" },

  // Block 2 (Image 2)
  { id: "q9", left: "Helpful", right: "Resolute" },
  { id: "q10", left: "Enthusiastic", right: "Accurate" },
  { id: "q11", left: "Compliant", right: "Enterprising" },
  { id: "q12", left: "Gentle", right: "Direct" },
  { id: "q13", left: "Accommodating", right: "Firm" },
  { id: "q14", left: "Playful", right: "Analytical" },
  { id: "q15", left: "Tactful", right: "Expressive" },
  { id: "q16", left: "Even-Tempered", right: "Tough" },

  // Block 3 (Image 3)
  { id: "q17", left: "Accepting", right: "Matter-of-Fact" },
  { id: "q18", left: "Optimistic", right: "Perfectionistic" },
  { id: "q19", left: "Quiet", right: "Charismatic" },
  { id: "q20", left: "Obliging", right: "Assertive" },
  { id: "q21", left: "Trusting", right: "Questioning" },
  { id: "q22", left: "Light-Hearted", right: "Precise" },
  { id: "q23", left: "Cautious", right: "Adventurous" },
  { id: "q24", left: "Receptive", right: "Decisive" }
];

// 8 single adjective rating scales (Image 4)
export const singleTraitsList: SingleTraitQuestion[] = [
  { id: "q25", text: "Agreeable" },
  { id: "q26", text: "Daring" },
  { id: "q27", text: "Sociable" },
  { id: "q28", text: "Dominant" },
  { id: "q29", text: "Patient" },
  { id: "q30", text: "Soft-Spoken" },
  { id: "q31", text: "Detail-Oriented" },
  { id: "q32", text: "Competitive" }
];

// 6 binary forced choice questions (Image 5)
export const forcedChoicesList: ForcedChoiceQuestion[] = [
  {
    id: "q33",
    text: "In a group, I am...",
    opt1: "Likely to speak up",
    opt2: "Likely to stay quiet and listen"
  },
  {
    id: "q34",
    text: "On a team project, I am most concerned with...",
    opt1: "Getting things done correctly and efficiently",
    opt2: "Making sure the people involved are engaged and supported"
  },
  {
    id: "q35",
    text: "I am most comfortable...",
    opt1: "Taking command to make a decision",
    opt2: "Letting others make the final decision"
  },
  {
    id: "q36",
    text: "When giving feedback to someone, I focus on...",
    opt1: "Motivating the person and letting them know they’re appreciated",
    opt2: "Being accurate and factual about the person's performance"
  },
  {
    id: "q37",
    text: "I am most attracted to...",
    opt1: "Work I can do alone",
    opt2: "Work that requires lots of interaction with others"
  },
  {
    id: "q38",
    text: "When someone presents a plan, I'm more likely to...",
    opt1: "Analyze and point out the flaws in the plan",
    opt2: "Think about how I can be helpful in making the plan happen"
  }
];

// Profile templates matching each primary style
const templates: Record<"D" | "I" | "S" | "C", Omit<ReportData, "candidate" | "foundationScores" | "styleDepth">> = {
  D: {
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
    primaryType: {
      code: "D",
      name: "Drive (Assertive)",
      labels: ["The Commander", "The Visionary Founder", "The Results Architect"],
      description: "Assertive, strong-willed, and highly results-oriented. Uses logic and force of will to overcome obstacles. Enjoys rising to difficult challenges, taking direct command, and steering projects toward tangible outcomes. Natural efficiency and high agency create environments focused on directness, milestones, and high expectations.",
      atTheirBest: "High-agency, highly decisive, competitive, and action-oriented. Infuses an intense sense of focus and momentum into team deliverables.",
      potentialWeakness: "Can be seen as impatient, demanding, overly direct, and skeptical of others' caution. May overlook emotional nuances or slow down to seek team consensus.",
      traitPills: ["Assertive", "Competitive", "Results-oriented", "Decisive", "Direct", "Impatient", "Self-reliant", "Skeptical", "High-agency", "Forceful"]
    },
    workplacePriorities: [
      { title: "Achieving Results", description: "Hitting project milestones ahead of schedule, setting clear boundaries, and driving execution without micromanagement." },
      { title: "Challenging the Status Quo", description: "Questioning traditional processes, introducing disruptive innovations, and encouraging bold, rapid calculated risks." },
      { title: "Maintaining High Standards", description: "Enforcing absolute accountability in group members, maintaining quality benchmarks, and avoiding consensus-induced compromises." }
    ],
    situations: {
      thrive: [
        "Fast-paced, competitive, and highly strategic workplaces",
        "Roles that grant autonomy and clear, bottom-line decision-making authority",
        "Applied entrepreneurial projects where speed and risk-taking are rewarded",
        "Environments with flat hierarchies that appreciate raw competence over seniority",
        "Milestone-focused environments with immediate, measurable feedback loops"
      ],
      difficult: [
        "Highly bureaucratic, slow-paced, and rule-bound institutions",
        "Roles with low autonomy that require waiting for constant administrative approvals",
        "Vague, unstructured settings with no clear goals or performance metrics",
        "Settings requiring excessive compromises or handling high emotional sensitivities",
        "Highly repetitive, low-agency operational tasks with little challenge"
      ]
    },
    strengthsAndBlindSpots: {
      strengths: [
        "Decisive decision-making",
        "Initiating action",
        "Setting high expectations",
        "Taking charge under stress",
        "Focusing on the big picture",
        "Driving team accountability",
        "Negotiating assertively",
        "Overcoming obstacles",
        "Thriving in competition",
        "Fostering transparency",
        "Leading change"
      ],
      blindSpots: [
        "Being patient with others",
        "Listening to advice",
        "Showing empathy under stress",
        "Handling repetitive tasks",
        "Building consensus slowly",
        "Accepting standard boundaries",
        "Detailed, methodical checking",
        "Delegating authority easily",
        "Validating others' opinions",
        "Communicating supportively",
        "Avoiding impulse steps"
      ]
    },
    workplaceDescriptorTable: {
      moreLikely: ["Assertive & decisive", "Results-driven", "Competitive", "Comfortable with conflict", "Spontaneous & high-agency", "Goal-oriented", "Independent", "Skeptical & analytical", "Direct communicator"],
      lessLikely: ["Patient", "Empathetic listener", "Modest & consensus-driven", "Methodical & cautious", "Soft-spoken", "Compliant with rigid rules", "Comfortable in routine", "Highly cooperative", "Tactful"]
    },
    careerMap: {
      introduction: "As a Drive type, you naturally excel in domains demanding high strategic vision, executive presence, and the management of competitive risks.",
      domains: [
        { id: "01", title: "Entrepreneurship & Venture Capital", description: "Founding startups, negotiating terms, pitching original ideas, and executing high-growth models match your directness and risk appetite." },
        { id: "02", title: "Applied Science & Patent Engineering", description: "Leading disruptive product developments, filing patents, and solving difficult engineering problems with strict timelines." },
        { id: "03", title: "Investment Banking & Corporate Finance", description: "Thriving in high-stakes negotiations, mergers, valuations, and highly quantitative competitive environments." },
        { id: "04", title: "Law, Policy & Public Leadership", description: "Litigation, political campaign management, and policy advocacy that demand assertive debate and executive decision-making." },
        { id: "05", title: "Strategic Consulting", description: "Re-engineering failing workflows, analyzing high-level risks, and steering large organizations toward massive turnaround goals." },
        { id: "06", title: "Technology Management & Product Design", description: "Steering highly complex product roadmaps and leading engineering teams under strict launch constraints." }
      ]
    },
    closing: {
      headline: "Ready to Build Your Portfolio?",
      body: "Your diagnostic is just the beginning. EpicQuest can design a fully personalised, psychometric-aligned portfolio journey built around your Drive strengths — from applied research to patent incubation.",
      ctaButton1: "Generate Your Ivy League Plan →",
      ctaButton2: "Book Free Consultation"
    },
    branding: {
      company: "EpicQuest Learning LLP",
      address: "8/11, 1st Floor, Sarvapriya Vihar, New Delhi 110016, India",
      phone: "+91 9971125276",
      email: "contact@epicquestlearning.com",
      tagline: "We transform extraordinary high school students into Ivy League-ready candidates through structured research, patent filing, and real-world apprenticeships."
    }
  },
  I: {
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
    primaryType: {
      code: "I",
      name: "Influence (Hustler)",
      labels: ["The Hustler", "The Relationship Builder", "The Energiser"],
      description: "Fast-paced, collaborative, and outgoing. Uses enthusiasm and social charisma to bring people together. Enjoys meeting people, hearing their stories, and sharing excitement for big ideas. Natural energy and optimism create environments where everyone feels included and inspired to take action.",
      atTheirBest: "Upbeat, persuasive, highly expressive, and engaging. Infuses a sense of excitement and infinite possibility into projects.",
      potentialWeakness: "Can be seen as disorganized, overly expressive, in a hurry, and easily distracted. May get bored with repetitive administrative tasks and struggle to pause to assess long-term risks.",
      traitPills: ["Enthusiastic", "Talkative", "Collaborative", "Charming", "Impulsive", "Goal-oriented", "Confident", "Influential", "Optimistic", "Sociable"]
    },
    workplacePriorities: [
      { title: "Relationship Building", description: "Building wide professional networks, regular catch-ups, and fostering highly inclusive environments." },
      { title: "Creative Action", description: "Spotting new opportunities, championing bold untested ideas, and encouraging quick collaborative action." },
      { title: "Inspiring Momentum", description: "Lifting team spirit in tough moments, persuading key stakeholders, and promoting meaningful social change." }
    ],
    situations: {
      thrive: [
        "Fast-paced, creative, and highly innovative workplaces",
        "Roles that involve connecting with, speaking to, and influencing people",
        "Collaborative projects with room for original ideas and fast experimentation",
        "Networking, diplomatic events, and social professional gatherings",
        "Environments that welcome enthusiasm, charisma, and dynamic presentation"
      ],
      difficult: [
        "Slow-paced, steady, and highly traditional working environments",
        "Inflexible rules, rigid procedures, and administrative tape",
        "Extended detailed analysis or very slow, methodical workflows",
        "Isolated tasks with little to no human or team interaction",
        "Colleagues who do not appreciate an effervescent, outspoken style"
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
    }
  },
  S: {
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
    primaryType: {
      code: "S",
      name: "Support (Helper)",
      labels: ["The Guardian", "The Empathetic Anchor", "The Consensus Catalyst"],
      description: "Calm, deliberate, patient, and highly dependable. Uses empathy and active listening to foster deep relational trust. Enjoys helping others succeed, supporting cooperative environments, and organizing steady, systematic progress. Natural loyalty and warm focus create highly stable, safe, and supportive academic settings.",
      atTheirBest: "Patience incarnate, highly supportive, dedicated, and cooperative. Fosters psychological safety and strong consensus in complex team settings.",
      potentialWeakness: "Can be seen as hesitant to embrace sudden changes, overly passive, and reluctant to handle confrontational debates. May put others' comfort ahead of fast milestone execution.",
      traitPills: ["Patient", "Supportive", "Empathetic", "Loyal", "Methodical", "Cooperative", "Calm", "Even-tempered", "Harmonious", "Listener"]
    },
    workplacePriorities: [
      { title: "Fostering Cooperation", description: "Ensuring all voice are heard, maintaining long-term consensus, and resolving micro-conflicts with empathy." },
      { title: "Ensuring Stability", description: "Establishing clear operational bounds, executing steady progress, and avoiding chaotic, unpredictable sprints." },
      { title: "Genuine Helpfulness", description: "Providing mentorship, backing struggling team members, and designing inclusive educational/project setups." }
    ],
    situations: {
      thrive: [
        "Highly collaborative, supportive, and empathetic workspaces",
        "Roles requiring deep-dive listening, mentoring, advisory, or high-trust dynamics",
        "Structured research projects with predictable milestones and clear steps",
        "Environments where consensus and long-term relationships are highly valued",
        "Mission-driven organizations with clear positive social impact parameters"
      ],
      difficult: [
        "Aggressive, highly competitive, or conflict-ridden workplaces",
        "Environments undergoing frequent, chaotic restructuring and shifting goals",
        "Isolated roles requiring zero teamwork or human interaction",
        "Settings requiring blunt, highly critical feedback or direct confrontation",
        "Fast-paced environments with extreme pressure and short, chaotic deadlines"
      ]
    },
    strengthsAndBlindSpots: {
      strengths: [
        "Active listening",
        "Building high trust",
        "Maintaining consensus",
        "Staying calm under pressure",
        "Backing other colleagues",
        "Fostering team harmony",
        "Executing tasks methodically",
        "Developing long-term loyalty",
        "Empathetic advising",
        "Creating inclusive climates",
        "Exhibiting immense patience"
      ],
      blindSpots: [
        "Adapting to sudden changes",
        "Handling aggressive debates",
        "Enforcing strict boundaries",
        "Making hasty decisions",
        "Promoting original ideas loudly",
        "Taking direct command",
        "Giving negative feedback",
        "Thriving under chaotic stress",
        "Challenging authority easily",
        "Handling highly fluid projects",
        "Prioritizing self over team"
      ]
    },
    workplaceDescriptorTable: {
      moreLikely: ["Patient & cooperative", "Calm & even-tempered", "Highly empathetic", "Loyal team member", "Methodical worker", "Excellent listener", "Fosters team consensus", "Approachable", "Reliable in routine"],
      lessLikely: ["Assertive & forceful", "Impatient", "Comfortable with high conflict", "Impulsive & chaotic", "Highly competitive", "Outspoken risk-taker", "Blunt communicator", "Skeptical & challenging", "Direct commander"]
    },
    careerMap: {
      introduction: "As a Support type, you naturally excel in roles centered around team synchronization, social advocacy, human development, and high-trust mentoring.",
      domains: [
        { id: "01", title: "Education, Coaching & Counseling", description: "Mentoring, teaching, educational administration, and academic counseling where empathy and patience are critical." },
        { id: "02", title: "Healthcare & Social Research", description: "Medicine, clinical psychology, public health, and social work where patient care and empathetic listening shine." },
        { id: "03", title: "Human Resources & Team Operations", description: "Managing talent acquisition, designing inclusive team cultures, and mediating conflicts inside organizations." },
        { id: "04", title: "Non-Profit Management & Social Advocacy", description: "Steering mission-driven NGOs, fundraising, and leading community-based cooperative programs." },
        { id: "05", title: "Project Management in R&D", description: "Ensuring steady, predictable delivery of academic research milestones across multidisciplinary labs." },
        { id: "06", title: "Diplomacy & Conflict Resolution", description: "Fostering long-term relationships, international relations, and community mediation setups." }
      ]
    },
    closing: {
      headline: "Ready to Build Your Portfolio?",
      body: "Your diagnostic is just the beginning. EpicQuest can design a fully personalised, psychometric-aligned portfolio journey built around your Support strengths — from applied research to apprenticeships.",
      ctaButton1: "Generate Your Ivy League Plan →",
      ctaButton2: "Book Free Consultation"
    },
    branding: {
      company: "EpicQuest Learning LLP",
      address: "8/11, 1st Floor, Sarvapriya Vihar, New Delhi 110016, India",
      phone: "+91 9971125276",
      email: "contact@epicquestlearning.com",
      tagline: "We transform extraordinary high school students into Ivy League-ready candidates through structured research, patent filing, and real-world apprenticeships."
    }
  },
  C: {
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
    primaryType: {
      code: "C",
      name: "Clarity (Intellectual)",
      labels: ["The Intellectual", "The Deep Researcher", "The Analytical Architect"],
      description: "Analytical, systematic, and highly detail-oriented. Uses logic, objective data, and meticulous planning to achieve extreme precision. Enjoys diving deep into complex cognitive puzzles, independent research, and organizing chaotic details into perfect operational frameworks. Natural intellectual curiosity creates a baseline for elite academic portfolios.",
      atTheirBest: "Precise, highly methodical, objective, and intellectually rigorous. Infuses a deep commitment to technical accuracy and research depth into all projects.",
      potentialWeakness: "Can be seen as overly critical, cautious, slow to act, and isolated. May get lost in 'analysis paralysis' or struggle to communicate concepts with simple enthusiasm.",
      traitPills: ["Analytical", "Precise", "Systematic", "Objective", "Methodical", "Cautious", "Reserved", "Logical", "Independent", "Detail-oriented"]
    },
    workplacePriorities: [
      { title: "Technical Accuracy", description: "Double-checking datasets, verifying references, and maintaining absolute rigor in all academic output." },
      { title: "Intellectual Autonomy", description: "Having the quiet independent workspace to analyze complex problems without constant social interruptions." },
      { title: "Methodical Planning", description: "Drafting complete blueprints, checking prospective risks, and structuring structured milestones before starting." }
    ],
    situations: {
      thrive: [
        "Highly academic, quiet, and intellectually rigorous workspaces",
        "Deep-dive scientific research labs, patent analysis, and quantitative coding setups",
        "Independent projects requiring extreme attention to detail and zero micromanagement",
        "Settings where objective data and logical competence are highly respected",
        "Structured educational settings with clear, analytical guidelines"
      ],
      difficult: [
        "Loud, chaotic, and highly social work environments with constant noise",
        "Projects requiring quick, superficial decisions without data verification",
        "Settings with vague guidelines or emotional, subjective decision-making bases",
        "Highly repetitive group social meetings with no clear technical purpose",
        "Unstructured brainstorming sessions that lack logical follow-through"
      ]
    },
    strengthsAndBlindSpots: {
      strengths: [
        "Rigorous logic and analysis",
        "High attention to detail",
        "Systematic problem solving",
        "Methodical execution",
        "Independent concentration",
        "Verifying source accuracy",
        "Designing logical systems",
        "Drafting technical papers",
        "Objective risk analysis",
        "Uncovering hidden errors",
        "Maintaining high standards"
      ],
      blindSpots: [
        "Making fast decisions",
        "Engaging in small talk",
        "Tolerating loose errors",
        "Expressing ideas enthusiastically",
        "Compromising technical rules",
        "Delegating to unstructured teams",
        "Accepting intuitive reasoning",
        "Coping with sudden chaos",
        "Spontaneous team-building",
        "Simplifying complex insights",
        "Reaching out for help"
      ]
    },
    workplaceDescriptorTable: {
      moreLikely: ["Analytical & logical", "Precise & accurate", "Highly systematic", "Methodical planner", "Independent worker", "Reserved & reflective", "Skeptical of fast claims", "Objective check-oriented", "Quietly concentrated"],
      lessLikely: ["Impulsive & spontaneous", "Outspoken & talkative", "Collaborative without agenda", "Highly emotional", "Comfortable with loose data", "Consensus-focused", "Blunt commander", "Accepting of intuitive ideas", "Loud networker"]
    },
    careerMap: {
      introduction: "As a Clarity type, you naturally excel in highly academic, technical, and data-driven domains requiring strict precision.",
      domains: [
        { id: "01", title: "Advanced STEM & Computer Science", description: "Artificial Intelligence, cryptography, data science, and complex software systems where systematic logical code rules." },
        { id: "02", title: "Applied Scientific Research", description: "Deep academic laboratory fellowships, peer-reviewed journal publishing, and mathematical modelling." },
        { id: "03", title: "Patent Strategy & Technical Law", description: "Analyzing technical intellectual property documents, structuring legal patent files, and technical consulting." },
        { id: "04", title: "Quantitative Finance & Modeling", description: "Equity research, valuation modelling, statistical analysis, and predictive algorithmic trading designs." },
        { id: "05", title: "Policy Design & Economic Modeling", description: "Societal research, econometrics, and drafting legislative frameworks utilizing large empirical datasets." },
        { id: "06", title: "Systems Architecture", description: "Structuring large hardware blueprints, database schema design, and operational pipeline engineering." }
      ]
    },
    closing: {
      headline: "Ready to Build Your Portfolio?",
      body: "Your diagnostic is just the beginning. EpicQuest can design a fully personalised, psychometric-aligned portfolio journey built around your Clarity strengths — from applied research to patent filing.",
      ctaButton1: "Generate Your Ivy League Plan →",
      ctaButton2: "Book Free Consultation"
    },
    branding: {
      company: "EpicQuest Learning LLP",
      address: "8/11, 1st Floor, Sarvapriya Vihar, New Delhi 110016, India",
      phone: "+91 9971125276",
      email: "contact@epicquestlearning.com",
      tagline: "We transform extraordinary high school students into Ivy League-ready candidates through structured research, patent filing, and real-world apprenticeships."
    }
  }
};

// TypeScript Scoring & Compilation Function
export function compileReport(
  name: string,
  status: string,
  university: string,
  answers: Record<string, any>
): ReportData {
  let activeScore = 0;
  let receptiveScore = 0;
  let agreeableScore = 0;
  let skepticalScore = 0;

  // Establish stable base baseline scores to guarxantee no division by zero
  const baseVal = 1;
  activeScore += baseVal;
  receptiveScore += baseVal;
  agreeableScore += baseVal;
  skepticalScore += baseVal;

  // Step 1 to 3: Adjective Pairs (q1 to q24)
  for (let i = 1; i <= 24; i++) {
    const key = `q${i}`;
    const score = Number(answers[key]) || 3; // 1 to 5, default to 3 (neutral)
    const leftWeight = 6 - score;
    const rightWeight = score;

    switch (i) {
      case 1: // Open (Agreeable) vs Skeptical (Skeptical)
        agreeableScore += leftWeight;
        skepticalScore += rightWeight;
        break;
      case 2: // Cheerful (Agreeable/Active) vs Methodical (Skeptical/Receptive)
        agreeableScore += leftWeight;
        activeScore += leftWeight;
        skepticalScore += rightWeight;
        receptiveScore += rightWeight;
        break;
      case 3: // Reserved (Receptive) vs Dynamic (Active)
        receptiveScore += leftWeight;
        activeScore += rightWeight;
        break;
      case 4: // Humble (Receptive/Agreeable) vs Bold (Active)
        receptiveScore += leftWeight;
        agreeableScore += leftWeight;
        activeScore += rightWeight;
        break;
      case 5: // Generous (Agreeable) vs Strict (Skeptical)
        agreeableScore += leftWeight;
        skepticalScore += rightWeight;
        break;
      case 6: // Lively (Active/Agreeable) vs Systematic (Receptive/Skeptical)
        activeScore += leftWeight;
        agreeableScore += leftWeight;
        receptiveScore += rightWeight;
        skepticalScore += rightWeight;
        break;
      case 7: // Obedient (Receptive/Agreeable) vs Outspoken (Active)
        receptiveScore += leftWeight;
        agreeableScore += leftWeight;
        activeScore += rightWeight;
        break;
      case 8: // Modest (Receptive) vs Challenging (Active/Skeptical)
        receptiveScore += leftWeight;
        activeScore += rightWeight;
        skepticalScore += rightWeight;
        break;
      case 9: // Helpful (Agreeable) vs Resolute (Skeptical/Active)
        agreeableScore += leftWeight;
        skepticalScore += rightWeight;
        activeScore += rightWeight;
        break;
      case 10: // Enthusiastic (Active/Agreeable) vs Accurate (Receptive/Skeptical)
        activeScore += leftWeight;
        agreeableScore += leftWeight;
        receptiveScore += rightWeight;
        skepticalScore += rightWeight;
        break;
      case 11: // Compliant (Receptive/Agreeable) vs Enterprising (Active)
        receptiveScore += leftWeight;
        agreeableScore += leftWeight;
        activeScore += rightWeight;
        break;
      case 12: // Gentle (Agreeable) vs Direct (Active)
        agreeableScore += leftWeight;
        activeScore += rightWeight;
        break;
      case 13: // Accommodating (Agreeable) vs Firm (Skeptical)
        agreeableScore += leftWeight;
        skepticalScore += rightWeight;
        break;
      case 14: // Playful (Active/Agreeable) vs Analytical (Receptive/Skeptical)
        activeScore += leftWeight;
        agreeableScore += leftWeight;
        receptiveScore += rightWeight;
        skepticalScore += rightWeight;
        break;
      case 15: // Tactful (Agreeable) vs Expressive (Active/Agreeable)
        agreeableScore += leftWeight;
        activeScore += rightWeight;
        agreeableScore += rightWeight;
        break;
      case 16: // Even-Tempered (Receptive/Agreeable) vs Tough (Active/Skeptical)
        receptiveScore += leftWeight;
        agreeableScore += leftWeight;
        activeScore += rightWeight;
        skepticalScore += rightWeight;
        break;
      case 17: // Accepting (Agreeable) vs Matter-of-Fact (Skeptical)
        agreeableScore += leftWeight;
        skepticalScore += rightWeight;
        break;
      case 18: // Optimistic (Active/Agreeable) vs Perfectionistic (Receptive/Skeptical)
        activeScore += leftWeight;
        agreeableScore += leftWeight;
        receptiveScore += rightWeight;
        skepticalScore += rightWeight;
        break;
      case 19: // Quiet (Receptive) vs Charismatic (Active/Agreeable)
        receptiveScore += leftWeight;
        activeScore += rightWeight;
        agreeableScore += rightWeight;
        break;
      case 20: // Obliging (Agreeable) vs Assertive (Active)
        agreeableScore += leftWeight;
        activeScore += rightWeight;
        break;
      case 21: // Trusting (Agreeable) vs Questioning (Skeptical)
        agreeableScore += leftWeight;
        skepticalScore += rightWeight;
        break;
      case 22: // Light-Hearted (Active/Agreeable) vs Precise (Receptive/Skeptical)
        activeScore += leftWeight;
        agreeableScore += leftWeight;
        receptiveScore += rightWeight;
        skepticalScore += rightWeight;
        break;
      case 23: // Cautious (Receptive/Skeptical) vs Adventurous (Active/Agreeable)
        receptiveScore += leftWeight;
        skepticalScore += leftWeight;
        activeScore += rightWeight;
        agreeableScore += rightWeight;
        break;
      case 24: // Receptive (Receptive) vs Decisive (Active)
        receptiveScore += leftWeight;
        activeScore += rightWeight;
        break;
    }
  }

  // Step 4: Single Traits (q25 to q32)
  for (let i = 25; i <= 32; i++) {
    const key = `q${i}`;
    const score = Number(answers[key]) || 3;

    switch (i) {
      case 25: // Agreeable (Agreeable)
        agreeableScore += score;
        break;
      case 26: // Daring (Active)
        activeScore += score;
        break;
      case 27: // Sociable (Active/Agreeable)
        activeScore += score;
        agreeableScore += score;
        break;
      case 28: // Dominant (Active/Skeptical)
        activeScore += score;
        skepticalScore += score;
        break;
      case 29: // Patient (Receptive/Agreeable)
        receptiveScore += score;
        agreeableScore += score;
        break;
      case 30: // Soft-Spoken (Receptive/Agreeable)
        receptiveScore += score;
        agreeableScore += score;
        break;
      case 31: // Detail-Oriented (Receptive/Skeptical)
        receptiveScore += score;
        skepticalScore += score;
        break;
      case 32: // Competitive (Active/Skeptical)
        activeScore += score;
        skepticalScore += score;
        break;
    }
  }

  // Step 5: Forced Choices (q33 to q38)
  for (let i = 33; i <= 38; i++) {
    const key = `q${i}`;
    const opt = answers[key] || "opt1";

    switch (i) {
      case 33: // In a group, I am...
        if (opt === "opt1") { // Likely to speak up
          activeScore += 5;
        } else { // Likely to stay quiet and listen
          receptiveScore += 5;
        }
        break;
      case 34: // On a team project, I am most concerned with...
        if (opt === "opt1") { // Getting things done correctly and efficiently
          skepticalScore += 5;
        } else { // Making sure the people involved are engaged and supported
          agreeableScore += 5;
        }
        break;
      case 35: // I am most comfortable...
        if (opt === "opt1") { // Taking command to make a decision
          activeScore += 5;
          skepticalScore += 5;
        } else { // Letting others make the final decision
          receptiveScore += 5;
          agreeableScore += 5;
        }
        break;
      case 36: // When giving feedback to someone, I focus on...
        if (opt === "opt1") { // Motivating the person and letting them know they’re appreciated
          agreeableScore += 5;
        } else { // Being accurate and factual about the person's performance
          skepticalScore += 5;
        }
        break;
      case 37: // I am most attracted to...
        if (opt === "opt1") { // Work I can do alone
          receptiveScore += 5;
          skepticalScore += 5;
        } else { // Work that requires lots of interaction with others
          activeScore += 5;
          agreeableScore += 5;
        }
        break;
      case 38: // When someone presents a plan, I'm more likely to...
        if (opt === "opt1") { // Analyze and point out the flaws in the plan
          skepticalScore += 5;
        } else { // Think about how I can be helpful in making the plan happen
          agreeableScore += 5;
        }
        break;
    }
  }

  // Calculate balanced derived scores for Drive, Influence, Support, and Clarity
  // Drive: Active + Skeptical
  // Influence: Active + Agreeable
  // Support: Receptive + Agreeable
  // Clarity: Receptive + Skeptical
  const rawD = Math.round((activeScore + skepticalScore) / 2);
  const rawI = Math.round((activeScore + agreeableScore) / 2);
  const rawS = Math.round((receptiveScore + agreeableScore) / 2);
  const rawC = Math.round((receptiveScore + skepticalScore) / 2);

  const verticalPercent = Math.round((activeScore / (activeScore + receptiveScore)) * 100);
  const horizontalPercent = Math.round((agreeableScore / (agreeableScore + skepticalScore)) * 100);

  // Determine primary quadrant based on X, Y coordinates
  let primaryCode: "D" | "I" | "S" | "C" = "I";
  if (horizontalPercent >= 50 && verticalPercent >= 50) {
    primaryCode = "I";
  } else if (horizontalPercent < 50 && verticalPercent >= 50) {
    primaryCode = "D";
  } else if (horizontalPercent < 50 && verticalPercent < 50) {
    primaryCode = "C";
  } else if (horizontalPercent >= 50 && verticalPercent < 50) {
    primaryCode = "S";
  }

  // Rank categories for Style Adaptability Depth (Core, Helpers, Challenge)
  const categoriesList = [
    { code: "D", score: rawD, name: "Drive/Assertive", description: "Accessible when needed. Can step into decisive, assertive leadership when required — not a natural default. Use strategically.", defaultDesc: "Drive/Assertive mode gives you command ability." },
    { code: "I", score: rawI, name: "Influence/Hustler", description: "Engaging, enthusiastic, persuasive. Reaches out to build excitement. Thrives on human connection. Withers in isolated, impersonal tasks.", defaultDesc: "Influence/Hustler mode builds motivational momentum." },
    { code: "S", score: rawS, name: "Support/Helper", description: "Accessible when needed. Empathy and care manifest as genuine helpfulness in one-on-one or high-trust relationships.", defaultDesc: "Support/Helper mode anchors team harmony." },
    { code: "C", score: rawC, name: "Clarity/Intellectual", description: "Most effortful mode. Precise, systematic, detail-focused work takes the most mental energy. Extended time here may cause stress and motivational dips — but developing this area is meaningful growth.", defaultDesc: "Clarity/Intellectual mode focuses technical precision." }
  ];

  // Sort scores descending
  categoriesList.sort((a, b) => b.score - a.score);

  // Force primary core to match the coordinates-derived primaryCode
  const coreIdx = categoriesList.findIndex((x) => x.code === primaryCode);
  const coreItem = categoriesList.splice(coreIdx, 1)[0]; // Remove core

  // The rest are helper 1, helper 2, and challenge (lowest)
  const challengeItem = categoriesList.pop()!; // Lowest remains challenge
  const helper1Item = categoriesList[0];
  const helper2Item = categoriesList[1];

  // Priority 2: Secondary Style Blend logic
  if ((helper1Item.score - helper2Item.score) < 3) {
    helper1Item.name = `${helper1Item.name.split('/')[0]} / ${helper2Item.name.split('/')[0]} Blend`;
  }

  const styleDepth: StyleDepth = {
    core: {
      code: coreItem.code,
      name: coreItem.name,
      status: "Primary Mode",
      description: coreItem.description
    },
    helper1: {
      code: helper1Item.code,
      name: helper1Item.name,
      status: "Helper Style",
      description: helper1Item.description
    },
    helper2: {
      code: helper2Item.code,
      name: helper2Item.name,
      status: "Helper Style",
      description: helper2Item.description
    },
    challenge: {
      code: challengeItem.code,
      name: challengeItem.name,
      status: "Challenge Style",
      description: challengeItem.description
    }
  };

  // Compile full template
  const tmpl = templates[primaryCode];

  // Formulate text insights matching coordinates
  const pacePostureInsight = verticalPercent >= 50
    ? `Leans decisively Active (${verticalPercent}%) — quick to speak up, ready to lead, comfortable moving fast in group settings.`
    : `Leans decisively Receptive (${100 - verticalPercent}%) — listens thoughtfully, plans systematically, values depth over raw speed.`;

  const orientationInsight = horizontalPercent >= 50
    ? `Primary focus on quality of work relationships and wellbeing of people. Fosters consensus, cooperation and shared enthusiasm (${horizontalPercent}%).`
    : `Primary focus on logical task integrity and objective benchmarks. Prioritizes data precision and skeptical query reviews (${100 - horizontalPercent}%).`;

  const combinedTypeString = primaryCode === "D" ? "Drive / Assertive / Commander"
    : primaryCode === "I" ? "Influence / Hustler / Relationship Builder"
      : primaryCode === "S" ? "Support / Helper / Consensus Anchor"
        : "Clarity / Intellectual / Analytical Architect";

  const foundationScores: FoundationScores = {
    pacePosture: {
      active: verticalPercent,
      receptive: 100 - verticalPercent,
      insight: pacePostureInsight
    },
    orientation: {
      agreeable: horizontalPercent,
      skeptical: 100 - horizontalPercent,
      insight: orientationInsight
    },
    combinedResult: {
      formula: primaryCode === "D" ? `Active (${verticalPercent}%) + Skeptical (${100 - horizontalPercent}%) = Drive` :
        primaryCode === "I" ? `Active (${verticalPercent}%) + Agreeable (${horizontalPercent}%) = Influence` :
          primaryCode === "S" ? `Receptive (${100 - verticalPercent}%) + Agreeable (${horizontalPercent}%) = Support` :
            `Receptive (${100 - verticalPercent}%) + Skeptical (${100 - horizontalPercent}%) = Clarity`,
      type: combinedTypeString
    }
  };

  // Format Dynamic Candidate Metadata
  const candidate: Candidate = {
    name: name.trim() || "Elite Candidate",
    status: status.trim() || "Admissions Candidate",
    university: university.trim() || "Ivy League Aspirant",
    reportDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    preparedBy: "Tilak Mishra, Founder & CEO, EpicQuest Learning (UPenn 2009)"
  };

  // Run dynamic string interpolation across templates text paragraphs to inject name/university
  const processedDescription = tmpl.primaryType.description
    .replace(/\bHetvi\b/g, candidate.name)
    .replace(/\bHetvi's\b/g, `${candidate.name}'s`);

  const processedAtBest = tmpl.primaryType.atTheirBest
    .replace(/\bHetvi\b/g, candidate.name)
    .replace(/\bHetvi's\b/g, `${candidate.name}'s`);

  const processedWeakness = tmpl.primaryType.potentialWeakness
    .replace(/\bHetvi\b/g, candidate.name)
    .replace(/\bHetvi's\b/g, `${candidate.name}'s`);

  const processedWorkplacePriorities = tmpl.workplacePriorities.map((prio) => ({
    title: prio.title,
    description: prio.description
      .replace(/\bHetvi\b/g, candidate.name)
      .replace(/\bHetvi's\b/g, `${candidate.name}'s`)
      .replace(/\bHetvi’s\b/g, `${candidate.name}'s`)
  }));

  const processedSituations = {
    thrive: tmpl.situations.thrive.map((x) =>
      x.replace(/\bHetvi\b/g, candidate.name).replace(/\bHetvi's\b/g, `${candidate.name}'s`)
    ),
    difficult: tmpl.situations.difficult.map((x) =>
      x.replace(/\bHetvi\b/g, candidate.name).replace(/\bHetvi's\b/g, `${candidate.name}'s`)
    )
  };

  const processedCareerMap = {
    introduction: tmpl.careerMap.introduction
      .replace(/\bHetvi\b/g, candidate.name)
      .replace(/\bHetvi's\b/g, `${candidate.name}'s`),
    domains: tmpl.careerMap.domains
  };

  const processedClosing = {
    headline: tmpl.closing.headline,
    body: tmpl.closing.body
      .replace(/\bHetvi\b/g, candidate.name)
      .replace(/\bHetvi's\b/g, `${candidate.name}'s`),
    ctaButton1: tmpl.closing.ctaButton1,
    ctaButton2: tmpl.closing.ctaButton2
  };

  // --- Advanced Analytics Engine ---

  const sortedCapabilities = [
    { code: "D", score: rawD, name: "Drive", description: "Focuses on results, taking action, and asserting influence." },
    { code: "I", score: rawI, name: "Influence", description: "Focuses on relationships, communication, and enthusiasm." },
    { code: "S", score: rawS, name: "Support", description: "Focuses on cooperation, sincerity, and dependability." },
    { code: "C", score: rawC, name: "Clarity", description: "Focuses on quality, accuracy, and systematic processes." }
  ].sort((a, b) => b.score - a.score);

  const behavioralCapabilities: BehavioralCapability[] = sortedCapabilities.map((cap, idx) => ({
    code: cap.code as "D" | "I" | "S" | "C",
    name: cap.name,
    score: cap.score,
    description: cap.description,
    rank: idx + 1
  }));

  const secondaryCode = helper1Item.code;
  const combinedStyleCode = `${primaryCode}${secondaryCode}`;
  let combinedStyleExplanation = `A blend of ${coreItem.name} and ${helper1Item.name}.`;
  if (combinedStyleCode === "DI" || combinedStyleCode === "ID") combinedStyleExplanation = "Results-driven and communicative. Excels at driving change through persuasion and energetic leadership.";
  if (combinedStyleCode === "IS" || combinedStyleCode === "SI") combinedStyleExplanation = "Highly collaborative and empathetic. Thrives in environments where teamwork and relationship building are key.";
  if (combinedStyleCode === "SC" || combinedStyleCode === "CS") combinedStyleExplanation = "Methodical and supportive. Valued for precision, dependability, and maintaining structured, harmonious processes.";
  if (combinedStyleCode === "DC" || combinedStyleCode === "CD") combinedStyleExplanation = "Analytical and decisive. Focuses on objective results, systematic problem-solving, and quality-driven execution.";

  const strengthVal = (Math.abs(verticalPercent - 50) + Math.abs(horizontalPercent - 50)) / 2;
  let strengthLevel: "Mild" | "Moderate" | "Strong" | "Very Strong" = "Mild";
  if (strengthVal >= 30) strengthLevel = "Very Strong";
  else if (strengthVal >= 20) strengthLevel = "Strong";
  else if (strengthVal >= 10) strengthLevel = "Moderate";

  const personalityStrength: PersonalityStrength = {
    score: Math.round(strengthVal),
    level: strengthLevel,
    explanation: `Your distinct behavioral preferences show a ${strengthLevel.toLowerCase()} crystallization, indicating how strongly you default to your primary modes.`
  };

  // --- Normalize DISC Scores for Career Matching ---
  const totalRaw = rawD + rawI + rawS + rawC;
  const normD = Math.round((rawD / totalRaw) * 100);
  const normI = Math.round((rawI / totalRaw) * 100);
  const normS = Math.round((rawS / totalRaw) * 100);
  const normC = Math.round((rawC / totalRaw) * 100);

  console.log(`\n--- DEBUG OUTPUT ---`);
  console.log(`Raw DISC:\nD=${rawD}\nI=${rawI}\nS=${rawS}\nC=${rawC}`);
  console.log(`Normalized DISC:\nD=${normD}\nI=${normI}\nS=${normS}\nC=${normC}`);

  const careerFitsSorted: CareerFitResult[] = careerProfiles.map(c => {
    const diff = Math.abs(normD - c.D) + Math.abs(normI - c.I) + Math.abs(normS - c.S) + Math.abs(normC - c.C);
    const maxDiff = 200; // Since both sum to 100, max possible Manhattan distance is 200
    const fit = Math.round(100 - (diff / maxDiff) * 100);

    console.log(`Career Diff: ${c.name} Diff=${diff}\nCareer Fit=${fit}`);

    let color: "Green" | "Orange" | "Yellow" | "Red" = "Red";
    if (fit >= 80) color = "Green";
    else if (fit >= 70) color = "Orange";
    else if (fit >= 55) color = "Yellow";

    const coreScore = coreItem.code === 'D' ? normD : coreItem.code === 'I' ? normI : coreItem.code === 'S' ? normS : normC;
    // We get the actual code of the secondary style. Since it might be blended (e.g. "Drive / Support Blend"), 
    // we use the original code from helper1Item.code.
    const secScore = helper1Item.code === 'D' ? normD : helper1Item.code === 'I' ? normI : helper1Item.code === 'S' ? normS : normC;

    const coreName = coreItem.name.split('/')[0].trim();
    const secName = helper1Item.name.split('/')[0].trim();

    const careerTraits = [
      { name: 'Drive', score: c.D },
      { name: 'Influence', score: c.I },
      { name: 'Support', score: c.S },
      { name: 'Clarity', score: c.C }
    ].sort((a, b) => b.score - a.score);

    const reqTrait1 = careerTraits[0].name;
    const reqTrait2 = careerTraits[1].name;

    const careerHash = c.name.length + c.D + c.I; // Stable pseudo-random selector

    let description = "";
    if (fit >= 80) {
      const templates = [
        `As a natural in ${coreName}, you possess the high ${reqTrait1} and ${reqTrait2} required to excel in ${c.name}.`,
        `${c.name} heavily relies on ${reqTrait1} and ${reqTrait2}, directly matching your strong ${coreName} (${coreScore}%) profile.`,
        `An excellent match. Your tendency towards ${coreName} provides the foundation needed for the ${reqTrait1}-driven demands of ${c.name}.`,
        `You are exceptionally well-aligned for ${c.name}, as your ${coreName} and ${secName} scores perfectly support its need for ${reqTrait1}.`
      ];
      description = templates[careerHash % templates.length];
    } else if (fit >= 70) {
      const templates = [
        `A solid potential path. ${c.name} values ${reqTrait1}, which resonates reasonably well with your ${coreName} tendencies.`,
        `Your baseline in ${coreName} provides a good starting point for ${c.name}, though you may need to flex your ${reqTrait2} skills.`,
        `${c.name} is a viable option, bridging your natural ${coreName} with the role's demand for ${reqTrait1}.`
      ];
      description = templates[careerHash % templates.length];
    } else if (fit >= 55) {
      const templates = [
        `A moderate fit. ${c.name} demands high ${reqTrait1}, which might require stretching beyond your primary comfort zone of ${coreName}.`,
        `While possible, ${c.name} relies on ${reqTrait1} and ${reqTrait2}, contrasting somewhat with your ${coreName}-heavy profile.`,
        `Succeeding in ${c.name} would require consciously adapting to its ${reqTrait1}-centric environment rather than relying on your natural ${coreName}.`
      ];
      description = templates[careerHash % templates.length];
    } else {
      const templates = [
        `Low alignment. ${c.name} is driven almost entirely by ${reqTrait1} and ${reqTrait2}, diverging sharply from your focus on ${coreName}.`,
        `This path typically demands high ${reqTrait1}, which contradicts your natural behavioral baseline of ${coreName}.`,
        `A challenging fit. The ${reqTrait1}-heavy requirements of ${c.name} do not naturally align with your strong ${coreName} tendencies.`
      ];
      description = templates[careerHash % templates.length];
    }

    return {
      name: c.name,
      fitPercentage: fit,
      colorStatus: color,
      description
    };
  }).sort((a, b) => b.fitPercentage - a.fitPercentage);

  // Keep top 5 best fits + bottom 3 worst fits to show full range
  const topFits = careerFitsSorted.slice(0, 5);
  const bottomFits = careerFitsSorted.slice(-3).filter(f => !topFits.includes(f));
  const careerFits = [...topFits, ...bottomFits];

  const advancedAnalytics: AdvancedAnalytics = {
    behavioralCapabilities,
    primaryStyle: coreItem.name,
    secondaryStyle: helper1Item.name,
    combinedStyleCode,
    combinedStyleExplanation,
    personalityStrength,
    careerFits
  };

  return {
    candidate,
    framework: tmpl.framework,
    foundationScores,
    primaryType: {
      ...tmpl.primaryType,
      description: processedDescription,
      atTheirBest: processedAtBest,
      potentialWeakness: processedWeakness
    },
    workplacePriorities: processedWorkplacePriorities,
    situations: processedSituations,
    strengthsAndBlindSpots: tmpl.strengthsAndBlindSpots,
    styleDepth,
    workplaceDescriptorTable: tmpl.workplaceDescriptorTable,
    careerMap: processedCareerMap,
    closing: processedClosing,
    branding: tmpl.branding,
    advancedAnalytics
  };
}
