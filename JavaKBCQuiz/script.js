/**
 * NPTEL Java KBC Quiz Game - Interactive Controller & Game Logic
 * Implements Option 1 (90 High-Yield Questions, 5 Lifelines, Sudden Death, Score Tracking)
 * and Option 2 (12 Topic Challenges, 10 Questions/Topic, Instant Feedback).
 */

// ==========================================================================
// 1. Audio Engine (Web Audio API Synthesizer - 100% offline, zero assets)
// ==========================================================================
class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.isMuted = false;
  }

  initAudio() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  playTone(frequency, type, duration, gainVal = 0.1) {
    if (this.isMuted) return;
    this.initAudio();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gainNode = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);

      gainNode.gain.setValueAtTime(gainVal, this.audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

      osc.connect(gainNode);
      gainNode.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch {
      // Audio fallback silent
    }
  }

  playLock() {
    this.playTone(180, 'sine', 0.5, 0.18);
    setTimeout(() => this.playTone(220, 'triangle', 0.4, 0.12), 150);
  }

  playCorrect() {
    this.playTone(330, 'triangle', 0.25, 0.15);
    setTimeout(() => this.playTone(440, 'triangle', 0.25, 0.18), 120);
    setTimeout(() => this.playTone(554, 'triangle', 0.25, 0.2), 240);
    setTimeout(() => this.playTone(659, 'sine', 0.6, 0.25), 360);
  }

  playWrong() {
    this.playTone(220, 'sawtooth', 0.3, 0.2);
    setTimeout(() => this.playTone(165, 'sawtooth', 0.35, 0.25), 180);
    setTimeout(() => this.playTone(110, 'sawtooth', 0.6, 0.3), 360);
  }

  playLifeline() {
    this.playTone(440, 'sine', 0.15, 0.15);
    setTimeout(() => this.playTone(660, 'sine', 0.15, 0.15), 100);
    setTimeout(() => this.playTone(880, 'sine', 0.3, 0.18), 200);
  }

  playClick() {
    this.playTone(520, 'sine', 0.06, 0.08);
  }
}

const sounds = new SoundEngine();

// ==========================================================================
// 2. Utility & Helper Functions
// ==========================================================================
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// ==========================================================================
// 3. Application State
// ==========================================================================
const AppState = {
  currentView: 'screen-home',
  
  // Game Mode 1: Most Important Questions
  mode1: {
    questions: [],
    currentIndex: 0,
    score: 0,
    lives: 5,
    correctCount: 0,
    wrongCount: 0,
    skippedCount: 0,
    attemptedCount: 0,
    lifelines: {
      fiftyFifty: false,
      audiencePoll: false,
      expertAdvice: false,
      skipQuestion: false,
      doubleChance: false
    },
    isDoubleChanceActive: false,
    doubleChanceAttempt: 0,
    isSelectionLocked: false,
    userHistory: [] // { question, selectedOption, correctOption, isCorrect, isSkipped }
  },

  // Game Mode 2: Topic Challenge
  mode2: {
    selectedTopic: null,
    questions: [],
    currentIndex: 0,
    correctCount: 0,
    wrongCount: 0,
    attemptedCount: 0,
    isCompleted: false,
    isSelectionLocked: false,
    lastWrongQuestion: null
  }
};

