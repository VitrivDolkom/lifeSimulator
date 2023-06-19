import { Person } from '../internal.js'

export class PersonWalking {
    protected person: Person
    private walkTypes: PersonWalking[] | null

    constructor(person: Person, walkTypes: PersonWalking[] | null) {
        this.person = person
        this.walkTypes = walkTypes
    }

    private tryPartner(partner: Person): void {
        if (partner.isDefferentSexCreature(this.person)) {
            const child = partner.reproduction(this.person)

            this.person.cell.addChild(child)
        }
    }

    private tryPossiblePartners(): void {
        const possiblePartners = this.person.cell.people

        possiblePartners.forEach(this.tryPartner.bind(this))
    }

    private reproductionIfPossible() {
        if (this.person.isReadyForReproduction()) {
            this.tryPossiblePartners()
        }
    }

    private makeStep(): void {
        this.person.cell.moveMe(this.person)
    }

    private doWalkingStrategy(walkType: PersonWalking): void {
        walkType.walk()
    }

    private doWalkingStrategies(): void {
        this.walkTypes?.forEach(this.doWalkingStrategy)
    }

    public walk(): void {
        this.makeStep()
        this.doWalkingStrategies()
        this.reproductionIfPossible()
        this.person.dailyUpdateAndDieIfNecessary()
    }
}
