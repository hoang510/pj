class Board {
    constructor(arows, acols, container) {
        container.innerHTML = "";
        this.acols = acols;
        this.arows = arows;
        this.container = container;
        this.safeMode = false;
        this.CreateBoard();
    }

    CreateBoard() {
        this.data = [];
        for (let i = 0; i < this.arows; i++) {
            this.data[i] = [];
            for (let j = 0; j < this.acols; j++) {
                this.data[i][j] = new Cell(i * this.acols + j, this.container);
            }
        }
    }

    resetboard() {
        this.data.forEach((row) => {
            row.forEach((cell) => {
                cell.unactive();
            });
        });
    }

    trace() {
        this.data.forEach((row) => {
            row.forEach((cell) => {
                cell.trace();
            });
        });
    }

    reload() {
        this.data.forEach((row) => {
            row.forEach((cell) => {
                cell.reload();
            })
        });
    }

    inRange(x, y) {
        return x >= 0 && x < this.arows && y >= 0 && y < this.acols;
    }


    isSafeMove(dx, dy) {
        for (let i = 0; i < this.arows; i++) {
            for (let j = 0; j < this.acols; j++) {
                if (this.data[i][j].isActive() && !this.inRange(i + dx, j + dy)) {
                    return false;
                }
            }
        }
        return true;
    }

    move(dx, dy) {
        if (this.safeMode && !this.isSafeMove(dx, dy)) {
            return false;
        }
        const newBoard = [];
        for (let i = 0; i < this.arows; i++) {
            newBoard[i] = [];
        }

        for (let i = 0; i < this.arows; i++) {
            for (let j = 0; j < this.acols; j++) {
                if (this.inRange(i - dx, j - dy)) {
                    newBoard[i][j] = this.data[i - dx][j - dy].isActive();
                }
                else {
                    newBoard[i][j] = false;
                }
            }
        }

        for (let i = 0; i < this.arows; i++) {
            for (let j = 0; j < this.acols; j++) {
                this.data[i][j].__active = newBoard[i][j];
            }
        }
        this.reload();

        return true;
    }

    switchSafeMode() {
        this.safeMode = !this.safeMode;
    }

    safeModeOn() {
        return this.safeMode;
    }
}