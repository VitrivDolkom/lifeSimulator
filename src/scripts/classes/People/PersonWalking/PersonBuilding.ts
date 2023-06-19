import { House } from '../../Buildings/House.js'
import { PersonWalking, Person, Man } from '../internal.js'

export class PersonBuilding extends PersonWalking {
    constructor(person: Person, walkTypes: PersonWalking[] | null) {
        super(person, walkTypes)
    }

    public walk(): void {
        this.build()
    }

    private isTimeToBuild(): boolean {
        const BUILD_HOUSE_RANDOM_LIMIT = 0.001
        const random = Math.random()

        return random <= BUILD_HOUSE_RANDOM_LIMIT
    }

    private storeHouseFood(house: House) {
        const foodAmountToStore = this.person.foodAmount / 10

        this.person.decreaseFoodAmount(foodAmountToStore)
        house.storeFood(foodAmountToStore)
    }

    private takeHouseFood(house: House) {
        const foodAmountToTake = this.person.foodAmount / 10

        const takenFoodAmount = house.takeFood(foodAmountToTake)
        this.person.increaseFoodAmount(takenFoodAmount)
    }

    private storeFoodIfPossible(house: House): void {
        if (this.person.isTimeToStoreFood()) {
            this.storeHouseFood(house)
        }
    }

    private takeFoodIfPossible(house: House): void {
        if (this.person.isTimeToTakeFood()) {
            this.takeHouseFood(house)
        }
    }

    private storeOrTakeHouseFood(): void {
        const house = this.person.cell.house

        if (house !== null) {
            this.storeFoodIfPossible(house)
            this.takeFoodIfPossible(house)
        }
    }

    private build(): void {
        if (!this.isTimeToBuild()) return
        const cell = this.person.cell

        if (cell.isThereHouseToBuild()) {
            cell.continueBuilding(this.person.buildSkill)
        } else if (cell.isAvailableToStartHouse()) {
            cell.addHouse()
        } else if (cell.house !== null && cell.house.isDone()) {
            this.storeOrTakeHouseFood()
        }
    }
}
