/**
 * Profession DISC Profiles Configuration
 *
 * Each profession defines an ideal DISC distribution (D + I + S + C = 100)
 * along with dimension-specific labels for contextual strength/development analysis.
 *
 * To add a new profession, simply append to the `profiles` array below.
 * No engine logic changes are required.
 *
 * Future Enhancement:
 * `selectedProfession` can be sourced from a User Profile / login system
 * instead of a manual dropdown selection.
 */

// ─── Interfaces ──────────────────────────────────────────────────────

export interface DimensionContext {
  /** Label shown when user exceeds requirement in this dimension */
  strengthLabel: string;
  /** Label shown when user is below requirement in this dimension */
  developmentLabel: string;
  /** Practical improvement suggestions for this dimension in this profession's context */
  improvements: string[];
}

export interface ProfessionProfile {
  name: string;
  D: number;
  I: number;
  S: number;
  C: number;
  /** Brief description of the profession for UI display */
  description: string;
  /** Dimension-specific context labels for this profession */
  dimensions: {
    D: DimensionContext;
    I: DimensionContext;
    S: DimensionContext;
    C: DimensionContext;
  };
}

export interface ProfessionProfilesConfig {
  version: number;
  lastUpdated: string;
  profiles: ProfessionProfile[];
}

// ─── Configuration ───────────────────────────────────────────────────

