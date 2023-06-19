export class CreatureMoveAdviser {
    constructor(worldMap, cell, creature) {
        this.worldMap = worldMap;
        this.cell = cell;
        this.creature = creature;
        this.bestCell = cell;
        this.lockBestCell = false;
        this.bestProfit = 0;
        this.visionRadius = Math.ceil(this.creature.speed / this.worldMap.pxPerCell);
    }
    getBestCell() {
        this.chooseBestCreatureStep();
        return this.bestCell;
    }
    benefitOfVictim(victim) {
        return victim.meat.getMeatAmount() / victim.defenseNum;
    }
    hunterBenefitAtCell(cell) {
        return cell.victims.reduce((acc, victim) => acc + this.benefitOfVictim(victim), 0);
    }
    lossFromPerson(person) {
        return this.worldMap.isHunterEntity(person) ? person.offenceNum : 0;
    }
    hunterExceptPersonLossAtCell(cell) {
        return cell.people.reduce((acc, person) => acc + this.lossFromPerson(person), 0);
    }
    hunterLossAtCell(cell) {
        return !this.worldMap.isPersonEntity(this.creature)
            ? this.hunterExceptPersonLossAtCell(cell)
            : 0;
    }
    hunterProfitAtCell(cell) {
        let profit = 0;
        profit += this.hunterBenefitAtCell(cell);
        profit -= this.hunterLossAtCell(cell);
        return profit;
    }
    victimBenefitAtCell(cell) {
        return cell.plants.reduce((acc, plant) => acc + plant.amount, 0);
    }
    victimLossAtCell(cell) {
        return cell.hunters.reduce((acc, hunter) => acc + hunter.offenceNum, 0);
    }
    victimProfitAtCell(cell) {
        let profit = 0;
        profit += this.victimBenefitAtCell(cell);
        profit -= this.victimLossAtCell(cell);
        return profit;
    }
    hunterProfitIfPossible(cell) {
        return this.worldMap.isHunterEntity(this.creature)
            ? this.hunterProfitAtCell(cell)
            : 0;
    }
    victimProfitIfPossible(cell) {
        return this.worldMap.isVictimEntity(this.creature)
            ? this.victimProfitAtCell(cell)
            : 0;
    }
    countProfitAtCell(toCell) {
        let profit = 0;
        profit += this.hunterProfitIfPossible(toCell);
        profit += this.victimProfitIfPossible(toCell);
        return profit;
    }
    updateBestStepIfPossible(profit, toCell) {
        if (this.bestProfit < profit) {
            this.bestCell = toCell;
            this.bestProfit = profit;
        }
    }
    checkSingleStep(row, column) {
        const toCell = this.worldMap.getShiftedCell(this.cell, row, column);
        if (toCell === null)
            return;
        let currentProfit = this.countProfitAtCell(toCell);
        this.updateBestStepIfPossible(currentProfit, toCell);
    }
    bestCreatureColumnsStep(row) {
        for (let j = -this.visionRadius; j <= this.visionRadius; j++) {
            this.checkSingleStep(row, j);
        }
    }
    changeBestCellIfPossible() {
        if (this.bestProfit === 0) {
            this.chooseRandomCell();
        }
    }
    chooseBestCreatureStep() {
        for (let i = -this.visionRadius; i <= this.visionRadius; i++) {
            this.bestCreatureColumnsStep(i);
        }
        this.changeBestCellIfPossible();
    }
    fourDirectionsShifts() {
        return [
            { row: 1, column: 0, randomLimit: 0.25 },
            { row: 0, column: 1, randomLimit: 0.5 },
            { row: -1, column: 0, randomLimit: 0.75 },
            { row: 0, column: -1, randomLimit: 1 }
        ];
    }
    updateBestCellIfPossible(cell, random, randomLimit) {
        if (cell !== null && random <= randomLimit && !this.lockBestCell) {
            this.bestCell = cell;
            this.lockBestCell = true;
        }
    }
    checkRandomShiftedCell(i, random) {
        const shifts = this.fourDirectionsShifts();
        const shift = shifts[i];
        const toCell = this.worldMap.getShiftedCell(this.cell, shift.row, shift.column);
        this.updateBestCellIfPossible(toCell, random, shift.randomLimit);
    }
    chooseRandomCell() {
        const random = Math.random();
        const shifts = this.fourDirectionsShifts();
        for (let i = 0; i < shifts.length; i++) {
            this.checkRandomShiftedCell(i, random);
        }
    }
}
