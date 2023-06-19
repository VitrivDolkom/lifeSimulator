import { Predator, Omnivorous, Herbivore, AnimalWalking } from './internal.js';
import { LivingCreature } from '../Creature/LivingCreature.js';
import { DisplaySize } from '../Display/DisplaySize.js';
export class Animal extends LivingCreature {
    constructor(cell) {
        super(cell);
        this.displaySize = DisplaySize.big;
        this.walkStrategy = new AnimalWalking(this, null);
    }
    update() {
        this.walkStrategy.walk();
    }
    static createRandomAnimal(cell) {
        const PREDATOR_RANDOM_LIMIT = 0.33;
        const HERBIVORE_RANDOM_LIMIT = 0.66;
        const randomType = Math.random();
        if (randomType <= PREDATOR_RANDOM_LIMIT) {
            return Predator.createRandomPredator(cell);
        }
        if (randomType <= HERBIVORE_RANDOM_LIMIT) {
            return Herbivore.createRandomHerbivore(cell);
        }
        return Omnivorous.createRandomOmnivorous(cell);
    }
}
