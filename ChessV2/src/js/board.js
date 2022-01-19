function PCEINDEX(pce, pceNum) {
    return (pce * 10 + pceNum);
}


let GameBoard = {};

GameBoard.pieces = new Array(BRD_SQ_NUM);
GameBoard.side = COLORS.WHITE;
GameBoard.fiftyMove = 0; //if either player hasn't captured in 50, the game can be drawn
GameBoard.hisPly = 0; //maintain of count of half moves, per side, to see all the moves so we can take it back
GameBoard.ply = 0; //number of half moves played in the search tree.
GameBoard.enPas = 0; //if a pawn advances two around another pawn.
GameBoard.castlePerm = 0; //if we can or can't castle
GameBoard.material = new Array(2); //White,Black material of pieces
GameBoard.pceNum = new Array(13); //indexed by the piece
GameBoard.pList = new Array(14 * 10);
GameBoard.posKey = 0;

GameBoard.moveList = new Array(MAXDEPTH * MAXPOSITIONMOVES);
GameBoard.moveScores = new Array(MAXDEPTH * MAXPOSITIONMOVES);
GameBoard.moveListStart = new Array(MAXDEPTH);

function GeneratePosKey(){
    let sq = 0;
    let finalKey = 0;
    let piece = PIECES.EMPTY;

    for(sq = 0; sq < BRD_SQ_NUM; ++sq){
        piece = GameBoard.pieces[sq];
        if(piece != PIECES.EMPTY && piece != SQUARES.OFFBOARD){
            finalKey ^= PieceKeys[(piece * 120) + sq];
        }
    }

    if(GameBoard.side == COLORS.WHITE){
        finalKey ^= SideKey;
    }
    if(GameBoard.enPas != SQUARES.NO_SQ){
        finalKey ^= PieceKeys[GameBoard.enPas];
    }
    finalKey ^= CastleKeys[GameBoard.castlePerm];
    return finalKey;
}

function ResetBoard(){
    let index = 0;

    for(index = 0; index < BRD_SQ_NUM; ++index) {
        GameBoard.pieces[index] = SQUARES.OFFBOARD;
    }

    for(index = 0; index < 64; ++index) {
        GameBoard.pieces[SQ120(index)] = PIECES.EMPTY;
    }

    for(index = 0; index < 14 * 120; ++index) {
        GameBoard.pList[index] = PIECES.EMPTY;
    }

    for(index = 0; index < 2; ++index) {
        GameBoard.material[index] = 0;
    }

    for(index = 0; index < 13; ++index) {
        GameBoard.pceNum[index] = 0;
    }

    GameBoard.side = COLORS.BOTH;
    GameBoard.enPas = SQUARES.NO_SQ;
    GameBoard.fiftyMove = 0;
    GameBoard.ply = 0;
    GameBoard.hisPly = 0;
    GameBoard.castlePerm = 0;
    GameBoard.posKey = 0;
    GameBoard.moveListStart[GameBoard.ply] = 0;



}

function ParseFen(fen) {

    ResetBoard();

    //TODO valid fen string before parsing

    let rank = RANKS.RANK_8;
    let file = FILES.FILE_A;
    let piece = 0;
    let count = 0;
    let i = 0;
    let sq120 = 0;
    let fenCnt = 0; // the count of chars

    while((rank >= RANKS.RANK_1) && fenCnt < fen.length){
        count = 1;
        switch (fen[fenCnt]) {
            case 'p': piece = PIECES.bP; break;
            case 'r': piece = PIECES.bR; break;
            case 'n': piece = PIECES.bN; break;
            case 'b': piece = PIECES.bB; break;
            case 'k': piece = PIECES.bK; break;
            case 'q': piece = PIECES.bQ; break;
            case 'P': piece = PIECES.wP; break;
            case 'R': piece = PIECES.wR; break;
            case 'N': piece = PIECES.wN; break;
            case 'B': piece = PIECES.wB; break;
            case 'K': piece = PIECES.wK; break;
            case 'Q': piece = PIECES.wQ; break;

            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
                piece = PIECES.EMPTY;
                count = fen[fenCnt].charCodeAt(0) - '0'.charCodeAt(0);
                break;

            case '/':
            case ' ':
                rank--;
                file = FILES.FILE_A;
                fenCnt++;
                continue;
            default:
                console.log("FEN error");
                return;

        }

        //
        for (i = 0; i < count; i++) {
            sq120 = FR2SQ(file,rank);
            brd_pieces[sq120] = piece;
            file++;
        }
        fenCnt++;
    }

//finished part 11
}