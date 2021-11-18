
let global = {};
global.cache = "";
global.moveCount = 0;

const SOLVED = "01020304050607080910111213141516171819202122232425";

function begin() {

    global.gridString = document.getElementById("gridString");
    global.aboutDisplayStatus = document.getElementById("aboutDisplayStatus");

    buildHTML();

    let thisLocation = window.location.href;
    let local = (thisLocation.substr(0, 5) == "file:") || (thisLocation.indexOf("localhost") > -1);

    if (local) {
        let title = document.getElementsByTagName("title")[0];
        title.innerText = "Slider Puzzle";
        let debug = true;
    }

    setGrid(global.gridString.value);

    if (global.gridString.value === SOLVED) scramble();

}

function runUserCode() {

    let userMove;

    if (global.cache.length == 0) {
        let response = move(global.gridString.value);
        global.cache += response;
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

    global.gridString.value = str;
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
    let tdElement;
    let spanElement;
    let btnElement;
    let divElement;

    let mainContainerElement = document.getElementById("boardContainer");

    // main grid
    tableElelement = document.createElement("table");
    tableElelement.className = "board";
    mainContainerElement.appendChild(tableElelement);

    trElement = document.createElement("tr");
    tableElelement.appendChild(trElement);

    trElement.appendChild(getTdElement(1));
    trElement.appendChild(getTdElement(2));
    trElement.appendChild(getTdElement(3));
    trElement.appendChild(getTdElement(4));
    trElement.appendChild(getTdElement(5));

    trElement = document.createElement("tr");
    tableElelement.appendChild(trElement);

    trElement.appendChild(getTdElement(6));
    trElement.appendChild(getTdElement(7));
    trElement.appendChild(getTdElement(8));
    trElement.appendChild(getTdElement(9));
    trElement.appendChild(getTdElement(10));

    trElement = document.createElement("tr");
    tableElelement.appendChild(trElement);

    trElement.appendChild(getTdElement(11));
    trElement.appendChild(getTdElement(12));
    trElement.appendChild(getTdElement(13));
    trElement.appendChild(getTdElement(14));
    trElement.appendChild(getTdElement(15));

    trElement = document.createElement("tr");
    tableElelement.appendChild(trElement);

    trElement.appendChild(getTdElement(16));
    trElement.appendChild(getTdElement(17));
    trElement.appendChild(getTdElement(18));
    trElement.appendChild(getTdElement(19));
    trElement.appendChild(getTdElement(20));

    trElement = document.createElement("tr");
    tableElelement.appendChild(trElement);

    trElement.appendChild(getTdElement(21));
    trElement.appendChild(getTdElement(22));
    trElement.appendChild(getTdElement(23));
    trElement.appendChild(getTdElement(24));
    trElement.appendChild(getTdElement(25));

    // stats table
    tableElement = document.createElement("table");
    tableElement.className = "stats_table";
    mainContainerElement.appendChild(tableElement);

    trElement = document.createElement("tr");
    tableElement.appendChild(trElement);

    tdElement = document.createElement("td");
    tdElement.className = "stats_td";
    trElement.appendChild(tdElement);

    spanElement = document.createElement("span");
    spanElement.id = "MoveCountLabel";
    spanElement.innerHTML = "Move Count: 0";
    global.moveCountLabel = spanElement;
    tdElement.appendChild(spanElement);

    tdElement = document.createElement("td");
    tdElement.className = "stats_td";
    trElement.appendChild(tdElement);

    spanElement = document.createElement("span");
    spanElement.id = "LastMoveLabel";
    spanElement.innerHTML = "Last Move: --";
    global.lastMoveLabel = spanElement;
    tdElement.appendChild(spanElement);

    // Move Button
    let moveButton;
    moveButton = document.createElement("button");
    moveButton.className = "board_btn board_btn_shuffle";
    moveButton.innerHTML = "Move";
    moveButton.onclick = function () {
        runUserCode();
    }
    mainContainerElement.appendChild(moveButton);

    // animate Button
    let animButton;
    animButton = document.createElement("button");
    animButton.className = "board_btn board_btn_shuffle";
    animButton.innerHTML = "Animate";
    animButton.onclick = function () {
        if (animButton.innerHTML == "Animate") {
            animButton.innerHTML = "Stop";
            global.timer = setInterval(runUserCode, 200);
        }
        else {
            animButton.innerHTML = "Animate";
            clearInterval(global.timer);
        }
    }
    global.animButton = animButton;
    mainContainerElement.appendChild(animButton);

    // Scramble Button
    scrambleButton = document.createElement("button");
    scrambleButton.className = "board_btn board_btn_shuffle";
    scrambleButton.innerHTML = "Scramble";
    scrambleButton.onclick = function () { scramble(); }
    mainContainerElement.appendChild(scrambleButton);

    // select File Button
    let selectFileButton = document.createElement("button");
    selectFileButton.className = "board_btn board_btn_shuffle";
    selectFileButton.innerHTML = "Upload Script";
    selectFileButton.id = "selectFileButton";
    selectFileButton.onclick = function () {
        let fileInput = document.getElementById("fileInput");
        fileInput.click();
    }

    mainContainerElement.appendChild(selectFileButton);


    //// saveButton Button
    //let saveButton = document.createElement("button");
    //saveButton.className = "board_btn board_btn_shuffle";
    //saveButton.innerHTML = "savePuzzle()";
    //saveButton.id = "saveButton";
    //saveButton.onclick = function () {
    //    global.bookmark = global.gridString.value;
    //    alert("Puzzle Saved");
    //}

    //mainContainerElement.appendChild(saveButton);

    //// restore Puzzle Button
    //let restoreButton = document.createElement("button");
    //restoreButton.className = "board_btn board_btn_shuffle";
    //restoreButton.innerHTML = "restorePuzzle()";
    //restoreButton.id = "restoreButton";
    //restoreButton.onclick = function () {
    //    if (global.bookmark) setGrid(global.bookmark);
    //}

    //mainContainerElement.appendChild(restoreButton);

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

function reloadFile() {
    document.getElementById("form1").submit();
}
