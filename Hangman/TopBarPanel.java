import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Font;
import java.awt.FlowLayout;
import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;

public class TopBarPanel extends JPanel {
    private static final Color BG_NAVY = new Color(15, 23, 42);
    private static final Color ACCENT_PURPLE = new Color(99, 102, 241);
    private static final Color GOLD_AMBER = new Color(245, 158, 11);

    private final JLabel playerNameLabel = new JLabel("👤 Player: Player");

    public TopBarPanel(String initialPlayerName, Runnable onLeaderboard, Runnable onSkipGame) {
        setLayout(new BorderLayout());
        setBackground(BG_NAVY);
        setBorder(BorderFactory.createEmptyBorder(10, 15, 5, 15));

        JLabel logoLbl = new JLabel("🎮 HANGMAN");
        logoLbl.setFont(new Font("SansSerif", Font.BOLD, 20));
        logoLbl.setForeground(Color.WHITE);

        JPanel rightPanel = new JPanel(new FlowLayout(FlowLayout.RIGHT, 8, 0));
        rightPanel.setOpaque(false);

        playerNameLabel.setFont(new Font("SansSerif", Font.BOLD, 14));
        playerNameLabel.setForeground(Color.WHITE);
        updatePlayerName(initialPlayerName);

        JButton leaderBtn = createStyledButton("🏆 LEADERBOARD", GOLD_AMBER);
        leaderBtn.addActionListener(e -> onLeaderboard.run());

        JButton skipBtn = createStyledButton("⟳ SKIP", ACCENT_PURPLE);
        skipBtn.addActionListener(e -> onSkipGame.run());

        rightPanel.add(playerNameLabel);
        rightPanel.add(leaderBtn);
        rightPanel.add(skipBtn);

        add(logoLbl, BorderLayout.WEST);
        add(rightPanel, BorderLayout.EAST);
    }

    public void updatePlayerName(String name) {
        playerNameLabel.setText("👤 Player: " + (name != null ? name : "Player"));
    }

    private JButton createStyledButton(String text, Color bg) {
        JButton btn = new JButton(text);
        btn.setFont(new Font("SansSerif", Font.BOLD, 13));
        btn.setBackground(bg);
        btn.setForeground(Color.WHITE);
        btn.setFocusPainted(false);
        btn.setBorder(BorderFactory.createEmptyBorder(6, 12, 6, 12));
        return btn;
    }
}
