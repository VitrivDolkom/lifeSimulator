export class Cell {
    constructor(world, x, y, row, column) {
        this._hunters = [];
        this._victims = [];
        this._people = [];
        this._plants = [];
        this._worldMap = world;
        this._x = x;
        this._y = y;
        this._row = row;
        this._column = column;
        this._house = null;
    }
    getLivingCreatureTypeArrayAtCell(entity) {
        if (this._worldMap.isHunterEntity(entity))
            return this._hunters;
        if (this._worldMap.isPersonEntity(entity))
            return this._people;
        if (this._worldMap.isVictimEntity(entity))
            return this._victims;
    }
    addPlantIfPossible(entity) {
        if (this._worldMap.isPlantEntity(entity)) {
            this._plants.push(entity);
        }
    }
    addHunterIfPossible(entity) {
        if (this._worldMap.isHunterEntity(entity)) {
            this._hunters.push(entity);
        }
    }
    addVictimIfPossible(entity) {
        if (this._worldMap.isVictimEntity(entity)) {
            this._victims.push(entity);
        }
    }
    addPersonIfPossible(entity) {
        if (this._worldMap.isPersonEntity(entity)) {
            this._people.push(entity);
        }
    }
    addEntityInTypeArray(entity) {
        this.addPlantIfPossible(entity);
        this.addHunterIfPossible(entity);
        this.addVictimIfPossible(entity);
        this.addPersonIfPossible(entity);
    }
    setEntityCell(entity) {
        entity.cell = this;
    }
    addEntity(entity) {
        this.setEntityCell(entity);
        this.addEntityInTypeArray(entity);
    }
    removePlantIfPossible(entity) {
        if (this._worldMap.isPlantEntity(entity)) {
            this._plants = this._plants.filter((entity) => entity !== entity);
        }
    }
    removeHunterIfPossible(entity) {
        if (this._worldMap.isHunterEntity(entity)) {
            this._hunters = this._hunters.filter((entity) => entity !== entity);
        }
    }
    removePersonIfPossible(entity) {
        if (this._worldMap.isPersonEntity(entity)) {
            this._people = this._people.filter((entity) => entity !== entity);
        }
    }
    removeVictimIfPossible(entity) {
        if (this._worldMap.isVictimEntity(entity)) {
            this._victims = this._victims.filter((entity) => entity !== entity);
        }
    }
    removeEntityFromTypeArray(entity) {
        this.removePlantIfPossible(entity);
        this.removeHunterIfPossible(entity);
        this.removePersonIfPossible(entity);
        this.removeVictimIfPossible(entity);
    }
    removeHouseIfPossible(entity) {
        if (entity === this._house) {
            this._house = null;
        }
    }
    removeEntity(entity) {
        this.removeHouseIfPossible(entity);
        this.removeEntityFromTypeArray(entity);
    }
    plantGrow(plant) {
        this._worldMap.plantGrowAtCell(plant, this);
    }
    addChild(child) {
        this.addEntity(child);
        this._worldMap.addDrawableEntity(child);
    }
    addHouse() {
        this._worldMap.addHouseAtMap(this);
    }
    moveMe(creatureToMove) {
        this.removeEntity(creatureToMove);
        this._worldMap.moveEntityFromCell(creatureToMove, this);
    }
    removeMe(entityToRemove) {
        this.removeEntity(entityToRemove);
        this._worldMap.removeEntityFromMap(entityToRemove);
    }
    isAvailableToStartHouse() {
        const HOUSE_BUILD_RANDOM_LIMIT = 0.5;
        const random = Math.random();
        return this._house === null && random <= HOUSE_BUILD_RANDOM_LIMIT;
    }
    isThereHouseToBuild() {
        var _a;
        return this._house !== null && !((_a = this._house) === null || _a === void 0 ? void 0 : _a.isDone());
    }
    continueBuilding(buildSKill) {
        var _a;
        (_a = this._house) === null || _a === void 0 ? void 0 : _a.build(buildSKill);
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get row() {
        return this._row;
    }
    get column() {
        return this._column;
    }
    get victims() {
        return this._victims;
    }
    get people() {
        return this._people;
    }
    get plants() {
        return this._plants;
    }
    get hunters() {
        return this._hunters;
    }
    get house() {
        return this._house;
    }
    set house(house) {
        this._house = house;
    }
}
