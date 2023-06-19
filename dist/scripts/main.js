import { WorldMap } from './classes/Positioning/WorldMap.js';
import { View } from './classes/Display/View.js';
const PX_PER_CELL = 10;
const CANVAS_WIDTH = 4000;
const CANVAS_HEIGHT = 4000;
addEventListener('DOMContentLoaded', () => {
    const cnv = document.querySelector('canvas');
    if (cnv === null)
        throw Error('Canvas not found');
    cnv.width = CANVAS_WIDTH;
    cnv.height = CANVAS_HEIGHT;
    const ctx = cnv.getContext('2d');
    if (ctx === null)
        throw Error('Context not found');
    const map = new WorldMap(CANVAS_WIDTH, CANVAS_HEIGHT, PX_PER_CELL);
    const view = new View(CANVAS_WIDTH, CANVAS_HEIGHT, map, ctx);
    view.start();
});
