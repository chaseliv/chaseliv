import javafx.scene.image.Image;
import javafx.scene.image.ImageView;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.ArrayList;

public class Pawn extends Piece {

    Pawn(Boolean isWhite) {
        super(isWhite);
        name_ = "Pawn";
        if(isWhite){
            filePath_ += "pawnWhite.jpg";
        }
        else{
            filePath_ += "pawnBlack.jpg";
        }

        try {
            FileInputStream input = new FileInputStream(filePath_);
            Image image = new Image(input);
            image_ = new ImageView(image);
            image_.setFitHeight(30);
            image_.setFitWidth(30);
        }
        catch (FileNotFoundException e){
            System.out.println("image not found in " + name_);
        }

    }
    @Override
    public boolean[][] validMove(Tile start) {
        Tile[][] test = Chess.getTest();
        int col = start.getY();
        int row = start.getX();
        int direction;
        boolean[][] validMoves = new boolean[8][8];
        for(int i = 0; i < 8; i++){
            for(int j = 0; j < 8; j++) {
                validMoves[i][j] = false;
            }
        }
        if(this.isWhite_){
            direction = -1;
        }
        else{
            direction = 1;
        }

        System.out.println(col + " " + row);
        System.out.println("Is it white " + this.isWhite_);

        System.out.println("Testing pos: \n\t" + (col + direction) + " " + row + "\n\t"
                                               + (col + 2 * direction) + " " + row + "\n\t"
                                               + (col + direction) + " " + (row - 1) + "\n\t"
                                               + (col + direction) + " " + (row + 1) + "\n\t");

        try {
            if (test[col + direction][row].getPiece() == null) {
                validMoves[col + direction][row] = true;
                System.out.println("Valid move");
            } else if (test[col + 2 * direction][row].getPiece() == null && this.timesMoved_ == 0) {
                validMoves[col + 2 * direction][row] = true;
                System.out.println("Valid move");
            } else if (test[col + direction][row + 1].getPiece() != null) {
                validMoves[col + direction][row + 1] = true;
                System.out.println("Valid move");
            } else if (test[col + direction][row - 1].getPiece() != null){
                validMoves[col + direction][row - 1] = true;
                System.out.println("Valid move");
            }
            else{
                System.out.println("no valid moves");
            }
            //add enpessant and if blocking a king
        }
        catch (IndexOutOfBoundsException e){
            System.out.println("Index out of bound");
        }
        return validMoves;
    }
    @Override
    public void isAlive(Boolean life){
        alive_ = life;
    }
    @Override
    public boolean getColor(){
        return isWhite_;
    }
}
