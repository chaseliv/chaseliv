"use strict";

//Functions/////////////////////////////////////////////////////////////////////
/**
 * Creates the table with the given side of the board
 * @param side the color the player is
 */
//TODO add side for when the player is black to switch
function createTable() {
    for (let y = 0; y < 8; y++) {
        let row = document.createElement("tr")
        for (let x = 0; x < 8; x++) {
            let cell = document.createElement("td");
            cell.setAttribute("id", cellId(y, x));
            cell.style.width = "80px";
            cell.style.height = "80px";
            cell.onclick = function () {
                handleClick(this, x, y);
            }

            if (tiles[y][x] == 0) {
                cell.setAttribute("class", "whiteTile");
            } else {
                cell.setAttribute("class", "blackTile");
            }
            row.appendChild(cell);
        }
        tbl.appendChild(row);
    }
    // let body = document.getElementsByTagName("body");
    let body = document.getElementById("chessboard");
    body.appendChild(tbl);

}

/**
 * converts and returns the coordinates to the cell's id
 */
function cellId(y, x) {
    return (y + " " + x);
}

/**
 * If its the player's turn and one of their pieces, it will pick up the piece, show valid moves, and allow
 * it to be set down
 *
 * @param cell the cell/piece that was clicked
 */
function handleClick(cell, x, y) {
    if (!gameOver) {
        let piece = board[y][x];
        console.log("Clicked " + convertToAlgebraic(y, x));
        if (!playerHasPiece && colorTurn === playerColor && isPlayerPiece(piece)) {
            console.log("\tPicked up '" + piece + "'")
            startMove[0] = y;
            startMove[1] = x;

            playerHasPiece = true;
            currentPiece = piece;

            validateMoves(startMove, currentPiece);
            highlightValidMoves(y, x);
        }
        //else the player has a piece
        else if (playerHasPiece) {
            if (validMoves[y][x] == 1) {
                placePiece(y, x);
                nextPlayerTurn();
            } else {
                console.log("\tPut down '" + currentPiece + "'");
            }
            clearHighlights();
            playerHasPiece = false;
        }
    }
}

function placePiece(y, x) {
    if (isEnPassantTile(y, x)) {
        board[y - direction][x] = ' ';
    }

    if (y === 0 && currentPiece === 'P') {
        currentPiece = 'Q';
    } else if (y === 7 && currentPiece === 'p') {
        currentPiece = 'q';
    }

    console.log("\tMoving '" + currentPiece + "' to " + convertToAlgebraic(y, x))
    board[y][x] = currentPiece;
    board[startMove[0]][startMove[1]] = ' ';
}

function clearHighlights() {
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            validMoves[y][x] = 0;
            let cell = document.getElementById(cellId(y, x));

            if (tiles[y][x] === 0) {
                cell.setAttribute("class", "whiteTile");
            } else {
                cell.setAttribute("class", "blackTile");
            }
        }
    }
}

/**
 * changes the turn of the board
 */
function nextPlayerTurn(y, x) {
    if (colorTurn === 'w') {
        colorTurn = 'b';
    } else {
        colorTurn = 'w';
    }
    // if(enPassant != "-"){ //??
    //     enPassant = "-";
    // }

    if (gameMode === "local") {
        setBoard(createFen());
        if (playerColor === 'w') {
            playerColor = 'b';
        } else {
            playerColor = 'w';
        }
    } else if (gameMode === "online") {
        ws.send("fen" + " " + createFen());
    } else {
        setBoard(createFen());
        //its a bot
    }

}

/**
 * highlights the cells with the valid moves for the current selected piece
 */
function highlightValidMoves(y, x) {
    for (let yIndex = 0; yIndex < 8; yIndex++) {
        for (let xIndex = 0; xIndex < 8; xIndex++) {
            if (validMoves[yIndex][xIndex] === 1 || (y == yIndex && x == xIndex)) {
                let cell = document.getElementById(cellId(yIndex, xIndex))

                if (tiles[yIndex][xIndex] == 1) {
                    cell.setAttribute("class", "whiteTileHigh");
                } else {
                    cell.setAttribute("class", "blackTileHigh");
                }

            }
        }
    }
}

/**
 * Checks if the cell at the given coordinate contains a piece that a player can move.
 * @param piece a char that represents the piece being tested
 * @returns true if its the players piece, else false if enemy or empty
 */
function isPlayerPiece(piece) {
    if ((playerColor === 'w' && piece >= 'A' && piece <= 'Z')
        || (playerColor === 'b' && piece >= 'a' && piece <= 'z')) {
        return true;
    } else {
        return false;
    }
}


