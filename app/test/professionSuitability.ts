/**
 * Profession Suitability Engine
 *
 * Pure TypeScript helper module for evaluating how suitable a user's
 * DISC profile is for a selected profession.
 *
 * This module does NOT import or modify the existing engine.ts.
 * All calculations are self-contained and decoupled.
 *
 * Future Enhancement:
 * `selectedProfession` can be sourced from a User Profile / login system
 * instead of a manual dropdown selection.
 */

import {
  professionProfilesConfig,
  type ProfessionProfile,
} from "./professionProfiles";

// ─── Interfaces ──────────────────────────────────────────────────────

export interface NormalizedDISC {
  D: number;
  I: number;
  S: number;
  C: number;
}

export interface ProfessionStrength {
  dimension: "D" | "I" | "S" | "C";
  label: string;
  userScore: number;
  requiredScore: number;
  surplus: number;
}

export interface DevelopmentArea {
  dimension: "D" | "I" | "S" | "C";
  label: string;
  userScore: number;
  requiredScore: number;
  deficit: number;
}

export interface ImprovementSuggestion {
  dimension: "D" | "I" | "S" | "C";
  title: string;
}

export type FitClassification =
  | "Exceptional Fit"
  | "Strong Fit"
  | "Good Fit"
  | "Moderate Fit"
  | "Weak Fit";

export interface ProfessionSuitabilityResult {
  professionName: string;
  professionDescription: string;
  fitPercentage: number;
  fitClassification: FitClassification;
  whyThisProfession: string;
  strengths: ProfessionStrength[];
  developmentAreas: DevelopmentArea[];
  improvementSuggestions: ImprovementSuggestion[];
  recommendation: {
    recommended: "yes" | "conditional" | "no";
    summary: string;
    reason: string;
  };
  normalizedUser: NormalizedDISC;
  professionProfile: { D: number; I: number; S: number; C: number };
}

// ─── Core Functions ──────────────────────────────────────────────────

/**
 * Normalize raw DISC scores so D + I + S + C = 100.
 * Uses exact raw values — not rounded display values.
 */
export function normalizeDISC(
  rawD: number,
  rawI: number,
  rawS: number,
  rawC: number
): NormalizedDISC {
  const total = rawD + rawI + rawS + rawC;
  if (total === 0) {
    return { D: 25, I: 25, S: 25, C: 25 };
  }
  return {
    D: Math.round((rawD / total) * 100),
    I: Math.round((rawI / total) * 100),
    S: Math.round((rawS / total) * 100),
    C: Math.round((rawC / total) * 100),
  };
}

/**
 * Calculate fit percentage using Manhattan distance.
 * Both user and profession profiles sum to 100.
 * Max possible Manhattan distance = 200.
 * Fit = 100 - (distance / 200) * 100
 */
export function calculateFitPercentage(
  user: NormalizedDISC,
  profession: ProfessionProfile
): number {
  const diff =
    Math.abs(user.D - profession.D) +
    Math.abs(user.I - profession.I) +
    Math.abs(user.S - profession.S) +
    Math.abs(user.C - profession.C);

  const maxDiff = 200;
  return Math.round(100 - (diff / maxDiff) * 100);
}

/**
 * Classify fit percentage into human-readable category.
 * 90+  = Exceptional Fit
 * 80-89 = Strong Fit
 * 70-79 = Good Fit
 * 55-69 = Moderate Fit
 * <55  = Weak Fit
 */
export function classifyFit(fitPercentage: number): FitClassification {
  if (fitPercentage >= 90) return "Exceptional Fit";
  if (fitPercentage >= 80) return "Strong Fit";
  if (fitPercentage >= 70) return "Good Fit";
  if (fitPercentage >= 55) return "Moderate Fit";
  return "Weak Fit";
}

/**
 * Identify dimensions where user exceeds profession requirement.
 * Returns top 2 strengths sorted by surplus (descending).
 */
export function analyzeStrengths(
  user: NormalizedDISC,
  profession: ProfessionProfile
): ProfessionStrength[] {
  const dims: ("D" | "I" | "S" | "C")[] = ["D", "I", "S", "C"];

  const allStrengths = dims
    .filter((dim) => user[dim] > profession[dim])
    .map((dim) => ({
      dimension: dim,
      label: profession.dimensions[dim].strengthLabel,
      userScore: user[dim],
      requiredScore: profession[dim],
      surplus: user[dim] - profession[dim],
    }))
    .sort((a, b) => b.surplus - a.surplus);

  // Cap at top 2 strengths for a cleaner report
  return allStrengths.slice(0, 2);
}

