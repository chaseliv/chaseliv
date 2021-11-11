"use strict"

class Tile {
    constructor(xPos, yPos) {
        this.xPos_ = xPos;
        this.yPos_ = yPos;
        this.piece_ = null;
        this.cell_ = null;
    }

    getPiece() {
        return this.piece_;
    }

    setPiece(piece) {
        if (this.piece_ != null) {
            this.piece_ == null;
        }
        this.piece_ = piece;
    }

    getX() {
        return this.xPos_;
    }

    getY() {
        return this.yPos_;
    }
}
