import { AnimalWalking } from './AnimalWalking.js';
export class AnimalHunting extends AnimalWalking {
    constructor(animal, walkTypes) {
        super(animal, walkTypes);
    }
    walk() {
        this.hunt();
    }
    attackVictim(victim) {
        this.animal.increaseFoodAmount(victim.takeDamageAndReturnFoodAmount());
    }
    hunt() {
        const victims = this.animal.cell.victims;
        victims.forEach(this.attackVictim.bind(this));
    }
}
