const ACTIVE_CLASS = 'active';

class Cell {

    constructor(id, container) {
        this.id = id;
        this.HTMLobject = document.createElement('button');
        this.HTMLobject.id = `cell${id}`;
        this.HTMLobject.className = 'cell';
        this.__active = false;
        this.addListener();
        container.appendChild(this.HTMLobject);
    }

    addListener() {
        this.HTMLobject.onmousedown = (e) => {this.mouseDrawing(e, this.HTMLobject) };
        this.HTMLobject.onmouseenter = (e) => {this.mouseDrawing(e, this.HTMLobject) };
    }

    mouseDrawing(event, element) {
        if (event.buttons == 1) {
            this.active();
        } else if (event.buttons == 2) {
            this.unactive();
        }
    }

    isHasActiveClass() {
        return this.HTMLobject.classList.contains(ACTIVE_CLASS);
    }

    isActive() {
        return this.__active;
    }

    reload() {
        if (this.__active) {
            this.active();
        }
        else {
            this.unactive();
        }
    }

    trace() {
        this.__active = this.isHasActiveClass();
    }

    active() {
        if (!this.isHasActiveClass()) {
            this.HTMLobject.classList.add(ACTIVE_CLASS);
            this.__active = true;
        }

    }
    unactive() {
        if (this.isHasActiveClass()) {
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