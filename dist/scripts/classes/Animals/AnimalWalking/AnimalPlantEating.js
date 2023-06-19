import { AnimalWalking } from './AnimalWalking.js';
export class AnimalPlantEating extends AnimalWalking {
    constructor(animal, walkTypes) {
        super(animal, walkTypes);
    }
    walk() {
        this.eatPlants();
    }
    eatPlant(plant) {
        this.animal.increaseFoodAmount(plant.beEatenAndReturnFoodAmount());
    }
    eatPlants() {
        const plants = this.animal.cell.plants;
        plants.forEach(this.eatPlant.bind(this));
    }
}
