import { CreatureMeat } from '../../Creature/CreatureMeat.js';
import { Omnivorous } from './Omnivorous.js';
export class Ostrich extends Omnivorous {
    constructor(cell) {
        super(cell);
        this._meat = new CreatureMeat(100, 0.6);
        this._foodCapacity = 80;
        this._foodAmount = 80;
        this._speed = 26;
        this._defenseNum = 50;
        this._offenceNum = 24;
    }
    reproduction(partner) {
        const child = new Ostrich(this.cell);
        child.setChildPropertiesAccordingToParents(this, partner);
        return new Ostrich(this.cell);
    }
}
