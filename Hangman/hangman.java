import javax.swing.SwingUtilities;

/**
 * Main application entry point for the Hangman Java Swing + JDBC Application.
 */
public class hangman {
    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("   STARTING HANGMAN JAVA SWING + JDBC APPLICATION ");
        System.out.println("==================================================");

        SwingUtilities.invokeLater(() -> {
            HangmanGUI frame = new HangmanGUI();
            frame.setVisible(true);
        });
    }
}
