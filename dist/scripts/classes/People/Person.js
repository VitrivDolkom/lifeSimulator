import { LivingCreature } from '../Creature/LivingCreature.js';
import { PersonWalking, Woman, Man } from './internal.js';
import { DisplayColor } from '../Display/DisplayColor.js';
import { DisplaySize } from '../Display/DisplaySize.js';
export class Person extends LivingCreature {
    constructor(cell) {
        super(cell);
        this.walkStraregy = new PersonWalking(this, null);
        this._buildSkill = 0;
        this.displayColor = DisplayColor.black;
        this.displaySize = DisplaySize.middle;
    }
    update() {
        this.walkStraregy.walk();
    }
    createRandomSexPerson() {
        const BOY_BIRTH_RANDOM_LIMIT = 0.5;
        const random = Math.random();
        return random <= BOY_BIRTH_RANDOM_LIMIT
            ? new Man(this.cell)
            : new Woman(this.cell);
    }
    reproduction(partner) {
        const child = this.createRandomSexPerson();
        child.setChildPropertiesAccordingToParents(this, partner);
        return child;
    }
    isTimeToStoreFood() {
        return this._foodAmount >= this._foodCapacity - this._lossFoodPerDay;
    }
    isTimeToTakeFood() {
        return this._foodAmount <= this._foodCapacity / 10;
    }
    static createRandomPerson(cell) {
        const WOMAN_RANDOM_LIMIT = 0.5;
        const random = Math.random();
        if (random <= WOMAN_RANDOM_LIMIT)
            return new Woman(cell);
        return new Man(cell);
    }
    get buildSkill() {
        return this._buildSkill;
    }
}