export const professionProfilesConfig: ProfessionProfilesConfig = {
  version: 1,
  lastUpdated: "2026-06-06",
  profiles: [
    // ── 1. Teacher ──────────────────────────────────────────────────
    {
      name: "Teacher",
      D: 10, I: 35, S: 40, C: 15,
      description: "Education professionals who inspire, guide, and nurture student development through structured learning environments.",
      dimensions: {
        D: {
          strengthLabel: "Classroom Authority",
          developmentLabel: "Assertive Leadership",
          improvements: [
            "Practice assertive communication techniques for classroom management",
            "Build confidence in leading group discussions and setting clear boundaries"
          ]
        },
        I: {
          strengthLabel: "Student Engagement",
          developmentLabel: "Communication & Enthusiasm",
          improvements: [
            "Join public speaking or storytelling workshops to enhance delivery",
            "Practice creating interactive and engaging lesson presentations"
          ]
        },
        S: {
          strengthLabel: "Empathy & Patience",
          developmentLabel: "Patience & Supportiveness",
          improvements: [
            "Volunteer in mentoring programs to develop active listening skills",
            "Practice patience exercises in high-stress educational scenarios"
          ]
        },
        C: {
          strengthLabel: "Curriculum Precision",
          developmentLabel: "Structured Planning",
          improvements: [
            "Develop systematic lesson planning and assessment design habits",
            "Practice data-driven evaluation of student performance metrics"
          ]
        }
      }
    },

    // ── 2. Software Engineer ────────────────────────────────────────
    {
      name: "Software Engineer",
      D: 10, I: 10, S: 30, C: 50,
      description: "Technical professionals who design, build, and maintain software systems through rigorous analytical problem-solving.",
      dimensions: {
        D: {
          strengthLabel: "Technical Leadership",
          developmentLabel: "Decision-Making Speed",
          improvements: [
            "Practice taking ownership of technical decisions in code reviews",
            "Lead sprint planning sessions to develop directive communication"
          ]
        },
        I: {
          strengthLabel: "Cross-Team Communication",
          developmentLabel: "Stakeholder Communication",
          improvements: [
            "Practice presenting technical concepts to non-technical audiences",
            "Actively participate in stand-ups and cross-functional meetings"
          ]
        },
        S: {
          strengthLabel: "Team Collaboration",
          developmentLabel: "Patience in Collaboration",
          improvements: [
            "Practice pair programming to develop patience and cooperative coding habits",
            "Volunteer to mentor junior developers regularly"
          ]
        },
        C: {
          strengthLabel: "Analytical Precision",
          developmentLabel: "Analytical Rigor",
          improvements: [
            "Dedicate time to code quality through testing and documentation",
            "Practice systematic debugging and root cause analysis methodologies"
          ]
        }
      }
    },

    // ── 3. Data Analyst ─────────────────────────────────────────────
    {
      name: "Data Analyst",
      D: 10, I: 5, S: 25, C: 60,
      description: "Quantitative professionals who extract insights from data through statistical analysis and systematic reporting.",
      dimensions: {
        D: {
          strengthLabel: "Insight-Driven Action",
          developmentLabel: "Proactive Decisiveness",
          improvements: [
            "Practice translating data insights into actionable recommendations",
            "Take initiative in proposing data-driven process improvements"
          ]
        },
        I: {
          strengthLabel: "Data Storytelling",
          developmentLabel: "Presentation Skills",
          improvements: [
            "Practice creating compelling data visualizations and narratives",
            "Develop skills in presenting analytical findings to diverse audiences"
          ]
        },
        S: {
          strengthLabel: "Methodical Consistency",
          developmentLabel: "Process Patience",
          improvements: [
            "Build tolerance for repetitive data cleaning and validation tasks",
            "Develop steady routines for quality assurance in reporting cycles"
          ]
        },
        C: {
          strengthLabel: "Statistical Precision",
          developmentLabel: "Analytical Depth",
          improvements: [
            "Strengthen proficiency in advanced statistical methods and tools",
            "Practice meticulous attention to detail in data validation workflows"
          ]
        }
      }
    },

    // ── 4. Investment Banker ────────────────────────────────────────
    {
      name: "Investment Banker",
      D: 40, I: 25, S: 5, C: 30,
      description: "High-stakes financial professionals who drive transactions, valuations, and strategic advisory in competitive markets.",
      dimensions: {
        D: {
          strengthLabel: "Drive & Ambition",
          developmentLabel: "Assertiveness & Urgency",
          improvements: [
            "Practice leading high-stakes negotiations and deal discussions",
            "Set ambitious personal performance targets with clear timelines"
          ]
        },
        I: {
          strengthLabel: "Client Relationship Building",
          developmentLabel: "Networking & Persuasion",
          improvements: [
            "Attend industry networking events and practice relationship building",
            "Develop persuasive pitch and client presentation skills"
          ]
        },
        S: {
          strengthLabel: "Team Dependability",
          developmentLabel: "Collaborative Patience",
          improvements: [
            "Practice supporting team members during high-pressure deal cycles",
            "Develop patience for collaborative review and feedback processes"
          ]
        },
        C: {
          strengthLabel: "Analytical Rigor",
          developmentLabel: "Quantitative Precision",
          improvements: [
            "Develop proficiency in financial modeling and valuation techniques",
            "Practice attention to detail in due diligence and data analysis"
          ]
        }
      }
    },

    // ── 5. Marketing ────────────────────────────────────────────────
    {
      name: "Marketing",
      D: 20, I: 50, S: 20, C: 10,
      description: "Creative professionals who build brand awareness, drive engagement, and influence consumer behavior through strategic campaigns.",
      dimensions: {
        D: {
          strengthLabel: "Campaign Leadership",
          developmentLabel: "Strategic Decisiveness",
          improvements: [
            "Practice owning campaign strategies from ideation to execution",
            "Develop skills in making fast, data-informed creative decisions"
          ]
        },
        I: {
          strengthLabel: "Creative Communication",
          developmentLabel: "Audience Engagement",
          improvements: [
            "Practice crafting compelling narratives across multiple channels",
            "Develop skills in public presentation and brand storytelling"
          ]
        },
        S: {
          strengthLabel: "Audience Empathy",
          developmentLabel: "Customer Understanding",
          improvements: [
            "Conduct regular user research and empathy mapping exercises",
            "Practice listening to customer feedback with genuine openness"
          ]
        },
        C: {
          strengthLabel: "Data-Driven Optimization",
          developmentLabel: "Analytical Thinking",
          improvements: [
            "Develop proficiency in marketing analytics and A/B testing",
            "Practice systematic tracking and reporting of campaign metrics"
          ]
        }
      }
    },

    // ── 6. Sales ────────────────────────────────────────────────────
    {
      name: "Sales",
      D: 35, I: 40, S: 15, C: 10,
      description: "Revenue-driving professionals who build relationships, negotiate deals, and close business through persuasion and persistence.",
      dimensions: {
        D: {
          strengthLabel: "Closing Power",
          developmentLabel: "Competitive Drive",
          improvements: [
            "Practice assertive closing techniques and objection handling",
            "Set aggressive but achievable sales targets to build resilience"
          ]
        },
        I: {
          strengthLabel: "Relationship Building",
          developmentLabel: "Persuasion & Charisma",
          improvements: [
            "Practice consultative selling and active relationship nurturing",
            "Develop storytelling skills to make product pitches compelling"
          ]
        },
        S: {
          strengthLabel: "Client Trust",
          developmentLabel: "After-Sales Support",
          improvements: [
            "Build habits for consistent follow-up and client care routines",
            "Practice active listening during client meetings and demos"
          ]
        },
        C: {
          strengthLabel: "Pipeline Accuracy",
          developmentLabel: "Sales Analytics",
          improvements: [
            "Develop discipline in CRM data entry and pipeline tracking",
            "Practice systematic analysis of sales performance metrics"
          ]
        }
      }
    },

    // ── 7. HR ───────────────────────────────────────────────────────
    {
      name: "HR",
      D: 10, I: 30, S: 40, C: 20,
      description: "People-focused professionals who manage talent, culture, and organizational development through empathy and structure.",
      dimensions: {
        D: {
          strengthLabel: "Policy Enforcement",
          developmentLabel: "Firm Decision-Making",
          improvements: [
            "Practice delivering difficult feedback and policy decisions confidently",
            "Develop comfort with enforcing organizational standards fairly"
          ]
        },
        I: {
          strengthLabel: "Employee Engagement",
          developmentLabel: "Communication & Advocacy",
          improvements: [
            "Practice facilitating town halls and employee engagement sessions",
            "Develop skills in advocating for team needs to leadership"
          ]
        },
        S: {
          strengthLabel: "Empathetic Mediation",
          developmentLabel: "Supportive Listening",
          improvements: [
            "Practice active listening and mediation in conflict resolution",
            "Develop patience for long-term employee development processes"
          ]
        },
        C: {
          strengthLabel: "Compliance Precision",
          developmentLabel: "Process Documentation",
          improvements: [
            "Develop thorough understanding of labor law and compliance standards",
            "Practice systematic documentation of HR processes and decisions"
          ]
        }
      }
    },

    // ── 8. Researcher ───────────────────────────────────────────────
    {
      name: "Researcher",
      D: 5, I: 5, S: 20, C: 70,
      description: "Deep academic professionals who advance knowledge through systematic investigation, rigorous methodology, and precise analysis.",
      dimensions: {
        D: {
          strengthLabel: "Research Direction",
          developmentLabel: "Initiative & Leadership",
          improvements: [
            "Practice proposing and defending novel research hypotheses",
            "Take initiative in leading lab meetings and research presentations"
          ]
        },
        I: {
          strengthLabel: "Academic Networking",
          developmentLabel: "Collaborative Outreach",
          improvements: [
            "Attend academic conferences and practice presenting findings",
            "Develop skills in writing compelling grant proposals and abstracts"
          ]
        },
        S: {
          strengthLabel: "Methodical Patience",
          developmentLabel: "Process Tolerance",
          improvements: [
            "Build tolerance for long-term experiments and iterative revision cycles",
            "Practice patient peer review and collaborative manuscript editing"
          ]
        },
        C: {
          strengthLabel: "Intellectual Rigor",
          developmentLabel: "Analytical Depth",
          improvements: [
            "Strengthen expertise in advanced statistical and research methodologies",
            "Practice meticulous literature review and citation verification"
          ]
        }
      }
    },

    // ── 9. Doctor ───────────────────────────────────────────────────
    {
      name: "Doctor",
      D: 20, I: 15, S: 35, C: 30,
      description: "Medical professionals who diagnose, treat, and care for patients through clinical expertise and compassionate practice.",
      dimensions: {
        D: {
          strengthLabel: "Clinical Decisiveness",
          developmentLabel: "Urgent Decision-Making",
          improvements: [
            "Practice making rapid clinical decisions under time pressure",
            "Develop confidence in leading emergency medical teams"
          ]
        },
        I: {
          strengthLabel: "Patient Communication",
          developmentLabel: "Bedside Manner",
          improvements: [
            "Practice explaining complex diagnoses in accessible language",
            "Develop empathetic communication skills for difficult conversations"
          ]
        },
        S: {
          strengthLabel: "Patient Care & Empathy",
          developmentLabel: "Compassionate Patience",
          improvements: [
            "Practice active listening during patient consultations",
            "Develop routines for compassionate long-term patient management"
          ]
        },
        C: {
          strengthLabel: "Diagnostic Precision",
          developmentLabel: "Analytical Thoroughness",
          improvements: [
            "Strengthen systematic approach to differential diagnosis",
            "Practice meticulous documentation and evidence-based evaluation"
          ]
        }
      }
    },

    // ── 10. Psychologist ────────────────────────────────────────────
    {
      name: "Psychologist",
      D: 10, I: 25, S: 45, C: 20,
      description: "Mental health professionals who understand human behavior and provide therapeutic support through empathy and clinical insight.",
      dimensions: {
        D: {
          strengthLabel: "Therapeutic Direction",
          developmentLabel: "Session Leadership",
          improvements: [
            "Practice guiding therapy sessions with structured frameworks",
            "Develop confidence in setting therapeutic boundaries and goals"
          ]
        },
        I: {
          strengthLabel: "Rapport Building",
          developmentLabel: "Interpersonal Warmth",
          improvements: [
            "Practice building trust through open-ended questioning techniques",
            "Develop skills in creating safe, non-judgmental conversational spaces"
          ]
        },
        S: {
          strengthLabel: "Deep Empathy",
          developmentLabel: "Emotional Attunement",
          improvements: [
            "Practice reflective listening and emotional validation techniques",
            "Develop patience for gradual therapeutic progress over months"
          ]
        },
        C: {
          strengthLabel: "Clinical Assessment",
          developmentLabel: "Diagnostic Rigor",
          improvements: [
            "Strengthen proficiency in standardized psychological assessment tools",
            "Practice systematic case documentation and treatment planning"
          ]
        }
      }
    },

    // ── 11. Lawyer ──────────────────────────────────────────────────
    {
      name: "Lawyer",
      D: 40, I: 20, S: 10, C: 30,
      description: "Legal professionals who advocate, negotiate, and interpret law through assertive argumentation and analytical precision.",
      dimensions: {
        D: {
          strengthLabel: "Courtroom Presence",
          developmentLabel: "Assertive Advocacy",
          improvements: [
            "Practice assertive argumentation and cross-examination techniques",
            "Develop confidence in high-pressure legal negotiations"
          ]
        },
        I: {
          strengthLabel: "Client Persuasion",
          developmentLabel: "Persuasive Communication",
          improvements: [
            "Practice presenting complex legal arguments in compelling terms",
            "Develop networking skills within the legal professional community"
          ]
        },
        S: {
          strengthLabel: "Client Trust",
          developmentLabel: "Client Empathy",
          improvements: [
            "Practice empathetic listening during client intake consultations",
            "Develop patience for collaborative case strategy discussions"
          ]
        },
        C: {
          strengthLabel: "Legal Precision",
          developmentLabel: "Analytical Thoroughness",
          improvements: [
            "Strengthen skills in legal research, case analysis, and precedent review",
            "Practice meticulous contract drafting and document review"
          ]
        }
      }
    },

    // ── 12. Government Officer ──────────────────────────────────────
    {
      name: "Government Officer",
      D: 20, I: 10, S: 30, C: 40,
      description: "Public service professionals who implement policy, manage civic operations, and serve citizens through structured governance.",
      dimensions: {
        D: {
          strengthLabel: "Administrative Authority",
          developmentLabel: "Decisive Governance",
          improvements: [
            "Practice making firm administrative decisions within policy frameworks",
            "Develop leadership skills for inter-departmental coordination"
          ]
        },
        I: {
          strengthLabel: "Public Engagement",
          developmentLabel: "Stakeholder Communication",
          improvements: [
            "Practice clear communication with diverse public stakeholders",
            "Develop skills in public speaking and community engagement"
          ]
        },
        S: {
          strengthLabel: "Public Service Ethic",
          developmentLabel: "Service Orientation",
          improvements: [
            "Develop patience for bureaucratic processes and long approval cycles",
            "Practice empathetic engagement with citizen concerns and grievances"
          ]
        },
        C: {
          strengthLabel: "Regulatory Compliance",
          developmentLabel: "Procedural Precision",
          improvements: [
            "Strengthen understanding of regulatory frameworks and compliance standards",
            "Practice systematic documentation and audit-ready record keeping"
          ]
        }
      }
    },

    // ── 13. Consultant ──────────────────────────────────────────────
    {
      name: "Consultant",
      D: 35, I: 35, S: 10, C: 20,
      description: "Strategic advisors who solve complex business problems through analytical frameworks, persuasion, and executive-level communication.",
      dimensions: {
        D: {
          strengthLabel: "Strategic Command",
          developmentLabel: "Executive Presence",
          improvements: [
            "Practice leading client workshops and strategy presentations",
            "Develop confidence in making bold, data-backed recommendations"
          ]
        },
        I: {
          strengthLabel: "Client Relationship Management",
          developmentLabel: "Stakeholder Influence",
          improvements: [
            "Practice building trust with senior executives across industries",
            "Develop persuasive storytelling for complex strategic narratives"
          ]
        },
        S: {
          strengthLabel: "Team Harmony",
          developmentLabel: "Collaborative Patience",
          improvements: [
            "Practice supporting junior team members during intense project sprints",
            "Develop patience for iterative client feedback and revision cycles"
          ]
        },
        C: {
          strengthLabel: "Analytical Frameworks",
          developmentLabel: "Quantitative Depth",
          improvements: [
            "Develop proficiency in financial analysis and market modeling",
            "Practice structured problem-solving using consulting frameworks"
          ]
        }
      }
    },

    // ── 14. NGO Professional ────────────────────────────────────────
    {
      name: "NGO Professional",
      D: 10, I: 30, S: 40, C: 20,
      description: "Mission-driven professionals who mobilize communities, manage programs, and drive social impact through empathy and advocacy.",
      dimensions: {
        D: {
          strengthLabel: "Project Leadership",
          developmentLabel: "Initiative & Direction",
          improvements: [
            "Practice taking charge of program implementation and delivery",
            "Develop confidence in setting organizational direction and priorities"
          ]
        },
        I: {
          strengthLabel: "Community Mobilization",
          developmentLabel: "Advocacy & Outreach",
          improvements: [
            "Practice storytelling to inspire donors and community stakeholders",
            "Develop public speaking skills for awareness campaigns"
          ]
        },
        S: {
          strengthLabel: "Grassroots Empathy",
          developmentLabel: "Compassionate Engagement",
          improvements: [
            "Practice deep listening in community needs assessment sessions",
            "Develop patience for long-term social change and program outcomes"
          ]
        },
        C: {
          strengthLabel: "Impact Measurement",
          developmentLabel: "Monitoring & Evaluation",
          improvements: [
            "Develop skills in program evaluation and impact measurement frameworks",
            "Practice systematic grant reporting and compliance documentation"
          ]
        }
      }
    },

    // ── 15. Entrepreneur ────────────────────────────────────────────
    {
      name: "Entrepreneur",
      D: 45, I: 35, S: 10, C: 10,
      description: "Visionary founders who build ventures from scratch through risk-taking, persuasion, and relentless execution.",
      dimensions: {
        D: {
          strengthLabel: "Visionary Drive",
          developmentLabel: "Risk Appetite & Speed",
          improvements: [
            "Practice rapid prototyping and iterative decision-making under uncertainty",
            "Develop comfort with calculated risk-taking and bold strategic bets"
          ]
        },
        I: {
          strengthLabel: "Investor & Team Magnetism",
          developmentLabel: "Pitch & Persuasion",
          improvements: [
            "Practice investor pitch delivery and fundraising conversations",
            "Develop skills in inspiring and recruiting early-stage team members"
          ]
        },
        S: {
          strengthLabel: "Team Loyalty",
          developmentLabel: "Operational Patience",
          improvements: [
            "Practice building patient, long-term relationships with co-founders and team",
            "Develop tolerance for slow-burn operations and support functions"
          ]
        },
        C: {
          strengthLabel: "Product Precision",
          developmentLabel: "Analytical Discipline",
          improvements: [
            "Develop rigor in financial forecasting and unit economics modeling",
            "Practice systematic tracking of key performance indicators and metrics"
          ]
        }
      }
    }
  ]
};

// ─── Validation ──────────────────────────────────────────────────────

/* Validates that every profession profile sums to 100 */
export function validateProfessionProfiles(): void {
  professionProfilesConfig.profiles.forEach((profile) => {
    const total = profile.D + profile.I + profile.S + profile.C;
    if (total !== 100) {
      console.warn(
        `WARNING: Profession profile '${profile.name}' D+I+S+C = ${total} (expected 100)`
      );
    }
  });
}

// Run validation during module initialization
validateProfessionProfiles();
