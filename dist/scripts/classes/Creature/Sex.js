export class Sex {
    constructor() {
        this._type = SexType.female;
        this.setRandomType();
    }
    setRandomType() {
        const WOMAN_RANDOM_LIMIT = 0.5;
        const random = Math.random();
        this._type = random <= WOMAN_RANDOM_LIMIT ? SexType.female : SexType.male;
    }
    get type() {
        return this._type;
    }
    set type(type) {
        this._type = type;
    }
}
export var SexType;
(function (SexType) {
    SexType[SexType["male"] = 0] = "male";
    SexType[SexType["female"] = 1] = "female";
})(SexType || (SexType = {}));
