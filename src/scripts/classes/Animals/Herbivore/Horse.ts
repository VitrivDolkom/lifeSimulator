import { CreatureMeat } from '../../Creature/CreatureMeat.js'
import { Cell } from '../../Positioning/Cell.js'
import { Herbivore } from './Herbivore.js'

export class Horse extends Herbivore {
    constructor(cell: Cell) {
        super(cell)

        this._meat = new CreatureMeat(80, 0.8)
        this._foodCapacity = 120
        this._foodAmount = 120
        this._speed = 20
        this._defenseNum = 30
        this._offenceNum = 10
    }

    public override reproduction(partner: Horse): Horse {
        const child = new Horse(this.cell)
        child.setChildPropertiesAccordingToParents(this, partner)

        return new Horse(this.cell)
    }
}
