import { DisplayColor } from '../Display/DisplayColor.js'
import { DisplaySize } from '../Display/DisplaySize.js'
import { Entity } from '../Entity/Entity.js'
import { Cell } from '../Positioning/Cell.js'
import { Village } from './Village.js'

export class House extends Entity {
    static readonly MAX_DAYS_NUM = 1000

    private _livingSpace: number
    private _doneLivingSpace: number
    private _foodAmount: number
    private _age: number
    private _village: Village | null

    constructor(cell: Cell, livingSpace: number) {
        super(cell)

        this._livingSpace = livingSpace
        this._doneLivingSpace = 0
        this._age = 0
        this._foodAmount = 0
        this._village = null

        this.displayColor = DisplayColor.brown
        this.displaySize = DisplaySize.middle
    }

    private destroy(): void {
        this.cell.removeMe(this)
    }

    private destroyIfPossible(): void {
        if (this.isToDestroy()) {
            this.destroy()
        }
    }

    update(): void {
        this.increaseAge()
        this.destroyIfPossible()
    }

    public isToDestroy(): boolean {
        return this._age > House.MAX_DAYS_NUM
    }

    public isDone(): boolean {
        return this._doneLivingSpace === this._livingSpace
    }

    private getFoodAmountToGive(foodAmountToTake: number): number {
        return foodAmountToTake <= this._foodAmount ? foodAmountToTake : this._foodAmount
    }

    private decreaseFoodAmount(amountToSubstract: number): void {
        this._foodAmount = Math.max(0, this._foodAmount - amountToSubstract)
    }

    public takeFood(foodAmountToTake: number): number {
        const foodAmountToGive = this.getFoodAmountToGive(foodAmountToTake)
        this.decreaseFoodAmount(foodAmountToGive)

        return foodAmountToGive
    }

    public build(buildSkill: number): void {
        this._doneLivingSpace = Math.min(
            this._livingSpace,
            this._doneLivingSpace + buildSkill
        )
    }

    public storeFood(foodToStore: number): void {
        this._foodAmount += foodToStore
    }

    public increaseAge(): void {
        this._age++
    }
}
