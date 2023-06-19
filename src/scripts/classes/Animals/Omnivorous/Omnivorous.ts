import { AnimalPlantEating } from '../AnimalWalking/AnimalPlantEating.js'
import { AnimalWalking, Racoon, Ostrich, HedgeHog } from '../internal.js'
import { AnimalHunting } from '../AnimalWalking/AnimalHunting.js'
import { DisplayColor } from '../../Display/DisplayColor.js'
import { Cell } from '../../Positioning/Cell.js'
import { Animal } from '../Animal.js'

export abstract class Omnivorous extends Animal {
    constructor(cell: Cell) {
        super(cell)

        this._lossFoodPerDay = 0.1
        this.displayColor = DisplayColor.blue
        this._maxDaysNum = 40000

        this.walkStrategy = new AnimalWalking(this, [
            new AnimalHunting(this, null),
            new AnimalPlantEating(this, null)
        ])
    }

    public static createRandomOmnivorous(cell: Cell): Omnivorous {
        const RACOON_RANDOM_LIMIT = 0.33
        const OSTRICH_RANDOM_LIMIT = 0.66
        const randomSubType = Math.random()

        if (randomSubType <= RACOON_RANDOM_LIMIT) return new Racoon(cell)
        if (randomSubType <= OSTRICH_RANDOM_LIMIT) return new Ostrich(cell)

        return new HedgeHog(cell)
    }
}
