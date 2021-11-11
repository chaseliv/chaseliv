import javafx.application.Application;
import javafx.geometry.*;
import javafx.scene.Scene;
import javafx.scene.control.Control;
import javafx.scene.layout.*;
import javafx.scene.text.Text;
import javafx.stage.Stage;

import java.lang.reflect.Array;
import java.util.ArrayList;


public class Chess extends Application {
    private String color1 = "#89621D";
    private String color1_light = "CA902B";
    private String color2 = "#F0EA5B";
    private String color2_light = "F6F4A2";

    private Piece currentPiece_ = null;
    private Tile currentTile_ = null;
    private boolean [][] currentPieceValidMoves_ = new boolean[8][8];
    private static ArrayList<Tile> board_ = new ArrayList<>();
    private static Tile[][] test = new Tile[8][8];

    @Override
    public void start(Stage primaryStage) {
        GridPane board = new GridPane();
        int size = 8;
        int counter = 0;
        for (int row = 0; row < size; row++) {
            for (int col = 0; col < size; col++) {
                String color;
                if ((row + col) % 2 == 0) {
                    color = color1;
                } else {
                    color = color2;
                }

                Tile tile = new Tile( row, col );
                tile.setStyle("-fx-background-color: " + color + ";");
                tile.setOnMouseClicked(e -> handleSquareClick(tile) );
                tile.setOnMouseEntered(e -> handleMouseOver(tile));
                tile.setOnMouseExited(e -> handleMouseExit(tile));

                board_.add(tile);
                test[col][row] = tile;

                Text text = new Text();

                text.setText(counter + "");
                tile.getChildren().add(text);

                board.add(tile, col, row);
                counter++;
            }
        }

        setBoard();

        for (int i = 0; i < size; i++) {
            board.getColumnConstraints().add(new ColumnConstraints(5, Control.USE_COMPUTED_SIZE, Double.POSITIVE_INFINITY, Priority.ALWAYS, HPos.CENTER, true));
            board.getRowConstraints().add(new RowConstraints(5, Control.USE_COMPUTED_SIZE, Double.POSITIVE_INFINITY, Priority.ALWAYS, VPos.CENTER, true));
        }
        primaryStage.setScene(new Scene(board, 400, 400));
        primaryStage.show();
    }

    private void handleMouseExit(StackPane square) {
        if(square.getStyle().contains(color1_light)) {
            square.setStyle("-fx-background-color: " + color1 + ";");
        }
        else{
            square.setStyle("-fx-background-color: " + color2 + ";");
        }
    }
    private void handleMouseOver(Tile square) {
        if(square.getStyle().contains(color1)) {
            square.setStyle("-fx-background-color: " + color1_light + ";");
        }
        else{
            square.setStyle("-fx-background-color: " + color2_light + ";");
        }

        currentTile_ = square;

    }

    private void handleSquareClick(Tile square) {
        System.out.println(currentTile_.getX() + " " + currentTile_.getY() + " " + square.getPiece());
        if(currentPiece_ == null) {
            currentPiece_ = square.getPiece();
            currentTile_ = square;

            currentPieceValidMoves_ = square.getPiece().validMove(square);
            highlightValidMoves();
        }
        else{
            //TODO highlight all the valid moves for that piece.
            square.setPiece(currentPiece_);
            currentPiece_ = null;
        }

    }

    private void highlightValidMoves() {
        System.out.println("In highlight moves");
        for(int i = 0; i < 8; i++){
            for(int j = 0; j < 8; j++){
                if(currentPieceValidMoves_[i][j]){
                    System.out.println("the tile" + test[i][j].getX() + " " + test[i][j].getY());
                    test[i][j].setStyle("-fx-background-color: " + "#ff4965" + ";");
                }
            }
        }
    }

    private void handleSquareClickRelease(Tile square){
    }

    private static void setBoard(){
        for(int i = 0; i < board_.size(); i++){
            board_.get(i).getChildren().removeAll();
            if(i < 8 ){
                //fill back pieces with black
            }
            else if(i > 7 && i < 16 ){
                Pawn pawn = new Pawn(false);
                board_.get(i).setPiece(pawn);

            }
            else if(i > 47 && i < 56){
                Pawn pawn = new Pawn(true);
                board_.get(i).setPiece(pawn);
            }
            else if(i > 55 && i < 64){

            }
        }
    }
    public static ArrayList<Tile> getBoard(){
        return board_;
    }
    public static Tile[][] getTest(){
        System.out.println("Test before assigning address " + test);
        return test;
    }
}

