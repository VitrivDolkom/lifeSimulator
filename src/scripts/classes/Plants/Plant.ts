import { Rose, Chamomile, Cornflower } from './internal.js'
import { DisplayColor } from '../Display/DisplayColor.js'
import { DisplaySize } from '../Display/DisplaySize.js'
import { Entity } from '../Entity/Entity.js'
import { Cell } from '../Positioning/Cell.js'

export abstract class Plant extends Entity {
    protected _amount: number
    protected _daysPerGrow: number
    private _daysSinceLastGrow: number
    private _maxAmount: number

    constructor(cell: Cell) {
        super(cell)

        this._amount = 100
        this._maxAmount = 1500
        this._daysPerGrow = 100
        this._daysSinceLastGrow = 0

        this.displayColor = DisplayColor.green
        this.displaySize = DisplaySize.small
    }

    private isPlantOver(): boolean {
        return this.amount === 0
    }

    private removeIfNecessary() {
        if (this.isPlantOver()) {
            this.cell.removeMe(this)
        }
    }

    private isTimeToGrow(): boolean {
        return this._daysSinceLastGrow === this._daysPerGrow
    }

    private dailyUpdate(): void {
        this._daysSinceLastGrow++
    }

    private growIfPossible(): void {
        if (this.isTimeToGrow()) {
            this.cell.plantGrow(this)
            this._daysSinceLastGrow = 0
        }
    }

    update() {
        this.removeIfNecessary()
        this.dailyUpdate()
        this.growIfPossible()
    }

    public grow(growthAmount: number): void {
        this._amount = Math.max(this._maxAmount, this._amount + growthAmount)
    }

    private decreaseAmount(amountToSubstract: number): void {
        this._amount = Math.max(0, this.amount - amountToSubstract)
    }

    private getEatingAmount(): number {
        const EAT_FULL_PLANT_RANDOM_LIMIT = 0.05
        const random = Math.random()

        return random <= EAT_FULL_PLANT_RANDOM_LIMIT ? this.amount : this.amount - 10
    }

    public beEatenAndReturnFoodAmount(): number {
        let eatingAmount = this.getEatingAmount()
        this.decreaseAmount(eatingAmount)

        return eatingAmount
    }

    public static createRandomPlant(cell: Cell): Plant {
        const ROSE_RANDOM_LIMIT = 0.33
        const CHAMOMILE_RANDOM_LIMIT = 0.66
        const randomType = Math.random()

        if (randomType <= ROSE_RANDOM_LIMIT) return new Rose(cell)
        if (randomType <= CHAMOMILE_RANDOM_LIMIT) return new Chamomile(cell)
        return new Cornflower(cell)
    }

    public get amount(): number {
        return this._amount
    }
}
