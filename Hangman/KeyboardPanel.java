import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.FlowLayout;
import java.awt.GridLayout;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;
import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.SwingConstants;

public class KeyboardPanel extends JPanel {
    private static final Color BG_NAVY = new Color(15, 23, 42);
    private static final Color BG_SLATE = new Color(30, 41, 59);
    private static final Color COLOR_CORRECT = new Color(34, 197, 94);
    private static final Color COLOR_WRONG = new Color(239, 68, 68);
    private static final Color BORDER_SLATE = new Color(51, 65, 85);

    private final List<JButton> keyboardButtons = new ArrayList<>();
    private final Consumer<Character> onLetterGuessed;

    public KeyboardPanel(Consumer<Character> onLetterGuessed) {
        this.onLetterGuessed = onLetterGuessed;
        setLayout(new BorderLayout(5, 5));
        setBackground(BG_NAVY);
        setBorder(BorderFactory.createEmptyBorder(5, 10, 10, 10));

        JPanel qwertyContainer = new JPanel(new GridLayout(3, 1, 4, 4));
        qwertyContainer.setBackground(BG_NAVY);

        String[] rows = {"QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"};
        for (String rowStr : rows) {
            JPanel rowPanel = new JPanel(new FlowLayout(FlowLayout.CENTER, 4, 2));
            rowPanel.setBackground(BG_NAVY);
            for (char c : rowStr.toCharArray()) {
                JButton btn = createKeyButton(c);
                keyboardButtons.add(btn);
                rowPanel.add(btn);
            }
            qwertyContainer.add(rowPanel);
        }
        add(qwertyContainer, BorderLayout.CENTER);

        JLabel footerTip = new JLabel("Tip: Choose your letters wisely and guess the word before the hangman is complete! 🎯", SwingConstants.CENTER);
        footerTip.setForeground(new Color(148, 163, 184));
        footerTip.setFont(new Font("SansSerif", Font.PLAIN, 12));
        add(footerTip, BorderLayout.SOUTH);
    }

    private JButton createKeyButton(char letter) {
        JButton btn = new JButton(String.valueOf(letter));
        btn.setPreferredSize(new Dimension(56, 42));
        btn.setFont(new Font("SansSerif", Font.BOLD, 15));
        btn.setBackground(BG_SLATE);
        btn.setForeground(Color.WHITE);
        btn.setFocusPainted(false);
        btn.setBorder(BorderFactory.createLineBorder(BORDER_SLATE, 1, true));
        btn.addActionListener(e -> handleGuess(letter, btn));
        return btn;
    }

    private void handleGuess(char letter, JButton btn) {
        if (btn.isEnabled()) {
            btn.setEnabled(false);
            if (onLetterGuessed != null) {
                onLetterGuessed.accept(letter);
            }
        }
    }

    public void markLetterResult(char letter, boolean isCorrect) {
        for (JButton btn : keyboardButtons) {
            if (btn.getText().equalsIgnoreCase(String.valueOf(letter))) {
                btn.setEnabled(false);
                btn.setBackground(isCorrect ? COLOR_CORRECT : COLOR_WRONG);
                btn.setForeground(Color.WHITE);
                break;
            }
        }
    }

    public void handleKeyPress(char keyChar) {
        char upper = Character.toUpperCase(keyChar);
        if (upper >= 'A' && upper <= 'Z') {
            for (JButton btn : keyboardButtons) {
                if (btn.getText().equalsIgnoreCase(String.valueOf(upper)) && btn.isEnabled()) {
                    handleGuess(upper, btn);
                    break;
                }
            }
        }
    }

    public void resetKeyboard() {
        for (JButton btn : keyboardButtons) {
            btn.setEnabled(true);
            btn.setBackground(BG_SLATE);
            btn.setForeground(Color.WHITE);
        }
    }
}
