const ACTIVE_CLASS = 'active';

class Cell {

    constructor(id, container) {
        this.id = id;
        this.HTMLobject = document.createElement('button');
        this.HTMLobject.id = `cell${id}`;
        this.HTMLobject.className = 'cell';
        this.__active = false;
        container.appendChild(this.HTMLobject);
    }

    isActive() {
        this.reload();
        return this.__active;
    }

    reload() {
        if (this.__active) {
            this.active();
        }
        else {
            this.unactive()
        }
    }

    active() {
        this.active = true;
        if (!isActive()) {
            this.HTMLobject.classList.add(ACTIVE_CLASS);
            this.__active = true;
        }

    }
    unactive() {
        if (isActive()) {
            this.HTMLobject.classList.remove(ACTIVE_CLASS);
            this.__active = false;
        }
    }

    switchActive() {
        if (this.isActive()) {
            this.unactive();
        }
        else {
            this.active();
        }
    }
}

class Board {
    constructor(acols, arows, container) {
        this.acols = acols;
        this.arows = arows;
        this.container = container;
    }

    CreateBoard() {
        this.constructData();
        for (let i = 0; i < this.arows; i++) {
            for (let j = 0; j < this.acols; j++) {
                this.data[i][j] = new Cell(i*acols + j, this.container);
            }
        }
    }

    

    data = [];
    constructData() {
        for (let i = 0; i < this.arows; i++) {
            data[i] = [];
        }
    }
}