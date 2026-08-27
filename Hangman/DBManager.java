import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * Manages database connectivity, word retrieval, and leaderboard persistence.
 */
public class DBManager {

    private static final String URL = "jdbc:mysql://localhost:3306/hangman_db";
    private static final String USER = "root";
    private static final String PASSWORD = "Root@12345";

    private static final String SQL_FETCH_RANDOM_WORD = "SELECT word, category FROM words ORDER BY RAND() LIMIT 1";
    private static final String SQL_INSERT_LEADERBOARD = "INSERT INTO leaderboard (player_name, score, wrong_guesses, time_seconds) VALUES (?, ?, ?, ?)";
    private static final String SQL_SELECT_LEADERBOARD = "SELECT player_name, score, wrong_guesses, time_seconds FROM leaderboard ORDER BY score DESC, time_seconds ASC LIMIT 10";

    private static final String[][] FALLBACK_WORDS = {
        {"JAVA", "Programming"},
        {"PYTHON", "Programming"},
        {"JAVASCRIPT", "Programming"},
        {"DATABASE", "Programming"},
        {"ELEPHANT", "Animal"},
        {"GIRAFFE", "Animal"},
        {"DOLPHIN", "Animal"},
        {"TIGER", "Animal"},
        {"MOUNTAIN", "Nature"},
        {"VOLCANO", "Nature"},
        {"WATERFALL", "Nature"},
        {"CRICKET", "Sport"},
        {"FOOTBALL", "Sport"},
        {"BASKETBALL", "Sport"},
        {"CHOCOLATE", "Food"},
        {"PIZZA", "Food"},
        {"KEYBOARD", "Technology"},
        {"SOFTWARE", "Technology"}
    };

    public static Connection getConnection() throws SQLException {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            try {
                Class.forName("com.mysql.jdbc.Driver");
            } catch (ClassNotFoundException ignored) {}
        }
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }

    public static String[] fetchRandomWord() {
        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(SQL_FETCH_RANDOM_WORD);
             ResultSet rs = stmt.executeQuery()) {
            if (rs.next()) {
                String word = rs.getString("word").trim().toUpperCase();
                String category = rs.getString("category");
                if (category == null || category.trim().isEmpty()) {
                    category = "General";
                }
                return new String[]{word, category};
            }
        } catch (Exception e) {
            System.err.println("[DB WARNING] Using fallback word: " + e.getMessage());
        }
        int index = (int) (Math.random() * FALLBACK_WORDS.length);
        return FALLBACK_WORDS[index];
    }

    public static boolean saveGameResult(String player, int score, int wrongGuesses, int timeSeconds) {
        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(SQL_INSERT_LEADERBOARD)) {
            stmt.setString(1, player);
            stmt.setInt(2, score);
            stmt.setInt(3, wrongGuesses);
            stmt.setInt(4, timeSeconds);
            stmt.executeUpdate();
            return true;
        } catch (Exception e) {
            System.err.println("[DB ERROR] Failed to save result: " + e.getMessage());
            return false;
        }
    }

    public static List<String[]> getTopLeaderboard() {
        List<String[]> list = new ArrayList<>();
        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(SQL_SELECT_LEADERBOARD);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                list.add(new String[]{
                    rs.getString("player_name"),
                    String.valueOf(rs.getInt("score")),
                    String.valueOf(rs.getInt("wrong_guesses")),
                    rs.getInt("time_seconds") + "s"
                });
            }
        } catch (Exception e) {
            System.err.println("[DB ERROR] Could not fetch leaderboard: " + e.getMessage());
        }
        return list;
    }
}
