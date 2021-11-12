"use strict"

class Tile {
    constructor(xPos, yPos) {
        this.xPos_ = xPos;
        this.yPos_ = yPos;
        this.piece_ = null;
        this.cell_ = null;
        this.child_ =null;
    }

    getPiece() {
        return this.piece_;
    }

    removePiece() {
        while (this.cell_.firstChild) {
            this.cell_.removeChild(this.cell_.firstChild);
        }
    }

    setPiece(piece) {
        if (this.piece_ != null) {
            this.removePiece();
            this.piece_ == null;
        }
        this.piece_ = piece;
        // this.piece_.timesMoved_++;

        this.child_ = document.createTextNode("pawn");
        this.cell_.appendChild(this.child_); //this needs to be piece.child_ (which is the image)
    }

    getX() {
        return this.xPos_;
    }

    getY() {
        return this.yPos_;
    }
}