/**
 * Identify dimensions where user is significantly below profession requirement.
 * Returns top 2 development areas sorted by deficit (descending).
 */
export function analyzeDevelopmentAreas(
  user: NormalizedDISC,
  profession: ProfessionProfile
): DevelopmentArea[] {
  const dims: ("D" | "I" | "S" | "C")[] = ["D", "I", "S", "C"];

  const allAreas = dims
    .filter((dim) => user[dim] < profession[dim])
    .map((dim) => ({
      dimension: dim,
      label: profession.dimensions[dim].developmentLabel,
      userScore: user[dim],
      requiredScore: profession[dim],
      deficit: profession[dim] - user[dim],
    }))
    .sort((a, b) => b.deficit - a.deficit);

  // Top 2 biggest deficits only
  return allAreas.slice(0, 2);
}

/**
 * Generate improvement suggestions for the top deficit dimensions.
 * Pulls from the profession's dimension-specific improvement lists.
 */
export function generateImprovementSuggestions(
  developmentAreas: DevelopmentArea[],
  profession: ProfessionProfile
): ImprovementSuggestion[] {
  const suggestions: ImprovementSuggestion[] = [];

  for (const area of developmentAreas) {
    const dimImprovements =
      profession.dimensions[area.dimension].improvements;
    // Take first improvement for each deficit dimension
    if (dimImprovements.length > 0) {
      suggestions.push({
        dimension: area.dimension,
        title: dimImprovements[0],
      });
    }
  }

  return suggestions;
}

/**
 * Generate "Why This Profession" explanation text based on analysis.
 */
export function generateWhyThisProfession(
  user: NormalizedDISC,
  profession: ProfessionProfile,
  strengths: ProfessionStrength[],
  fitClassification: FitClassification
): string {
  // Get the profession's top 2 required dimensions
  const dims: ("D" | "I" | "S" | "C")[] = ["D", "I", "S", "C"];
  const sortedReqs = dims
    .map((d) => ({ dim: d, score: profession[d] }))
    .sort((a, b) => b.score - a.score);
  const topReq1 = sortedReqs[0];
  const topReq2 = sortedReqs[1];

  const dimNameMap: Record<string, string> = {
    D: "Drive",
    I: "Influence",
    S: "Support",
    C: "Clarity",
  };

  if (
    fitClassification === "Exceptional Fit" ||
    fitClassification === "Strong Fit"
  ) {
    const strengthParts = strengths.map(
      (s) =>
        `Strong ${s.label} (${s.dimension}=${s.userScore}%)`
    );
    const closeMatches = dims.filter(
      (d) => Math.abs(user[d] - profession[d]) <= 5 && !strengths.find((s) => s.dimension === d)
    );
    const closeParts = closeMatches.map(
      (d) =>
        `well-matched ${dimNameMap[d]} (${d}=${user[d]}%)`
    );
    const parts = [...strengthParts, ...closeParts];
    return `Your profile demonstrates: ${parts.join(", ")}. These traits align directly with the ${dimNameMap[topReq1.dim]}-driven demands of ${profession.name} roles.`;
  }

  if (fitClassification === "Good Fit") {
    const strengthText =
      strengths.length > 0
        ? `Your ${strengths.map((s) => s.label).join(" and ")} ${strengths.length > 1 ? "provide" : "provides"} a solid foundation.`
        : "";
    return `Your profile shows solid compatibility with ${profession.name}. ${strengthText} Developing ${dimNameMap[topReq1.dim]} and ${dimNameMap[topReq2.dim]} skills would further strengthen your alignment.`;
  }

  if (fitClassification === "Moderate Fit") {
    return `${profession.name} emphasizes ${dimNameMap[topReq1.dim]} (${topReq1.score}%) and ${dimNameMap[topReq2.dim]} (${topReq2.score}%), which requires some adaptation from your natural profile. Targeted development in these areas can improve your fit over time.`;
  }

  // Weak Fit
  const userTop = dims
    .map((d) => ({ dim: d, score: user[d] }))
    .sort((a, b) => b.score - a.score)[0];
  return `Your current profile emphasizes ${dimNameMap[userTop.dim]} (${userTop.score}%), while ${profession.name} primarily requires ${dimNameMap[topReq1.dim]} (${topReq1.score}%) and ${dimNameMap[topReq2.dim]} (${topReq2.score}%). This represents a significant behavioral gap that would require substantial focused development.`;
}

