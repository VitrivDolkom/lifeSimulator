export class PersonWalking {
    constructor(person, walkTypes) {
        this.person = person;
        this.walkTypes = walkTypes;
    }
    tryPartner(partner) {
        if (partner.isDefferentSexCreature(this.person)) {
            const child = partner.reproduction(this.person);
            this.person.cell.addChild(child);
        }
    }
    tryPossiblePartners() {
        const possiblePartners = this.person.cell.people;
        possiblePartners.forEach(this.tryPartner.bind(this));
    }
    reproductionIfPossible() {
        if (this.person.isReadyForReproduction()) {
            this.tryPossiblePartners();
        }
    }
    makeStep() {
        this.person.cell.moveMe(this.person);
    }
    doWalkingStrategy(walkType) {
        walkType.walk();
    }
    doWalkingStrategies() {
        var _a;
        (_a = this.walkTypes) === null || _a === void 0 ? void 0 : _a.forEach(this.doWalkingStrategy);
    }
    walk() {
        this.makeStep();
        this.doWalkingStrategies();
        this.reproductionIfPossible();
        this.person.dailyUpdateAndDieIfNecessary();
    }
}
