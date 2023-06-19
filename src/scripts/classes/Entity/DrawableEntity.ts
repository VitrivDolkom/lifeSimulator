import { Cell } from '../Positioning/Cell'

export interface DrawableEntity {
    getPosition(): Cell
    getColor(): string
    getSize(): number
    update: () => void
}
