import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.Shape;
import java.awt.geom.Ellipse2D;
import java.awt.geom.GeneralPath;
import java.awt.geom.RoundRectangle2D;
import javax.swing.JPanel;

public class HangmanCanvas extends JPanel {
    private int wrongAttempts = 0;
    private static final int MAX_ATTEMPTS = 6;

    private static final Color BG_LAVENDER = new Color(238, 242, 255);
    private static final Color GROUND_TOP = new Color(51, 65, 85);
    private static final Color WOOD_LIGHT = new Color(120, 90, 60);
    private static final Color WOOD_DARK = new Color(74, 55, 38);
    private static final Color ROPE_COLOR = new Color(146, 108, 65);
    private static final Color FIGURE_PURPLE = new Color(79, 70, 229);

    public HangmanCanvas() {
        setPreferredSize(new Dimension(340, 300));
        setBackground(BG_LAVENDER);
    }

    public void setWrongAttempts(int attempts) {
        this.wrongAttempts = attempts;
        repaint();
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        Graphics2D g2 = (Graphics2D) g;
        g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

        drawBackground(g2);
        drawGallows(g2);
        drawRope(g2);
        drawFigure(g2);
    }

    private void drawBackground(Graphics2D g2) {
        g2.setColor(BG_LAVENDER);
        g2.fillRect(0, 0, getWidth(), getHeight());
    }

    private void drawGallows(Graphics2D g2) {
        g2.setColor(new Color(0, 0, 0, 20));
        g2.fill(new RoundRectangle2D.Double(28, 282, 220, 10, 10, 10));

        g2.setColor(GROUND_TOP);
        g2.fill(new RoundRectangle2D.Double(20, 260, 220, 18, 10, 10));

        g2.setColor(WOOD_LIGHT);
        g2.fill(new RoundRectangle2D.Double(55, 40, 22, 220, 6, 6));
        g2.fill(new RoundRectangle2D.Double(55, 40, 175, 22, 6, 6));

        g2.setColor(WOOD_DARK);
        g2.setStroke(new BasicStroke(8, BasicStroke.CAP_ROUND, BasicStroke.JOIN_ROUND));
        g2.drawLine(77, 112, 128, 62);
    }

    private void drawRope(Graphics2D g2) {
        g2.setColor(ROPE_COLOR);
        g2.setStroke(new BasicStroke(4, BasicStroke.CAP_ROUND, BasicStroke.JOIN_ROUND));
        g2.drawLine(210, 62, 210, 98);

        if (wrongAttempts >= 1) {
            g2.setStroke(new BasicStroke(3));
            g2.drawOval(197, 96, 26, 18);
        }
    }

    private void drawFigure(Graphics2D g2) {
        if (wrongAttempts >= 1) drawHead(g2);
        if (wrongAttempts >= 2) drawBody(g2);
        if (wrongAttempts >= 3) drawArm(g2, 178, 200, true);
        if (wrongAttempts >= 4) drawArm(g2, 242, 200, false);
        if (wrongAttempts >= 5) drawLeg(g2, 182, 258, true);
        if (wrongAttempts >= 6) drawFinalLegAndFace(g2);
    }

    private void drawHead(Graphics2D g2) {
        Ellipse2D head = new Ellipse2D.Double(186, 106, 48, 48);
        g2.setColor(FIGURE_PURPLE);
        g2.fill(head);

        if (wrongAttempts < MAX_ATTEMPTS) {
            g2.setColor(Color.WHITE);
            g2.fillOval(198, 122, 6, 6);
            g2.fillOval(217, 122, 6, 6);
        }
    }

    private void drawBody(Graphics2D g2) {
        g2.setColor(FIGURE_PURPLE);
        g2.setStroke(new BasicStroke(7, BasicStroke.CAP_ROUND, BasicStroke.JOIN_ROUND));
        GeneralPath spine = new GeneralPath();
        spine.moveTo(210, 154);
        spine.curveTo(206, 180, 214, 195, 210, 212);
        g2.draw(spine);
    }

    private void drawArm(Graphics2D g2, int handX, int handY, boolean isLeft) {
        g2.setColor(FIGURE_PURPLE);
        g2.setStroke(new BasicStroke(6, BasicStroke.CAP_ROUND, BasicStroke.JOIN_ROUND));
        int elbowX = isLeft ? 188 : 232;
        GeneralPath arm = new GeneralPath();
        arm.moveTo(210, 168);
        arm.quadTo(elbowX, 182, handX, handY);
        g2.draw(arm);
    }

    private void drawLeg(Graphics2D g2, int footX, int footY, boolean isLeft) {
        g2.setColor(FIGURE_PURPLE);
        g2.setStroke(new BasicStroke(7, BasicStroke.CAP_ROUND, BasicStroke.JOIN_ROUND));
        GeneralPath leg = new GeneralPath();
        leg.moveTo(210, 212);
        leg.quadTo(isLeft ? 195 : 225, 232, footX, footY);
        g2.draw(leg);
    }

    private void drawFinalLegAndFace(Graphics2D g2) {
        drawLeg(g2, 240, 258, false);

        g2.setColor(new Color(220, 38, 38));
        g2.setStroke(new BasicStroke(3, BasicStroke.CAP_ROUND, BasicStroke.JOIN_ROUND));
        g2.drawLine(197, 120, 205, 130);
        g2.drawLine(205, 120, 197, 130);
        g2.drawLine(215, 120, 223, 130);
        g2.drawLine(223, 120, 215, 130);

        Shape frown = new java.awt.geom.Arc2D.Double(198, 133, 24, 16, 20, 140, java.awt.geom.Arc2D.OPEN);
        g2.draw(frown);
    }
}
