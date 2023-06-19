import { DrawableEntity } from '../Entity/DrawableEntity.js'
import { WorldMap } from '../Positioning/WorldMap.js'
import { DisplayColor } from './DisplayColor.js'

export class View {
    static readonly MILL_SEC_PER_SEC = 1000
    static readonly FPS = 100
    static readonly DEFAULT_COLOR = DisplayColor.white

    private width: number
    private height: number
    private map: WorldMap
    private ctx: CanvasRenderingContext2D

    constructor(
        width: number,
        height: number,
        map: WorldMap,
        ctx: CanvasRenderingContext2D
    ) {
        this.width = width
        this.height = height
        this.map = map
        this.ctx = ctx
    }

    private resetView(): void {
        this.ctx.fillStyle = View.DEFAULT_COLOR
        this.ctx.fillRect(0, 0, this.width, this.height)
    }

    private displayEntity(entity: DrawableEntity): void {
        const position = entity.getPosition()
        const x = position.x
        const y = position.y
        const color = entity.getColor()
        const size = entity.getSize()

        this.ctx.fillStyle = color
        this.ctx.fillRect(x, y, size, size)
    }

    private displayEntities(): void {
        this.map.entities.forEach(this.displayEntity.bind(this))
    }

    public display(): void {
        this.resetView()
        this.displayEntities()
    }

    public start(): void {
        const animate = () => {
            this.map.update()
            this.display()

            setTimeout(() => {
                requestAnimationFrame(animate)
            }, View.MILL_SEC_PER_SEC / View.FPS)
        }

        animate()
    }
}
