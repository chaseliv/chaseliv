class Player{
    constructor(isWhite) {
        this.piece_ = null;
        this.isWhite_ = isWhite;
    }
    setDownPiece(piece){
        this.piece_ = piece;
        this.piece_.get
    }
    pickUpPiece(){
        let temp = this.piece_;
        this.piece_ = null;
        // remove child from the player
        return temp;
    }
    hasPiece(){
        if(this.piece_ == null){
            return false;
        }
        else{
            return true;
        }
    }

}