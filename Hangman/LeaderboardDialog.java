import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.util.List;
import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JDialog;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.SwingConstants;
import javax.swing.table.DefaultTableCellRenderer;
import javax.swing.table.DefaultTableModel;

public class LeaderboardDialog extends JDialog {
    private static final Color BG_NAVY = new Color(15, 23, 42);
    private static final Color BG_SLATE = new Color(30, 41, 59);
    private static final Color TEXT_GOLD = new Color(245, 158, 11);
    private static final Color ACCENT_PURPLE = new Color(99, 102, 241);

    public LeaderboardDialog(JFrame parent) {
        super(parent, "Top Leaderboard", true);
        setSize(520, 380);
        setLocationRelativeTo(parent);
        setResizable(false);

        JPanel mainPanel = new JPanel(new BorderLayout(12, 12));
        mainPanel.setBackground(BG_NAVY);
        mainPanel.setBorder(BorderFactory.createEmptyBorder(15, 20, 15, 20));

        JLabel titleLbl = new JLabel("🏆 TOP LEADERBOARD", SwingConstants.CENTER);
        titleLbl.setFont(new Font("SansSerif", Font.BOLD, 20));
        titleLbl.setForeground(TEXT_GOLD);
        mainPanel.add(titleLbl, BorderLayout.NORTH);

        List<String[]> data = DBManager.getTopLeaderboard();
        if (data.isEmpty()) {
            JLabel emptyLbl = new JLabel("No leaderboard records found.", SwingConstants.CENTER);
            emptyLbl.setFont(new Font("SansSerif", Font.ITALIC, 14));
            emptyLbl.setForeground(Color.LIGHT_GRAY);
            mainPanel.add(emptyLbl, BorderLayout.CENTER);
        } else {
            String[] cols = {"Rank", "Player", "Score", "Mistakes", "Time"};
            DefaultTableModel model = new DefaultTableModel(cols, 0) {
                @Override
                public boolean isCellEditable(int row, int col) { return false; }
            };

            for (int i = 0; i < data.size(); i++) {
                String[] row = data.get(i);
                model.addRow(new Object[]{"#" + (i + 1), row[0], row[1], row[2], row[3]});
            }

            JTable table = new JTable(model);
            table.setBackground(BG_SLATE);
            table.setForeground(Color.WHITE);
            table.setFont(new Font("SansSerif", Font.PLAIN, 13));
            table.setRowHeight(28);
            table.getTableHeader().setBackground(new Color(51, 65, 85));
            table.getTableHeader().setForeground(TEXT_GOLD);
            table.getTableHeader().setFont(new Font("SansSerif", Font.BOLD, 13));
            table.setShowGrid(false);

            DefaultTableCellRenderer centerRenderer = new DefaultTableCellRenderer();
            centerRenderer.setHorizontalAlignment(SwingConstants.CENTER);
            for (int i = 0; i < table.getColumnCount(); i++) {
                table.getColumnModel().getColumn(i).setCellRenderer(centerRenderer);
            }

            JScrollPane scrollPane = new JScrollPane(table);
            scrollPane.getViewport().setBackground(BG_SLATE);
            scrollPane.setBorder(BorderFactory.createLineBorder(new Color(51, 65, 85), 1));
            mainPanel.add(scrollPane, BorderLayout.CENTER);
        }

        JButton closeBtn = new JButton("Close");
        closeBtn.setPreferredSize(new Dimension(120, 36));
        closeBtn.setFont(new Font("SansSerif", Font.BOLD, 13));
        closeBtn.setBackground(ACCENT_PURPLE);
        closeBtn.setForeground(Color.WHITE);
        closeBtn.setFocusPainted(false);
        closeBtn.addActionListener(e -> dispose());

        JPanel btnPanel = new JPanel();
        btnPanel.setOpaque(false);
        btnPanel.add(closeBtn);
        mainPanel.add(btnPanel, BorderLayout.SOUTH);

        add(mainPanel);
    }
}
