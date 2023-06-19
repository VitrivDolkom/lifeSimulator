export class CreatureMeat {
    private _weight: number
    private _quality: number

    constructor(weight: number, quality: number) {
        this._weight = weight
        this._quality = quality
    }

    public getMeatAmount(): number {
        return this._quality * this._weight
    }
}
