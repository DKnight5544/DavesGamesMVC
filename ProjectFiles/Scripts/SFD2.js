
const SOLVED = "01020304050607080910111213141516171819202122232425";

let global = {};
global.cache = "";
global.moveCount = 0;
global.gridString = SOLVED;


function begin() {

    global.moveCountLabel = document.getElementById("MoveCountLabel");
    global.lastMoveLabel = document.getElementById("LastMoveLabel");
    global.animButton = document.getElementById("AnimateButton");
    global.urlInput = document.getElementById("GamebotUrl");
    global.log = document.getElementById("Log");


    global.animButton.onclick =
        function () {
            if (global.animButton.innerHTML == "Animate") {
                global.animButton.innerHTML = "Stop";
                global.timer = setInterval(runUserCode, 200);
            }
            else {
                global.animButton.innerHTML = "Animate";
                clearInterval(global.timer);
            }
        }

    global.urlInput.onfocus = function () {
        this.select();
    }


    global.urlInput.onkeypress = function (e) {
        if (!e) e = window.event;
        var keyCode = e.code || e.key;
        if (keyCode == 'Enter') {
            connect();
        }
    }

    buildHTML();

    connect();

    setGrid(global.gridString);

    if (global.gridString === SOLVED) scramble();



}

function runUserCode() {

    let userMove;

    if (global.cache.length == 0) {

        let url = global.urlInput.value + global.gridString;

        fetch(url).then(function (response) {
            // The API call was successful!
            if (response.ok) {
                return response.text();
            } else {
                return Promise.reject(response);
            }
        }).then(function (data) {
            // This is the JSON from our response
            global.cache += data;

            global.log.innerHTML = "<p>SND: "
                + global.gridString
                + "</p><p>RCV: "
                + data + "</p><hr>"
                + global.log.innerHTML;

            runUserCode();
        }).catch(function (err) {
            // There was an error
            console.warn('Something went wrong.', err);
        });

        return false;
    }

    userMove = global.cache.substr(0, 1);
    global.cache = global.cache.substr(1);

    if (userMove == undefined) userMove = "?";


    global.moveCount++;
    global.moveCountLabel.innerHTML = "Move Count: " + global.moveCount;


    if ("LRUD".includes(userMove)) swap1(userMove);
    else {
        clearInterval(global.timer);
        global.animButton.innerHTML = "Animate";
    }

    global.lastMoveLabel.innerHTML = "Last Move: " + userMove;

}

function scramble() {

    const LEGAL_MOVES = "LRUD"
    let last_rnd = 10;

    for (let i = 0; i < 1000; i++) {

        let rnd = randomNumber(0, 3);
        
        while (!isValidRandomMove(rnd, last_rnd)){
            rnd = randomNumber(0, 4);            
        }

        last_rnd = rnd;
        swap1(LEGAL_MOVES.substr(rnd, 1));
    }

    stringifyGrid();

    global.cache = "";
    global.lastMoveLabel.innerHTML = "Last Move: --";
    global.moveCountLabel.innerHTML = "Move Count: 0";
    global.moveCount = 0;
    global.log.innerHTML = "";
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
}

function isValidRandomMove(rnd, last_rnd) {

    if (rnd + last_rnd === 1) return false;
    if (rnd + last_rnd === 5) return false;

    let blankCell = global.grid.find(c => c.actualVal === 25);

    if (blankCell.col === 1 && rnd === 0) return false;
    if (blankCell.col === 5 && rnd === 1) return false;
    if (blankCell.row === 1 && rnd === 2) return false;
    if (blankCell.row === 5 && rnd === 3) return false;

    return true;
}

function swap1(direction) {

    /*
     * cell.row
     * cell.col
     * cell.actualVal  (where it is)
     * cell.targetVal  (where it should be)
     * cell.td  (the <td> where it is displayed)
     */

    // so, square 25 is the "blank" square lets grab it...
    let blankCell = global.grid.find(c => c.actualVal == 25);
    let newRow = blankCell.row;
    let newCol = blankCell.col;
    if (direction == "L") newCol--;
    else if (direction == "R") newCol++;
    else if (direction == "U" || direction == "T") newRow--;
    else if (direction == "D" || direction == "B") newRow++;

    if (newRow > 0 && newRow < 6
        && newCol > 0 && newCol < 6) {
        let swapCell = global.grid.find(c => c.row == newRow && c.col == newCol);
        swap2(blankCell, swapCell);
        stringifyGrid();
        let debug = 0;
    }

}

