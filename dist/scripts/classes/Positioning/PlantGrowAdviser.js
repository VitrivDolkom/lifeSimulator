import { Chamomile, Cornflower, Rose } from '../Plants/index.js';
export class PlantGrowAdviser {
    constructor(worldMap, cell, plant) {
        this.worldMap = worldMap;
        this.cell = cell;
        this.plant = plant;
    }
    createPlantCopy(cell) {
        if (this.worldMap.isRosePlant(this.plant))
            return new Rose(cell);
        if (this.worldMap.isChamomilePlant(this.plant))
            return new Chamomile(cell);
        return new Cornflower(cell);
    }
    sameCellGrowIfPossible(random, randomLimit) {
        if (random <= randomLimit) {
            this.plantSameCellGrow();
        }
    }
    nearCellGrowIfPossible(random, randomLimit) {
        if (random <= randomLimit) {
            this.plantNearCellGrow();
        }
    }
    grow() {
        const SAME_CELL_GROW_RANDOM_LIMIT = 0.2;
        const NEAR_CELL_GROW_RANDOM_LIMIT = 1;
        const random = Math.random();
        this.sameCellGrowIfPossible(random, SAME_CELL_GROW_RANDOM_LIMIT);
        this.nearCellGrowIfPossible(random, NEAR_CELL_GROW_RANDOM_LIMIT);
    }
    isNoShift(shiftRow, shiftColumn) {
        return shiftRow === 0 && shiftColumn === 0;
    }
    // ith = i-тый
    ithRandomLimit(i, shiftRange) {
        return i / shiftRange;
    }
    getAvailableRandomShift() {
        const SHIFT = 1;
        const shiftRange = 2 * SHIFT;
        const random = Math.random();
        for (let i = -SHIFT; i <= SHIFT; i++) {
            const randomLimit = this.ithRandomLimit(i, shiftRange);
            if (random <= randomLimit)
                return i;
        }
        return 0;
    }
    addPlantCopy(cell) {
        const plantCopy = this.createPlantCopy(cell);
        this.worldMap.addDrawableEntity(plantCopy);
        cell.addEntity(plantCopy);
    }
    addPlantCopyIfPossible(cell, shiftRow, shiftColumn) {
        if (cell !== null && this.isNoShift(shiftRow, shiftColumn)) {
            this.addPlantCopy(cell);
        }
    }
    plantNearCellGrow() {
        const shiftRow = this.getAvailableRandomShift();
        const shiftColumn = this.getAvailableRandomShift();
        const toCell = this.worldMap.getShiftedCell(this.cell, shiftRow, shiftColumn);
        this.addPlantCopyIfPossible(toCell, shiftRow, shiftColumn);
    }
    plantSameCellGrow() {
        const amountToGrow = this.plant.amount / 2;
        this.plant.grow(amountToGrow);
    }
}
