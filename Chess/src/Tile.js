"use strict"

class Tile {
    constructor(xPos, yPos) {
        this.xPos_ = xPos;
        this.yPos_ = yPos;
        this.cellId_ = xPos + ", " +yPos;
        this.piece_ = null;
        this.cell_ = document.getElementById(this.cellId_ );
    }

    getPiece() {
        this.removePiece()
        return this.piece_;
    }

    removePiece() {
        while (this.cell_.firstChild) {
            this.cell_.removeChild(this.cell_.firstChild);
        }
    }

    setPiece(piece) {
        this.piece_ = piece;
        this.cell_.appendChild(this.piece_.getImageNode());
    }

    getX() {
        return this.xPos_;
    }

    getY() {
        return this.yPos_;
    }

    getCellId(){
        return this.cellId_;
    }
}
