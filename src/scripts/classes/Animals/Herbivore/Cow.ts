import { CreatureMeat } from '../../Creature/CreatureMeat.js'
import { Cell } from '../../Positioning/Cell.js'
import { Herbivore } from './Herbivore.js'

export class Cow extends Herbivore {
    constructor(cell: Cell) {
        super(cell)

        this._meat = new CreatureMeat(150, 0.85)
        this._foodCapacity = 120
        this._foodAmount = 120
        this._speed = 15
        this._defenseNum = 30
        this._offenceNum = 20
    }

    public override reproduction(partner: Cow): Cow {
        const child = new Cow(this.cell)
        child.setChildPropertiesAccordingToParents(this, partner)

        return new Cow(this.cell)
    }
}
