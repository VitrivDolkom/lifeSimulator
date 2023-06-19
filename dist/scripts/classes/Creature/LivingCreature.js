import { CreatureMeat } from './CreatureMeat.js';
import { Animal } from '../Animals/Animal.js';
import { Entity } from '../Entity/Entity.js';
import { Sex } from './Sex.js';
export class LivingCreature extends Entity {
    constructor(cell) {
        super(cell);
        this._meat = new CreatureMeat(0, 0);
        this._lossFoodPerDay = 0;
        this._foodCapacity = 0;
        this._maxDaysNum = 0;
        this._dayCount = 0;
        this._foodAmount = 0;
        this._offenceNum = 0;
        this._defenseNum = 0;
        this._sex = new Sex();
        this._speed = 0;
    }
    minLivedDaysUntilReproduction() {
        return Math.floor(this.maxDaysNum / 10);
    }
    isReadyForReproduction() {
        return this._dayCount > this.minLivedDaysUntilReproduction();
    }
    isMaxDaysNumReached() {
        return this._dayCount > this.maxDaysNum;
    }
    isNoFoodAmount() {
        return this.foodAmount === 0;
    }
    isDead() {
        return this.isMaxDaysNumReached() || this.isNoFoodAmount();
    }
    increaseDayCount() {
        this._dayCount++;
    }
    dieIfPossible() {
        if (this.isDead())
            this.die();
    }
    dailyUpdateAndDieIfNecessary() {
        this.decreaseFoodAmount(this._lossFoodPerDay);
        this.increaseDayCount();
        this.dieIfPossible();
    }
    increaseFoodAmount(foodAmountToAdd) {
        this._foodAmount = Math.min(this._foodAmount + foodAmountToAdd, this._foodCapacity);
    }
    decreaseFoodAmount(foodAmountToSubstract) {
        this._foodAmount = Math.max(0, this._foodAmount - foodAmountToSubstract);
    }
    takeDamageAndReturnFoodAmount() {
        const defenceFoodAmountPrice = Math.floor(this._foodCapacity / 2);
        this.decreaseFoodAmount(defenceFoodAmountPrice);
        if (this.isDead()) {
            this.die();
            return this._meat.getMeatAmount();
        }
        return defenceFoodAmountPrice;
    }
    die() {
        this.cell.removeMe(this);
    }
    isTheSameCreatureType(creature) {
        return this.constructor === creature.constructor;
    }
    isDefferentSexCreature(creature) {
        return this._sex.type !== creature.sex.type;
    }
    isTheSameCreature(partner) {
        return this === partner;
    }
    isValidPartner(partner) {
        return (this.isTheSameCreatureType(partner) &&
            this.isDefferentSexCreature(partner) &&
            !this.isTheSameCreature(partner));
    }
    reproduction(partner) {
        return Animal.createRandomAnimal(this.cell);
    }
    setChildSpeed(firstParent, secondParent) {
        const childSpeed = (firstParent.speed + secondParent.speed) / 2;
        this._speed = childSpeed;
    }
    setChildFoodCapacity(firstParent, secondParent) {
        const childFoodCapacity = Math.max(firstParent._foodCapacity, secondParent._foodCapacity);
        this._foodCapacity = childFoodCapacity;
    }
    setChildFoodAmount() {
        this._foodAmount = this._foodCapacity;
    }
    setChildPropertiesAccordingToParents(firstParent, secondParent) {
        this.setChildSpeed(firstParent, secondParent);
        this.setChildFoodCapacity(firstParent, secondParent);
        this.setChildFoodAmount();
    }
    get foodAmount() {
        return this._foodAmount;
    }
    get sex() {
        return this._sex;
    }
    get speed() {
        return this._speed;
    }
    get maxDaysNum() {
        return this._maxDaysNum;
    }
    get dayCount() {
        return this._dayCount;
    }
    get meat() {
        return this._meat;
    }
    get offenceNum() {
        return this._offenceNum;
    }
    get defenseNum() {
        return this._defenseNum;
    }
}
