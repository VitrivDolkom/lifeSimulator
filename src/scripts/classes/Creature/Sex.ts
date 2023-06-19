export class Sex {
    private _type: SexType

    constructor() {
        this._type = SexType.female
        this.setRandomType()
    }

    private setRandomType(): void {
        const WOMAN_RANDOM_LIMIT = 0.5
        const random = Math.random()

        this._type = random <= WOMAN_RANDOM_LIMIT ? SexType.female : SexType.male
    }

    public get type(): SexType {
        return this._type
    }

    public set type(type: SexType) {
        this._type = type
    }
}

export enum SexType {
    male,
    female
}
