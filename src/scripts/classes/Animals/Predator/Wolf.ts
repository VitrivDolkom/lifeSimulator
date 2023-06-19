import { CreatureMeat } from '../../Creature/CreatureMeat.js'
import { Cell } from '../../Positioning/Cell.js'
import { Predator } from './Predator.js'

export class Wolf extends Predator {
    constructor(cell: Cell) {
        super(cell)

        this._meat = new CreatureMeat(50, 0.1)
        this._foodCapacity = 100
        this._foodAmount = 100
        this._speed = 20
        this._offenceNum = 55
    }

    public override reproduction(partner: Wolf): Wolf {
        const child = new Wolf(this.cell)
        child.setChildPropertiesAccordingToParents(this, partner)

        return new Wolf(this.cell)
    }
}
