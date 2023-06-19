import { Cell } from '../../Positioning/Cell.js'
import { Plant } from '../Plant.js'

export class Rose extends Plant {
    constructor(cell: Cell) {
        super(cell)

        this._amount = 100
        this._daysPerGrow = 200
    }
}
