import { LivingCreature } from '../Creature/LivingCreature.js'
import { PersonWalking, Woman, Man } from './internal.js'
import { DisplayColor } from '../Display/DisplayColor.js'
import { DisplaySize } from '../Display/DisplaySize.js'
import { Cell } from '../Positioning/Cell.js'

export abstract class Person extends LivingCreature {
    protected walkStraregy: PersonWalking
    protected _buildSkill: number

    constructor(cell: Cell) {
        super(cell)

        this.walkStraregy = new PersonWalking(this, null)
        this._buildSkill = 0
        this.displayColor = DisplayColor.black
        this.displaySize = DisplaySize.middle
    }

    update(): void {
        this.walkStraregy.walk()
    }

    private createRandomSexPerson(): Person {
        const BOY_BIRTH_RANDOM_LIMIT = 0.5
        const random = Math.random()

        return random <= BOY_BIRTH_RANDOM_LIMIT
            ? new Man(this.cell)
            : new Woman(this.cell)
    }

    public override reproduction(partner: Person): Person {
        const child = this.createRandomSexPerson()
        child.setChildPropertiesAccordingToParents(this, partner)

        return child
    }

    public isTimeToStoreFood(): boolean {
        return this._foodAmount >= this._foodCapacity - this._lossFoodPerDay
    }

    public isTimeToTakeFood(): boolean {
        return this._foodAmount <= this._foodCapacity / 10
    }

    public static createRandomPerson(cell: Cell): Person {
        const WOMAN_RANDOM_LIMIT = 0.5
        const random = Math.random()

        if (random <= WOMAN_RANDOM_LIMIT) return new Woman(cell)
        return new Man(cell)
    }

    public get buildSkill(): number {
        return this._buildSkill
    }
}
