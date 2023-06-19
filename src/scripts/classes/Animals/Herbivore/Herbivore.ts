import { AnimalPlantEating } from '../AnimalWalking/AnimalPlantEating.js'
import { AnimalWalking, Cow, Goat, Horse } from '../internal.js'
import { DisplayColor } from '../../Display/DisplayColor.js'
import { Cell } from '../../Positioning/Cell.js'
import { Animal } from '../Animal.js'

export abstract class Herbivore extends Animal {
    constructor(cell: Cell) {
        super(cell)

        this._lossFoodPerDay = 0.01
        this.displayColor = DisplayColor.pink
        this._maxDaysNum = 50000

        this.walkStrategy = new AnimalWalking(this, [new AnimalPlantEating(this, null)])
    }

    public static createRandomHerbivore(cell: Cell): Herbivore {
        const COW_RANDOM_LIMIT = 0.33
        const GOAT_RANDOM_LIMIT = 0.66
        const randomSubType = Math.random()

        if (randomSubType <= COW_RANDOM_LIMIT) return new Cow(cell)
        if (randomSubType <= GOAT_RANDOM_LIMIT) return new Goat(cell)

        return new Horse(cell)
    }
}
