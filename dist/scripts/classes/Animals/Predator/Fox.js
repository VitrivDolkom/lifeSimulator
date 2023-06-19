import { CreatureMeat } from '../../Creature/CreatureMeat.js';
import { Predator } from './Predator.js';
export class Fox extends Predator {
    constructor(cell) {
        super(cell);
        this._meat = new CreatureMeat(40, 0.3);
        this._foodCapacity = 80;
        this._foodAmount = 80;
        this._speed = 20;
        this._offenceNum = 25;
    }
    reproduction(partner) {
        const child = new Fox(this.cell);
        child.setChildPropertiesAccordingToParents(this, partner);
        return new Fox(this.cell);
    }
}
