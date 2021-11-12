"use strict"

class Board {
    constructor(isWhite) {
        this.rowNum = 8;
        this.colNum = 8;
    }

    createBoard() {
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
                tile.cell_.setAttribute("id", i + "," + j);
                row.appendChild(tile.cell_);

                if (tileCounter % 2 == 0) {
                    tile.cell_.setAttribute("class", "white");
                } else {
                    tile.cell_.setAttribute("class", "black");
                }
                tileCounter++;
            }
            tileCounter++;
        }
    }
}