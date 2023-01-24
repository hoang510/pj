var loop;
var delayTimeInput = document.getElementById('delayTime');
var delayTime;
function onAutoMoveMode(move) {
    delayTime = delayTimeInput.value * 1000;
    delayTimeInput.disabled = true;
    loop = setInterval(move, delayTime);
    console.log(delayTime);
}

function offAutoMoveMode() {
    clearInterval(loop);
    delayTimeInput.disabled = false;
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

function randomMove() {
    while (!board.move(Math.floor(Math.random() * 3) - 1, Math.floor(Math.random() * 3) - 1));
}
