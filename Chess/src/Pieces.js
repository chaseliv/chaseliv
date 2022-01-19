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
    getImageNode(){
        let imageNode = document.createElement("img");
        imageNode.setAttribute("src", this.image_);
        imageNode.style.width = '50%';
        imageNode.style.height = 'auto';
        return imageNode;
    }

}

class Pawn extends Piece {
    constructor(isWhite) {
        super();
        this.name_ = "pawn";
        this.image_ = "data:image/jpeg;base64,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";
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
        catch (e) {/*out of bounds*/}
        try {
            if (Board.tiles_[row - direction][col].getPiece() == null) {
                validMoves[row - direction][col] = true;
                console.log("\t1. " + (row - 1) + ", " + col);
            }
        }
        catch (e) {/*out of bounds*/}
        try {
            if (Board.tiles_[row - direction][col - 1].getPiece() != null) {
                validMoves[row - direction][col - 1] = true;
                console.log("\t1. " + (row - 1) + ", " + (col - 1));
            }
        }
        catch (e) {/*out of bounds*/}
        try {
            if (Board.tiles_[row - direction][col + 1].getPiece() != null) {
                validMoves[row - direction][col - 1] = true;
                console.log("\t1. " + (row - 1) + ", " + (col + 1));
            }
        }
        catch (e) {/*out of bounds*/}

        return validMoves;
    }
}