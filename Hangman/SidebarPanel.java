import java.awt.Color;
import java.awt.Font;
import java.awt.GridLayout;
import javax.swing.BorderFactory;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.SwingConstants;

public class SidebarPanel extends JPanel {
    private final JLabel timerLabel = new JLabel("00:00", SwingConstants.CENTER);
    private final JLabel wrongGuessesLabel = new JLabel("_ _ _ _ _ _", SwingConstants.CENTER);
    private final JLabel scoreLabel = new JLabel("0", SwingConstants.CENTER);

    private static final Color BG_SLATE = new Color(30, 41, 59);
    private static final Color BORDER_SLATE = new Color(51, 65, 85);
    private static final Color TEXT_MUTED = new Color(148, 163, 184);
    private static final Color DANGER_RED = new Color(239, 68, 68);
    private static final Color SCORE_YELLOW = new Color(245, 158, 11);
    private static final Color ACCENT_CYAN = new Color(56, 189, 248);

    public SidebarPanel() {
        setLayout(new GridLayout(4, 1, 8, 8));
        setOpaque(false);

        add(createCard("TIMER 🕒 (1 MIN GAME)", timerLabel));
        add(createCard("WRONG GUESSES ❌", wrongGuessesLabel));
        add(createCard("SCORE ⭐", scoreLabel));
        add(createCard("SCORING RULES 🎯", createRulesContent()));

        styleText();
    }

    private JPanel createCard(String title, JPanel contentPanel) {
        JPanel card = new JPanel(new GridLayout(2, 1, 2, 2));
        card.setBackground(BG_SLATE);
        card.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createLineBorder(BORDER_SLATE, 1, true),
                BorderFactory.createEmptyBorder(6, 10, 6, 10)
        ));

        JLabel titleLbl = new JLabel(title, SwingConstants.CENTER);
        titleLbl.setFont(new Font("SansSerif", Font.BOLD, 10));
        titleLbl.setForeground(TEXT_MUTED);

        card.add(titleLbl);
        card.add(contentPanel);
        return card;
    }

    private JPanel createCard(String title, JLabel valueLbl) {
        JPanel card = new JPanel(new GridLayout(2, 1, 2, 2));
        card.setBackground(BG_SLATE);
        card.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createLineBorder(BORDER_SLATE, 1, true),
                BorderFactory.createEmptyBorder(6, 10, 6, 10)
        ));

        JLabel titleLbl = new JLabel(title, SwingConstants.CENTER);
        titleLbl.setFont(new Font("SansSerif", Font.BOLD, 10));
        titleLbl.setForeground(TEXT_MUTED);

        card.add(titleLbl);
        card.add(valueLbl);
        return card;
    }

    private JPanel createRulesContent() {
        JPanel p = new JPanel(new GridLayout(2, 1, 1, 1));
        p.setOpaque(false);
        JLabel r1 = new JLabel("• Correct Letter: +2 pts", SwingConstants.CENTER);
        JLabel r2 = new JLabel("• Wrong Letter: -1 pt", SwingConstants.CENTER);
        r1.setFont(new Font("SansSerif", Font.PLAIN, 14)); r1.setForeground(ACCENT_CYAN);
        r2.setFont(new Font("SansSerif", Font.PLAIN, 14)); r2.setForeground(ACCENT_CYAN);
        p.add(r1); p.add(r2);
        return p;
    }

    private void styleText() {
        timerLabel.setFont(new Font("Monospaced", Font.BOLD, 20));
        timerLabel.setForeground(Color.WHITE);

        wrongGuessesLabel.setFont(new Font("Monospaced", Font.BOLD, 14));
        wrongGuessesLabel.setForeground(DANGER_RED);

        scoreLabel.setFont(new Font("SansSerif", Font.BOLD, 20));
        scoreLabel.setForeground(SCORE_YELLOW);
    }

    public void updateTimer(int seconds) {
        int mins = seconds / 60;
        int secs = seconds % 60;
        timerLabel.setText(String.format("%02d:%02d", mins, secs));
    }

    public void updateWrongGuesses(String wrongList) {
        wrongGuessesLabel.setText(wrongList.isEmpty() ? "_ _ _ _ _ _" : wrongList);
    }

    public void updateScore(int score) {
        scoreLabel.setText(String.valueOf(score));
    }
}
