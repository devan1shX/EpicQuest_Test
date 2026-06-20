# 🧠 DISC Assessment Engine — Complete Algorithm

> **How does the EpicQuest personality test work, from the very first question to the final profession suitability report?**
>
> This document explains **every single step** with a real worked example.
> Written so even a 5th grader can follow along. 🎒

---

## Table of Contents

1. [The Big Picture](#1-the-big-picture)
2. [The Four Invisible Buckets](#2-the-four-invisible-buckets)
3. [The Three Question Types](#3-the-three-question-types)
4. [Scoring the Questions (with Example)](#4-scoring-the-questions-with-example)
5. [From Buckets to DISC Scores](#5-from-buckets-to-disc-scores)
6. [Finding Your Quadrant (Primary Style)](#6-finding-your-quadrant-primary-style)
7. [Style Depth — Core, Helpers, Challenge](#7-style-depth--core-helpers-challenge)
8. [Personality Strength](#8-personality-strength)
9. [Career Fit Engine (Existing)](#9-career-fit-engine-existing)
10. [Profession Suitability Engine (New)](#10-profession-suitability-engine-new)
11. [Full Worked Example — Start to Finish](#11-full-worked-example--start-to-finish)

---

## 1. The Big Picture

Imagine a funnel:

```
┌──────────────────────────────┐
│   38 Questions (User Input)  │   ← You answer these
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│   4 Invisible Buckets        │   ← Active, Receptive, Agreeable, Skeptical
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│   4 DISC Scores              │   ← D, I, S, C
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│   Primary Quadrant           │   ← Which "type" are you?
│   Style Depth                │   ← Core, Helper, Challenge
│   Personality Strength       │   ← How strong is your type?
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│   Career Fit Engine          │   ← Which careers suit you?
│   Profession Suitability     │   ← Are YOU suited for THIS job?
└──────────────────────────────┘
```

---

## 2. The Four Invisible Buckets

Every answer you give fills up **four invisible buckets**.
Think of them like four jars you're pouring water into:

| Bucket | What it means | Think of it as... |
|--------|--------------|-------------------|
| **Active** | You like action, speed, speaking up | 🏃 "I go first!" |
| **Receptive** | You like listening, planning, patience | 🧘 "I think first." |
| **Agreeable** | You care about people, harmony, teamwork | 🤝 "Let's work together!" |
| **Skeptical** | You care about facts, accuracy, logic | 🔍 "Prove it to me." |

Every bucket starts with a **base value of 1** (so we never divide by zero).

```
Starting values:
  Active    = 1
  Receptive = 1
  Agreeable = 1
  Skeptical = 1
```

---

## 3. The Three Question Types

The test has **38 questions** in three different formats:

### Type A — Adjective Pairs (Questions 1–24)

You see two opposite words. Pick a number from 1 to 5.

```
  Open ←——1——2——3——4——5——→ Skeptical
```

- Picking **1** = you strongly agree with the LEFT word
- Picking **5** = you strongly agree with the RIGHT word
- Picking **3** = you're in the middle

**How scoring works:**

```
  leftWeight  = 6 - score    (if score=1 → leftWeight=5, if score=5 → leftWeight=1)
  rightWeight = score         (if score=1 → rightWeight=1, if score=5 → rightWeight=5)
```

Each word is mapped to one or two buckets. The weight goes into those buckets.

### Type B — Single Traits (Questions 25–32)

You see ONE word. Rate yourself from 1 (not at all) to 5 (very much).

```
  How "Daring" are you?   1——2——3——4——5
```

The score (1–5) goes directly into the mapped bucket(s).

### Type C — Forced Choices (Questions 33–38)

You pick one of two options. The chosen option adds **5 points** to its mapped bucket(s).

```
  "In a group, I am..."
  ○ Likely to speak up        → Active +5
  ○ Likely to stay quiet      → Receptive +5
```

---

## 4. Scoring the Questions (with Example)

### Every Question's Bucket Mapping

Here is the **complete mapping** of every single question to its buckets:

#### Type A — Adjective Pairs (q1–q24)

| Q# | Left Word | Left Buckets | Right Word | Right Buckets |
|----|-----------|-------------|------------|--------------|
| q1 | Open | Agreeable | Skeptical | Skeptical |
| q2 | Cheerful | Agreeable + Active | Methodical | Skeptical + Receptive |
| q3 | Reserved | Receptive | Dynamic | Active |
| q4 | Humble | Receptive + Agreeable | Bold | Active |
| q5 | Generous | Agreeable | Strict | Skeptical |
| q6 | Lively | Active + Agreeable | Systematic | Receptive + Skeptical |
| q7 | Obedient | Receptive + Agreeable | Outspoken | Active |
| q8 | Modest | Receptive | Challenging | Active + Skeptical |
| q9 | Helpful | Agreeable | Resolute | Skeptical + Active |
| q10 | Enthusiastic | Active + Agreeable | Accurate | Receptive + Skeptical |
| q11 | Compliant | Receptive + Agreeable | Enterprising | Active |
| q12 | Gentle | Agreeable | Direct | Active |
| q13 | Accommodating | Agreeable | Firm | Skeptical |
| q14 | Playful | Active + Agreeable | Analytical | Receptive + Skeptical |
| q15 | Tactful | Agreeable | Expressive | Active + Agreeable |
| q16 | Even-Tempered | Receptive + Agreeable | Tough | Active + Skeptical |
| q17 | Accepting | Agreeable | Matter-of-Fact | Skeptical |
| q18 | Optimistic | Active + Agreeable | Perfectionistic | Receptive + Skeptical |
| q19 | Quiet | Receptive | Charismatic | Active + Agreeable |
| q20 | Obliging | Agreeable | Assertive | Active |
| q21 | Trusting | Agreeable | Questioning | Skeptical |
| q22 | Light-Hearted | Active + Agreeable | Precise | Receptive + Skeptical |
| q23 | Cautious | Receptive + Skeptical | Adventurous | Active + Agreeable |
| q24 | Receptive | Receptive | Decisive | Active |

#### Type B — Single Traits (q25–q32)

| Q# | Trait | Buckets it fills |
|----|-------|-----------------|
| q25 | Agreeable | Agreeable |
| q26 | Daring | Active |
| q27 | Sociable | Active + Agreeable |
| q28 | Dominant | Active + Skeptical |
| q29 | Patient | Receptive + Agreeable |
| q30 | Soft-Spoken | Receptive + Agreeable |
| q31 | Detail-Oriented | Receptive + Skeptical |
| q32 | Competitive | Active + Skeptical |

#### Type C — Forced Choices (q33–q38)

| Q# | Question | Option 1 → Buckets (+5) | Option 2 → Buckets (+5) |
|----|----------|------------------------|------------------------|
| q33 | In a group, I am... | Speak up → **Active** | Stay quiet → **Receptive** |
| q34 | On a team project... | Done correctly → **Skeptical** | People supported → **Agreeable** |
| q35 | I am most comfortable... | Taking command → **Active + Skeptical** | Letting others decide → **Receptive + Agreeable** |
| q36 | When giving feedback... | Motivating → **Agreeable** | Being accurate → **Skeptical** |
| q37 | I am most attracted to... | Work alone → **Receptive + Skeptical** | Lots of interaction → **Active + Agreeable** |
| q38 | When someone presents a plan... | Analyze flaws → **Skeptical** | Be helpful → **Agreeable** |

---

## 5. From Buckets to DISC Scores

Once all 38 questions are scored, we have four bucket totals:

```
Active, Receptive, Agreeable, Skeptical
```

### Step 5a — Calculate Raw DISC Scores

The four DISC scores are **averages** of specific pairs of buckets:

```
D (Drive)     = (Active + Skeptical) / 2       ← Action + Logic = Results
I (Influence) = (Active + Agreeable) / 2       ← Action + People = Persuasion
S (Support)   = (Receptive + Agreeable) / 2    ← Patience + People = Harmony
C (Clarity)   = (Receptive + Skeptical) / 2    ← Patience + Logic = Analysis
```

Each result is **rounded** to a whole number.

### Step 5b — Calculate Vertical & Horizontal Percentages

Two percentage axes tell us WHERE you sit on the DISC grid:

```
Vertical %   = Active / (Active + Receptive) × 100    (rounded)
Horizontal % = Agreeable / (Agreeable + Skeptical) × 100  (rounded)
```

Think of it like an X-Y coordinate system:
- **Vertical ≥ 50%** = you're in the TOP half (Active)
- **Vertical < 50%** = you're in the BOTTOM half (Receptive)
- **Horizontal ≥ 50%** = you're on the RIGHT side (Agreeable)
- **Horizontal < 50%** = you're on the LEFT side (Skeptical)

---

## 6. Finding Your Quadrant (Primary Style)

The DISC grid has four quadrants. Your Vertical % and Horizontal % determine which one you land in:

```
              Skeptical (left)    │    Agreeable (right)
         ─────────────────────────┼─────────────────────────
  Active │                        │                         │
  (top)  │    D (Drive)           │    I (Influence)        │
         │    H < 50, V ≥ 50     │    H ≥ 50, V ≥ 50      │
         │                        │                         │
         ├────────────────────────┼─────────────────────────┤
Receptive│                        │                         │
(bottom) │    C (Clarity)         │    S (Support)          │
         │    H < 50, V < 50     │    H ≥ 50, V < 50      │
         │                        │                         │
         └────────────────────────┴─────────────────────────┘

  H = Horizontal %
  V = Vertical %
```

**The rule is simple:**

| Vertical | Horizontal | → Primary Style |
|----------|-----------|----------------|
| ≥ 50% | ≥ 50% | **I** (Influence) |
| ≥ 50% | < 50% | **D** (Drive) |
| < 50% | ≥ 50% | **S** (Support) |
| < 50% | < 50% | **C** (Clarity) |

---

## 7. Style Depth — Core, Helpers, Challenge

Once we know the primary style (from the quadrant), we rank all four DISC scores to determine:

```
1. Core Style      = forced to be the primaryCode from Step 6
2. Helper Style 1  = next highest score (after removing core)
3. Helper Style 2  = next after that
4. Challenge Style = the lowest remaining score
```

**Important:** The Core is always locked to the quadrant result. Even if another raw DISC score is technically higher, the quadrant-derived primary wins.

**Blend Detection:** If Helper 1 and Helper 2 are within 3 points of each other, they're labeled as a "Blend" (e.g., "Drive / Support Blend").

### Combined Style Code

The two-letter code is `PrimaryCode + SecondaryCode` (e.g., "ID" = Influence primary + Drive secondary).

Each combo has a preset explanation:

| Combo | Explanation |
|-------|-------------|
| DI / ID | Results-driven and communicative |
| IS / SI | Highly collaborative and empathetic |
| SC / CS | Methodical and supportive |
| DC / CD | Analytical and decisive |

---

## 8. Personality Strength

This measures **how strongly** you lean into your primary style vs being balanced/neutral.

```
strengthVal = (|Vertical% - 50| + |Horizontal% - 50|) / 2
```

| strengthVal | Level |
|------------|-------|
| ≥ 30 | Very Strong |
| ≥ 20 | Strong |
| ≥ 10 | Moderate |
| < 10 | Mild |

A **Very Strong** personality means you're far from center — you lean heavily into your quadrant.
A **Mild** personality means you're close to center — you're more balanced.

---

## 9. Career Fit Engine (Existing)

The system has **21 preset career profiles**, each with ideal DISC percentages that sum to 100:

| Career | D | I | S | C |
|--------|---|---|---|---|
| Marketing | 20 | 50 | 20 | 10 |
| Sales | 40 | 40 | 10 | 10 |
| Teacher | 10 | 25 | 50 | 15 |
| Software Engineer | 10 | 10 | 30 | 50 |
| Research | 5 | 5 | 20 | 70 |
| Entrepreneurship | 45 | 35 | 10 | 10 |
| ... | ... | ... | ... | ... |

### Step 9a — Normalize User DISC

First, the user's raw DISC scores are converted so they sum to 100:

```
totalRaw = rawD + rawI + rawS + rawC

normD = round((rawD / totalRaw) × 100)
normI = round((rawI / totalRaw) × 100)
normS = round((rawS / totalRaw) × 100)
normC = round((rawC / totalRaw) × 100)
```

### Step 9b — Manhattan Distance

For each career, we calculate:

```
diff = |normD - careerD| + |normI - careerI| + |normS - careerS| + |normC - careerC|
```

Since both profiles sum to 100, the maximum possible diff is **200**.

### Step 9c — Fit Percentage

```
fit = round(100 - (diff / 200) × 100)
```

### Step 9d — Color Classification

| Fit % | Color |
|-------|-------|
| ≥ 80 | 🟢 Green |
| ≥ 70 | 🟠 Orange |
| ≥ 55 | 🟡 Yellow |
| < 55 | 🔴 Red |

### Step 9e — Report Selection

The report shows the **top 5** careers + the **bottom 3** careers to show the full range.

---

## 10. Profession Suitability Engine (New)

> **This is the reverse of the Career Fit Engine.**
>
> Career Fit: "Here are careers that match you."
> Profession Suitability: "You picked THIS career. How well do you fit it?"

### Step 10a — Input

The Profession Suitability Engine uses the **foundationScores** (percentage-based) from the report:

```
active    = foundationScores.pacePosture.active       (same as Vertical%)
receptive = foundationScores.pacePosture.receptive     (= 100 - active)
agreeable = foundationScores.orientation.agreeable     (same as Horizontal%)
skeptical = foundationScores.orientation.skeptical     (= 100 - agreeable)
```

Then re-derives the raw DISC scores using the same formulas:

```
rawD = (active + skeptical) / 2
rawI = (active + agreeable) / 2
rawS = (receptive + agreeable) / 2
rawC = (receptive + skeptical) / 2
```

### Step 10b — Normalize User Profile

Same as Step 9a — make DISC scores sum to 100:

```
total = rawD + rawI + rawS + rawC
userD = round((rawD / total) × 100)
userI = round((rawI / total) × 100)
userS = round((rawS / total) × 100)
userC = round((rawC / total) × 100)
```

### Step 10c — Look Up Profession Profile

The system has **15 profession profiles** (separate from the 21 career profiles used in Step 9).
Each one defines an ideal DISC distribution summing to 100.

| Profession | D | I | S | C |
|-----------|---|---|---|---|
| Teacher | 10 | 35 | 40 | 15 |
| Software Engineer | 10 | 10 | 30 | 50 |
| Data Analyst | 10 | 5 | 25 | 60 |
| Investment Banker | 40 | 25 | 5 | 30 |
| Marketing | 20 | 50 | 20 | 10 |
| Sales | 35 | 40 | 15 | 10 |
| HR | 10 | 30 | 40 | 20 |
| Researcher | 5 | 5 | 20 | 70 |
| Doctor | 20 | 15 | 35 | 30 |
| Psychologist | 10 | 25 | 45 | 20 |
| Lawyer | 40 | 20 | 10 | 30 |
| Government Officer | 20 | 10 | 30 | 40 |
| Consultant | 35 | 35 | 10 | 20 |
| NGO Professional | 10 | 30 | 40 | 20 |
| Entrepreneur | 45 | 35 | 10 | 10 |

### Step 10d — Calculate Fit Percentage

Same formula as Step 9b and 9c:

```
diff = |userD - profD| + |userI - profI| + |userS - profS| + |userC - profC|
fit  = round(100 - (diff / 200) × 100)
```

### Step 10e — Classify Fit

| Fit % | Classification |
|-------|---------------|
| ≥ 90 | Exceptional Fit |
| 80–89 | Strong Fit |
| 70–79 | Good Fit |
| 55–69 | Moderate Fit |
| < 55 | Weak Fit |

### Step 10f — Find Strengths (Top 2)

For each dimension (D, I, S, C), check where **user > profession**:

```
surplus = userScore - professionScore
```

Sort by surplus descending → take the **top 2**.

Each strength gets a **context-specific label** from the profession profile (e.g., for Software Engineer, high I = "Cross-Team Communication").

### Step 10g — Find Development Areas (Top 2)

For each dimension, check where **user < profession**:

```
deficit = professionScore - userScore
```

Sort by deficit descending → take the **top 2** biggest gaps.

### Step 10h — Improvement Suggestions

For each development area, pull the **first improvement suggestion** from the profession profile's dimension-specific improvement list.

### Step 10i — "Why This Profession?" Explanation

The engine generates a dynamic explanation based on the fit classification:

| Fit | Logic |
|-----|-------|
| Exceptional / Strong | Lists strengths + close-match dimensions |
| Good | Lists strengths + areas to develop |
| Moderate | States the profession's top 2 required dimensions and that adaptation is needed |
| Weak | Contrasts user's top dimension with profession's top required dimensions |

### Step 10j — Final Recommendation

| Fit | Recommendation | Label |
|-----|---------------|-------|
| Exceptional / Strong / Good | ✅ **YES** | "Recommended" |
| Moderate | ⚠️ **CONDITIONAL** | "Consider with Development" |
| Weak | ❌ **NO** | "Consider Alternatives" |

---

## 11. Full Worked Example — Start to Finish

### 👤 Meet Riya

Riya is a high school student. She takes the DISC assessment.

---

### PHASE 1: Answering Questions

Riya answers all 38 questions. Let's trace a **simplified subset** of her answers to show how scoring works, then jump to her final bucket totals.

#### Sample Adjective Pair Answer:

**Q1: Open vs Skeptical — Riya picks 2** (she's more "Open")

```
leftWeight  = 6 - 2 = 4
rightWeight = 2

Q1 mapping:  Left (Open) → Agreeable,  Right (Skeptical) → Skeptical

Result:
  Agreeable += 4    (now Agreeable = 1 + 4 = 5)
  Skeptical += 2    (now Skeptical = 1 + 2 = 3)
```

**Q3: Reserved vs Dynamic — Riya picks 4** (she's more "Dynamic")

```
leftWeight  = 6 - 4 = 2
rightWeight = 4

Q3 mapping:  Left (Reserved) → Receptive,  Right (Dynamic) → Active

Result:
  Receptive += 2
  Active    += 4
```

**Q6: Lively vs Systematic — Riya picks 2** (she's more "Lively")

```
leftWeight  = 6 - 2 = 4
rightWeight = 2

Q6 mapping:  Left (Lively) → Active + Agreeable,  Right (Systematic) → Receptive + Skeptical

Result:
  Active    += 4
  Agreeable += 4
  Receptive += 2
  Skeptical += 2
```

#### Sample Single Trait Answer:

**Q26: "Daring" — Riya rates herself 4 out of 5**

```
Q26 mapping: Daring → Active

Result:
  Active += 4
```

**Q29: "Patient" — Riya rates herself 2 out of 5**

```
Q29 mapping: Patient → Receptive + Agreeable

Result:
  Receptive += 2
  Agreeable += 2
```

#### Sample Forced Choice Answer:

**Q33: "In a group, I am..." — Riya picks "Likely to speak up"**

```
Result:
  Active += 5
```

**Q35: "I am most comfortable..." — Riya picks "Taking command"**

```
Result:
  Active    += 5
  Skeptical += 5
```

---

### PHASE 2: Final Bucket Totals

After processing all 38 questions, suppose Riya's buckets are:

```
┌─────────────────────────────────┐
│  Active    = 110                │
│  Receptive = 72                 │
│  Agreeable = 104                │
│  Skeptical = 68                 │
└─────────────────────────────────┘
```

---

### PHASE 3: Calculate Raw DISC Scores

```
D = (Active + Skeptical) / 2    = (110 + 68) / 2  = 89
I = (Active + Agreeable) / 2    = (110 + 104) / 2 = 107
S = (Receptive + Agreeable) / 2 = (72 + 104) / 2  = 88
C = (Receptive + Skeptical) / 2 = (72 + 68) / 2   = 70
```

```
┌─────────────────────────────────┐
│  Raw D = 89                     │
│  Raw I = 107                    │
│  Raw S = 88                     │
│  Raw C = 70                     │
└─────────────────────────────────┘
```

---

### PHASE 4: Calculate Vertical & Horizontal Percentages

```
Vertical %   = Active / (Active + Receptive) × 100
             = 110 / (110 + 72) × 100
             = 110 / 182 × 100
             = 60%

Horizontal % = Agreeable / (Agreeable + Skeptical) × 100
             = 104 / (104 + 68) × 100
             = 104 / 172 × 100
             = 60%
```

```
┌─────────────────────────────────┐
│  Vertical %   = 60%  (Active)  │
│  Horizontal % = 60%  (Agreeable) │
└─────────────────────────────────┘
```

---

### PHASE 5: Find Primary Quadrant

```
Vertical = 60%  → ≥ 50  → TOP half (Active)
Horizontal = 60% → ≥ 50  → RIGHT side (Agreeable)

Active + Agreeable = ✨ I (Influence) ✨
```

```
              Skeptical            │         Agreeable
         ─────────────────────────┼─────────────────────────
  Active │                        │                         │
         │    D                   │    ★ I ← RIYA IS HERE  │
         │                        │    (60%, 60%)           │
         ├────────────────────────┼─────────────────────────┤
Receptive│                        │                         │
         │    C                   │    S                    │
         │                        │                         │
         └────────────────────────┴─────────────────────────┘
```

**Riya's Primary Style = I (Influence)**

---

### PHASE 6: Style Depth

Sort raw DISC scores (highest first):

```
1. I = 107  ← Highest raw score
2. D = 89
3. S = 88
4. C = 70   ← Lowest raw score
```

Now apply the rules:

```
Core (locked to quadrant):  I  (Influence)  ← forced by Step 5, even though I was already #1
Helper 1 (next highest):    D  (Drive)      = 89
Helper 2 (next):            S  (Support)    = 88
Challenge (lowest):         C  (Clarity)    = 70
```

**Blend check:** |Helper1 - Helper2| = |89 - 88| = 1 → **less than 3** → **BLEND!**

```
Helper 1 label: "Drive / Support Blend"
```

```
┌─────────────────────────────────────────────────┐
│  Core Style:      I — Influence (Primary Mode)  │
│  Helper Style 1:  Drive / Support Blend         │
│  Helper Style 2:  S — Support (Helper Style)    │
│  Challenge Style: C — Clarity (Challenge Style) │
└─────────────────────────────────────────────────┘
```

**Combined Style Code: "ID"** → "Results-driven and communicative."

---

### PHASE 7: Personality Strength

```
strengthVal = (|Vertical% - 50| + |Horizontal% - 50|) / 2
            = (|60 - 50| + |60 - 50|) / 2
            = (10 + 10) / 2
            = 10

10 ≥ 10 → Level = "Moderate"
```

**Riya has a Moderate personality strength** — she leans into Influence but isn't extreme.

---

### PHASE 8: Career Fit (Existing Engine)

#### Normalize Riya's DISC:

```
total = 89 + 107 + 88 + 70 = 354

normD = round(89/354 × 100)  = round(25.14) = 25%
normI = round(107/354 × 100) = round(30.23) = 30%
normS = round(88/354 × 100)  = round(24.86) = 25%
normC = round(70/354 × 100)  = round(19.77) = 20%
```

```
┌───────────────────────────┐
│  Riya's Normalized DISC:  │
│  D = 25%                  │
│  I = 30%                  │
│  S = 25%                  │
│  C = 20%                  │
└───────────────────────────┘
```

#### Calculate fit for "Marketing" (D=20, I=50, S=20, C=10):

```
diff = |25-20| + |30-50| + |25-20| + |20-10|
     = 5 + 20 + 5 + 10
     = 40

fit  = round(100 - (40/200 × 100))
     = round(100 - 20)
     = 80%  → 🟢 Green!
```

#### Calculate fit for "Research" (D=5, I=5, S=20, C=70):

```
diff = |25-5| + |30-5| + |25-20| + |20-70|
     = 20 + 25 + 5 + 50
     = 100

fit  = round(100 - (100/200 × 100))
     = round(100 - 50)
     = 50%  → 🔴 Red
```

---

### PHASE 9: Profession Suitability (New Engine)

Riya selects **"Software Engineer"** from the dropdown.

#### Step 1 — Get Foundation Scores from Report

```
active    = 60  (Vertical %)
receptive = 40  (100 - 60)
agreeable = 60  (Horizontal %)
skeptical = 40  (100 - 60)
```

#### Step 2 — Re-derive Raw DISC Scores

```
rawD = (60 + 40) / 2 = 50
rawI = (60 + 60) / 2 = 60
rawS = (40 + 60) / 2 = 50
rawC = (40 + 40) / 2 = 40
```

#### Step 3 — Normalize to Sum = 100

```
total = 50 + 60 + 50 + 40 = 200

userD = round(50/200 × 100) = 25%
userI = round(60/200 × 100) = 30%
userS = round(50/200 × 100) = 25%
userC = round(40/200 × 100) = 20%
```

#### Step 4 — Look Up Software Engineer Profile

```
Software Engineer: D=10, I=10, S=30, C=50
```

#### Step 5 — Calculate Fit

```
diff = |25-10| + |30-10| + |25-30| + |20-50|
     = 15 + 20 + 5 + 30
     = 70

fit = round(100 - (70/200 × 100))
    = round(100 - 35)
    = 65%
```

#### Step 6 — Classify

```
65% → falls in 55-69 range → "Moderate Fit"
```

#### Step 7 — Find Strengths (user > profession)

```
D: user 25% vs required 10% → surplus = 15%  ✅
I: user 30% vs required 10% → surplus = 20%  ✅
S: user 25% vs required 30% → deficit!        ❌
C: user 20% vs required 50% → deficit!        ❌
```

Sort by surplus: I (20%) > D (15%) → **Top 2 Strengths:**

```
┌──────────────────────────────────────────────────────────────┐
│  Strength 1: I — "Cross-Team Communication"  (+20% surplus) │
│  Strength 2: D — "Technical Leadership"      (+15% surplus) │
└──────────────────────────────────────────────────────────────┘
```

#### Step 8 — Find Development Areas (user < profession)

```
C: user 20% vs required 50% → deficit = 30%  ← biggest gap
S: user 25% vs required 30% → deficit = 5%
```

Sort by deficit: C (30%) > S (5%) → **Top 2 Development Areas:**

```
┌──────────────────────────────────────────────────────────────┐
│  Dev Area 1: C — "Analytical Rigor"           (−30% gap)    │
│  Dev Area 2: S — "Patience in Collaboration"  (−5% gap)     │
└──────────────────────────────────────────────────────────────┘
```

#### Step 9 — Improvement Suggestions

For each development area, pull the first suggestion:

```
C improvement: "Dedicate time to code quality through testing and documentation"
S improvement: "Practice pair programming to develop patience and cooperative coding habits"
```

#### Step 10 — Why This Profession?

Since fit = "Moderate Fit":

```
Top 2 profession requirements:
  #1: Clarity (50%)
  #2: Support (30%)

Generated text:
"Software Engineer emphasizes Clarity (50%) and Support (30%),
 which requires some adaptation from your natural profile.
 Targeted development in these areas can improve your fit over time."
```

#### Step 11 — Final Recommendation

```
Moderate Fit → CONDITIONAL

Summary: "Moderate Fit — Consider with Development"
Reason:  "Software Engineer is achievable with focused development.
          Building your Clarity and Support capabilities would
          significantly improve your alignment and effectiveness
          in this role."
```

---

### 📊 Riya's Final Profession Suitability Card

```
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   Software Engineer                              65% FIT     ║
║   ─────────────────────────────────────────────              ║
║   Classification: Moderate Fit                               ║
║                                                              ║
║   YOUR PROFILE vs PROFESSION IDEAL:                          ║
║                                                              ║
║   D:  You 25%  ████████████▒▒▒▒▒▒▒▒                         ║
║       Need 10% ████▒▒▒▒▒▒▒▒▒▒▒▒▒▒                          ║
║                                                              ║
║   I:  You 30%  ██████████████▒▒▒▒▒▒                         ║
║       Need 10% ████▒▒▒▒▒▒▒▒▒▒▒▒▒▒                          ║
║                                                              ║
║   S:  You 25%  ████████████▒▒▒▒▒▒▒▒                         ║
║       Need 30% ██████████████▒▒▒▒▒▒                         ║
║                                                              ║
║   C:  You 20%  █████████▒▒▒▒▒▒▒▒▒▒▒                        ║
║       Need 50% ████████████████████████▒▒                    ║
║                                                              ║
║   ┌─────────────────────┐ ┌──────────────────────────────┐   ║
║   │ ✅ STRENGTHS        │ │ 📈 DEVELOPMENT AREAS         │   ║
║   │                     │ │                              │   ║
║   │ Cross-Team Comm (I) │ │ Analytical Rigor (C)         │   ║
║   │  +20% surplus       │ │  −30% gap                    │   ║
║   │                     │ │                              │   ║
║   │ Tech Leadership (D) │ │ Patience in Collab (S)       │   ║
║   │  +15% surplus       │ │  −5% gap                     │   ║
║   └─────────────────────┘ └──────────────────────────────┘   ║
║                                                              ║
║   💡 IMPROVEMENT SUGGESTIONS:                                ║
║   1. Dedicate time to code quality through testing           ║
║      and documentation                                       ║
║   2. Practice pair programming to develop patience           ║
║      and cooperative coding habits                           ║
║                                                              ║
║   ⚡ WHY THIS PROFESSION?                                    ║
║   Software Engineer emphasizes Clarity (50%) and             ║
║   Support (30%), which requires some adaptation from         ║
║   your natural profile.                                      ║
║                                                              ║
║   ⚠️ RECOMMENDATION: CONDITIONAL                             ║
║   Consider with Development — Building your Clarity and      ║
║   Support capabilities would significantly improve           ║
║   your alignment.                                            ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

---

## Quick Reference — All Formulas on One Page

```
───────────────────── INPUTS ─────────────────────
38 questions → 4 buckets (Active, Receptive, Agreeable, Skeptical)
  All start at 1 (base value)

───────────────── RAW DISC SCORES ────────────────
D = round((Active + Skeptical) / 2)
I = round((Active + Agreeable) / 2)
S = round((Receptive + Agreeable) / 2)
C = round((Receptive + Skeptical) / 2)

──────────────── AXIS PERCENTAGES ────────────────
Vertical%   = round(Active / (Active + Receptive) × 100)
Horizontal% = round(Agreeable / (Agreeable + Skeptical) × 100)

──────────────── PRIMARY QUADRANT ────────────────
V≥50 + H≥50 → I    V≥50 + H<50 → D
V<50 + H≥50 → S    V<50 + H<50 → C

────────────── PERSONALITY STRENGTH ──────────────
strengthVal = (|V% - 50| + |H% - 50|) / 2
≥30=Very Strong  ≥20=Strong  ≥10=Moderate  <10=Mild

──────── NORMALIZED DISC (for fit matching) ──────
total = rawD + rawI + rawS + rawC
normX = round((rawX / total) × 100)

───────────── FIT PERCENTAGE (both engines) ──────
diff = |normD-profD| + |normI-profI| + |normS-profS| + |normC-profC|
fit  = round(100 - (diff / 200) × 100)

────── PROFESSION SUITABILITY CLASSIFICATION ─────
≥90=Exceptional  ≥80=Strong  ≥70=Good  ≥55=Moderate  <55=Weak

──── PROFESSION SUITABILITY RECOMMENDATION ───────
Exceptional/Strong/Good → YES (Recommended)
Moderate                → CONDITIONAL (Consider with Development)
Weak                    → NO (Consider Alternatives)
```

---

*Generated from EpicQuest DISC Engine v1.0 — Algorithm Documentation*
