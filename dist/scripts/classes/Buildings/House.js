import { DisplayColor } from '../Display/DisplayColor.js';
import { DisplaySize } from '../Display/DisplaySize.js';
import { Entity } from '../Entity/Entity.js';
class House extends Entity {
    constructor(cell, livingSpace) {
        super(cell);
        this._livingSpace = livingSpace;
        this._doneLivingSpace = 0;
        this._age = 0;
        this._foodAmount = 0;
        this._village = null;
        this.displayColor = DisplayColor.brown;
        this.displaySize = DisplaySize.middle;
    }
    destroy() {
        this.cell.removeMe(this);
    }
    destroyIfPossible() {
        if (this.isToDestroy()) {
            this.destroy();
        }
    }
    update() {
        this.increaseAge();
        this.destroyIfPossible();
    }
    isToDestroy() {
        return this._age > House.MAX_DAYS_NUM;
    }
    isDone() {
        return this._doneLivingSpace === this._livingSpace;
    }
    getFoodAmounToGive(foodAmountToTake) {
        return foodAmountToTake <= this._foodAmount ? foodAmountToTake : this._foodAmount;
    }
    decreaseFoodAmount(amountToSubstract) {
        this._foodAmount = Math.max(0, this._foodAmount - amountToSubstract);
    }
    takeFood(foodAmountToTake) {
        const foodAmountToGive = this.getFoodAmounToGive(foodAmountToTake);
        this.decreaseFoodAmount(foodAmountToGive);
        return foodAmountToGive;
    }
    build(buildSkill) {
        this._doneLivingSpace = Math.min(this._livingSpace, this._doneLivingSpace + buildSkill);
    }
    storeFood(foodToStore) {
        this._foodAmount += foodToStore;
    }
    increaseAge() {
        this._age++;
    }
}
House.MAX_DAYS_NUM = 1000;
export { House };
