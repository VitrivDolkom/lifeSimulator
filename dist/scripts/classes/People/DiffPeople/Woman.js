import { Person, PersonWalking, PersonPlantEating } from '../internal.js';
import { SexType } from '../../Creature/Sex.js';
export class Woman extends Person {
    constructor(cell) {
        super(cell);
        this._lossFoodPerDay = 0.01;
        this._foodCapacity = 90;
        this._maxDaysNum = 40000;
        this._foodAmount = 90;
        this._speed = 15;
        this._offenceNum = 20;
        this._defenseNum = 30;
        this._sex.type = SexType.female;
        this.walkStraregy = new PersonWalking(this, [new PersonPlantEating(this, null)]);
    }
}
