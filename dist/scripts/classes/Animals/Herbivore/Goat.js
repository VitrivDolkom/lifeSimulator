import { CreatureMeat } from '../../Creature/CreatureMeat.js';
import { Herbivore } from './Herbivore.js';
export class Goat extends Herbivore {
    constructor(cell) {
        super(cell);
        this._meat = new CreatureMeat(90, 1);
        this._foodCapacity = 120;
        this._foodAmount = 120;
        this._speed = 15;
        this._defenseNum = 10;
        this._offenceNum = 10;
    }
    reproduction(partner) {
        const child = new Goat(this.cell);
        child.setChildPropertiesAccordingToParents(this, partner);
        return new Goat(this.cell);
    }
}
