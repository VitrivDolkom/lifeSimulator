import { CreatureMeat } from '../../Creature/CreatureMeat.js';
import { Predator } from './Predator.js';
export class Wolf extends Predator {
    constructor(cell) {
        super(cell);
        this._meat = new CreatureMeat(50, 0.1);
        this._foodCapacity = 100;
        this._foodAmount = 100;
        this._speed = 20;
        this._offenceNum = 55;
    }
    reproduction(partner) {
        const child = new Wolf(this.cell);
        child.setChildPropertiesAccordingToParents(this, partner);
        return new Wolf(this.cell);
    }
}
