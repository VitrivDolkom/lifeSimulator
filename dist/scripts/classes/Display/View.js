import { DisplayColor } from './DisplayColor.js';
class View {
    constructor(width, height, map, ctx) {
        this.width = width;
        this.height = height;
        this.map = map;
        this.ctx = ctx;
    }
    resetView() {
        this.ctx.fillStyle = View.DEFAULT_COLOR;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    displayEntity(entity) {
        const position = entity.getPosition();
        const x = position.x;
        const y = position.y;
        const color = entity.getColor();
        const size = entity.getSize();
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, size, size);
    }
    displayEntities() {
        this.map.entities.forEach(this.displayEntity.bind(this));
    }
    display() {
        this.resetView();
        this.displayEntities();
    }
    start() {
        const animate = () => {
            this.map.update();
            this.display();
            setTimeout(() => {
                requestAnimationFrame(animate);
            }, View.MILL_SEC_PER_SEC / View.FPS);
        };
        animate();
    }
}
View.MILL_SEC_PER_SEC = 1000;
View.FPS = 100;
View.DEFAULT_COLOR = DisplayColor.white;
export { View };
