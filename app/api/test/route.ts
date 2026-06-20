import { NextResponse } from "next/server";

export async function GET() {
  const reportData = {
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
        {
          code: "D",
          name: "Drive (Assertive)",
          description: "Action-oriented decisive leaders. Take charge, make decisions. Thrive in entrepreneurship, management, competitive environments."
        },
        {
          code: "I",
          name: "Influence (Hustler)",
          description: "Enthusiastic communicators. Inspire and persuade. Excel in sales, marketing, media, PR, performing arts."
        },
        {
          code: "S",
          name: "Support (Helper)",
          description: "Dependable, empathetic team builders. Best for healthcare, education, social work, HR."
        },
        {
          code: "C",
          name: "Clarity (Intellectual)",
          description: "Analytical, detail-focused thinkers. Natural fit for STEM, research, finance, data science."
        }
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
      traitPills: [
        "Enthusiastic", "Talkative", "Collaborative", "Charming", "Impulsive",
        "Goal-oriented", "Confident", "Influential", "Optimistic", "Sociable"
      ]
    },
    workplacePriorities: [
      {
        title: "Relationship Building",
        description: "Building wide professional networks, regular catch-ups, inclusive environments."
      },
      {
        title: "Creative Action",
        description: "Spotting new opportunities, championing bold untested ideas, encouraging quick action."
      },
      {
        title: "Inspiring Momentum",
        description: "Lifting team spirit in tough moments, persuading stakeholders, promoting meaningful change."
      }
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
      core: {
        code: "I",
        name: "Influence/Hustler",
        status: "Primary Mode",
        description: "Engaging, enthusiastic, persuasive. Reaches out to build excitement. Thrives on human connection. Withers in isolated, impersonal tasks. Useful for: teachers, managers, marketing, media, salespeople."
      },
      helper1: {
        code: "D",
        name: "Drive/Assertive",
        status: "Helper Style",
        description: "Accessible when needed. Can step into decisive, assertive leadership when required — not a natural default. Use strategically."
      },
      helper2: {
        code: "S",
        name: "Support/Helper",
        status: "Helper Style",
        description: "Accessible when needed. Empathy and care manifest as genuine helpfulness in one-on-one or high-trust relationships."
      },
      challenge: {
        code: "C",
        name: "Clarity/Intellectual",
        status: "Challenge Style",
        description: "Most effortful mode. Precise, systematic, detail-focused work takes the most mental energy. Extended time here may cause stress and motivational dips — but developing this area is meaningful growth."
      }
    },
    workplaceDescriptorTable: {
      moreLikely: [
        "Enthusiastic",
        "Talkative & expressive",
        "Collaborative",
        "Charming & persuasive",
        "Impulsive & spontaneous",
        "Goal-oriented",
        "Confident",
        "Optimistic",
        "Sociable"
      ],
      lessLikely: [
        "Cautious",
        "Analytical",
        "Organised & systematic",
        "Reflective & measured",
        "Soft-spoken",
        "Self-controlled",
        "Reliable in routine tasks",
        "Detailed & precise",
        "Modest"
      ]
    },
    careerMap: {
      introduction: "As an Influence type, you naturally gravitate toward fields where human connection, communication, and creative energy are core.",
      domains: [
        {
          id: "01",
          title: "Media & Communications",
          description: "Journalism, broadcasting, content creation, PR, and marketing leverage natural expressiveness and ability to connect with audiences at scale."
        },
        {
          id: "02",
          title: "Policy & Public Leadership",
          description: "Advocacy, diplomacy, and public policy offer the stage to persuade, inspire change, and build coalitions around important ideas."
        },
        {
          id: "03",
          title: "Entrepreneurship & Startups",
          description: "Founding, pitching, and team-building demands of startup life are a natural playground for someone with this charisma and bias for action."
        },
        {
          id: "04",
          title: "Education & Mentorship",
          description: "Teaching, coaching, and curriculum design channel enthusiasm to uplift and inspire — creating the inclusive environments they naturally build."
        },
        {
          id: "05",
          title: "Sales & Business Development",
          description: "Persuasiveness, network-building, and optimism are precisely the traits separating exceptional salespeople from average ones."
        },
        {
          id: "06",
          title: "Social Impact & NGOs",
          description: "Mission-driven organisations thrive on people who can mobilise communities and inspire action — a natural fit for the Influence orientation."
        }
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
  };

  return NextResponse.json(reportData);
}
