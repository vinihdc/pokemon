import { Collision } from '../engine/Collision.js';
import { battleZonesData } from '../assets/data/battleZone.js';
import { map2D } from '../core/utils.js';

const offset = { x: -1600, y: -1200 };
const battleZoneMap = map2D(battleZonesData);

export const battleZones = [];

battleZoneMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) {
            battleZones.push(new Collision({
                x: j * Collision.width + offset.x,
                y: i * Collision.height + offset.y
            }));
        }
    });
});
