import javafx.scene.layout.StackPane;
import javafx.scene.shape.Rectangle;

public class Tile extends StackPane {
    private int xPos_;
    private int yPos_;
    private Piece piece_;
    private Rectangle square_;

    Tile(int xPos, int yPos){
        xPos_ = xPos;
        yPos_ = yPos;
        piece_ = null;
    }

    public Piece getPiece(){
        return piece_;
    }
    public void setPiece(Piece piece){
//        remove the current
        try {
            System.out.println(piece_.getName() + " has been killed.");
            this.getChildren().remove(piece_.image_);
        }
        catch (NullPointerException e){
            System.out.println("This spot doesn't have a piece");
        }

        //set the new
        piece_ = piece;
        this.getChildren().add(piece_.image_);
    }
    public int getX(){
        return xPos_;
    }
    public int getY(){
        return yPos_;
    }
}
