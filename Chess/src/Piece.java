
import javafx.scene.image.ImageView;

import java.util.ArrayList;

public abstract class Piece {
    protected Boolean isWhite_;
    protected Boolean alive_;
    protected String name_;
    protected ImageView image_;
    protected String filePath_;
    protected int timesMoved_;

    Piece(Boolean isWhite) {
        isWhite_ = isWhite;
        alive_ = true;
        filePath_ = "resources/";
        timesMoved_ = 0;

    }

    public boolean[][] validMove(Tile start) {
        return null;
    }

    public void isAlive(Boolean life) {
        alive_ = life;
    }

    public boolean getColor() {
        return isWhite_;
    }

    public String getName() {
        return name_;
    }
}
