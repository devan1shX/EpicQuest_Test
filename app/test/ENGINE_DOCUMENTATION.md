# 🧭 The Gunaity Epicometer™ Test Engine: How It Works!

Welcome! This guide explains exactly how our psychometric test engine calculates your personality profile. We've written it in super simple steps so it's incredibly easy to understand—even for a 5th grader! 

---

## 📖 Chapter 1: The Core Terminologies (What do these words mean?)

Before looking at the math, let's understand the basic building blocks of a person's behavior:

### 1. The Two Axes (Directions)
We measure your personality on a grid using two simple crosslines (just like an X and Y graph in math class!):

*   **↕️ The Vertical Axis (Pace & Posture): Active vs. Receptive**
    *   **Active (Fast-paced & Outgoing):** People who like to speak up first, make decisions quickly, take bold risks, and bring high energy.
    *   **Receptive (Calm & Reflective):** People who like to listen first, check details carefully, think before they speak, and move at a steady, thoughtful pace.
*   **↔️ The Horizontal Axis (Orientation): Agreeable vs. Skeptical**
    *   **Agreeable (People-Focused & Warm):** People who prioritize team harmony, helping others, building consensus, and making sure everyone is happy.
    *   **Skeptical (Task-Focused & Logic-Driven):** People who prioritize accuracy, facts, high quality, and logical truth, and aren't afraid of healthy debate.

---

### 2. The Four Personality Quadrants
When you cross the vertical and horizontal axes, they divide the world into four main personality neighborhoods (Quadrants):

```
                       ▲ ACTIVE (Fast / Outgoing)
                       │
       [ D ] DRIVE     │     [ I ] INFLUENCE
       (Assertive)     │       (Hustler)
                       │
◄──────────────────────┼──────────────────────►
  SKEPTICAL            │            AGREEABLE
  (Task / Logic)       │            (People / Warm)
                       │
      [ C ] CLARITY    │     [ S ] SUPPORT
      (Intellectual)   │       (Helper)
                       │
                       ▼ RECEPTIVE (Calm / Thoughtful)
```

1.  **🔴 Drive (D - Assertive):** **Active + Skeptical.** Bold commanders who focus on tasks and moving fast.
2.  **🟡 Influence (I - Hustler):** **Active + Agreeable.** Cheerful energizers who focus on people and moving fast.
3.  **🟢 Support (S - Helper):** **Receptive + Agreeable.** Patient team-builders who focus on people and steady work.
4.  **🔵 Clarity (C - Intellectual):** **Receptive + Skeptical.** Meticulous analytical thinkers who focus on logic and steady work.

---

## 🙋‍♂️ Chapter 2: The Three Types of Questions Explained

Our test has **three sets of questions** which appear on the screen in different formats. Here is what they are and how they work in real life:

### Set 1: Adjective Pairs (Questions 1 to 24)
These are questions where you are shown **two opposite words** (one on the far left, and one on the far right) with **5 ticks (circles)** in between them. 
You must pick one tick that best describes you:

```
[ LEFT WORD ]   (O)       (O)       (O)       (O)       (O)   [ RIGHT WORD ]
               Tick 1    Tick 2    Tick 3    Tick 4    Tick 5
```

When you click a tick, the engine converts your choice into a numerical **Score** from 1 to 5:
*   **Tick 1 (Far Left):** Your Score = `1`
*   **Tick 2 (Medium Left):** Your Score = `2`
*   **Tick 3 (Center / Neutral):** Your Score = `3`
*   **Tick 4 (Medium Right):** Your Score = `4`
*   **Tick 5 (Far Right):** Your Score = `5`

#### How the engine splits the points (The Weight Formula):
For each question, the engine calculates two weights:
*   $$\text{Left Weight} = 6 - \text{Your Score}$$
*   $$\text{Right Weight} = \text{Your Score}$$

