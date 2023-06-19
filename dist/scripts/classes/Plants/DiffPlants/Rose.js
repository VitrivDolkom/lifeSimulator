import { Plant } from '../Plant.js';
export class Rose extends Plant {
    constructor(cell) {
        super(cell);
        this._amount = 100;
        this._daysPerGrow = 200;
    }
}
