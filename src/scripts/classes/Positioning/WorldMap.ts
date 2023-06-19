import { Omnivorous, Predator, Herbivore } from '../Animals/index.js'
import { LivingCreature } from '../Creature/LivingCreature.js'
import { CreatureMoveAdviser } from './CreatureMoveAdviser.js'
import { DrawableEntity } from '../Entity/DrawableEntity.js'
import { Plant, Chamomile, Rose } from '../Plants/index.js'
import { PlantGrowAdviser } from './PlantGrowAdviser.js'
import { Person, Man, Woman } from '../People/index.js'
import { Village } from '../Buildings/Village.js'
import { House } from '../Buildings/House.js'
import { Animal } from '../Animals/index.js'
import { Entity } from '../Entity/Entity.js'
import { Cell } from './Cell.js'

export class WorldMap {
    static readonly START_PLANTS_NUM = 300
    static readonly START_ANIMALS_NUM = 1000
    static readonly START_PEOPLE_NUM = 1000

    private _columnsNum: number
    private _rowsNum: number
    private _pxPerCell: number
    private _entities: DrawableEntity[] = []
    private _cells: Cell[][] = []
    private _villages: Village[] = []

    constructor(width: number, height: number, pxPerCell: number) {
        this._rowsNum = Math.floor(height / pxPerCell)
        this._columnsNum = Math.floor(width / pxPerCell)
        this._pxPerCell = pxPerCell

        this.init()
    }

    private init(): void {
        this.initCells()

        this.createStartEntities()
    }

    private createStartEntities(): void {
        this.createStartAnimals()
        this.createStartPlants()
        this.createStartPeople()
    }

    private createCell(row: number, column: number): Cell {
        return new Cell(
            this,
            this._pxPerCell * column,
            this._pxPerCell * row,
            row,
            column
        )
    }

    private initCell(row: number, column: number): void {
        const cell = this.createCell(row, column)
        this._cells[row].push(cell)
    }

    private initCellsColumn(i: number): void {
        for (let j = 0; j < this._columnsNum; ++j) {
            this.initCell(i, j)
        }
    }

    private initCellsRow(): void {
        this._cells.push([])
    }

    private initCells(): void {
        for (let i = 0; i < this.rowsNum; ++i) {
            this.initCellsRow()
            this.initCellsColumn(i)
        }
    }

    private isValidRow(row: number): boolean {
        return row > -1 && row < this.rowsNum
    }

    private isValidColumn(column: number): boolean {
        return column > -1 && column < this.columnsNum
    }

    public areValidRowAndColumn(row: number, column: number): boolean {
        return this.isValidRow(row) && this.isValidColumn(column)
    }

    private randomIntInRange(min: number, max: number): number {
        return Math.floor(Math.random() * max) + min
    }

    private pickRandomCell(): Cell {
        const row = this.randomIntInRange(0, this.rowsNum)
        const column = this.randomIntInRange(0, this._columnsNum)

        return this._cells[row][column]
    }

    public addDrawableEntity(entity: DrawableEntity) {
        this._entities.push(entity)
    }

    private createAnimalAtCell(cell: Cell): void {
        const entity = Animal.createRandomAnimal(cell)

        cell.addEntity(entity)
        this.addDrawableEntity(entity)
    }

    private createStartAnimals(): void {
        for (let i = 0; i < WorldMap.START_ANIMALS_NUM; i++) {
            const cell = this.pickRandomCell()
            this.createAnimalAtCell(cell)
        }
    }

    private createPlantAtCell(cell: Cell): void {
        const entity = Plant.createRandomPlant(cell)

        cell.addEntity(entity)
        this.addDrawableEntity(entity)
    }

    private createStartPlants(): void {
        for (let i = 0; i < WorldMap.START_PLANTS_NUM; i++) {
            const cell = this.pickRandomCell()
            this.createPlantAtCell(cell)
        }
    }

    private createPersonAtCell(cell: Cell): void {
        const entity = Person.createRandomPerson(cell)

        cell.addEntity(entity)
        this.addDrawableEntity(entity)
    }

    private createStartPeople(): void {
        for (let i = 0; i < WorldMap.START_PEOPLE_NUM; i++) {
            const cell = this.pickRandomCell()
            this.createPersonAtCell(cell)
        }
    }

    private filteredEntities(entityToRemove: DrawableEntity): DrawableEntity[] {
        return this._entities.filter((entity) => entity !== entityToRemove)
    }

