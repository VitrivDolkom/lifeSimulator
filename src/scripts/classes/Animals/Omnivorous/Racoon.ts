import { CreatureMeat } from '../../Creature/CreatureMeat.js'
import { Cell } from '../../Positioning/Cell.js'
import { Omnivorous } from './Omnivorous.js'

export class Racoon extends Omnivorous {
    constructor(cell: Cell) {
        super(cell)

        this._meat = new CreatureMeat(30, 0.8)
        this._foodCapacity = 60
        this._foodAmount = 60
        this._speed = 14
        this._defenseNum = 20
        this._offenceNum = 10
    }

    public override reproduction(partner: Racoon): Racoon {
        const child = new Racoon(this.cell)
        child.setChildPropertiesAccordingToParents(this, partner)

        return new Racoon(this.cell)
    }
}
