import { LivingCreature } from '../../Creature/LivingCreature.js'
import { Animal } from '../Animal.js'

export class AnimalWalking {
    protected animal: Animal
    private walkTypes: AnimalWalking[] | null

    constructor(animal: Animal, walkTypes: AnimalWalking[] | null) {
        this.animal = animal
        this.walkTypes = walkTypes
    }

    private tryPartner(partner: LivingCreature): void {
        if (partner.isValidPartner(this.animal) && partner !== this.animal) {
            const child = partner.reproduction(this.animal)

            this.animal.cell.addChild(child)
        }
    }

    private tryPossiblePartners(): void {
        const possiblePartners = this.animal.cell.getLivingCreatureTypeArrayAtCell(
            this.animal
        )

        possiblePartners?.forEach(this.tryPartner.bind(this))
    }

    private reproductionIfPossible() {
        if (this.animal.isReadyForReproduction()) {
            this.tryPossiblePartners()
        }
    }

    private makeStep(): void {
        this.animal.cell.moveMe(this.animal)
    }

    private doWalkingStrategy(walkType: AnimalWalking): void {
        walkType.walk()
    }

    private doWalkingStrategies(): void {
        this.walkTypes?.forEach(this.doWalkingStrategy)
    }

    public walk(): void {
        this.makeStep()
        this.doWalkingStrategies()
        this.reproductionIfPossible()
        this.animal.dailyUpdateAndDieIfNecessary()
    }
}
