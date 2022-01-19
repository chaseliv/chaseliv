let direction;
let y;
let x;

function validateMoves(startMove, piece) {
    direction = -1;
    if (playerColor === 'b') {
        direction = 1;
    } else {

    }

    y = startMove[0];
    x = startMove[1];

    //so we need to first check if the king is in check
        //if it IS in check, we need to show valid moves.. for just this piece


    switch (piece) {
        case 'r':
        case 'R':
            validateRook();
            break;
        case 'n':
        case 'N':
            validateKnight();
            break;
        case 'b':
        case 'B':
            validateBishop();
            break;
        case 'q':
        case 'Q':
            validateQueen();
            break;
        case 'k':
        case 'K':
            validateKing();
            break;
        case 'p':
        case 'P':
            validatePawn();
            break;
        default:
            console.log("Error with validate Move: " + piece);
    }
}


function validateRook() {
    for( let dir = -1; dir < 2; dir+= 2 ) {
        //checking verticals
        for (let i = y + dir; i >= 0 && i < 8; i+= dir) {
            if (!isPlayerPiece(board[i][x])) {
                validMoves[i][x] = 1;
                if (isEnemyPiece(board[i][x])) {
                    break;
                }
            } else {
                break;
            }
        }
        //checking horizontals
        for (let i = x + dir; i >= 0 && i < 8; i+= dir) {
            if (!isPlayerPiece(board[y][i])) {
                validMoves[y][i] = 1;
                if (isEnemyPiece(board[y][i])) {
                    break;
                }
            } else {
                break;
            }
        }
    }
}

function validateKnight() {
    for(let i = y - 2; i <= y + 2; i += 4){
        for(let j = x - 1; j <= x + 1; j += 2){
            try{
                if(!isPlayerPiece(board[i][j])){
                    validMoves[i][j] = 1;
                }
            }
            catch(e){
            }
        }
    }
    for(let i = y - 1; i <= y + 1; i += 2){
        for(let j = x - 2; j <= x + 2; j += 4){
            try{
                if(!isPlayerPiece(board[i][j])){
                    validMoves[i][j] = 1;
                }
            }
            catch(e){
            }
        }
    }

}

function validateBishop() {
    for(let i = -1; i < 2; i+= 2 ){
        for( let j = -1; j < 2; j+= 2){
            let multiplier = 1
            try {
                while (!isPlayerPiece(board[y + (i * multiplier)][x + (j * multiplier)])) {
                    validMoves[y + (i * multiplier)][x + (j * multiplier)] = 1;
                    if (isEnemyPiece(board[y + (i * multiplier)][x + (j * multiplier)])) {
                        break;
                    }
                    multiplier++;
                }
            }
            catch (e){
            }
        }
    }
}

function validateQueen() {
    validateBishop();
    validateRook();
}

function validateKing() {
    //TODO can't be in a spot to be taken
    //TODO castling

    for (let i = y - 1; i <= y + 1; i++) {
        for (let j = x - 1; j <= x + 1; j++) {
            try {
                if (!isPlayerPiece(board[i][j])){
                    validMoves[i][j] = 1;
                }
            } catch (e) {
            }
        }
    }


}

function validatePawn() {
    //TODO check index out of bounds??

    //check one ahead
    if (board[y + direction][x] === ' ') {
        validMoves[y + direction][x] = 1;
    }
    //check two ahead
    if (((playerColor === 'b' && y === 1) || (playerColor === 'w' && y === 6)) && board[y + (direction * 2)][x] === ' '
        && board[y + direction][x] === ' ') {

        validMoves[y + (direction * 2)][x] = 1;

        //enPassant checks for spots for enemy piece
        if(isEnemyPiece(board[y + (direction * 2)][x + 1])){
            enPassant = convertToAlgebraic(y + direction ,x);
        }
        else if (isEnemyPiece(board[y + (direction * 2)][x - 1])){
            enPassant = convertToAlgebraic(y + direction ,x);
        }
    }
    //check one ahead and one right if enemy or enPassant
    if (!isPlayerPiece(board[y + direction][x + 1]) && board[y + direction][x + 1] != ' '
        || isEnPassantTile(y + direction, x + 1)) {
        validMoves[y + direction][x + 1] = 1;
    }
    //check one ahead and one left if enemy or enPassant
    if (!isPlayerPiece(board[y + direction][x - 1]) && board[y + direction][x - 1] != ' '
        || isEnPassantTile(y + direction, x - 1)) {
        validMoves[y + direction][x - 1] = 1;
    }

}

function isEnPassantTile(y, x){
    if( convertToAlgebraic(y, x) === enPassant){
        return true;
    }
    return false;
}

function checkIfPinned(){
    //check the queen bishop and rook moves and return the pieces that are pinned.
    //also needs to include if that piece can move in a direction or not

    //so we have a pawn
    // check diagonals.... if it has a king && it has a pawn
        //2 steps
    // check forward and back... if it has a king && it has a pawn
    // do this after the valid moves and we can earse




    let isProtectingKing = false;
    let currentPiece = board[y][x];
    //is there a king behind it or infront of it?
    // for( let dir = -1; dir < 2; dir+= 2 ) {
    //     //checking verticals
    //     for (let i = y + dir; i >= 0 && i < 8; i+= dir) {
    //         if (!isPlayerPiece(board[i][x])) {
    //             validMoves[i][x] = 1;
    //             if (isEnemyPiece(board[i][x])) {
    //                 break;
    //             }
    //         } else {
    //             break;
    //         }
    //     }
    //     //checking horizontals
    //     for (let i = x + dir; i >= 0 && i < 8; i+= dir) {
    //         if (!isPlayerPiece(board[y][i])) {
    //             validMoves[y][i] = 1;
    //             if (isEnemyPiece(board[y][i])) {
    //                 break;
    //             }
    //         } else {
    //             break;
    //         }
    //     }
    // }



}