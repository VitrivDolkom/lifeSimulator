import { PersonWalking } from '../internal.js';
export class PersonBuilding extends PersonWalking {
    constructor(person, walkTypes) {
        super(person, walkTypes);
    }
    walk() {
        this.build();
    }
    isTimeToBuild() {
        const BUILD_HOUSE_RANDOM_LIMIT = 0.001;
        const random = Math.random();
        return random <= BUILD_HOUSE_RANDOM_LIMIT;
    }
    storeHouseFood(house) {
        const foodAmountToStore = this.person.foodAmount / 10;
        this.person.decreaseFoodAmount(foodAmountToStore);
        house.storeFood(foodAmountToStore);
    }
    takeHouseFood(house) {
        const foodAmountToTake = this.person.foodAmount / 10;
        const takenFoodAmount = house.takeFood(foodAmountToTake);
        this.person.increaseFoodAmount(takenFoodAmount);
    }
    storeFoodIfPossible(house) {
        if (this.person.isTimeToStoreFood()) {
            this.storeHouseFood(house);
        }
    }
    takeFoodIfPossible(house) {
        if (this.person.isTimeToTakeFood()) {
            this.takeHouseFood(house);
        }
    }
    storeOrTakeHouseFood() {
        const house = this.person.cell.house;
        if (house !== null) {
            this.storeFoodIfPossible(house);
            this.takeFoodIfPossible(house);
        }
    }
    build() {
        if (!this.isTimeToBuild())
            return;
        const cell = this.person.cell;
        if (cell.isThereHouseToBuild()) {
            cell.continueBuilding(this.person.buildSkill);
        }
        else if (cell.isAvailableToStartHouse()) {
            cell.addHouse();
        }
        else if (cell.house !== null && cell.house.isDone()) {
            this.storeOrTakeHouseFood();
        }
    }
}
