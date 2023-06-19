import { Cell } from '../../Positioning/Cell.js'
import { Plant } from '../Plant.js'

export class Chamomile extends Plant {
    constructor(cell: Cell) {
        super(cell)

        this._amount = 300
        this._daysPerGrow = 300
    }
}
