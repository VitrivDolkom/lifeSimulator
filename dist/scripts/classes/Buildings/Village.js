export class Village {
    constructor(worldMap, houses) {
        this._worldMap = worldMap;
        this._houses = houses;
    }
    get houses() {
        return this._houses;
    }
}
