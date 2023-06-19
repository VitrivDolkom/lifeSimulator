export class AnimalWalking {
    constructor(animal, walkTypes) {
        this.animal = animal;
        this.walkTypes = walkTypes;
    }
    tryPartner(partner) {
        if (partner.isValidPartner(this.animal) && partner !== this.animal) {
            const child = partner.reproduction(this.animal);
            this.animal.cell.addChild(child);
        }
    }
    tryPossiblePartners() {
        const possiblePartners = this.animal.cell.getLivingCreatureTypeArrayAtCell(this.animal);
        possiblePartners === null || possiblePartners === void 0 ? void 0 : possiblePartners.forEach(this.tryPartner.bind(this));
    }
    reproductionIfPossible() {
        if (this.animal.isReadyForReproduction()) {
            this.tryPossiblePartners();
        }
    }
    makeStep() {
        this.animal.cell.moveMe(this.animal);
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
        this.animal.dailyUpdateAndDieIfNecessary();
    }
}
