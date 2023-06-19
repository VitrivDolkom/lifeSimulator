import { Plant } from '../../Plants/Plant.js'
import { PersonWalking, Person } from '../internal.js'

export class PersonPlantEating extends PersonWalking {
    constructor(person: Person, walkTypes: PersonWalking[] | null) {
        super(person, walkTypes)
    }

    public walk(): void {
        this.eatPlants()
    }

    private eatPlant(plant: Plant): void {
        this.person.increaseFoodAmount(plant.beEatenAndReturnFoodAmount())
    }

    private eatPlants(): void {
        const plants = this.person.cell.plants

        plants.forEach(this.eatPlant.bind(this))
    }
}