Here is exactly how many points go to each side depending on which circle you tick:
*   **If you select Tick 1 (Far Left):** Left side gets **5 points**; Right side gets **1 point**.
*   **If you select Tick 2 (Medium Left):** Left side gets **4 points**; Right side gets **2 points**.
*   **If you select Tick 3 (Center / Neutral):** Left side gets **3 points**; Right side gets **3 points**.
*   **If you select Tick 4 (Medium Right):** Left side gets **2 points**; Right side gets **4 points**.
*   **If you select Tick 5 (Far Right):** Left side gets **1 point**; Right side gets **5 points**.

---

### Set 2: Single Trait Questions (Questions 25 to 32)
These questions show you a **single adjective** (like *"Agreeable"*) and ask you to rate how much it fits you on a scale from **1 to 5**:
*   `1` = Not at all like me
*   `2` = A little like me
*   `3` = Moderately like me
*   `4` = Very much like me
*   `5` = Exactly like me

#### How the engine counts these points:
The points you select (1, 2, 3, 4, or 5) are added **directly** to the personality traits connected to that word! No subtracting from 6 is needed here.

---

### Set 3: Forced Choice Questions (Questions 33 to 38)
These are multiple-choice questions where you are given a sentence and must choose between **exactly two options** (Option 1 or Option 2). 

#### How the engine counts these points:
Whichever option you choose adds **exactly 5 points** to the specific personality trait(s) mapped to that option.

---

## 🔢 Chapter 3: The Core Scoring Formulas

Every answer you give adds points to your **four basic scores**:
*   `activeScore` (Active)
*   `receptiveScore` (Receptive)
*   `agreeableScore` (Agreeable)
*   `skepticalScore` (Skeptical)

### 1. The Safe Start (Baseline)
To make sure we never divide by zero in our math, everyone starts with a base of **10 points** in each of the four categories:
$$\text{Active} = 10 \quad | \quad \text{Receptive} = 10 \quad | \quad \text{Agreeable} = 10 \quad | \quad \text{Skeptical} = 10$$

---

### 2. Calculating Percentages (Where you sit on the axes)
The engine turns your accumulated scores into final percentages:

$$\text{Vertical (Active) Percent} = \text{Math.round}\left(\frac{\text{activeScore}}{\text{activeScore} + \text{receptiveScore}} \times 100\right)$$
*   If this is **50% or more**, you lean **Active**.
*   If it is **less than 50%**, you lean **Receptive** (which is calculated as $100\% - \text{Active Percent}$).

$$\text{Horizontal (Agreeable) Percent} = \text{Math.round}\left(\frac{\text{agreeableScore}}{\text{agreeableScore} + \text{skepticalScore}} \times 100\right)$$
*   If this is **50% or more**, you lean **Agreeable**.
*   If it is **less than 50%**, you lean **Skeptical** (which is calculated as $100\% - \text{Agreeable Percent}$).

---

### 3. Deciding Your Primary Quadrant (The neighborhood you live in)
Using your percentages, the engine maps your coordinates:

| Horizontal (Agreeable) | Vertical (Active) | Primary Quadrant Type |
| :--- | :--- | :--- |
| **50% or more** | **50% or more** | **🟡 Influence (Hustler)** |
| **Less than 50%** | **50% or more** | **🔴 Drive (Assertive)** |
| **Less than 50%** | **Less than 50%** | **🔵 Clarity (Intellectual)** |
| **50% or more** | **Less than 50%** | **🟢 Support (Helper)** |

---

### 4. Deciding the 4 Style Scores
The engine calculates a balanced capability score (out of 100) for all four modes to see how adaptable you are:
*   **Drive Score (D):** $\text{Math.round}\left(\frac{\text{Active} + \text{Skeptical}}{2}\right)$
*   **Influence Score (I):** $\text{Math.round}\left(\frac{\text{Active} + \text{Agreeable}}{2}\right)$
*   **Support Score (S):** $\text{Math.round}\left(\frac{\text{Receptive} + \text{Agreeable}}{2}\right)$
*   **Clarity Score (C):** $\text{Math.round}\left(\frac{\text{Receptive} + \text{Skeptical}}{2}\right)$

---

## 🏫 Chapter 4: A Complete Walkthrough Example (Let's calculate Bob's scores!)