function swap2(cell1, cell2) {

    /*
     * cell.row
     * cell.col
     * cell.actualVal  (where it is)
     * cell.targetVal  (where it should be)
     * cell.td  (the <td> where it is displayed)
     */

    let saveVal = cell1.actualVal;
    cell1.setVal(cell2.actualVal);
    cell2.setVal(saveVal);

    colorize(cell1);
    colorize(cell2);

    let debug = 0;

}

function colorize(cell) {
    /*
     * cell.row
     * cell.col
     * cell.actualVal  (where it is)
     * cell.targetVal  (where it should be)
     * cell.td  (the <td> where it is displayed)
     */
    if (cell.actualVal == 25) {
        cell.td.style.backgroundColor = "navy";
        cell.td.style.color = "navy";
    }
    else if (cell.actualVal == cell.targetVal) {
        cell.td.style.backgroundColor = "red";
        cell.td.style.color = "white";
    }
    else {
        cell.td.style = null;
    }

}

function stringifyGrid() {

    let str = "";

    for (let c = 0; c < 25; c++) {
        let cell = global.grid[c];
        str += ("00" + cell.actualVal).slice(-2);
    }

    global.gridString = str;
}

function setGrid(board) {

    /*
     * cell.row
     * cell.col
     * cell.actualVal  (where it is)
     * cell.targetVal  (where it should be)
     * cell.td  (the <td> where it is displayed)
     */


    let grid = [];
    let actualIndex = 0;

    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
            let cell = {};
            cell.row = r + 1;
            cell.col = c + 1;
            cell.actualVal = parseInt(board.substr(actualIndex, 2));
            actualIndex += 2;
            grid.push(cell);
        }
    }


    for (let i = 1; i <= 25; i++) {
        let cell = grid[i - 1];
        cell.targetVal = i;
        let id = "TD" + i.toString();
        cell.td = global[id];
        cell.setVal = function (val) {
            cell.actualVal = val;
            cell.td.innerText = val.toString();
        }
        cell.setVal(cell.actualVal);
        colorize(cell);
    }

    global.grid = grid;

    stringifyGrid();
}

function buildHTML() {

    let tableElement;
    let trElement;

    let mainContainerElement = document.getElementById("boardContainer");

    // main grid
    tableElement = document.createElement("table");
    tableElement.className = "board";

    trElement = document.createElement("tr");
    tableElement.appendChild(trElement);

    trElement.appendChild(getTdElement(1));
    trElement.appendChild(getTdElement(2));
    trElement.appendChild(getTdElement(3));
    trElement.appendChild(getTdElement(4));
    trElement.appendChild(getTdElement(5));

    trElement = document.createElement("tr");
    tableElement.appendChild(trElement);

    trElement.appendChild(getTdElement(6));
    trElement.appendChild(getTdElement(7));
    trElement.appendChild(getTdElement(8));
    trElement.appendChild(getTdElement(9));
    trElement.appendChild(getTdElement(10));

    trElement = document.createElement("tr");
    tableElement.appendChild(trElement);

    trElement.appendChild(getTdElement(11));
    trElement.appendChild(getTdElement(12));
    trElement.appendChild(getTdElement(13));
    trElement.appendChild(getTdElement(14));
    trElement.appendChild(getTdElement(15));

    trElement = document.createElement("tr");
    tableElement.appendChild(trElement);

    trElement.appendChild(getTdElement(16));
    trElement.appendChild(getTdElement(17));
    trElement.appendChild(getTdElement(18));
    trElement.appendChild(getTdElement(19));
    trElement.appendChild(getTdElement(20));

    trElement = document.createElement("tr");
    tableElement.appendChild(trElement);

    trElement.appendChild(getTdElement(21));
    trElement.appendChild(getTdElement(22));
    trElement.appendChild(getTdElement(23));
    trElement.appendChild(getTdElement(24));
    trElement.appendChild(getTdElement(25));

    mainContainerElement.appendChild(tableElement);

}

function getTdElement(innerText) {
    let id = "TD" + innerText;

    let tdElement = document.createElement("td");
    tdElement.id = id;
    tdElement.className = "board_td";
    tdElement.innerText = innerText;

    global[id] = tdElement;

    return tdElement;

}

function connect() {
    let frm = document.getElementById("iframe1");
    frm.src = global.urlInput.value;
    return false;
}
