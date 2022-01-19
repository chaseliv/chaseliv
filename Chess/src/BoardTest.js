"use strict"

class Board {
    constructor(isWhite) {
        this.isWhite_ = isWhite
        this.rowNum_ = 8;
        this.colNum_ = 8;
        this.tileCounter_ = 0;
        this.tbody_ = document.getElementById("tbody");
        this.row_ = document.createElement("tr");
        this.player_ = new Player(isWhite);
        this.tiles_ = [[],[],[],[],[],[],[],[]]

        this.makeBoard();
        this.setPieces();

    }
    setPieces(){
        //TODO add all the pieces to board
        //it can just go by getting element by id of the coords

        //setting the Pawns
        for (let y = 1; y <= 6; y += 5) {
            for (let x = 0; x < this.colNum_; x++) {
                if( y == 1) {
                    let pawnChild = new Pawn(true);
                    this.tiles_[y][x].setPiece(pawnChild);
                    console.log("White Pawn " + y + ", " + x);
                }
                else {
                    let blackPawn = document.getElementById(this.cordsToString(y,x));
                    console.log("Black Pawn " + y + ", " + x);
                }
            }
        }
    }
    makeBoard(){
        for (let i = 0; i < this.rowNum_; i++) {
            this.createElementRow();
            for (let j = 0; j < this.colNum_ ; j++) {
                this.createElementCell(i, j);
                this.tileCounter_++;
            }
            this.tileCounter_++;
        }
    }
    handleMouseClick(tile){
        //the player does have a piece and we want to set it down
        if(this.player_.hasPiece()){
            console.log("you picked up");
            let piece = this.player_.pickUpPiece();
            tile.setPiece(piece);
        }
        //the player doesn't have a piece and the piece matches the color, we want to pick it up
        else if (tile.getPiece().isWhite_ == this.player_.isWhite_){
            //we pick it up
            console.log("you set down");
            let piece = tile.getPiece()
            this.player_.setDownPiece(piece);
            //then we need to validate all the moves
        }

    }
    createElementRow(){
        this.row_ = document.createElement("tr");
        this.tbody_.appendChild(this.row_);
    }
    createElementCell(i , j){

        let tile = new Tile(i, j);
        this.addTileToTiles(i , j, tile);
        let cordsText = this.cordsToString(this.swapI(i), this.swapJ(j));
        tile.cell_ = document.createElement("td");

        let self = this;
        tile.cell_.onclick = function (){
            self.handleMouseClick(tile)
        }

        tile.cell_.setAttribute("id", cordsText);
        this.row_.appendChild(tile.cell_);

        let cordsChild = document.createTextNode(cordsText)
        tile.cell_.appendChild(cordsChild); //TODO just for testing.

        if (this.tileCounter_ % 2 == 0) {
            tile.cell_.setAttribute("class", "white");
        } else {
            tile.cell_.setAttribute("class", "black");
        }
    }
    addTileToTiles(i , j, tile){
        this.tiles_[this.swapI(i)][this.swapJ(j)] = tile;
    }
    cordsToString(i, j){
        return i + ", " + j;
    }
    swapJ(j){
        if (!this.isWhite_) {
            switch (j) {
                case 0:
                    j = 7;
                    break;
                case 1:
                    j = 6;
                    break;
                case 2:
                    j = 5;
                    break;
                case 3:
                    j = 4;
                    break;
                case 4:
                    j = 3;
                    break;
                case 5:
                    j = 2;
                    break;
                case 6:
                    j = 1;
                    break;
                case 7:
                    j = 0;
                    break;
            }
        }
        return j;
    }
    swapI(i) {
        if (this.isWhite_) {
            switch (i) {
                case 0:
                    i = 7;
                    break;
                case 1:
                    i = 6;
                    break;
                case 2:
                    i = 5;
                    break;
                case 3:
                    i = 4;
                    break;
                case 4:
                    i = 3;
                    break;
                case 5:
                    i = 2;
                    break;
                case 6:
                    i = 1;
                    break;
                case 7:
                    i = 0;
                    break;
            }
        }
        return i;
    }
}

let board = new Board(true);