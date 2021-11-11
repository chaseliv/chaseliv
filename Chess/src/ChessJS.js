"use strict";
//functions


///////////////////////


//Colors
let currentDark = "#041005";
let currentMed = "#124016";
let currentLight = "#60D269";

//body
let body = document.body;
body.style.backgroundColor = currentDark;

//Table
let table = document.createElement("table");
table.style.tableLayout = "fixed";
table.style.width = "100px";
body.appendChild(table);
console.log("Made the table");

//row
let tableBody = document.createElement("tbody");
body.appendChild(tableBody);
console.log("Made the tablebody");


let clickedCell = document.createElement('td');

createBoard(true);

function createBoard(isWhite) {
    console.log("In create board");
    for (let i = 0; i < 8; i++) {
        let row = document.createElement("tr");
        tableBody.appendChild(row);
        tableBody.style.borderWidth = "2px";
        tableBody.style.borderStyle = "solid";
        tableBody.style.borderColor = currentLight;
        tableBody.style.backgroundColor = currentDark;

        for (let j = 0; j < 8; j++) {
            let tile = Tile.constructor(i, j);
            tile.cell_ = document.createElement("td");
            let cellNum = document.createTextNode(i + ", " + j);

            tile.cell_.appendChild(cellNum); //adding the number to the cell
            row.appendChild(tile.cell_); // adding the cell to the row

            if( (i + j) % 2 == 0) {
                tile.cell_.setAttribute("id", "white");

                //TODO put this all in CSS
                tile.cell_.style.padding = "12px";
                tile.cell_.style.textAlign = "center";
                tile.cell_.style.border = "1px solid #EAC743";
                tile.cell_.style.borderColor = currentLight;
                tile.cell_.style.fontFamily = "Helvetica";
                tile.cell_.style.fontWeight = "bolder";
                tile.cell_.style.color = currentDark;
                tile.cell_.style.backgroundColor = currentLight;
            }
            else {
                tile.cell_.setAttribute("id", "black");

                //TODO put this all in CSS
                tile.cell_.style.padding = "12px";
                tile.cell_.style.textAlign = "center";
                tile.cell_.style.border = "1px solid #EAC743";
                tile.cell_.style.borderColor = currentLight;
                tile.cell_.style.fontFamily = "Helvetica";
                tile.cell_.style.fontWeight = "normal";
                tile.cell_.style.color = currentLight;
                tile.cell_.style.backgroundColor = currentDark;
            }

            ////////////////////
            // mouse events
            let clicked = false;

            // selecting
            cell.onclick = function () {
                //on clicked i want it to highlight all the valid moves
                let piece = tile.getPiece();
                piece.validMoves(tile);

            }


        }
    }
}








