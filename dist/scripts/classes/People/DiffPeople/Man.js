import { SexType } from '../../Creature/Sex.js';
import { Person, PersonWalking, PersonPlantEating, PersonHunting, PersonBuilding } from '../internal.js';
export class Man extends Person {
    constructor(cell) {
        super(cell);
        this._lossFoodPerDay = 0.02;
        this._foodCapacity = 100;
        this._foodAmount = 100;
        this._speed = 25;
        this._maxDaysNum = 36000;
        this._offenceNum = 40;
        this._defenseNum = 40;
        this._sex.type = SexType.male;
        this._buildSkill = 40;
        this.walkStraregy = new PersonWalking(this, [
            new PersonHunting(this, null),
            new PersonBuilding(this, null),
            new PersonPlantEating(this, null)
        ]);
    }
}
