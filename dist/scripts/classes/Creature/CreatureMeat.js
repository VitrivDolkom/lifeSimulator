export class CreatureMeat {
    constructor(weight, quality) {
        this._weight = weight;
        this._quality = quality;
    }
    getMeatAmount() {
        return this._quality * this._weight;
    }
}
