import { LivingCreature } from '../Creature/LivingCreature'
import { WorldMap } from './WorldMap'
import { Cell } from './Cell'
import { Person } from '../People/Person'

export class CreatureMoveAdviser {
    private worldMap: WorldMap
    private cell: Cell
    private creature: LivingCreature
    private bestCell: Cell
    private lockBestCell: boolean
    private bestProfit: number
    private visionRadius: number

    constructor(worldMap: WorldMap, cell: Cell, creature: LivingCreature) {
        this.worldMap = worldMap
        this.cell = cell
        this.creature = creature

        this.bestCell = cell
        this.lockBestCell = false
        this.bestProfit = 0
        this.visionRadius = Math.ceil(this.creature.speed / this.worldMap.pxPerCell)
    }

    public getBestCell(): Cell {
        this.chooseBestCreatureStep()
        return this.bestCell
    }

    private benefitOfVictim(victim: LivingCreature): number {
        return victim.meat.getMeatAmount() / victim.defenseNum
    }

    private hunterBenefitAtCell(cell: Cell) {
        return cell.victims.reduce((acc, victim) => acc + this.benefitOfVictim(victim), 0)
    }

    private lossFromPerson(person: Person): number {
        return this.worldMap.isHunterEntity(person) ? person.offenceNum : 0
    }

    private hunterExceptPersonLossAtCell(cell: Cell) {
        return cell.people.reduce((acc, person) => acc + this.lossFromPerson(person), 0)
    }

    private hunterLossAtCell(cell: Cell): number {
        return !this.worldMap.isPersonEntity(this.creature)
            ? this.hunterExceptPersonLossAtCell(cell)
            : 0
    }

    private hunterProfitAtCell(cell: Cell): number {
        let profit = 0

        profit += this.hunterBenefitAtCell(cell)
        profit -= this.hunterLossAtCell(cell)

        return profit
    }

    private victimBenefitAtCell(cell: Cell): number {
        return cell.plants.reduce((acc, plant) => acc + plant.amount, 0)
    }

    private victimLossAtCell(cell: Cell): number {
        return cell.hunters.reduce((acc, hunter) => acc + hunter.offenceNum, 0)
    }

    private victimProfitAtCell(cell: Cell): number {
        let profit = 0

        profit += this.victimBenefitAtCell(cell)
        profit -= this.victimLossAtCell(cell)

        return profit
    }

    private hunterProfitIfPossible(cell: Cell): number {
        return this.worldMap.isHunterEntity(this.creature)
            ? this.hunterProfitAtCell(cell)
            : 0
    }

    private victimProfitIfPossible(cell: Cell): number {
        return this.worldMap.isVictimEntity(this.creature)
            ? this.victimProfitAtCell(cell)
            : 0
    }

    private countProfitAtCell(toCell: Cell): number {
        let profit = 0

        profit += this.hunterProfitIfPossible(toCell)
        profit += this.victimProfitIfPossible(toCell)

        return profit
    }

    private updateBestStepIfPossible(profit: number, toCell: Cell): void {
        if (this.bestProfit < profit) {
            this.bestCell = toCell
            this.bestProfit = profit
        }
    }

    private checkSingleStep(row: number, column: number): void {
        const toCell = this.worldMap.getShiftedCell(this.cell, row, column)

        if (toCell === null) return

        let currentProfit = this.countProfitAtCell(toCell)
        this.updateBestStepIfPossible(currentProfit, toCell)
    }

    private bestCreatureColumnsStep(row: number): void {
        for (let j = -this.visionRadius; j <= this.visionRadius; j++) {
            this.checkSingleStep(row, j)
        }
    }

    private changeBestCellIfPossible(): void {
        if (this.bestProfit === 0) {
            this.chooseRandomCell()
        }
    }

    private chooseBestCreatureStep(): void {
        for (let i = -this.visionRadius; i <= this.visionRadius; i++) {
            this.bestCreatureColumnsStep(i)
        }

        this.changeBestCellIfPossible()
    }

    private fourDirectionsShifts() {
        return [
            { row: 1, column: 0, randomLimit: 0.25 },
            { row: 0, column: 1, randomLimit: 0.5 },
            { row: -1, column: 0, randomLimit: 0.75 },
            { row: 0, column: -1, randomLimit: 1 }
        ]
    }

    private updateBestCellIfPossible(
        cell: Cell | null,
        random: number,
        randomLimit: number
    ): void {
        if (cell !== null && random <= randomLimit && !this.lockBestCell) {
            this.bestCell = cell
            this.lockBestCell = true
        }
    }

    private checkRandomShiftedCell(i: number, random: number): void {
        const shifts = this.fourDirectionsShifts()
        const shift = shifts[i]

        const toCell = this.worldMap.getShiftedCell(this.cell, shift.row, shift.column)

        this.updateBestCellIfPossible(toCell, random, shift.randomLimit)
    }

    private chooseRandomCell(): void {
        const random = Math.random()
        const shifts = this.fourDirectionsShifts()

        for (let i = 0; i < shifts.length; i++) {
            this.checkRandomShiftedCell(i, random)
        }
    }
}