Let's meet **Bob**. We are going to calculate Bob's profile step-by-step to show you exactly how the math works in action.

### Step 1: Bob starts with the baseline of 10 points!
Before answering anything, Bob's score card looks like this:
*   `activeScore` = **10**
*   `receptiveScore` = **10**
*   `agreeableScore` = **10**
*   `skepticalScore` = **10**

---

### Step 2: Bob answers three different questions

#### Answer A: Set 1 (Adjective Pair) — Question 2: "Cheerful" vs "Methodical"
Bob chooses **Tick 2** (meaning he leans moderately towards *Cheerful*).
*   His Score = **2**
*   Left Weight (for Cheerful) = $6 - 2 = $ **4**
*   Right Weight (for Methodical) = **2**

**What gets added and where?**
*   *Cheerful* is mapped to **Active** and **Agreeable** $\rightarrow$ We add the Left Weight (**4**) to `activeScore` and `agreeableScore`.
*   *Methodical* is mapped to **Receptive** and **Skeptical** $\rightarrow$ We add the Right Weight (**2**) to `receptiveScore` and `skepticalScore`.

*Current Scores after Question 2:*
*   `activeScore` = $10 + 4 = $ **14**
*   `receptiveScore` = $10 + 2 = $ **12**
*   `agreeableScore` = $10 + 4 = $ **14**
*   `skepticalScore` = $10 + 2 = $ **12**

---

#### Answer B: Set 2 (Single Trait Rating) — Question 27: "Sociable"
Bob rates himself as a **4** ("Very much like me").
*   His Score = **4**

**What gets added and where?**
*   *Sociable* is mapped to both **Active** and **Agreeable** $\rightarrow$ We add the score (**4**) directly to `activeScore` and `agreeableScore`.

*Current Scores after Question 27:*
*   `activeScore` = $14 + 4 = $ **18**
*   `receptiveScore` = **12** (No change)
*   `agreeableScore` = $14 + 4 = $ **18**
*   `skepticalScore` = **12** (No change)

---

#### Answer C: Set 3 (Forced Choice) — Question 33: "In a group, I am..."
Bob selects **Option 1**: *"Likely to speak up"*.

**What gets added and where?**
*   Option 1 is mapped to **Active** $\rightarrow$ We add exactly **5 points** to `activeScore`.

*Final Tally of Bob's Scores:*
*   `activeScore` = $18 + 5 = $ **23**
*   `receptiveScore` = **12**
*   `agreeableScore` = **18**
*   `skepticalScore` = **12**

---

### Step 3: Calculating Bob's Coordinate Percentages

1.  **Vertical Axis (Active vs Receptive):**
    $$\text{Vertical Percent} = \text{Math.round}\left(\frac{23}{23 + 12} \times 100\right) = \text{Math.round}\left(\frac{23}{35} \times 100\right) = \text{Math.round}(65.71) = \mathbf{66\%}$$
    *   Since $66\% \ge 50\%$, Bob leans **Active** (with $66\%$ Active / $34\%$ Receptive).

2.  **Horizontal Axis (Agreeable vs Skeptical):**
    $$\text{Horizontal Percent} = \text{Math.round}\left(\frac{18}{18 + 12} \times 100\right) = \text{Math.round}\left(\frac{18}{30} \times 100\right) = \text{Math.round}(60.00) = \mathbf{60\%}$$
    *   Since $60\% \ge 50\%$, Bob leans **Agreeable** (with $60\%$ Agreeable / $40\%$ Skeptical).

---

### Step 4: Deciding Bob's Quadrant Neighborhood
Bob's coordinates are:
*   Horizontal (Agreeable) = **60%** (which is $\ge 50\%$)
*   Vertical (Active) = **66%** (which is $\ge 50\%$)

Looking at our neighborhood map from Chapter 3, Bob falls into the top-right quadrant: **🟡 Influence (Hustler)**!

---

## 📝 Chapter 5: Complete Question-by-Question Mapping Reference

Here is the exact map showing **every single question** in the test and where its points go!

