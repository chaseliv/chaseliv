"use strict"

class Piece {
    constructor(isWhite) {
        this.isWhite_ = isWhite;
        this.isAlive_ = true;
        this.name_ = null;
        this.image_ = null;
        this.filePath_ = "resources/";
        this.timesMoved_ = -1;
    }

    validMoves(start) {
        console.log("in piece valid moves");
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

class Pawn extends Piece {
    constructor(isWhite) {
        super();
        this.name_ = "pawn";
        this.image_ += "pawnWhite.jpg"
    }

    validMoves(tile) {
        let validMoves = new Array(8)
        for (let i = 0; i < 8; i++) {
            validMoves[i] = [];
            for (let j = 0; j < 8; j++) {
                validMoves[i][j] = false;
            }
        }

        let direction;
        if (this.isWhite_) {
            direction = -1;
        } else {
            direction = 1;
        }

        let row = tile.getX();
        let col = tile.getY();

        console.log("Valid moves for " + row + ", " + col);
        //TODO check if its also not a white piece
        try {
            if (Board.tiles_[row - (2 * direction)][col].getPiece() == null && tile.getPiece().timesMoved_ < 0) {
                validMoves[row - (2 * direction)][col] = true;
                console.log("\t1. " + (row - 2) + ", " + col);
            }
        }
        catch (e) {/*outofboudns*/}
        try {
            if (Board.tiles_[row - direction][col].getPiece() == null) {
                validMoves[row - direction][col] = true;
                console.log("\t1. " + (row - 1) + ", " + col);
            }
        }
        catch (e) {/*outofboudns*/}
        try {
            if (Board.tiles_[row - direction][col - 1].getPiece() != null) {
                validMoves[row - direction][col - 1] = true;
                console.log("\t1. " + (row - 1) + ", " + (col - 1));
            }
        }
        catch (e) {/*outofboudns*/}
        try {
            if (Board.tiles_[row - direction][col + 1].getPiece() != null) {
                validMoves[row - direction][col - 1] = true;
                console.log("\t1. " + (row - 1) + ", " + (col + 1));
            }
        }
        catch (e) {/*outofboudns*/}

        return validMoves;
    }
}