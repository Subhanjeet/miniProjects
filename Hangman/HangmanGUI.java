import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.util.HashSet;
import java.util.Set;
import javax.swing.BorderFactory;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.SwingConstants;
import javax.swing.Timer;

public class HangmanGUI extends JFrame {
    private static final int MAX_ATTEMPTS = 6;
    private static final int MAX_TIME_SECONDS = 60;
    private static final Color BG_NAVY = new Color(15, 23, 42);
    private static final Color BG_CARD = new Color(238, 242, 255);
    private static final Color TEXT_PRIMARY = new Color(67, 56, 202);

    private String targetWord = "";
    private String categoryText = "";
    private String playerName = "Player";
    private int wrongAttempts = 0;
    private int score = 0;
    private int timerSeconds = 0;

    private final Set<Character> guessedLetters = new HashSet<>();
    private final Set<Character> wrongLettersList = new HashSet<>();
    private Timer gameTimer;

    private final JLabel wordLabel = new JLabel("", SwingConstants.CENTER);
    private final JLabel categoryLabel = new JLabel("🐾 ANIMAL 🐾", SwingConstants.CENTER);
    private final JLabel hintLabel = new JLabel("💡 Guess the word name", SwingConstants.CENTER);

    private final HangmanCanvas canvas = new HangmanCanvas();
    private final SidebarPanel sidebar = new SidebarPanel();
    private TopBarPanel topBar;
    private KeyboardPanel keyboardPanel;

    public HangmanGUI() {
        setTitle("Hangman Game");
        setSize(1020, 750);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        getContentPane().setBackground(BG_NAVY);

        promptPlayerName();
        initUI();
        startNewGame();
    }

    private void promptPlayerName() {
        String input = JOptionPane.showInputDialog(this, "Enter your Name:", "Welcome to Hangman", JOptionPane.QUESTION_MESSAGE);
        if (input != null && !input.trim().isEmpty()) {
            this.playerName = input.trim();
        }
    }

    private void initUI() {
        setLayout(new BorderLayout(12, 12));

        topBar = new TopBarPanel(
            playerName,
            () -> new LeaderboardDialog(this).setVisible(true),
            this::startNewGame
        );
        add(topBar, BorderLayout.NORTH);

        // Center Main Game Board Card
        JPanel mainBoard = new JPanel(new BorderLayout());
        mainBoard.setBackground(BG_CARD);
        mainBoard.setBorder(BorderFactory.createEmptyBorder(15, 15, 15, 15));

        categoryLabel.setFont(new Font("SansSerif", Font.BOLD, 20));
        categoryLabel.setForeground(TEXT_PRIMARY);
        mainBoard.add(categoryLabel, BorderLayout.NORTH);
        mainBoard.add(canvas, BorderLayout.WEST);

        // Word & Hint Container
        JPanel centerWordPanel = new JPanel(new GridBagLayout());
        centerWordPanel.setOpaque(false);

        GridBagConstraints gbc = new GridBagConstraints();
        gbc.gridx = 0; gbc.gridy = 0;
        gbc.insets = new Insets(10, 10, 25, 10);
        wordLabel.setFont(new Font("Monospaced", Font.BOLD, 36));
        wordLabel.setForeground(TEXT_PRIMARY);
        centerWordPanel.add(wordLabel, gbc);

        gbc.gridy = 1;
        gbc.insets = new Insets(0, 10, 10, 10);
        hintLabel.setFont(new Font("SansSerif", Font.BOLD, 14));
        hintLabel.setForeground(new Color(99, 102, 241));
        centerWordPanel.add(hintLabel, gbc);

        mainBoard.add(centerWordPanel, BorderLayout.CENTER);
        add(mainBoard, BorderLayout.CENTER);

        sidebar.setPreferredSize(new Dimension(250, 0));
        add(sidebar, BorderLayout.EAST);

        keyboardPanel = new KeyboardPanel(this::processGuess);
        add(keyboardPanel, BorderLayout.SOUTH);

        setFocusable(true);
        addKeyListener(new KeyAdapter() {
            @Override
            public void keyPressed(KeyEvent e) {
                keyboardPanel.handleKeyPress(e.getKeyChar());
            }
        });
    }

    private void startNewGame() {
        if (gameTimer != null) gameTimer.stop();
        String[] data = DBManager.fetchRandomWord();
        targetWord = data[0].toUpperCase();
        categoryText = data[1];

        wrongAttempts = 0;
        score = 0;
        timerSeconds = 0;
        guessedLetters.clear();
        wrongLettersList.clear();

        canvas.setWrongAttempts(0);
        categoryLabel.setText("✨ " + categoryText.toUpperCase() + " ✨");
        hintLabel.setText("💡 Guess the " + categoryText.toLowerCase() + " name");
        updateWordDisplay();

        sidebar.updateTimer(timerSeconds);
        sidebar.updateWrongGuesses("");
        sidebar.updateScore(score);
        keyboardPanel.resetKeyboard();

        gameTimer = new Timer(1000, e -> {
            timerSeconds++;
            sidebar.updateTimer(timerSeconds);
            if (timerSeconds >= MAX_TIME_SECONDS) {
                gameTimer.stop();
                endGame(false);
            }
        });
        gameTimer.start();
    }

    private void processGuess(char letter) {
        guessedLetters.add(letter);
        if (targetWord.indexOf(letter) >= 0) {
            keyboardPanel.markLetterResult(letter, true);
            score += 2;
            sidebar.updateScore(score);
            updateWordDisplay();
            if (isWordGuessed()) endGame(true);
        } else {
            keyboardPanel.markLetterResult(letter, false);
            wrongAttempts++;
            wrongLettersList.add(letter);
            score = Math.max(0, score - 1);
            sidebar.updateScore(score);
            canvas.setWrongAttempts(wrongAttempts);
            sidebar.updateWrongGuesses(wrongLettersList.toString().replace("[","").replace("]",""));
            if (wrongAttempts >= MAX_ATTEMPTS) endGame(false);
        }
    }

    private void updateWordDisplay() {
        StringBuilder sb = new StringBuilder();
        for (char c : targetWord.toCharArray()) {
            sb.append(guessedLetters.contains(c) ? c : '_').append(" ");
        }
        wordLabel.setText(sb.toString().trim());
    }

    private boolean isWordGuessed() {
        for (char c : targetWord.toCharArray()) {
            if (!guessedLetters.contains(c)) return false;
        }
        return true;
    }

    private void endGame(boolean isWon) {
        if (gameTimer != null) gameTimer.stop();
        sidebar.updateScore(score);

        DBManager.saveGameResult(playerName, score, wrongAttempts, timerSeconds);

        GameOverDialog dlg = new GameOverDialog(this, isWon, playerName, targetWord, score);
        dlg.setVisible(true);

        if (dlg.isPlayAgain()) {
            startNewGame();
        } else {
            System.exit(0);
        }
    }
}
