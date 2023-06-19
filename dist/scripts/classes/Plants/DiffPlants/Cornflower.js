import { Plant } from '../Plant.js';
export class Cornflower extends Plant {
    constructor(cell) {
        super(cell);
        this._amount = 200;
        this._daysPerGrow = 300;
    }
}
