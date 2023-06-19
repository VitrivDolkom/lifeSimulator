import { House } from '../Buildings/House.js'
import { LivingCreature } from '../Creature/LivingCreature.js'
import { Entity } from '../Entity/Entity.js'
import { Person } from '../People/index.js'
import { Plant } from '../Plants/index.js'
import { WorldMap } from './WorldMap.js'

export class Cell {
    private _worldMap: WorldMap
    private _x: number
    private _y: number
    private _row: number
    private _column: number

    private _hunters: LivingCreature[] = []
    private _victims: LivingCreature[] = []
    private _people: Person[] = []
    private _plants: Plant[] = []
    private _house: House | null

    constructor(world: WorldMap, x: number, y: number, row: number, column: number) {
        this._worldMap = world
        this._x = x
        this._y = y
        this._row = row
        this._column = column
        this._house = null
    }

    public getLivingCreatureTypeArrayAtCell(entity: Entity) {
        if (this._worldMap.isHunterEntity(entity)) return this._hunters
        if (this._worldMap.isPersonEntity(entity)) return this._people
        if (this._worldMap.isVictimEntity(entity)) return this._victims
    }

    private addPlantIfPossible(entity: Entity): void {
        if (this._worldMap.isPlantEntity(entity)) {
            this._plants.push(entity as Plant)
        }
    }

    private addHunterIfPossible(entity: Entity): void {
        if (this._worldMap.isHunterEntity(entity)) {
            this._hunters.push(entity as LivingCreature)
        }
    }

    private addVictimIfPossible(entity: Entity): void {
        if (this._worldMap.isVictimEntity(entity)) {
            this._victims.push(entity as LivingCreature)
        }
    }

    private addPersonIfPossible(entity: Entity): void {
        if (this._worldMap.isPersonEntity(entity)) {
            this._people.push(entity as Person)
        }
    }

    private addEntityInTypeArray(entity: Entity): void {
        this.addPlantIfPossible(entity)
        this.addHunterIfPossible(entity)
        this.addVictimIfPossible(entity)
        this.addPersonIfPossible(entity)
    }

    private setEntityCell(entity: Entity): void {
        entity.cell = this
    }

    public addEntity(entity: Entity): void {
        this.setEntityCell(entity)
        this.addEntityInTypeArray(entity)
    }

    private removePlantIfPossible(entity: Entity): void {
        if (this._worldMap.isPlantEntity(entity)) {
            this._plants = this._plants.filter((entity) => entity !== entity)
        }
    }

    private removeHunterIfPossible(entity: Entity): void {
        if (this._worldMap.isHunterEntity(entity)) {
            this._hunters = this._hunters.filter((entity) => entity !== entity)
        }
    }

    private removePersonIfPossible(entity: Entity): void {
        if (this._worldMap.isPersonEntity(entity)) {
            this._people = this._people.filter((entity) => entity !== entity)
        }
    }

    private removeVictimIfPossible(entity: Entity): void {
        if (this._worldMap.isVictimEntity(entity)) {
            this._victims = this._victims.filter((entity) => entity !== entity)
        }
    }

    private removeEntityFromTypeArray(entity: Entity): void {
        this.removePlantIfPossible(entity)
        this.removeHunterIfPossible(entity)
        this.removePersonIfPossible(entity)
        this.removeVictimIfPossible(entity)
    }

    private removeHouseIfPossible(entity: Entity): void {
        if (entity === this._house) {
            this._house = null
        }
    }

    private removeEntity(entity: Entity): void {
        this.removeHouseIfPossible(entity)

        this.removeEntityFromTypeArray(entity)
    }

    public plantGrow(plant: Plant): void {
        this._worldMap.plantGrowAtCell(plant, this)
    }

    public addChild(child: LivingCreature): void {
        this.addEntity(child)
        this._worldMap.addDrawableEntity(child)
    }

    public addHouse(): void {
        this._worldMap.addHouseAtMap(this)
    }

    public moveMe(creatureToMove: LivingCreature) {
        this.removeEntity(creatureToMove)

        this._worldMap.moveEntityFromCell(creatureToMove, this)
    }

    public removeMe(entityToRemove: Entity) {
        this.removeEntity(entityToRemove)

        this._worldMap.removeEntityFromMap(entityToRemove)
    }

    public isAvailableToStartHouse(): boolean {
        const HOUSE_BUILD_RANDOM_LIMIT = 0.5
        const random = Math.random()

        return this._house === null && random <= HOUSE_BUILD_RANDOM_LIMIT
    }

    public isThereHouseToBuild(): boolean {
        return this._house !== null && !this._house?.isDone()
    }

    public continueBuilding(buildSKill: number) {
        this._house?.build(buildSKill)
    }

    public get x(): number {
        return this._x
    }

    public get y(): number {
        return this._y
    }

    public get row(): number {
        return this._row
    }

    public get column(): number {
        return this._column
    }

    public get victims() {
        return this._victims
    }

    public get people(): Person[] {
        return this._people
    }

    public get plants(): Plant[] {
        return this._plants
    }

    public get hunters(): LivingCreature[] {
        return this._hunters
    }

    public get house(): House | null {
        return this._house
    }

    public set house(house: House | null) {
        this._house = house
    }
}
