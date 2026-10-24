# NPTEL Java KBC Quiz Game ⚡

An authentic Kaun Banega Crorepati (KBC) inspired quiz game designed for **NPTEL Programming in Java** exam preparation. Built purely with Vanilla HTML5, CSS3, and JavaScript, featuring Web Audio API sound effects and zero external dependencies.

---

## 🌟 Key Features

1. **Two Distinct Game Modes**:
   - **Option 1 — Most Important Questions**: 90 curated high-yield questions in randomized playback. Features sudden-death rules, `+1 / -1` score tracking (-90 to +90 range), and 5 classic KBC lifelines.
   - **Option 2 — Topic-Wise Challenge**: 12 dedicated syllabus modules (10 questions each) with instant feedback and no score penalties.
2. **Authentic KBC Hot Seat Studio**:
   - Deep midnight-blue studio backgrounds with ambient beams and gold accents.
   - Central question stage with lozenge frames and A, B, C, D answer options.
   - Suspenseful lock-in state, emerald-green correct celebrations, and crimson wrong animations.
   - 100% client-side Web Audio API synthesizer for realistic audio cues (sound toggle included).
3. **5 Realistic KBC Lifelines**:
   - **50:50**: Eliminates two incorrect options.
   - **Audience Poll**: Simulated studio audience voting bar chart totaling 100%.
   - **Expert Advice**: Syllabus-tailored contextual hint dialog.
   - **Skip Question**: Bypasses the question without score penalty.
   - **Double Chance**: Provides two attempts on a question without instant game over on the first mistake.
4. **Comprehensive Review System**:
   - Post-game review screen detailing your selected answers, correct answers, status, and full explanations.
5. **Interactive Rulebook**:
   - Built-in rules modal accessible from anywhere.

---

## 📂 Project Structure

```text
JavaKBCQuiz/
├── index.html       # Single-page application structure & modals
├── style.css        # Authentic KBC visual design system (8px grid)
├── questions.js    # Verified database of 120 NPTEL questions across 12 modules
├── script.js       # Core quiz engine, lifelines, synthesizer & state manager
└── README.md        # Documentation and running instructions
```

---

## 🎯 Syllabus Modules Covered (120 Questions Total)

| Section | Topic Name | Questions |
|---|---|---|
| **01** | Java Basics and JVM | Q1 – Q10 |
| **02** | OOP Fundamentals | Q11 – Q20 |
| **03** | Java Programming Elements | Q21 – Q30 |
| **04** | Classes and Encapsulation | Q31 – Q40 |
| **05** | Inheritance and Polymorphism | Q41 – Q50 |
| **06** | Interfaces and Packages | Q51 – Q60 |
| **07** | Exception Handling | Q61 – Q70 |
| **08** | Multithreading | Q71 – Q80 |
| **09** | Input/Output and Strings | Q81 – Q90 |
| **10** | Applets, Servlets, AWT and Swing | Q91 – Q100 |
| **11** | Networking and JDBC | Q101 – Q110 |
| **12** | Mixed Output-Based Questions | Q111 – Q120 |

---

## 🚀 How to Run Locally

### Method 1: Direct Browser Launch
Simply double-click [`index.html`](file:///d:/GITHUB/Mini-Project/JavaKBCQuiz/index.html) or open it in any modern browser (Chrome, Edge, Firefox, Brave, Safari).

### Method 2: Local HTTP Server (Optional)
Run using Node.js:
```bash
npx serve d:\GITHUB\Mini-Project\JavaKBCQuiz -l 5173
```
Or with Python:
```bash
python -m http.server 8000
```
Open `http://localhost:5173` in your browser.
