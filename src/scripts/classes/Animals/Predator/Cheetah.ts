import { CreatureMeat } from '../../Creature/CreatureMeat.js'
import { Cell } from '../../Positioning/Cell.js'
import { Predator } from './Predator.js'

export class Cheetah extends Predator {
    constructor(cell: Cell) {
        super(cell)

        this._meat = new CreatureMeat(80, 0.2)
        this._foodCapacity = 120
        this._foodAmount = 120
        this._speed = 30
        this._offenceNum = 40
    }

    public override reproduction(partner: Cheetah): Cheetah {
        const child = new Cheetah(this.cell)
        child.setChildPropertiesAccordingToParents(this, partner)

        return new Cheetah(this.cell)
    }
}
