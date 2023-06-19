import { Rose, Chamomile, Cornflower } from './internal.js';
import { DisplayColor } from '../Display/DisplayColor.js';
import { DisplaySize } from '../Display/DisplaySize.js';
import { Entity } from '../Entity/Entity.js';
export class Plant extends Entity {
    constructor(cell) {
        super(cell);
        this._amount = 100;
        this._maxAmount = 1500;
        this._daysPerGrow = 100;
        this._daysSinceLastGrow = 0;
        this.displayColor = DisplayColor.green;
        this.displaySize = DisplaySize.small;
    }
    isPlantOver() {
        return this.amount === 0;
    }
    removeIfNecessary() {
        if (this.isPlantOver()) {
            this.cell.removeMe(this);
        }
    }
    isTimeToGrow() {
        return this._daysSinceLastGrow === this._daysPerGrow;
    }
    dailyUpdate() {
        this._daysSinceLastGrow++;
    }
    growIfPossible() {
        if (this.isTimeToGrow()) {
            this.cell.plantGrow(this);
            this._daysSinceLastGrow = 0;
        }
    }
    update() {
        this.removeIfNecessary();
        this.dailyUpdate();
        this.growIfPossible();
    }
    grow(growthAmount) {
        this._amount = Math.max(this._maxAmount, this._amount + growthAmount);
    }
    decreaseAmount(amountToSubstract) {
        this._amount = Math.max(0, this.amount - amountToSubstract);
    }
    getEatingAmount() {
        const EAT_FULL_PLANT_RANDOM_LIMIT = 0.05;
        const random = Math.random();
        return random <= EAT_FULL_PLANT_RANDOM_LIMIT ? this.amount : this.amount - 10;
    }
    beEatenAndReturnFoodAmount() {
        let eatingAmount = this.getEatingAmount();
        this.decreaseAmount(eatingAmount);
        return eatingAmount;
    }
    static createRandomPlant(cell) {
        const ROSE_RANDOM_LIMIT = 0.33;
        const CHAMOMILE_RANDOM_LIMIT = 0.66;
        const randomType = Math.random();
        if (randomType <= ROSE_RANDOM_LIMIT)
            return new Rose(cell);
        if (randomType <= CHAMOMILE_RANDOM_LIMIT)
            return new Chamomile(cell);
        return new Cornflower(cell);
    }
    get amount() {
        return this._amount;
    }
}
