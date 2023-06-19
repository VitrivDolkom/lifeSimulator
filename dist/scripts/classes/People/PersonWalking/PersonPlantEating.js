import { PersonWalking } from '../internal.js';
export class PersonPlantEating extends PersonWalking {
    constructor(person, walkTypes) {
        super(person, walkTypes);
    }
    walk() {
        this.eatPlants();
    }
    eatPlant(plant) {
        this.person.increaseFoodAmount(plant.beEatenAndReturnFoodAmount());
    }
    eatPlants() {
        const plants = this.person.cell.plants;
        plants.forEach(this.eatPlant.bind(this));
    }
}
