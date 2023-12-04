const timer = document.querySelector('.timer');

var rows = 3;
var columns = 3;

var carrTile;
var otherTile; //em branco

var turns = 0;

var imgOrderCerta = ["1","2","3","4","5","6","7","8","9"]; //ordem normal

var imgOrder = ["6","3","1","4","5","2","8","7","9"];

window.onload = function(){
    for (let r=0; r < rows; r++){
        for (let c=0; c < columns; c++){
            //<img>
            let tile = document.createElement("img");
            tile.id = r.toString() + c.toString();
            tile.src = "../images/puzzle/" + imgOrder.shift()+ ".jpg" ;

            //funções drag/arrasta
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend",dragEnd);

            document.getElementById("board").append(tile);
        }
    }
}

function dragStart(){
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {
}

function dragDrop() {
    otherTile = this; //foto sendo solta (dropped)
}

function dragEnd() {
    if (!otherTile.src.includes("9.jpg")) { //pequena mudança ("em-branco")
        return;
    }

    if (otherTile.src.includes(".jpg")) {
        let currCoords = currTile.id.split(""); // "00" -> ["0", "0"]
        let r = parseInt(currCoords[0]);
        let c = parseInt(currCoords[1]);

        let otherCoords = otherTile.id.split("");
        let r2 = parseInt(otherCoords[0]);
        let c2 = parseInt(otherCoords[1]);

        let moveLeft = r === r2 && c2 === c - 1;
        let moveRight = r === r2 && c2 === c + 1;

        let moveUp = c === c2 && r2 === r - 1;
        let moveDown = c === c2 && r2 === r + 1;

        let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

        if (isAdjacent) {
            let currImg = currTile.src;
            let otherImg = otherTile.src;

            currTile.src = otherImg;
            otherTile.src = currImg;

            turns += 1;
            document.getElementById("turns").innerText = turns;
        }
    }
}

    let currTile;
    let currCoords = currTile.id.split("-"); // "0-0" -> ["0", "0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c-1;
    let moveRight = r == r2 && c2 == c+1;

    let moveUp = c == c2 && r2 == r-1;
    let moveDown = c == c2 && r2 == r+1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;
    }
