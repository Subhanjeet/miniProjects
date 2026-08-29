<div align="center">

# 🧩 miniProjects

### a growing collection of small Java desktop games — built to sharpen GUI, OOP and database fundamentals

![Java](https://img.shields.io/badge/Java-8+-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Swing](https://img.shields.io/badge/GUI-Java%20Swing-4f46e5?style=for-the-badge)
![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Status](https://img.shields.io/badge/status-active-success?style=for-the-badge)

[![Last Commit](https://img.shields.io/github/last-commit/Subhanjeet/miniProjects?style=for-the-badge&color=orange)](https://github.com/Subhanjeet/miniProjects/commits/main)

<br>

*two games, zero frameworks, all hand-rolled Swing*

[Projects](#-projects) • [Getting Started](#-getting-started) • [Tech Stack](#-tech-stack) • [Structure](#-repo-structure) 


</div>

---

## 📖 About

**miniProjects** is where classic games get rebuilt from scratch in Java no game engines, no external UI kits, no prebuilt templates. Every gallows line, every grid cell, every click handler is written by hand.

The point isn't the games themselves it's the practice: custom rendering with `Graphics2D`, event-driven UI with Swing, clean class separation, and wiring a desktop app to a real database with JDBC.

Each project below is **complete and independent** its own README, its own setup steps, its own screenshots. This root README is just the map that ties them together.

---

## 📁 Projects

<table>
<tr>
<th align="left" width="120">Project</th>
<th align="left">What it is</th>
<th align="left">Highlights</th>
<th align="left" width="140">Stack</th>
</tr>
<tr>
<td align="center">

🪢<br><b><a href="./Hangman">Hangman</a></b>

</td>
<td>Full desktop Hangman game with a live-drawn gallows, on-screen keyboard, timer, and a persistent leaderboard</td>
<td>
• Hand-drawn gallows via <code>Graphics2D</code>, one part per mistake<br>
• Clickable QWERTY + physical keyboard, instant feedback<br>
• 60-second countdown timer<br>
• Scoring engine <code>+2</code> correct, <code>−1</code> wrong<br>
• Categorized word bank + Top 10 leaderboard in MySQL<br>
• Auto-falls back to 18 built-in words if MySQL is offline
</td>
<td>Java Swing<br>JDBC<br>MySQL 8</td>
</tr>
<tr>
<td align="center">

⭕<br><b><a href="./TicTacToe">TicTacToe</a></b>

</td>
<td>Classic 2-player Tic Tac Toe on a clean 3x3 Swing grid</td>
<td>
• Auto turn-switching between X and O<br>
• Checks all 8 win patterns rows, cols, both diagonals<br>
• Draw detection when the board fills with no winner<br>
• Popup result via <code>JOptionPane</code><br>
• Board auto-resets for an instant rematch
</td>
<td>Java Swing</td>
</tr>
</table>

---

## 🚀 Getting Started

Clone the repo once, then step into whichever project you want:

```bash
git clone https://github.com/Subhanjeet/miniProjects.git
cd miniProjects
```

<table>
<tr>
<th align="left">Project</th>
<th align="left">Requirements</th>
<th align="left">Quick run</th>
</tr>
<tr>
<td><a href="./Hangman">Hangman</a></td>
<td>JDK 8+, MySQL <i>(optional offline fallback built in)</i></td>
<td>

```bash
cd Hangman
javac -cp .;mysql-connector-j-8.x.x.jar *.java
java  -cp .;mysql-connector-j-8.x.x.jar hangman
```

</td>
</tr>
<tr>
<td><a href="./TicTacToe">TicTacToe</a></td>
<td>JDK 8+ only — nothing else to install</td>
<td>

```bash
cd TicTacToe
javac TicTacToe.java
java TicTacToe
```

</td>
</tr>
</table>

> 📌 Full setup, database schema, configuration and troubleshooting for each game live in their own README linked above.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| 💻 Language | Java (JDK 8+) |
| 🎨 GUI | Java Swing + AWT |
| 🖌️ Graphics | `Graphics2D` for custom rendering (Hangman) |
| 🗄️ Database | MySQL + JDBC (Hangman only) |
| 🏗️ Build | Plain `javac` — no Maven, no Gradle, no dependencies to manage |

---

## 📂 Repo Structure

```text
miniProjects/
├── Hangman/
│   ├── hangman.java             # entry point
│   ├── HangmanGUI.java          # game logic + controller
│   ├── HangmanCanvas.java       # Graphics2D gallows rendering
│   ├── KeyboardPanel.java       # QWERTY input
│   ├── SidebarPanel.java        # timer / score / wrong guesses
│   ├── TopBarPanel.java         # player info + nav
│   ├── LeaderboardDialog.java   # Top 10 leaderboard
│   ├── GameOverDialog.java      # win/lose + replay
│   ├── DBManager.java           # JDBC + MySQL operations
│   ├── schema.sql               # database schema
│   └── README.md
│
├── TicTacToe/
│   ├── TicTacToe.java           # single-class game
│   ├── assets/
│   │   ├── X_Win.png
│   │   ├── Y_Win.png
│   │   └── Draw.png
│   └── README.md
│
└── README.md                    # you are here
```

---


