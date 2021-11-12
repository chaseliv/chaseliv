"use strict"
//functions
function createBoard(isWhite) {
    for (let i = 0; i < 8; i++) { //TODO does this need to be moved?
        Board.tiles_[i] = [];
        Board.validMoves_[i] = [];
    }

    let rowNum = 8;
    let colNum = rowNum;
    let tileCounter;
    if (isWhite) {
        tileCounter = 1;
    } else {
        tileCounter = 0;
    }
    for (let i = 0; i < rowNum; i++) {
        let row = document.createElement("tr");
        tbody.appendChild(row);
        for (let j = 0; j < colNum; j++) {
            let tile = new Tile(i, j);
            tile.cell_ = document.createElement("td");
            tile.cell_.onclick = function() { handleMouseClick(tile); }
            row.appendChild(tile.cell_);

            // let cords = document.createTextNode(i + ", " + j);
            // tile.cell_.appendChild(cords); //TODO just for testing.

            if (tileCounter % 2 == 0) {
                tile.cell_.setAttribute("class", "white");
            } else {
                tile.cell_.setAttribute("class", "black");

            }
            tileCounter++;
            Board.tiles_[i][j] = tile;
        }
        tileCounter++;
    }
}
function setBoard(){
    Board.tiles_[6][6].setPiece(new Pawn(true));
    Board.tiles_[5][5].setPiece(new Pawn(false));
    Board.tiles_[5][7].setPiece(new Pawn(false));
}
function clearAndResetBoard(){

}
function handleMouseClick(tile){
    console.log("clicked cell " + tile.getX() + ", " + tile.getY());

    if(Board.currentPiece_ == null && tile.piece_ != null){
        console.log("getting piece");
        Board.validMoves_ = tile.piece_.validMoves(tile);
        highLightValidMoves();
        Board.currentPiece_ = tile.getPiece();
        tile.getPiece().timesMoved_++;
        tile.removePiece();

        document.addEventListener('mousemove', function(e) {
            let body = document.querySelector('body');
            let circle = document.getElementById('circle');
            let left = e.offsetX;
            let top = e.offsetY;
            circle.style.left = left + 'px';
            circle.style.top = top + 'px';
        });
    }
    else if(Board.currentPiece_ != null){
        console.log("setting piece at " + tile.getX() + ", " + tile.getY());
        if(Board.validMoves_[tile.getX()][tile.getY()] == true){
            tile.setPiece(Board.currentPiece_);
        }
        else{
            // it needs to go back to start position
        }
        Board.currentPiece_ = null;
        Board.validMoves_ = null;
        removeHighLights();
    }

}
function highLightValidMoves(){
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            if(Board.validMoves_[i][j] == true){
                // Board.tiles_[i][j].cell_.style.backgroundColor = "blue";
                Board.tiles_[i][j].cell_.setAttribute("id", "highlighted")
                console.log("\thighlighting " + i + ", " + j);
            }
        }
    }
}
function removeHighLights(){
    let highLights = document.getElementById("highlighted");
    for( let i = 0; i < highLights.length; i++){
        console.log("removing");
        highLights[i].removeAttribute("id");
    }

    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            console.log("removing");
            Board.tiles_[i][j].cell_.removeAttribute("id");
        }
    }
}

///////


class Board{
    static tiles_ = new Array(8);
    static isTileSelected_ = false;
    static currentPiece_ = null;
    static validMoves_ = new Array(8);
    static start_ = null;
    static end_ = null;

}


let body = document.body;
let table = document.getElementsByTagName("table")[0];
let tbody = document.getElementsByTagName("tbody")[0];
let row = document.createElement("tr");
tbody.appendChild(row);

let isWhite = true;
createBoard(!isWhite);
setBoard();




