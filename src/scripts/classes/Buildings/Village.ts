import { WorldMap } from '../Positioning/WorldMap.js'
import { House } from './House.js'

export class Village {
    private _worldMap: WorldMap
    private _houses: House[]

    constructor(worldMap: WorldMap, houses: House[]) {
        this._worldMap = worldMap
        this._houses = houses
    }

    public get houses(): House[] {
        return this._houses
    }
}
