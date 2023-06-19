import { PersonWalking, Person } from '../internal.js';
export class PersonHunting extends PersonWalking {
    constructor(person, walkTypes) {
        super(person, walkTypes);
    }
    walk() {
        this.hunt();
    }
    isPerson(creature) {
        return creature instanceof Person;
    }
    attackVictim(victim) {
        if (!this.isPerson(victim)) {
            this.person.increaseFoodAmount(victim.takeDamageAndReturnFoodAmount());
        }
    }
    hunt() {
        const victims = this.person.cell.victims;
        victims.forEach(this.attackVictim.bind(this));
    }
}
