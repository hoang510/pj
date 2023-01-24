var cssroot = document.querySelector(':root')
cssroot.style.setProperty('--acols', acols);
cssroot.style.setProperty('--arows', arows);

var cells = document.getElementsByClassName('cell')
var board = [];
for (let i = 0; i < arows; i++) {
    board[i] = [];
}
const activeClass = 'active';
var safeMode = true;

function isActive(cell) {
    return cell.classList.contains(activeClass)
}

function getRow(cell) {
    return cell.getAttributeNode("row").value;
}

function getCol(cell) {
    return cell.getAttributeNode("col").value;
}

function active(cell) {
    if (!isActive(cell)) {
        cell.classList.add(activeClass);
        board[getRow(cell)][getCol(cell)] = true;
    }
}
function unactive(cell) {
    if (isActive(cell)) {
        cell.classList.remove(activeClass);
        board[getRow(cell)][getCol(cell)] = false;
    }
}

function switchActive(cell) {
    if (isActive(cell)) {
        unactive(cell);
    }
    else {
        active(cell);
    }
}

var pressing = false;

function mouseDrawing(event, element) {
    if (event.buttons == 1) {
        active(element);
    } else if (event.buttons == 2) {
        unactive(element);
    }
}

function setupCellListener() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].onmousedown = (e) => { mouseDrawing(e, cells[i]) };
        cells[i].onmouseup = () => { pressing = false };
        cells[i].onmouseenter = (e) => { mouseDrawing(e, cells[i]) };
    }
}


function mergeindex(a, b) {
    return a * acols + b;
}

function resetboard() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].classList.remove(activeClass);
    }
    traceBoard();
    offAutoMoveMode();
    inMoveMode = false;
    changeAutoMoveButton();
}


function traceBoard() {
    for (let i = 0; i < arows; i++) {
        for (let j = 0; j < acols; j++) {
            board[i][j] = isActive(cells[mergeindex(i, j)]);
        }

    }
}

function upCell(i, j) {
    if (board[i][j]) {
        active(cells[mergeindex(i, j)]);
    }
    else {
        unactive(cells[mergeindex(i, j)])
    }
}

function refreshBoard() {
    for (let i = 0; i < arows; i++) {
        for (let j = 0; j < acols; j++) {
            upCell(i, j);
        }
    }
}

function alertBoard() {
    alert(board);
}

function isSafeMove(dx, dy) {
    for (let i = 0; i < arows; i++) {
        for (let j = 0; j < acols; j++) {
            if (board[i][j] && !(i + dx >= 0 && i + dx < arows &&
                j + dy >= 0 && j + dy < acols)) {
                return false;
            }
        }
    }
    return true;
}

function move(dx, dy) {
    if (safeMode && !isSafeMove(dx, dy)) {
        return false;
    }
    const newBoard = [];
    for (let i = 0; i < arows; i++) {
        newBoard[i] = [];
    }

    for (let i = 0; i < arows; i++) {
        for (let j = 0; j < acols; j++) {
            if (i - dx >= 0 && i - dx < arows &&
                j - dy >= 0 && j - dy < acols) {
                newBoard[i][j] = Boolean(board[i - dx][j - dy]);
            }
            else {
                newBoard[i][j] = false;
            }
        }
    }

    // alertBoard();
    board = newBoard;
    // alertBoard();
    refreshBoard();

    return true;
}

function displaySafeMode() {
    var safeModeButton = document.getElementById('safeMode');
    if (safeMode) {
        safeModeButton.className = 'safe';
        safeModeButton.innerHTML = 'Safe Mode';
    }
    else {
        safeModeButton.className = 'unsafe';
        safeModeButton.innerHTML = 'Unsafe Mode';
    }
}

function switchSafeMode() {
    safeMode = !safeMode;
    displaySafeMode();
}

function randomMove() {
    while (!move(Math.floor(Math.random() * 3) - 1, Math.floor(Math.random() * 3) - 1));
}

var loop;
function onAutoMoveMode(move) {
    loop = setInterval(move, 100);
}

function offAutoMoveMode() {
    clearInterval(loop);
}

var inMoveMode = false;
function changeRandomMoveMode() {
    if (inMoveMode) {
        offAutoMoveMode();
        inMoveMode = false;
    }
    else {
        onAutoMoveMode(randomMove);
        inMoveMode = true;
    }

    changeAutoMoveButton();
}

function changeAutoMoveButton() {
    var button = document.getElementById('randomMove'); 
    if (inMoveMode) {
        button.className = 'on';
    }
    else {
        button.className = '';
    }
}


setupCellListener();

displaySafeMode();

document.addEventListener('contextmenu', event => event.preventDefault());