### 📊 Set 1: Adjective Pairs (Questions 1 to 24)
*(Remember: Left word adds `6 - Your Score` points, Right word adds `Your Score` points)*

*   **Question 1: Open vs. Skeptical**
    *   Left word (**Open**): Adds to **Agreeable**
    *   Right word (**Skeptical**): Adds to **Skeptical**
*   **Question 2: Cheerful vs. Methodical**
    *   Left word (**Cheerful**): Adds to **Active** & **Agreeable**
    *   Right word (**Methodical**): Adds to **Receptive** & **Skeptical**
*   **Question 3: Reserved vs. Dynamic**
    *   Left word (**Reserved**): Adds to **Receptive**
    *   Right word (**Dynamic**): Adds to **Active**
*   **Question 4: Humble vs. Bold**
    *   Left word (**Humble**): Adds to **Receptive** & **Agreeable**
    *   Right word (**Bold**): Adds to **Active**
*   **Question 5: Generous vs. Strict**
    *   Left word (**Generous**): Adds to **Agreeable**
    *   Right word (**Strict**): Adds to **Skeptical**
*   **Question 6: Lively vs. Systematic**
    *   Left word (**Lively**): Adds to **Active** & **Agreeable**
    *   Right word (**Systematic**): Adds to **Receptive** & **Skeptical**
*   **Question 7: Obedient vs. Outspoken**
    *   Left word (**Obedient**): Adds to **Receptive** & **Agreeable**
    *   Right word (**Outspoken**): Adds to **Active**
*   **Question 8: Modest vs. Challenging**
    *   Left word (**Modest**): Adds to **Receptive**
    *   Right word (**Challenging**): Adds to **Active** & **Skeptical**
*   **Question 9: Helpful vs. Resolute**
    *   Left word (**Helpful**): Adds to **Agreeable**
    *   Right word (**Resolute**): Adds to **Active** & **Skeptical**
*   **Question 10: Enthusiastic vs. Accurate**
    *   Left word (**Enthusiastic**): Adds to **Active** & **Agreeable**
    *   Right word (**Accurate**): Adds to **Receptive** & **Skeptical**
*   **Question 11: Compliant vs. Enterprising**
    *   Left word (**Compliant**): Adds to **Receptive** & **Agreeable**
    *   Right word (**Enterprising**): Adds to **Active**
*   **Question 12: Gentle vs. Direct**
    *   Left word (**Gentle**): Adds to **Agreeable**
    *   Right word (**Direct**): Adds to **Active**
*   **Question 13: Accommodating vs. Firm**
    *   Left word (**Accommodating**): Adds to **Agreeable**
    *   Right word (**Firm**): Adds to **Skeptical**
*   **Question 14: Playful vs. Analytical**
    *   Left word (**Playful**): Adds to **Active** & **Agreeable**
    *   Right word (**Analytical**): Adds to **Receptive** & **Skeptical**
*   **Question 15: Tactful vs. Expressive**
    *   Left word (**Tactful**): Adds to **Agreeable**
    *   Right word (**Expressive**): Adds to **Active** & **Agreeable**
*   **Question 16: Even-Tempered vs. Tough**
    *   Left word (**Even-Tempered**): Adds to **Receptive** & **Agreeable**
    *   Right word (**Tough**): Adds to **Active** & **Skeptical**
*   **Question 17: Accepting vs. Matter-of-Fact**
    *   Left word (**Accepting**): Adds to **Agreeable**
    *   Right word (**Matter-of-Fact**): Adds to **Skeptical**
*   **Question 18: Optimistic vs. Perfectionistic**
    *   Left word (**Optimistic**): Adds to **Active** & **Agreeable**
    *   Right word (**Perfectionistic**): Adds to **Receptive** & **Skeptical**
*   **Question 19: Quiet vs. Charismatic**
    *   Left word (**Quiet**): Adds to **Receptive**
    *   Right word (**Charismatic**): Adds to **Active** & **Agreeable**
