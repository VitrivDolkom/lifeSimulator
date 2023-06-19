import { Plant } from '../../Plants/internal.js'
import { Animal } from '../Animal.js'
import { AnimalWalking } from './AnimalWalking.js'

export class AnimalPlantEating extends AnimalWalking {
    constructor(animal: Animal, walkTypes: AnimalWalking[] | null) {
        super(animal, walkTypes)
    }

    public walk(): void {
        this.eatPlants()
    }

    private eatPlant(plant: Plant): void {
        this.animal.increaseFoodAmount(plant.beEatenAndReturnFoodAmount())
    }

    private eatPlants(): void {
        const plants = this.animal.cell.plants

        plants.forEach(this.eatPlant.bind(this))
    }
}
