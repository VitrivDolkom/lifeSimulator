import { Plant, Chamomile, Cornflower, Rose } from '../Plants/index.js'
import { WorldMap } from './WorldMap.js'
import { Cell } from './Cell.js'

export class PlantGrowAdviser {
    private worldMap: WorldMap
    private cell: Cell
    private plant: Plant

    constructor(worldMap: WorldMap, cell: Cell, plant: Plant) {
        this.worldMap = worldMap
        this.cell = cell
        this.plant = plant
    }

    private createPlantCopy(cell: Cell): Plant {
        if (this.worldMap.isRosePlant(this.plant)) return new Rose(cell)
        if (this.worldMap.isChamomilePlant(this.plant)) return new Chamomile(cell)
        return new Cornflower(cell)
    }

    private sameCellGrowIfPossible(random: number, randomLimit: number): void {
        if (random <= randomLimit) {
            this.plantSameCellGrow()
        }
    }

    private nearCellGrowIfPossible(random: number, randomLimit: number): void {
        if (random <= randomLimit) {
            this.plantNearCellGrow()
        }
    }

    public grow(): void {
        const SAME_CELL_GROW_RANDOM_LIMIT = 0.2
        const NEAR_CELL_GROW_RANDOM_LIMIT = 1
        const random = Math.random()

        this.sameCellGrowIfPossible(random, SAME_CELL_GROW_RANDOM_LIMIT)
        this.nearCellGrowIfPossible(random, NEAR_CELL_GROW_RANDOM_LIMIT)
    }

    private isNoShift(shiftRow: number, shiftColumn: number) {
        return shiftRow === 0 && shiftColumn === 0
    }

    // ith = i-тый
    private ithRandomLimit(i: number, shiftRange: number): number {
        return i / shiftRange
    }

    private getAvailableRandomShift(): number {
        const SHIFT = 1
        const shiftRange = 2 * SHIFT
        const random = Math.random()

        for (let i = -SHIFT; i <= SHIFT; i++) {
            const randomLimit = this.ithRandomLimit(i, shiftRange)

            if (random <= randomLimit) return i
        }

        return 0
    }

    private addPlantCopy(cell: Cell) {
        const plantCopy = this.createPlantCopy(cell)

        this.worldMap.addDrawableEntity(plantCopy)
        cell.addEntity(plantCopy)
    }

    private addPlantCopyIfPossible(
        cell: Cell | null,
        shiftRow: number,
        shiftColumn: number
    ): void {
        if (cell !== null && this.isNoShift(shiftRow, shiftColumn)) {
            this.addPlantCopy(cell)
        }
    }

    private plantNearCellGrow(): void {
        const shiftRow = this.getAvailableRandomShift()
        const shiftColumn = this.getAvailableRandomShift()
        const toCell = this.worldMap.getShiftedCell(this.cell, shiftRow, shiftColumn)

        this.addPlantCopyIfPossible(toCell, shiftRow, shiftColumn)
    }

    private plantSameCellGrow(): void {
        const amountToGrow = this.plant.amount / 2
        this.plant.grow(amountToGrow)
    }
}
