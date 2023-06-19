import { DisplayColor } from '../Display/DisplayColor.js';
import { DisplaySize } from '../Display/DisplaySize.js';
export class Entity {
    constructor(cell) {
        this.displayColor = DisplayColor.black;
        this.displaySize = DisplaySize.middle;
        this._cell = cell;
    }
    update() { }
    getColor() {
        return this.displayColor;
    }
    getSize() {
        return this.displaySize;
    }
    getPosition() {
        return this._cell;
    }
    get cell() {
        return this._cell;
    }
    set cell(cell) {
        this._cell = cell;
    }
}
