import { LivingCreature } from '../../Creature/LivingCreature.js'
import { PersonWalking, Person } from '../internal.js'

export class PersonHunting extends PersonWalking {
    constructor(person: Person, walkTypes: PersonWalking[] | null) {
        super(person, walkTypes)
    }

    public walk(): void {
        this.hunt()
    }

    private isPerson(creature: LivingCreature): boolean {
        return creature instanceof Person
    }

    private attackVictim(victim: LivingCreature): void {
        if (!this.isPerson(victim)) {
            this.person.increaseFoodAmount(victim.takeDamageAndReturnFoodAmount())
        }
    }

    private hunt(): void {
        const victims = this.person.cell.victims

        victims.forEach(this.attackVictim.bind(this))
    }
}
