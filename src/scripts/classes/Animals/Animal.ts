import { Predator, Omnivorous, Herbivore, AnimalWalking } from './internal.js'
import { LivingCreature } from '../Creature/LivingCreature.js'
import { DisplaySize } from '../Display/DisplaySize.js'
import { Cell } from '../Positioning/Cell.js'

export abstract class Animal extends LivingCreature {
    public walkStrategy: AnimalWalking

    constructor(cell: Cell) {
        super(cell)

        this.displaySize = DisplaySize.big
        this.walkStrategy = new AnimalWalking(this, null)
    }

    update() {
        this.walkStrategy.walk()
    }

    public static createRandomAnimal(cell: Cell): Animal {
        const PREDATOR_RANDOM_LIMIT = 0.33
        const HERBIVORE_RANDOM_LIMIT = 0.66

        const randomType = Math.random()

        if (randomType <= PREDATOR_RANDOM_LIMIT) {
            return Predator.createRandomPredator(cell)
        }

        if (randomType <= HERBIVORE_RANDOM_LIMIT) {
            return Herbivore.createRandomHerbivore(cell)
        }

        return Omnivorous.createRandomOmnivorous(cell)
    }
}
