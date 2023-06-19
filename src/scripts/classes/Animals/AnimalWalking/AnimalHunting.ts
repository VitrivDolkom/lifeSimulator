import { LivingCreature } from '../../Creature/LivingCreature.js'
import { Animal } from '../Animal.js'
import { AnimalWalking } from './AnimalWalking.js'

export class AnimalHunting extends AnimalWalking {
    constructor(animal: Animal, walkTypes: AnimalWalking[] | null) {
        super(animal, walkTypes)
    }

    public walk(): void {
        this.hunt()
    }

    private attackVictim(victim: LivingCreature): void {
        this.animal.increaseFoodAmount(victim.takeDamageAndReturnFoodAmount())
    }

    private hunt(): void {
        const victims = this.animal.cell.victims

        victims.forEach(this.attackVictim.bind(this))
    }
}