// ==========================================================================
// 4. View Navigation
// ==========================================================================
function switchView(viewId) {
  document.querySelectorAll('.screen-view').forEach(view => {
    view.classList.remove('active');
  });

  const targetView = document.getElementById(viewId);
  if (targetView) {
    targetView.classList.add('active');
    AppState.currentView = viewId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ==========================================================================
// 5. Game Mode 1 Engine (Most Important Questions)
// ==========================================================================
function initMode1Game() {
  sounds.playClick();
  
  // Filter questions matching IMPORTANT_QUESTION_IDS
  const importantQuestions = QUESTIONS_DATA.filter(q => IMPORTANT_QUESTION_IDS.includes(q.id));
  
  AppState.mode1 = {
    questions: shuffleArray(importantQuestions),
    currentIndex: 0,
    score: 0,
    lives: 5,
    correctCount: 0,
    wrongCount: 0,
    skippedCount: 0,
    attemptedCount: 0,
    lifelines: {
      fiftyFifty: false,
      audiencePoll: false,
      expertAdvice: false,
      skipQuestion: false,
      doubleChance: false
    },
    isDoubleChanceActive: false,
    doubleChanceAttempt: 0,
    isSelectionLocked: false,
    userHistory: []
  };

  const livesGroup = document.getElementById('arena-lives-group');
  if (livesGroup) livesGroup.style.display = 'flex';
  updateLivesUI();
  updateLifelinesUI();
  updateDoubleChanceBanner();
  switchView('screen-arena');
  renderMode1Question();
}

function updateLivesUI(animateIndex = -1) {
  const mode = AppState.mode1;
  for (let i = 1; i <= 5; i++) {
    const heartEl = document.getElementById(`life-${i}`);
    if (heartEl) {
      heartEl.classList.remove('pulse-loss');
      heartEl.classList.toggle('lost', i > mode.lives);
      if (i === animateIndex) {
        heartEl.classList.add('pulse-loss');
      }
    }
  }
}

function renderMode1Question() {
  const mode = AppState.mode1;
  const currentQ = mode.questions[mode.currentIndex];
  
  if (!currentQ) {
    endMode1Game("All questions completed!");
    return;
  }

  mode.isSelectionLocked = false;
  mode.doubleChanceAttempt = mode.isDoubleChanceActive ? mode.doubleChanceAttempt : 0;

  // Header stats
  document.getElementById('arena-progress-label').textContent = `Question ${mode.currentIndex + 1} of ${mode.questions.length}`;
  const scoreEl = document.getElementById('arena-score-val');
  scoreEl.textContent = mode.score >= 0 ? `+${mode.score}` : `${mode.score}`;
  scoreEl.classList.toggle('score-negative', mode.score < 0);

  // Question details
  document.getElementById('arena-topic-badge').textContent = currentQ.topic;
  document.getElementById('arena-original-id').textContent = `NPTEL ID: Q${currentQ.id}`;
  document.getElementById('arena-question-text').textContent = currentQ.question;

  // Shuffle options while tracking the correct answer
  const rawOptions = [
    { key: 'A', text: currentQ.options.A, isCorrect: currentQ.correctAnswer === 'A' },
    { key: 'B', text: currentQ.options.B, isCorrect: currentQ.correctAnswer === 'B' },
    { key: 'C', text: currentQ.options.C, isCorrect: currentQ.correctAnswer === 'C' },
    { key: 'D', text: currentQ.options.D, isCorrect: currentQ.correctAnswer === 'D' }
  ];

  const shuffledOptions = shuffleArray(rawOptions);
  currentQ._shuffledOptions = shuffledOptions;

  const optionsContainer = document.getElementById('arena-options-grid');
  optionsContainer.innerHTML = '';

  const displayLetters = ['A', 'B', 'C', 'D'];
  shuffledOptions.forEach((opt, idx) => {
    const letter = displayLetters[idx];
    opt.displayLetter = letter;

    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.id = `opt-btn-${letter}`;
    btn.setAttribute('aria-label', `Option ${letter}: ${opt.text}`);
    btn.innerHTML = `
      <span class="option-badge">${letter}</span>
      <span class="option-text">${opt.text}</span>
    `;

    btn.addEventListener('click', () => handleMode1OptionSelect(opt, btn));
    optionsContainer.appendChild(btn);
  });
}

function handleMode1OptionSelect(selectedOpt, btnElement) {
  const mode = AppState.mode1;
  if (mode.isSelectionLocked) return;

  mode.isSelectionLocked = true;
  sounds.playLock();
  btnElement.classList.add('locked');

  // Lock in suspense animation for 1000ms
  setTimeout(() => {
    btnElement.classList.remove('locked');
    const currentQ = mode.questions[mode.currentIndex];
    const isCorrect = selectedOpt.isCorrect;

    if (mode.isDoubleChanceActive) {
      handleDoubleChanceSelection(isCorrect, selectedOpt, btnElement, currentQ);
      return;
    }

    // Standard Single Attempt Logic
    mode.attemptedCount++;

    if (isCorrect) {
      sounds.playCorrect();
      btnElement.classList.add('correct');
      mode.score++;
      mode.correctCount++;

      mode.userHistory.push({
        question: currentQ,
        selectedOptionText: selectedOpt.text,
        selectedLetter: selectedOpt.displayLetter,
        isCorrect: true,
        isSkipped: false
      });

      setTimeout(() => {
        mode.currentIndex++;
        renderMode1Question();
      }, 1200);

    } else {
      sounds.playWrong();
      btnElement.classList.add('wrong');
      highlightCorrectOption(currentQ._shuffledOptions);
      mode.score--;
      mode.wrongCount++;
      mode.lives--;
      updateLivesUI(mode.lives + 1);

      const scoreEl = document.getElementById('arena-score-val');
      scoreEl.textContent = mode.score >= 0 ? `+${mode.score}` : `${mode.score}`;
      scoreEl.classList.toggle('score-negative', mode.score < 0);

      mode.userHistory.push({
        question: currentQ,
        selectedOptionText: selectedOpt.text,
        selectedLetter: selectedOpt.displayLetter,
        isCorrect: false,
        isSkipped: false
      });

      if (mode.lives <= 0) {
        setTimeout(() => {
          endMode1Game("Out of Lives! You gave 5 wrong answers.");
        }, 1600);
      } else {
        setTimeout(() => {
          mode.currentIndex++;
          renderMode1Question();
        }, 1600);
      }
    }
  }, 1000);
}

function handleDoubleChanceSelection(isCorrect, selectedOpt, btnElement, currentQ) {
  const mode = AppState.mode1;
  mode.doubleChanceAttempt++;

  if (isCorrect) {
    sounds.playCorrect();
    btnElement.classList.add('correct');
    mode.score++;
    mode.correctCount++;
    mode.attemptedCount++;
    mode.isDoubleChanceActive = false;
    updateDoubleChanceBanner();

    mode.userHistory.push({
      question: currentQ,
      selectedOptionText: selectedOpt.text,
      selectedLetter: selectedOpt.displayLetter,
      isCorrect: true,
      isSkipped: false
    });

    setTimeout(() => {
      mode.currentIndex++;
      renderMode1Question();
    }, 1200);

  } else {
    // First attempt failed
    if (mode.doubleChanceAttempt === 1) {
      sounds.playWrong();
      btnElement.classList.add('wrong');
      btnElement.disabled = true;
      mode.isSelectionLocked = false;
      document.getElementById('double-chance-banner').textContent = "DOUBLE CHANCE ACTIVE: ATTEMPT 1 FAILED! SELECT ANOTHER OPTION";
    } else {
      // Second attempt failed
      sounds.playWrong();
      btnElement.classList.add('wrong');
      highlightCorrectOption(currentQ._shuffledOptions);
      mode.score--;
      mode.wrongCount++;
      mode.attemptedCount++;
      mode.lives--;
      updateLivesUI(mode.lives + 1);

      const scoreEl = document.getElementById('arena-score-val');
      scoreEl.textContent = mode.score >= 0 ? `+${mode.score}` : `${mode.score}`;
      scoreEl.classList.toggle('score-negative', mode.score < 0);

      mode.isDoubleChanceActive = false;
      updateDoubleChanceBanner();

      mode.userHistory.push({
        question: currentQ,
        selectedOptionText: selectedOpt.text,
        selectedLetter: selectedOpt.displayLetter,
        isCorrect: false,
        isSkipped: false
      });

      if (mode.lives <= 0) {
        setTimeout(() => {
          endMode1Game("Out of Lives! Double Chance second attempt failed.");
        }, 1600);
      } else {
        setTimeout(() => {
          mode.currentIndex++;
          renderMode1Question();
        }, 1600);
      }
    }
  }
}

function highlightCorrectOption(shuffledOptions) {
  shuffledOptions.forEach(opt => {
    if (opt.isCorrect) {
      const btn = document.getElementById(`opt-btn-${opt.displayLetter}`);
      if (btn) btn.classList.add('correct');
    }
  });
}

function updateDoubleChanceBanner() {
  const banner = document.getElementById('double-chance-banner');
  if (AppState.mode1.isDoubleChanceActive) {
    banner.classList.add('active');
    banner.textContent = AppState.mode1.doubleChanceAttempt === 1
      ? "DOUBLE CHANCE ACTIVE: ATTEMPT 1 FAILED! CHOOSE AGAIN"
      : "DOUBLE CHANCE ACTIVE: 2 ATTEMPTS AVAILABLE";
  } else {
    banner.classList.remove('active');
  }
}

function updateLifelinesUI() {
  const lifelines = AppState.mode1.lifelines;
  setLifelineState('ll-fifty', lifelines.fiftyFifty);
  setLifelineState('ll-poll', lifelines.audiencePoll);
  setLifelineState('ll-expert', lifelines.expertAdvice);
  setLifelineState('ll-skip', lifelines.skipQuestion);
  setLifelineState('ll-double', lifelines.doubleChance);
}

function setLifelineState(btnId, isUsed) {
  const btn = document.getElementById(btnId);
  if (btn) {
    btn.disabled = isUsed;
    btn.classList.toggle('used', isUsed);
  }
}

// ==========================================================================
// 6. Lifelines Implementations (Mode 1 Only)
// ==========================================================================
function useFiftyFifty() {
  const mode = AppState.mode1;
  if (mode.lifelines.fiftyFifty || mode.isSelectionLocked) return;

  sounds.playLifeline();
  mode.lifelines.fiftyFifty = true;
  updateLifelinesUI();

  const currentQ = mode.questions[mode.currentIndex];
  const incorrectOptions = currentQ._shuffledOptions.filter(opt => !opt.isCorrect);
  const shuffledIncorrect = shuffleArray(incorrectOptions);

  // Eliminate exactly 2 incorrect options
  const toEliminate = shuffledIncorrect.slice(0, 2);
  toEliminate.forEach(opt => {
    const btn = document.getElementById(`opt-btn-${opt.displayLetter}`);
    if (btn) {
      btn.classList.add('eliminated');
      btn.disabled = true;
    }
  });
}

function useAudiencePoll() {
  const mode = AppState.mode1;
  if (mode.lifelines.audiencePoll || mode.isSelectionLocked) return;

  sounds.playLifeline();
  mode.lifelines.audiencePoll = true;
  updateLifelinesUI();

  const currentQ = mode.questions[mode.currentIndex];
  const options = currentQ._shuffledOptions;

  // Generate simulated percentages totaling 100%
  // Favor correct option 70% of the time with 45-75% share
  const isCorrectFavored = Math.random() < 0.75;
  let correctShare = isCorrectFavored
    ? Math.floor(Math.random() * 30) + 48 // 48% to 77%
    : Math.floor(Math.random() * 20) + 20; // 20% to 39%

  let remaining = 100 - correctShare;
  const incorrectPercentages = [];

  for (let i = 0; i < 2; i++) {
    const share = Math.floor(Math.random() * (remaining - (2 - i) * 5)) + 4;
    incorrectPercentages.push(share);
    remaining -= share;
  }
  incorrectPercentages.push(remaining); // last receives balance

  let incIdx = 0;
  const pollData = options.map(opt => {
    const pct = opt.isCorrect ? correctShare : incorrectPercentages[incIdx++];
    return {
      letter: opt.displayLetter,
      text: opt.text,
      pct
    };
  });

  // Render Poll Modal
  const pollContainer = document.getElementById('poll-bars-container');
  pollContainer.innerHTML = '';

  pollData.forEach(item => {
    const row = document.createElement('div');
    row.className = 'poll-row';
    row.innerHTML = `
      <div class="poll-row-header">
        <span>Option ${item.letter}</span>
        <span>${item.pct}%</span>
      </div>
      <div class="poll-bar-track">
        <div class="poll-bar-fill" id="poll-fill-${item.letter}"></div>
      </div>
    `;
    pollContainer.appendChild(row);

    setTimeout(() => {
      const fillEl = document.getElementById(`poll-fill-${item.letter}`);
      if (fillEl) fillEl.style.width = `${item.pct}%`;
    }, 100);
  });

  openModal('modal-poll');
}

function useExpertAdvice() {
  const mode = AppState.mode1;
  if (mode.lifelines.expertAdvice || mode.isSelectionLocked) return;

  sounds.playLifeline();
  mode.lifelines.expertAdvice = true;
  updateLifelinesUI();

  const currentQ = mode.questions[mode.currentIndex];
  document.getElementById('expert-topic-text').textContent = `Topic: ${currentQ.topic}`;
  document.getElementById('expert-hint-text').textContent = `Expert Advice: "${currentQ.hint}"`;

  openModal('modal-expert');
}

function useSkipQuestion() {
  const mode = AppState.mode1;
  if (mode.lifelines.skipQuestion || mode.isSelectionLocked) return;

  sounds.playLifeline();
  mode.lifelines.skipQuestion = true;
  updateLifelinesUI();

  const currentQ = mode.questions[mode.currentIndex];
  mode.skippedCount++;

  mode.userHistory.push({
    question: currentQ,
    selectedOptionText: "Skipped via Lifeline",
    selectedLetter: "N/A",
    isCorrect: false,
    isSkipped: true
  });

  // If last question is skipped, gracefully finish
  if (mode.currentIndex >= mode.questions.length - 1) {
    endMode1Game("All questions completed!");
    return;
  }

  mode.currentIndex++;
  renderMode1Question();
}

function useDoubleChance() {
  const mode = AppState.mode1;
  if (mode.lifelines.doubleChance || mode.isSelectionLocked) return;

  sounds.playLifeline();
  mode.lifelines.doubleChance = true;
  mode.isDoubleChanceActive = true;
  mode.doubleChanceAttempt = 0;
  updateLifelinesUI();
  updateDoubleChanceBanner();
}

// ==========================================================================
// 7. Results Screen & Review Engine
// ==========================================================================
function endMode1Game(reason) {
  const mode = AppState.mode1;
  switchView('screen-results-mode1');

  document.getElementById('m1-end-reason').textContent = reason;
  const scoreEl = document.getElementById('m1-score-val');
  scoreEl.textContent = mode.score >= 0 ? `+${mode.score}` : `${mode.score}`;
  scoreEl.classList.toggle('score-negative', mode.score < 0);

  document.getElementById('m1-correct-val').textContent = mode.correctCount;
  document.getElementById('m1-wrong-val').textContent = mode.wrongCount;
  document.getElementById('m1-skipped-val').textContent = mode.skippedCount;
  document.getElementById('m1-attempted-val').textContent = mode.attemptedCount;

  const accuracy = mode.attemptedCount > 0 
    ? Math.round((mode.correctCount / mode.attemptedCount) * 100)
    : 0;
  document.getElementById('m1-accuracy-val').textContent = `${accuracy}%`;

  const livesEl = document.getElementById('m1-lives-val');
  if (livesEl) livesEl.textContent = `${mode.lives} / 5`;

  const lifelinesUsedCount = Object.values(mode.lifelines).filter(Boolean).length;
  document.getElementById('m1-lifelines-val').textContent = `${lifelinesUsedCount} / 5`;

  // Performance message
  let perfMsg = "Time to Revise and Try Again!";
  if (mode.score >= 80) perfMsg = "Java Champion!";
  else if (mode.score >= 60) perfMsg = "Excellent Performance!";
  else if (mode.score >= 40) perfMsg = "Good Progress — Keep Practicing!";
  else if (mode.score >= 20) perfMsg = "Keep Learning Java!";

  document.getElementById('m1-performance-msg').textContent = perfMsg;
}

function renderReviewScreen() {
  sounds.playClick();
  switchView('screen-review');

  const history = AppState.mode1.userHistory;
  const container = document.getElementById('review-list-container');
  container.innerHTML = '';

  if (history.length === 0) {
    container.innerHTML = `<p class="review-empty">No questions attempted yet.</p>`;
    return;
  }

  history.forEach((item, index) => {
    const q = item.question;
    const correctLetter = q.correctAnswer;
    const correctText = q.options[correctLetter];

    const card = document.createElement('div');
    let statusClass = 'is-correct';
    let statusLabel = 'CORRECT (+1)';

    if (item.isSkipped) {
      statusClass = 'is-skipped';
      statusLabel = 'SKIPPED (0)';
    } else if (!item.isCorrect) {
      statusClass = 'is-wrong';
      statusLabel = 'WRONG (-1)';
    }

    card.className = `review-item ${statusClass}`;
    card.innerHTML = `
      <div class="review-item-header">
        <span class="review-q-num">Q${index + 1} (Original ID: Q${q.id}) — ${q.topic}</span>
        <span class="review-status-tag ${item.isSkipped ? 'skipped' : (item.isCorrect ? 'correct' : 'wrong')}">${statusLabel}</span>
      </div>
      <div class="review-question-text">${q.question}</div>
      <div class="review-answers-box">
        <div class="review-ans-row">
          <span class="review-ans-label">Your Answer:</span>
          <span class="review-ans-val ${item.isSkipped ? '' : (item.isCorrect ? 'correct' : 'wrong')}">
            ${item.isSkipped ? 'Skipped' : `${item.selectedLetter}: ${item.selectedOptionText}`}
          </span>
        </div>
        <div class="review-ans-row">
          <span class="review-ans-label">Correct Answer:</span>
          <span class="review-ans-val correct">${correctLetter}: ${correctText}</span>
        </div>
      </div>
      <div class="review-explanation">
        <strong>Explanation:</strong> ${q.explanation}
      </div>
    `;
    container.appendChild(card);
  });
}

// ==========================================================================
// 8. Game Mode 2 Engine (Topic-Wise Challenge)
// ==========================================================================
function renderTopicsScreen() {
  sounds.playClick();
  switchView('screen-topics');

  const grid = document.getElementById('topics-grid-container');
  grid.innerHTML = '';

  TOPICS.forEach(topic => {
    const card = document.createElement('div');
    card.className = 'topic-card';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Topic ${topic.id}: ${topic.name}`);
    card.innerHTML = `
      <div>
        <div class="topic-card-top">
          <span class="topic-num">Topic ${topic.id}</span>
          <span class="topic-count">10 Questions</span>
        </div>
        <h3 class="topic-card-title">${topic.name}</h3>
        <p class="topic-card-desc">${topic.description}</p>
      </div>
      <button class="btn-start-topic">Start Topic Challenge →</button>
    `;

    card.addEventListener('click', () => startTopicChallenge(topic));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        startTopicChallenge(topic);
      }
    });

    grid.appendChild(card);
  });
}

function startTopicChallenge(topic) {
  sounds.playClick();
  const topicQuestions = QUESTIONS_DATA.filter(q => q.id >= topic.startId && q.id <= topic.endId);

  AppState.mode2 = {
    selectedTopic: topic,
    questions: shuffleArray(topicQuestions),
    currentIndex: 0,
    correctCount: 0,
    wrongCount: 0,
    attemptedCount: 0,
    isCompleted: false,
    isSelectionLocked: false,
    lastWrongQuestion: null
  };

  switchView('screen-arena');
  renderMode2Question();
}

function renderMode2Question() {
  const mode = AppState.mode2;
  const currentQ = mode.questions[mode.currentIndex];

  if (!currentQ) {
    mode.isCompleted = true;
    endMode2Game("All 10 questions successfully completed!");
    return;
  }

  mode.isSelectionLocked = false;

  // Header adjustments for Mode 2 (No lifelines, no score penalties)
  document.getElementById('arena-progress-label').textContent = `Question ${mode.currentIndex + 1} of 10`;
  document.getElementById('arena-score-val').textContent = `${mode.correctCount} / 10`;
  document.getElementById('arena-score-val').classList.remove('score-negative');

  // Hide lifelines and lives in Mode 2
  document.getElementById('arena-lifelines-container').style.display = 'none';
  const livesGroup = document.getElementById('arena-lives-group');
  if (livesGroup) livesGroup.style.display = 'none';
  document.getElementById('double-chance-banner').classList.remove('active');

  // Question details
  document.getElementById('arena-topic-badge').textContent = mode.selectedTopic.name;
  document.getElementById('arena-original-id').textContent = `NPTEL ID: Q${currentQ.id}`;
  document.getElementById('arena-question-text').textContent = currentQ.question;

  const rawOptions = [
    { key: 'A', text: currentQ.options.A, isCorrect: currentQ.correctAnswer === 'A' },
    { key: 'B', text: currentQ.options.B, isCorrect: currentQ.correctAnswer === 'B' },
    { key: 'C', text: currentQ.options.C, isCorrect: currentQ.correctAnswer === 'C' },
    { key: 'D', text: currentQ.options.D, isCorrect: currentQ.correctAnswer === 'D' }
  ];

  const shuffledOptions = shuffleArray(rawOptions);
  currentQ._shuffledOptions = shuffledOptions;

  const optionsContainer = document.getElementById('arena-options-grid');
  optionsContainer.innerHTML = '';

  const displayLetters = ['A', 'B', 'C', 'D'];
  shuffledOptions.forEach((opt, idx) => {
    const letter = displayLetters[idx];
    opt.displayLetter = letter;

    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.id = `opt-btn-${letter}`;
    btn.setAttribute('aria-label', `Option ${letter}: ${opt.text}`);
    btn.innerHTML = `
      <span class="option-badge">${letter}</span>
      <span class="option-text">${opt.text}</span>
    `;

    btn.addEventListener('click', () => handleMode2OptionSelect(opt, btn));
    optionsContainer.appendChild(btn);
  });
}

function handleMode2OptionSelect(selectedOpt, btnElement) {
  const mode = AppState.mode2;
  if (mode.isSelectionLocked) return;

  mode.isSelectionLocked = true;
  sounds.playLock();
  btnElement.classList.add('locked');

  setTimeout(() => {
    btnElement.classList.remove('locked');
    const currentQ = mode.questions[mode.currentIndex];
    const isCorrect = selectedOpt.isCorrect;
    mode.attemptedCount++;

    if (isCorrect) {
      sounds.playCorrect();
      btnElement.classList.add('correct');
      mode.correctCount++;

      setTimeout(() => {
        mode.currentIndex++;
        renderMode2Question();
      }, 1100);

    } else {
      sounds.playWrong();
      btnElement.classList.add('wrong');
      highlightCorrectOption(currentQ._shuffledOptions);
      mode.wrongCount++;
      mode.lastWrongQuestion = {
        question: currentQ,
        selectedOptionText: selectedOpt.text,
        selectedLetter: selectedOpt.displayLetter
      };

      setTimeout(() => {
        endMode2Game("Round ended due to incorrect answer.");
      }, 1500);
    }
  }, 800);
}

function endMode2Game(reason) {
  const mode = AppState.mode2;
  switchView('screen-results-mode2');

  document.getElementById('m2-topic-title').textContent = mode.selectedTopic.name;
  document.getElementById('m2-end-status').textContent = reason;
  document.getElementById('m2-correct-val').textContent = `${mode.correctCount} / 10`;
  document.getElementById('m2-wrong-val').textContent = mode.wrongCount;
  document.getElementById('m2-attempted-val').textContent = `${mode.attemptedCount} / 10`;
  document.getElementById('m2-completed-val').textContent = mode.isCompleted ? "Completed (10/10)" : "Incomplete";

  const wrongBox = document.getElementById('m2-wrong-explanation-box');
  if (mode.lastWrongQuestion) {
    const q = mode.lastWrongQuestion.question;
    const correctLetter = q.correctAnswer;
    const correctText = q.options[correctLetter];

    wrongBox.style.display = 'block';
    wrongBox.innerHTML = `
      <h4 style="color: var(--state-wrong); margin-bottom: 8px;">Question that ended the round:</h4>
      <p style="font-weight: 600; margin-bottom: 8px;">${q.question}</p>
      <p style="color: var(--state-wrong); margin-bottom: 4px;"><strong>Your Answer:</strong> ${mode.lastWrongQuestion.selectedLetter}: ${mode.lastWrongQuestion.selectedOptionText}</p>
      <p style="color: var(--state-correct); margin-bottom: 8px;"><strong>Correct Answer:</strong> ${correctLetter}: ${correctText}</p>
      <p style="color: var(--text-muted); font-size: 0.9rem;"><strong>Explanation:</strong> ${q.explanation}</p>
    `;
  } else {
    wrongBox.style.display = 'none';
  }
}

// ==========================================================================
// 9. Modal Management
// ==========================================================================
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('active');
}

function closeModal(modalId) {
  sounds.playClick();
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

// Close modals when clicking overlay backdrop
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
});

// ==========================================================================
// 10. Global Event Listeners & Bootstrapping
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Navigation
  document.getElementById('btn-home-nav').addEventListener('click', () => {
    sounds.playClick();
    document.getElementById('arena-lifelines-container').style.display = 'flex';
    switchView('screen-home');
  });

  document.getElementById('btn-rules-nav').addEventListener('click', () => {
    sounds.playClick();
    openModal('modal-rules');
  });

  document.getElementById('btn-sound-toggle').addEventListener('click', (e) => {
    const isMuted = sounds.toggleMute();
    const iconWrap = document.getElementById('sound-icon-wrap');
    const labelText = document.getElementById('sound-label-text');
    if (labelText) {
      labelText.textContent = isMuted ? 'Audio Off' : 'Audio On';
    }
    if (iconWrap) {
      iconWrap.innerHTML = isMuted
        ? `<svg class="btn-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`
        : `<svg class="btn-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`;
    }
    e.currentTarget.setAttribute('aria-label', isMuted ? 'Audio Muted' : 'Audio Active');
  });

  // Home Screen Cards
  document.getElementById('card-mode-1').addEventListener('click', initMode1Game);
  document.getElementById('btn-start-mode1').addEventListener('click', (e) => {
    e.stopPropagation();
    initMode1Game();
  });

  document.getElementById('card-mode-2').addEventListener('click', renderTopicsScreen);
  document.getElementById('btn-start-mode2').addEventListener('click', (e) => {
    e.stopPropagation();
    renderTopicsScreen();
  });

  // Arena Lifelines
  document.getElementById('ll-fifty').addEventListener('click', useFiftyFifty);
  document.getElementById('ll-poll').addEventListener('click', useAudiencePoll);
  document.getElementById('ll-expert').addEventListener('click', useExpertAdvice);
  document.getElementById('ll-skip').addEventListener('click', useSkipQuestion);
  document.getElementById('ll-double').addEventListener('click', useDoubleChance);

  // Result Mode 1 Actions
  document.getElementById('btn-m1-restart').addEventListener('click', initMode1Game);
  document.getElementById('btn-m1-review').addEventListener('click', renderReviewScreen);
  document.getElementById('btn-m1-home').addEventListener('click', () => switchView('screen-home'));

  // Review Actions
  document.getElementById('btn-review-back').addEventListener('click', () => switchView('screen-results-mode1'));
  document.getElementById('btn-review-home').addEventListener('click', () => switchView('screen-home'));

  // Result Mode 2 Actions
  document.getElementById('btn-m2-restart').addEventListener('click', () => {
    startTopicChallenge(AppState.mode2.selectedTopic);
  });
  document.getElementById('btn-m2-topics').addEventListener('click', renderTopicsScreen);
  document.getElementById('btn-m2-home').addEventListener('click', () => switchView('screen-home'));

  // Modal Close Buttons
  document.querySelectorAll('.btn-close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) modal.classList.remove('active');
    });
  });
});
