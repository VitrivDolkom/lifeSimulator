import { AnimalWalking, Wolf, Cheetah, Fox } from '../internal.js'
import { AnimalHunting } from '../AnimalWalking/AnimalHunting.js'
import { DisplayColor } from '../../Display/DisplayColor.js'
import { Cell } from '../../Positioning/Cell.js'
import { Animal } from '../Animal.js'

export abstract class Predator extends Animal {
    constructor(cell: Cell) {
        super(cell)

        this._lossFoodPerDay = 0.05
        this.displayColor = DisplayColor.red
        this._maxDaysNum = 30000

        this.walkStrategy = new AnimalWalking(this, [new AnimalHunting(this, null)])
    }

    public static createRandomPredator(cell: Cell): Predator {
        const WOLF_RANDOM_LIMIT = 0.33
        const CHEETAH_RANDOM_LIMIT = 0.66
        const randomSubType = Math.random()

        if (randomSubType <= WOLF_RANDOM_LIMIT) return new Wolf(cell)
        if (randomSubType <= CHEETAH_RANDOM_LIMIT) return new Cheetah(cell)

        return new Fox(cell)
    }
}
