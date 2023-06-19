import { DisplayColor } from '../Display/DisplayColor.js'
import { DisplaySize } from '../Display/DisplaySize.js'
import { DrawableEntity } from './DrawableEntity.js'
import { Cell } from '../Positioning/Cell.js'

export abstract class Entity implements DrawableEntity {
    protected displayColor: DisplayColor = DisplayColor.black
    protected displaySize: DisplaySize = DisplaySize.middle
    private _cell: Cell

    constructor(cell: Cell) {
        this._cell = cell
    }

    update(): void {}

    getColor(): string {
        return this.displayColor
    }

    getSize(): number {
        return this.displaySize
    }

    getPosition(): Cell {
        return this._cell
    }

    public get cell(): Cell {
        return this._cell
    }

    public set cell(cell: Cell) {
        this._cell = cell
    }
}
