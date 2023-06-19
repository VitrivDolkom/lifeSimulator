import { CreatureMeat } from '../../Creature/CreatureMeat.js';
import { Omnivorous } from './Omnivorous.js';
export class HedgeHog extends Omnivorous {
    constructor(cell) {
        super(cell);
        this._meat = new CreatureMeat(10, 0.99);
        this._foodCapacity = 30;
        this._foodAmount = 30;
        this._speed = 6;
        this._defenseNum = 100;
        this._offenceNum = 5;
    }
    reproduction(partner) {
        const child = new HedgeHog(this.cell);
        child.setChildPropertiesAccordingToParents(this, partner);
        return new HedgeHog(this.cell);
    }
}
