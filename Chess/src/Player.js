class Player{
    constructor(isWhite) {
        this.piece_ = null;
        this.isWhite_ = isWhite;
    }
    setPiece(piece){
        this.piece_ = piece;
        this.piece_.get
    }
    getPiece(){
        let temp = this.piece_;
        this.piece_ = null;
        // remove child from the player
        return temp;
    }

}