/**
 * Checks if the cell at the given coordinate contains a enemy players piece.
 * @param piece a char that represents the cell being tested
 * @returns true if its an enemy player piece, false if player's or empty
 */
function isEnemyPiece(piece) {
    if (playerColor === 'w' && piece >= 'A' && piece <= 'Z') {
        return false;
    } else if (playerColor === 'b' && piece >= 'a' && piece <= 'z') {
        return false;
    } else if (piece === ' ') {
        return false;
    } else {
        return true;
    }
}

/**
 * Converts the fen into the current positions of pieces on the board.
 * @param fen the string representation of the board
 */
function setBoard(fen) {
    let fenArr = fen.split(' ');
    let boardFen = fenArr[0];
    let pos = 0;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let char = boardFen.charAt(pos);
            if (char >= '0' && char <= '9') {
                let numEmpty = parseInt(char);
                for (let k = 0; k < numEmpty; k++) {
                    board[i][j] = ' ';
                    j++;
                }
                j--;
            } else if (char != '/') {
                board[i][j] = char;
            } else {
                //it is a '/'
                j--;
            }
            pos++;
        }
    }
    colorTurn = fenArr[1];
    let castleFen = fenArr[2];
    if (castleFen != '-') {
        castle1 = castleFen.charAt(0);
        castle2 = castleFen.charAt(1);
        castle3 = castleFen.charAt(2);
        castle4 = castleFen.charAt(3);
    } else {
        castle1 = ' ';
        castle2 = ' ';
        castle3 = ' ';
        castle4 = ' ';
    }

    enPassant = fenArr[3];
    halfMove = fenArr[4];
    fullMove = fenArr[5];

    setImages();
}

/**
 * Sets all the piece images to the board from the board array
 */
function setImages() {
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            setImage(y, x);
        }
    }

}

/**
 * Sets the image for the given coordinates
 */
function setImage(y, x) {
    //clear the tile
    let cell = document.getElementById(cellId(y, x));
    while (cell.hasChildNodes()) {
        cell.removeChild(cell.firstChild);
    }

    let char = board[y][x];
    if (char != ' ') {
        let pieceSource = "images/";
        switch (char) {
            case 'r':
                pieceSource += "BlackRook.png";
                break;
            case 'R':
                pieceSource += "WhiteRook.png";
                break;
            case 'n':
                pieceSource += "BlackKnight.png";
                break;
            case 'N':
                pieceSource += "WhiteKnight.png";
                break;
            case 'b':
                pieceSource += "BlackBishop.png";
                break;
            case 'B':
                pieceSource += "WhiteBishop.png";
                break;
            case 'q':
                pieceSource += "BlackQueen.png";
                break;
            case 'Q':
                pieceSource += "WhiteQueen.png";
                break;
            case 'k':
                pieceSource += "BlackQueen.png";
                break;
            case 'K':
                pieceSource += "WhiteKing.png";
                break;
            case 'p':
                pieceSource += "BlackPawn.png";
                break;
            case 'P':
                pieceSource += "WhitePawn.png";
                break;
            default:
                console.log("Error with char: " + char);
        }
        //add the child
        let pieceImage = document.createElement("IMG");
        pieceImage.setAttribute("src", pieceSource);
        cell.appendChild(pieceImage);
    }
}

/**
 * Sends the fen representation of the current board to the server
 */
function createFen() {
    let fen = "";
    //board representation
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j] === ' ') {
                let counter = 0;
                while (board[i][j + counter] === ' ') {
                    counter++;
                }
                fen += counter + "";
                j += counter - 1;
            } else {
                fen += board[i][j];
            }
        }
        if (i != 7) {
            fen += "/";
        } else {
            fen += " ";
        }
    }

    //global variables
    fen += colorTurn + " ";
    if (castle1 === "-" && castle2 === "-" && castle3 === "-" && castle4 === "-") {
        fen += "- ";
    } else {
        fen += castle1;
        fen += castle2;
        fen += castle3;
        fen += castle4 + " ";
    }

    fen += enPassant + " ";
    fen += halfMove + " ";
    fen += fullMove;

    return fen;
}

/**
 * Converts the X,Y coordinates to chess algebraic
 */
function convertToAlgebraic(y, x) {
    let cord = "";
    let alpha = ["a", "b", "c", "d", "e", "f", "g", "h"];
    cord += alpha[x];
    cord += 8 - y;

    return cord;
}

//////////////////////////////////////////////////////////

//Game//////////////////////////////////////////////////////
createTable();