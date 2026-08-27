import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.FlowLayout;
import java.awt.GridLayout;
import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JDialog;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.SwingConstants;

public class GameOverDialog extends JDialog {
    private static final Color BG_SLATE = new Color(30, 41, 59);
    private static final Color COLOR_WIN = new Color(19, 136, 8);
    private static final Color COLOR_LOSE = new Color(170, 0, 0);
    private static final Color COLOR_GOLDEN = new Color(255, 215, 0);
    private static final Color TEXT_COLOR = new Color(245, 158, 11);
    private static final Color ACCENT_PURPLE = new Color(99, 102, 241);

    private boolean playAgain = false;

    public GameOverDialog(JFrame parent, boolean isWon, String playerName, String targetWord, int score) {
        super(parent, isWon ? "Victory!" : "Game Over", true);
        setSize(480, 270);
        setLocationRelativeTo(parent);
        setResizable(false);

        JPanel mainPanel = new JPanel(new BorderLayout(16, 16));
        mainPanel.setBackground(BG_SLATE);
        mainPanel.setBorder(BorderFactory.createEmptyBorder(24, 24, 24, 24));

        // Header Title
        JLabel titleLbl = new JLabel(isWon ? "Congratulations! You Won" : "Game Over", SwingConstants.CENTER);
        titleLbl.setFont(new Font("SansSerif", Font.BOLD, 22));
        titleLbl.setForeground(isWon ? COLOR_GOLDEN : TEXT_COLOR);
        mainPanel.add(titleLbl, BorderLayout.NORTH);

        // Center Message Body
        JPanel bodyPanel = new JPanel(new GridLayout(2, 1, 8, 8));
        bodyPanel.setOpaque(false);

        String msg1 = isWon ? "🎉 You correctly guessed: " + targetWord
                            : "❌ The word was: " + targetWord;
        JLabel line1 = new JLabel(msg1, SwingConstants.CENTER);
        line1.setFont(new Font("SansSerif", Font.BOLD, 14));
        line1.setForeground(Color.WHITE);

        JLabel line2 = new JLabel("Final Score: " + score + " points", SwingConstants.CENTER);
        line2.setFont(new Font("SansSerif", Font.PLAIN, 13));
        line2.setForeground(new Color(148, 163, 184));

        bodyPanel.add(line1);
        bodyPanel.add(line2);
        mainPanel.add(bodyPanel, BorderLayout.CENTER);

        // Bottom Action Buttons
        JPanel btnPanel = new JPanel(new FlowLayout(FlowLayout.CENTER, 12, 0));
        btnPanel.setOpaque(false);

        JButton playBtn = createButton("Play Again", COLOR_WIN);
        playBtn.addActionListener(e -> { playAgain = true; dispose(); });

        JButton leaderBtn = createButton("Leaderboard", ACCENT_PURPLE);
        leaderBtn.addActionListener(e -> new LeaderboardDialog(parent).setVisible(true));

        JButton closeBtn = createButton("Exit", COLOR_LOSE);
        closeBtn.addActionListener(e -> { playAgain = false; dispose(); });

        btnPanel.add(playBtn);
        btnPanel.add(leaderBtn);
        btnPanel.add(closeBtn);
        mainPanel.add(btnPanel, BorderLayout.SOUTH);

        add(mainPanel);
    }

    private JButton createButton(String text, Color bg) {
        JButton btn = new JButton(text);
        btn.setPreferredSize(new Dimension(130, 44));
        btn.setFont(new Font("SansSerif", Font.BOLD, 13));
        btn.setBackground(bg);
        btn.setForeground(Color.WHITE);
        btn.setFocusPainted(false);
        btn.setBorder(BorderFactory.createEmptyBorder());
        return btn;
    }

    public boolean isPlayAgain() {
        return playAgain;
    }
}