    public removeEntityFromMap(entityToRemove: DrawableEntity): void {
        this._entities = this.filteredEntities(entityToRemove)
    }

    public moveEntityFromCell(creatureToMove: LivingCreature, fromCell: Cell): void {
        const moveAdviser = new CreatureMoveAdviser(this, fromCell, creatureToMove)
        const bestCell = moveAdviser.getBestCell()

        bestCell.addEntity(creatureToMove)
    }

    public plantGrowAtCell(plant: Plant, cell: Cell): void {
        const plantGrow = new PlantGrowAdviser(this, cell, plant)
        plantGrow.grow()
    }

    public getShiftedCell(
        fromCell: Cell,
        shiftRow: number,
        shiftColumn: number
    ): Cell | null {
        const toRow = fromCell.row + shiftRow
        const toColumn = fromCell.column + shiftColumn

        if (!this.areValidRowAndColumn(toRow, toColumn)) return null

        return this._cells[toRow][toColumn]
    }

    private isAvailableToAddVillage(houses: House[]): boolean {
        const MIN_HOUSE_NUM_PER_VILLAGE = 30

        return houses.length >= MIN_HOUSE_NUM_PER_VILLAGE
    }

    private randomLivingSpace(): number {
        const MIN_LIVING_SPACE = 50
        const MAX_LIVING_SPACE = 100

        return this.randomIntInRange(MIN_LIVING_SPACE, MAX_LIVING_SPACE)
    }

    private addHouseAtCell(cell: Cell): void {
        const house = new House(cell, this.randomLivingSpace())

        cell.house = house
        this.addDrawableEntity(house)
    }

    private getSingleHouseAtCell(cell: Cell | null): House | null {
        return cell && cell.house !== null ? cell.house : null
    }

    private getHousesColumnShift(cell: Cell, row: number, range: number): House[] {
        let houses: House[] = []

        for (let j = -range; j <= range; j++) {
            const currentCell = this.getShiftedCell(cell, row, j)
            const houseAtCell = this.getSingleHouseAtCell(currentCell)

            if (houseAtCell !== null) houses.push(houseAtCell)
        }

        return houses
    }

    private mergeTwoArrays<T>(leftArray: T[], rightArray: T[]): T[] {
        return [...leftArray, ...rightArray]
    }

    private getHousesInCellRange(cell: Cell, range: number): House[] {
        let houses: House[] = []

        for (let i = -range; i <= range; i++) {
            const columnShiftHouses = this.getHousesColumnShift(cell, i, range)
            houses = this.mergeTwoArrays(houses, columnShiftHouses)
        }

        return houses
    }

    private addVillageIfPossible(houses: House[]): void {
        if (this.isAvailableToAddVillage(houses)) {
            this.addVillage(houses)
        }
    }

    private findHousesAndAddVillageIfPossible(cell: Cell): void {
        const VILLAGE_VISION = 10
        const houses = this.getHousesInCellRange(cell, VILLAGE_VISION)

        this.addVillageIfPossible(houses)
    }

    public addHouseAtMap(cell: Cell): void {
        this.addHouseAtCell(cell)

        this.findHousesAndAddVillageIfPossible(cell)
    }

    private addVillage(houses: House[]) {
        const village = new Village(this, houses)
        this._villages.push(village)
    }

    private updateEntity(entity: DrawableEntity): void {
        entity.update()
    }

    public update(): void {
        this._entities.forEach(this.updateEntity)
    }

    public isHunterEntity(entity: Entity): boolean {
        return (
            entity instanceof Predator ||
            entity instanceof Man ||
            entity instanceof Omnivorous
        )
    }

    public isVictimEntity(entity: Entity): boolean {
        return entity instanceof Herbivore || entity instanceof Woman
    }

    public isPlantEntity(entity: Entity): boolean {
        return entity instanceof Plant
    }

    public isRosePlant(plant: Plant): boolean {
        return plant instanceof Rose
    }

    public isChamomilePlant(plant: Plant): boolean {
        return plant instanceof Chamomile
    }

    public isPersonEntity(entity: Entity): boolean {
        return entity instanceof Person
    }

    public get entities(): DrawableEntity[] {
        return this._entities
    }

    public get columnsNum(): number {
        return this._columnsNum
    }

    public get rowsNum(): number {
        return this._rowsNum
    }

    public get cells(): Cell[][] {
        return this._cells
    }

    public get pxPerCell(): number {
        return this._pxPerCell
    }
}