*   **Question 20: Obliging vs. Assertive**
    *   Left word (**Obliging**): Adds to **Agreeable**
    *   Right word (**Assertive**): Adds to **Active**
*   **Question 21: Trusting vs. Questioning**
    *   Left word (**Trusting**): Adds to **Agreeable**
    *   Right word (**Questioning**): Adds to **Skeptical**
*   **Question 22: Light-Hearted vs. Precise**
    *   Left word (**Light-Hearted**): Adds to **Active** & **Agreeable**
    *   Right word (**Precise**): Adds to **Receptive** & **Skeptical**
*   **Question 23: Cautious vs. Adventurous**
    *   Left word (**Cautious**): Adds to **Receptive** & **Skeptical**
    *   Right word (**Adventurous**): Adds to **Active** & **Agreeable**
*   **Question 24: Receptive vs. Decisive**
    *   Left word (**Receptive**): Adds to **Receptive**
    *   Right word (**Decisive**): Adds to **Active**

---

### 📈 Set 2: Single Adjective Ratings (Questions 25 to 32)
*(Adds the chosen score of 1 to 5 directly to the mapped categories below)*

*   **Question 25: Agreeable**
    *   Adds directly to: **Agreeable**
*   **Question 26: Daring**
    *   Adds directly to: **Active**
*   **Question 27: Sociable**
    *   Adds directly to: **Active** & **Agreeable**
*   **Question 28: Dominant**
    *   Adds directly to: **Active** & **Skeptical**
*   **Question 29: Patient**
    *   Adds directly to: **Receptive** & **Agreeable**
*   **Question 30: Soft-Spoken**
    *   Adds directly to: **Receptive** & **Agreeable**
*   **Question 31: Detail-Oriented**
    *   Adds directly to: **Receptive** & **Skeptical**
*   **Question 32: Competitive**
    *   Adds directly to: **Active** & **Skeptical**

---

### ⚖️ Set 3: Forced Choices (Questions 33 to 38)
*(Adds exactly 5 points to the mapped categories depending on which option you choose)*

*   **Question 33: "In a group, I am..."**
    *   **Option 1:** *"Likely to speak up"* $\rightarrow$ Adds 5 to **Active**
    *   **Option 2:** *"Likely to stay quiet and listen"* $\rightarrow$ Adds 5 to **Receptive**
*   **Question 34: "On a team project, I am most concerned with..."**
    *   **Option 1:** *"Getting things done correctly and efficiently"* $\rightarrow$ Adds 5 to **Skeptical**
    *   **Option 2:** *"Making sure the people involved are engaged and supported"* $\rightarrow$ Adds 5 to **Agreeable**
*   **Question 35: "I am most comfortable..."**
    *   **Option 1:** *"Taking command to make a decision"* $\rightarrow$ Adds 5 to **Active** & **Skeptical**
    *   **Option 2:** *"Letting others make the final decision"* $\rightarrow$ Adds 5 to **Receptive** & **Agreeable**
*   **Question 36: "When giving feedback to someone, I focus on..."**
    *   **Option 1:** *"Motivating the person and letting them know they’re appreciated"* $\rightarrow$ Adds 5 to **Agreeable**
    *   **Option 2:** *"Being accurate and factual about the person's performance"* $\rightarrow$ Adds 5 to **Skeptical**
    *   **Option 2:** *"Being accurate and factual about the person's performance"* $\rightarrow$ Adds 5 to **Skeptical**
*   **Question 37: "I am most attracted to..."**
    *   **Option 1:** *"Work I can do alone"* $\rightarrow$ Adds 5 to **Receptive** & **Skeptical**
    *   **Option 2:** *"Work that requires lots of interaction with others"* $\rightarrow$ Adds 5 to **Active** & **Agreeable**
*   **Question 38: "When someone presents a plan, I'm more likely to..."**
    *   **Option 1:** *"Analyze and point out the flaws in the plan"* $\rightarrow$ Adds 5 to **Skeptical**
    *   **Option 2:** *"Think about how I can be helpful in making the plan happen"* $\rightarrow$ Adds 5 to **Agreeable**
