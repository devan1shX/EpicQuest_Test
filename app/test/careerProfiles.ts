export interface CareerProfile {
  name: string;
  D: number;
  I: number;
  S: number;
  C: number;
}

export const careerProfiles: CareerProfile[] = [
  { name: "Marketing", D: 20, I: 50, S: 20, C: 10 },
  { name: "Sales", D: 40, I: 40, S: 10, C: 10 },
  { name: "Teacher", D: 10, I: 25, S: 50, C: 15 },
  { name: "NGO", D: 10, I: 30, S: 40, C: 20 },
  { name: "Software Engineer", D: 10, I: 10, S: 30, C: 50 },
  { name: "Data Analyst", D: 10, I: 5, S: 25, C: 60 },
  { name: "Consulting", D: 35, I: 35, S: 10, C: 20 },
  { name: "Government", D: 20, I: 10, S: 30, C: 40 },
  { name: "Product Management", D: 30, I: 35, S: 15, C: 20 },
  { name: "Investment Banking", D: 40, I: 25, S: 5, C: 30 },
  { name: "Corporate Strategy", D: 35, I: 15, S: 10, C: 40 },
  { name: "Wealth Management", D: 25, I: 45, S: 10, C: 20 },
  { name: "Business Analytics", D: 20, I: 10, S: 15, C: 55 },
  { name: "UX Design", D: 10, I: 20, S: 40, C: 30 },
  { name: "Law", D: 40, I: 20, S: 10, C: 30 },
  { name: "Research", D: 5, I: 5, S: 20, C: 70 },
  { name: "Medicine", D: 20, I: 10, S: 40, C: 30 },
  { name: "Psychology", D: 5, I: 25, S: 60, C: 10 },
  { name: "HR", D: 10, I: 30, S: 40, C: 20 },
  { name: "Finance", D: 30, I: 10, S: 10, C: 50 },
  { name: "Entrepreneurship", D: 45, I: 35, S: 10, C: 10 },
  { name: "Operations", D: 30, I: 10, S: 20, C: 40 },
  { name: "Public Policy", D: 20, I: 20, S: 20, C: 40 },
  { name: "Journalism", D: 20, I: 30, S: 20, C: 30 },
  { name: "Content Creation", D: 10, I: 60, S: 20, C: 10 }
];

// Validate that every career profile sums to 100
export function validateCareerProfiles() {
  careerProfiles.forEach((profile) => {
    const total = profile.D + profile.I + profile.S + profile.C;
    if (total !== 100) {
      console.warn(`WARNING: Career profile '${profile.name}' D+I+S+C = ${total} (expected 100)`);
    }
  });
}

// Run validation during initialization
validateCareerProfiles();
