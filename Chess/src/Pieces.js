"use strict"

class Piece {
    constructor(isWhite) {
        this.isWhite_ = isWhite;
        this.isAlive_ = true;
        this.name_ = null;
        this.image_ = null;
        this.filePath_ = "resources/";
        this.timesMoved_ = 0;
    }

    validMoves(start) {
        return null;
    }

    setAlive(isAlive) {
        this.isAlive_ = isAlive;
    }

    getColor() {
        return this.isWhite_;
    }

    getName() {
        return this.name_;
    }

}

class Pawn extends Piece{
    constructor(isWhite) {
        super();
        this.name_ = "pawn";
        this.image_ += "pawnWhite.jpg"
    }
    validMoves(start /*tile*/) {
        return null;
    }
}