function displaySafeMode(board) {
    var safeModeButton = document.getElementById('safeMode');
    if (board.safeModeOn()) {
        safeModeButton.className = 'safe';
        safeModeButton.innerHTML = 'Safe Mode';
    }
    else {
        safeModeButton.className = 'unsafe';
        safeModeButton.innerHTML = 'Unsafe Mode';
    }
}

function newBoard(arows, acols, container) {
    var board = new Board(arows, acols, container);
    displaySafeMode(board);
    return board;
}

var container = document.getElementById('Board');

var board = newBoard(10, 10, container);

document.addEventListener('contextmenu', event => event.preventDefault());