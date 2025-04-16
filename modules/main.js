import { Sprite } from './Sprite.js';
import { Collision } from './Collision.js';
import { collide } from '../assets/data/collide.js';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const offset = {
    x: -1600,
    y: -1160
};

const collisionsMap = [];
for (let i = 0; i < collide.length; i += 70) {
    collisionsMap.push(collide.slice(i, i + 70));
}

const collisions = [];
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

const image = new Image();
image.src = '../assets/img/map/mapa.png';

const playerImage = new Image();
playerImage.src = '../assets/img/player/playerDown.png';

let imagesLoaded = 0;

image.onload = () => {
    image.isReady = true;
    imagesLoaded++;
    checkAllImagesLoaded();
};
playerImage.onload = () => {
    playerImage.isReady = true;
    imagesLoaded++;
    checkAllImagesLoaded();
};

function checkAllImagesLoaded() {
    if (imagesLoaded === 2 && image.isReady && playerImage.isReady) {
        animate();
    }
}

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: image,
});

const player = new Sprite({
    position: {
        x: canvas.width / 2 - (playerImage.width / 4) / 2,
        y: canvas.height / 2 - playerImage.height / 2
    },
    image: playerImage,
    frames: {
        max: 4
    }
});

const testecollision = new Collision({
    x: 400,
    y: 300
});

const movables = [background, ...collisions];

function rectangularCollision(rect1, rect2) {
    return (
        rect1.position.x + rect1.width >= rect2.position.x &&
        rect1.position.x <= rect2.position.x + rect2.width &&
        rect1.position.y + rect1.height >= rect2.position.y &&
        rect1.position.y <= rect2.position.y + rect2.height
    );
}

function animate() {
    window.requestAnimationFrame(animate);
    background.draw(c);

    collisions.forEach((collission) => {
        collission.draw(c);
    });

    player.draw(c);

    if (keys.w || keys.arrowup) {
        let moving = true;
        for (let i = 0; i < collisions.length; i++) {
            const collision = collisions[i];
            if (
                rectangularCollision(
                    player,
                    {
                        ...collision,
                        position: {
                            x: collision.position.x,
                            y: collision.position.y - 40
                        }
                    }
                )
            ) {
                moving = false;
                break;
            }
        }

        if (moving) {
            movables.forEach((movable) => {
                movable.position.y += 2.8;
            });
        }
    }

    else if (keys.s || keys.arrowdown) {
        let moving = true;
        for (let i = 0; i < collisions.length; i++) {
            const collision = collisions[i];
            if (
                rectangularCollision(
                    player,
                    {
                        ...collision,
                        position: {
                            x: collision.position.x,
                            y: collision.position.y - 40
                        }
                    }
                )
            ) {
                moving = false;
                break;
            }
        }

        if (moving) {
            movables.forEach((movable) => {
                movable.position.y -= 2.8;
            });
        }
    }

    else if (keys.a || keys.arrowleft) {
        let moving = true;
        for (let i = 0; i < collisions.length; i++) {
            const collision = collisions[i];
            if (
                rectangularCollision(
                    player,
                    {
                        ...collision,
                        position: {
                            x: collision.position.x,
                            y: collision.position.y - 40
                        }
                    }
                )
            ) {
                moving = false;
                break;
            }
        }
        if (moving) {
            movables.forEach((movable) => {
                movable.position.x += 2.8;
            });
        }
    }

    else if (keys.d || keys.arrowright) {
        let moving = true;
        for (let i = 0; i < collisions.length; i++) {
            const collision = collisions[i];
            if (
                rectangularCollision(
                    player,
                    {
                        ...collision,
                        position: {
                            x: collision.position.x,
                            y: collision.position.y - 40
                        }
                    }
                )
            ) {
                moving = false;
                break;
            }
        }
        if (moving) {
            movables.forEach((movable) => {
                movable.position.x -= 2.8;
            });
        }
    }
}

const keys = {
    arrowup: false,
    arrowdown: false,
    arrowleft: false,
    arrowright: false,
    w: false,
    s: false,
    a: false,
    d: false
};

document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (key in keys) keys[key] = true;
});


document.addEventListener('keyup', (e) => {
    const key = e.key.toLowerCase();
    if (key in keys) keys[key] = false;
});