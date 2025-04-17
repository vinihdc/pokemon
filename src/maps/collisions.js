import { Collision } from '../engine/Collision.js';
import { collide } from '../assets/data/collide.js';
import { map2D } from '../core/utils.js';

const offset = { x: -1600, y: -1200 };
const collisionsMap = map2D(collide);

export const collisions = [];

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025 || symbol === 1026) {
            collisions.push(new Collision({
                x: j * Collision.width + offset.x,
                y: i * Collision.height + offset.y
            }));
        }
    });
});
