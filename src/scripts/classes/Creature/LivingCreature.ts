import { CreatureMeat } from './CreatureMeat.js'
import { Animal } from '../Animals/Animal.js'
import { Cell } from '../Positioning/Cell.js'
import { Entity } from '../Entity/Entity.js'
import { Sex } from './Sex.js'

export abstract class LivingCreature extends Entity {
    protected _meat: CreatureMeat
    protected _lossFoodPerDay: number
    protected _foodCapacity: number
    protected _maxDaysNum: number
    protected _foodAmount: number
    protected _offenceNum: number
    protected _defenseNum: number
    protected _speed: number
    protected _sex: Sex
    private _dayCount: number

    constructor(cell: Cell) {
        super(cell)

        this._meat = new CreatureMeat(0, 0)
        this._lossFoodPerDay = 0
        this._foodCapacity = 0
        this._maxDaysNum = 0
        this._dayCount = 0
        this._foodAmount = 0
        this._offenceNum = 0
        this._defenseNum = 0
        this._sex = new Sex()
        this._speed = 0
    }

    private minLivedDaysUntilReproduction(): number {
        return Math.floor(this.maxDaysNum / 10)
    }

    public isReadyForReproduction(): boolean {
        return this._dayCount > this.minLivedDaysUntilReproduction()
    }

    private isMaxDaysNumReached(): boolean {
        return this._dayCount > this.maxDaysNum
    }

    private isNoFoodAmount(): boolean {
        return this.foodAmount === 0
    }

    private isDead(): boolean {
        return this.isMaxDaysNumReached() || this.isNoFoodAmount()
    }

    private increaseDayCount(): void {
        this._dayCount++
    }

    private dieIfPossible(): void {
        if (this.isDead()) this.die()
    }

    public dailyUpdateAndDieIfNecessary(): void {
        this.decreaseFoodAmount(this._lossFoodPerDay)
        this.increaseDayCount()
        this.dieIfPossible()
    }

    public increaseFoodAmount(foodAmountToAdd: number): void {
        this._foodAmount = Math.min(
            this._foodAmount + foodAmountToAdd,
            this._foodCapacity
        )
    }

    public decreaseFoodAmount(foodAmountToSubstract: number): void {
        this._foodAmount = Math.max(0, this._foodAmount - foodAmountToSubstract)
    }

    public takeDamageAndReturnFoodAmount(): number {
        const defenceFoodAmountPrice = Math.floor(this._foodCapacity / 2)
        this.decreaseFoodAmount(defenceFoodAmountPrice)

        if (this.isDead()) {
            this.die()

            return this._meat.getMeatAmount()
        }

        return defenceFoodAmountPrice
    }

    private die(): void {
        this.cell.removeMe(this)
    }

    private isTheSameCreatureType(creature: LivingCreature): boolean {
        return this.constructor === creature.constructor
    }

    public isDefferentSexCreature(creature: LivingCreature): boolean {
        return this._sex.type !== creature.sex.type
    }

    private isTheSameCreature(partner: LivingCreature): boolean {
        return this === partner
    }

    public isValidPartner(partner: LivingCreature): boolean {
        return (
            this.isTheSameCreatureType(partner) &&
            this.isDefferentSexCreature(partner) &&
            !this.isTheSameCreature(partner)
        )
    }

    public reproduction(partner: LivingCreature): LivingCreature {
        return Animal.createRandomAnimal(this.cell)
    }

    private setChildSpeed(
        firstParent: LivingCreature,
        secondParent: LivingCreature
    ): void {
        const childSpeed = (firstParent.speed + secondParent.speed) / 2

        this._speed = childSpeed
    }

    private setChildFoodCapacity(
        firstParent: LivingCreature,
        secondParent: LivingCreature
    ): void {
        const childFoodCapacity = Math.max(
            firstParent._foodCapacity,
            secondParent._foodCapacity
        )

        this._foodCapacity = childFoodCapacity
    }

    private setChildFoodAmount(): void {
        this._foodAmount = this._foodCapacity
    }

    public setChildPropertiesAccordingToParents(
        firstParent: LivingCreature,
        secondParent: LivingCreature
    ) {
        this.setChildSpeed(firstParent, secondParent)
        this.setChildFoodCapacity(firstParent, secondParent)
        this.setChildFoodAmount()
    }

    public get foodAmount(): number {
        return this._foodAmount
    }

    public get sex(): Sex {
        return this._sex
    }

    public get speed(): number {
        return this._speed
    }

    public get maxDaysNum(): number {
        return this._maxDaysNum
    }

    public get dayCount(): number {
        return this._dayCount
    }

    public get meat() {
        return this._meat
    }

    public get offenceNum(): number {
        return this._offenceNum
    }

    public get defenseNum(): number {
        return this._defenseNum
    }
}
