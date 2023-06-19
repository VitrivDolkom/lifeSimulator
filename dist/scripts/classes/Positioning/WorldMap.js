import { Omnivorous, Predator, Herbivore } from '../Animals/index.js';
import { CreatureMoveAdviser } from './CreatureMoveAdviser.js';
import { Plant, Chamomile, Rose } from '../Plants/index.js';
import { PlantGrowAdviser } from './PlantGrowAdviser.js';
import { Person, Man, Woman } from '../People/index.js';
import { Village } from '../Buildings/Village.js';
import { House } from '../Buildings/House.js';
import { Animal } from '../Animals/index.js';
import { Cell } from './Cell.js';
class WorldMap {
    constructor(width, height, pxPerCell) {
        this._entities = [];
        this._cells = [];
        this._villages = [];
        this._rowsNum = Math.floor(height / pxPerCell);
        this._columnsNum = Math.floor(width / pxPerCell);
        this._pxPerCell = pxPerCell;
        this.init();
    }
    init() {
        this.initCells();
        this.createStartEntities();
    }
    createStartEntities() {
        this.createStartAnimals();
        this.createStartPlants();
        this.createStartPeople();
    }
    createCell(row, column) {
        return new Cell(this, this._pxPerCell * column, this._pxPerCell * row, row, column);
    }
    initCell(row, column) {
        const cell = this.createCell(row, column);
        this._cells[row].push(cell);
    }
    initCellsColumn(i) {
        for (let j = 0; j < this._columnsNum; ++j) {
            this.initCell(i, j);
        }
    }
    initCellsRow() {
        this._cells.push([]);
    }
    initCells() {
        for (let i = 0; i < this.rowsNum; ++i) {
            this.initCellsRow();
            this.initCellsColumn(i);
        }
    }
    isValidRow(row) {
        return row > -1 && row < this.rowsNum;
    }
    isValidColumn(column) {
        return column > -1 && column < this.columnsNum;
    }
    areValidRowAndColumn(row, column) {
        return this.isValidRow(row) && this.isValidColumn(column);
    }
    randomIntInRange(min, max) {
        return Math.floor(Math.random() * max) + min;
    }
    pickRandomCell() {
        const row = this.randomIntInRange(0, this.rowsNum);
        const column = this.randomIntInRange(0, this._columnsNum);
        return this._cells[row][column];
    }
    addDrawableEntity(entity) {
        this._entities.push(entity);
    }
    createAnimalAtCell(cell) {
        const entity = Animal.createRandomAnimal(cell);
        cell.addEntity(entity);
        this.addDrawableEntity(entity);
    }
    createStartAnimals() {
        for (let i = 0; i < WorldMap.START_ANIMALS_NUM; i++) {
            const cell = this.pickRandomCell();
            this.createAnimalAtCell(cell);
        }
    }
    createPlantAtCell(cell) {
        const entity = Plant.createRandomPlant(cell);
        cell.addEntity(entity);
        this.addDrawableEntity(entity);
    }
    createStartPlants() {
        for (let i = 0; i < WorldMap.START_PLANTS_NUM; i++) {
            const cell = this.pickRandomCell();
            this.createPlantAtCell(cell);
        }
    }
    createPersonAtCell(cell) {
        const entity = Person.createRandomPerson(cell);
        cell.addEntity(entity);
        this.addDrawableEntity(entity);
    }
    createStartPeople() {
        for (let i = 0; i < WorldMap.START_PEOPLE_NUM; i++) {
            const cell = this.pickRandomCell();
            this.createPersonAtCell(cell);
        }
    }
    filteredEntities(entityToRemove) {
        return this._entities.filter((entity) => entity !== entityToRemove);
    }
    removeEntityFromMap(entityToRemove) {
        this._entities = this.filteredEntities(entityToRemove);
    }
    moveEntityFromCell(creatureToMove, fromCell) {
        const moveAdviser = new CreatureMoveAdviser(this, fromCell, creatureToMove);
        const bestCell = moveAdviser.getBestCell();
        bestCell.addEntity(creatureToMove);
    }
    plantGrowAtCell(plant, cell) {
        const plantGrow = new PlantGrowAdviser(this, cell, plant);
        plantGrow.grow();
    }
    getShiftedCell(fromCell, shiftRow, shiftColumn) {
        const toRow = fromCell.row + shiftRow;
        const toColumn = fromCell.column + shiftColumn;
        if (!this.areValidRowAndColumn(toRow, toColumn))
            return null;
        return this._cells[toRow][toColumn];
    }
    isAvailableToAddVillage(houses) {
        const MIN_HOUSE_NUM_PER_VILLAGE = 30;
        return houses.length >= MIN_HOUSE_NUM_PER_VILLAGE;
    }
    randomLivingSpace() {
        const MIN_LIVING_SPACE = 50;
        const MAX_LIVING_SPACE = 100;
        return this.randomIntInRange(MIN_LIVING_SPACE, MAX_LIVING_SPACE);
    }
    addHouseAtCell(cell) {
        const house = new House(cell, this.randomLivingSpace());
        cell.house = house;
        this.addDrawableEntity(house);
    }
    getSingleHouseAtCell(cell) {
        return cell && cell.house !== null ? cell.house : null;
    }
    getHousesColumnShift(cell, row, range) {
        let houses = [];
        for (let j = -range; j <= range; j++) {
            const currentCell = this.getShiftedCell(cell, row, j);
            const houseAtCell = this.getSingleHouseAtCell(currentCell);
            if (houseAtCell !== null)
                houses.push(houseAtCell);
        }
        return houses;
    }
    mergeTwoArrays(leftArray, rightArray) {
        return [...leftArray, ...rightArray];
    }
    getHousesInCellRange(cell, range) {
        let houses = [];
        for (let i = -range; i <= range; i++) {
            const columnShiftHouses = this.getHousesColumnShift(cell, i, range);
            houses = this.mergeTwoArrays(houses, columnShiftHouses);
        }
        return houses;
    }
    addVillageIfPossible(houses) {
        if (this.isAvailableToAddVillage(houses)) {
            this.addVillage(houses);
        }
    }
    findHousesAndAddVillageIfPossible(cell) {
        const VILLAGE_VISION = 10;
        const houses = this.getHousesInCellRange(cell, VILLAGE_VISION);
        this.addVillageIfPossible(houses);
    }
    addHouseAtMap(cell) {
        this.addHouseAtCell(cell);
        this.findHousesAndAddVillageIfPossible(cell);
    }
    addVillage(houses) {
        const village = new Village(this, houses);
        this._villages.push(village);
    }
    updateEntity(entity) {
        entity.update();
    }
    update() {
        this._entities.forEach(this.updateEntity);
    }
    isHunterEntity(entity) {
        return (entity instanceof Predator ||
            entity instanceof Man ||
            entity instanceof Omnivorous);
    }
    isVictimEntity(entity) {
        return entity instanceof Herbivore || entity instanceof Woman;
    }
    isPlantEntity(entity) {
        return entity instanceof Plant;
    }
    isRosePlant(plant) {
        return plant instanceof Rose;
    }
    isChamomilePlant(plant) {
        return plant instanceof Chamomile;
    }
    isPersonEntity(entity) {
        return entity instanceof Person;
    }
    get entities() {
        return this._entities;
    }
    get columnsNum() {
        return this._columnsNum;
    }
    get rowsNum() {
        return this._rowsNum;
    }
    get cells() {
        return this._cells;
    }
    get pxPerCell() {
        return this._pxPerCell;
    }
}
WorldMap.START_PLANTS_NUM = 300;
WorldMap.START_ANIMALS_NUM = 1000;
WorldMap.START_PEOPLE_NUM = 1000;
export { WorldMap };
