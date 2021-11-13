"use strict"

class Board {
    constructor(isWhite) {
        this.isWhite_ = isWhite
        this.rowNum_ = 8;
        this.colNum_ = 8;
        this.tileCounter_ = 0;
        this.tbody_ = document.getElementById("tbody");
        this.row_ = document.createElement("tr");
        this.player_ = new Player(this.isWhite_);

        this.makeBoard();
        this.setPieces();

    }
    setPieces(){
        //TODO add all the pieces to board
        //it can just go by getting element by id of the coords

        //setting the Pawns
        for (let i = 1; i <= 6; i += 5) {
            for (let j = 0; j < this.colNum_; j++) {
                if( i == 1) {
                    let whitePawn = document.getElementById(this.cordsToString(i,j));
                    let pawnChild = new Pawn(true);
                    whitePawn.appendChild(pawnChild.getImageNode());
                    console.log("White Pawn " + i + ", " + j);
                }
                else {
                    let blackPawn = document.getElementById(this.cordsToString(i,j));
                    console.log("Black Pawn " + i + ", " + j);
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
    createElementRow(){
        this.row_ = document.createElement("tr");
        this.tbody_.appendChild(this.row_);
    }
    createElementCell(i , j){
        let tile = new Tile(i, j);
        let cordsText = this.switchCords(i, j);
        tile.cell_ = document.createElement("td");
        tile.cell_.onclick = function() { handleMouseClick(tile); }
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
    handleMouseClick(tile){
        if(this.player_.piece_ == null){
            //the player doesn't have a piece, so we get piece/child from that
            this.player_.setPiece(tile.getPiece());


        }

    }
    cordsToString(i, j){
        return i + ", " + j;
    }
    switchCords(i , j) {
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
        else{
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
        return this.cordsToString(i,j);
    }
}

let board = new Board(true);