/**
 * Generate final recommendation with recommended status, summary, and reason.
 */
export function generateRecommendation(
  fitClassification: FitClassification,
  professionName: string,
  strengths: ProfessionStrength[],
  developmentAreas: DevelopmentArea[]
): { recommended: "yes" | "conditional" | "no"; summary: string; reason: string } {
  const dimNameMap: Record<string, string> = {
    D: "Drive",
    I: "Influence",
    S: "Support",
    C: "Clarity",
  };

  if (
    fitClassification === "Exceptional Fit" ||
    fitClassification === "Strong Fit" ||
    fitClassification === "Good Fit"
  ) {
    const strengthNames = strengths
      .map((s) => dimNameMap[s.dimension])
      .join(", ");
    return {
      recommended: "yes",
      summary: `${fitClassification} — Recommended`,
      reason: `Your profile aligns strongly with ${professionName}. ${strengthNames ? `Key strengths in ${strengthNames} directly support the behavioral demands of this profession.` : `Your balanced profile provides a solid foundation for this role.`}`,
    };
  }

  if (fitClassification === "Moderate Fit") {
    const devNames = developmentAreas
      .map((d) => dimNameMap[d.dimension])
      .join(" and ");
    return {
      recommended: "conditional",
      summary: "Moderate Fit — Consider with Development",
      reason: `${professionName} is achievable with focused development. Building your ${devNames} capabilities would significantly improve your alignment and effectiveness in this role.`,
    };
  }

  // Weak Fit
  const devNames = developmentAreas
    .map((d) => dimNameMap[d.dimension])
    .join(" and ");
  return {
    recommended: "no",
    summary: "Weak Fit — Consider Alternatives",
    reason: `Your current behavioral profile differs significantly from the typical ${professionName} requirements. The role's emphasis on ${devNames} contrasts with your natural strengths. Consider alternative paths that better leverage your existing DISC profile.`,
  };
}

// ─── Main Orchestrator ───────────────────────────────────────────────

/**
 * Evaluate how suitable a user is for a selected profession.
 *
 * Takes raw DISC scores (exact values, not rounded display values)
 * and a profession name, then returns a complete suitability analysis.
 *
 * @param rawD - Raw Drive score from engine
 * @param rawI - Raw Influence score from engine
 * @param rawS - Raw Support score from engine
 * @param rawC - Raw Clarity score from engine
 * @param professionName - Name of the selected profession
 */
export function evaluateProfessionSuitability(
  rawD: number,
  rawI: number,
  rawS: number,
  rawC: number,
  professionName: string
): ProfessionSuitabilityResult | null {
  // Find the profession profile
  const profession = professionProfilesConfig.profiles.find(
    (p) => p.name === professionName
  );
  if (!profession) {
    console.warn(
      `Profession '${professionName}' not found in profiles config.`
    );
    return null;
  }

  // Normalize user DISC scores (exact raw values → sum to 100)
  const normalizedUser = normalizeDISC(rawD, rawI, rawS, rawC);

  // Calculate fit
  const fitPercentage = calculateFitPercentage(normalizedUser, profession);
  const fitClassification = classifyFit(fitPercentage);

  // Analyze strengths (top 2)
  const strengths = analyzeStrengths(normalizedUser, profession);

  // Analyze development areas (top 2 biggest deficits)
  const developmentAreas = analyzeDevelopmentAreas(normalizedUser, profession);

  // Generate improvement suggestions for deficit dimensions
  const improvementSuggestions = generateImprovementSuggestions(
    developmentAreas,
    profession
  );

  // Generate "Why This Profession" explanation
  const whyThisProfession = generateWhyThisProfession(
    normalizedUser,
    profession,
    strengths,
    fitClassification
  );

  // Generate final recommendation
  const recommendation = generateRecommendation(
    fitClassification,
    professionName,
    strengths,
    developmentAreas
  );

  return {
    professionName,
    professionDescription: profession.description,
    fitPercentage,
    fitClassification,
    whyThisProfession,
    strengths,
    developmentAreas,
    improvementSuggestions,
    recommendation,
    normalizedUser,
    professionProfile: {
      D: profession.D,
      I: profession.I,
      S: profession.S,
      C: profession.C,
    },
  };
}
