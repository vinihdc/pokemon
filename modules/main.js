import { Sprite } from './Sprite.js';
import { Collision } from './Collision.js';
import { collide } from '../assets/data/collide.js';
import { battleZonesData } from '../assets/data/battleZone.js';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const offset = {
    x: -1600,
    y: -1200
};

const collisionsMap = [];
for (let i = 0; i < collide.length; i += 70) {
    collisionsMap.push(collide.slice(i, i + 70));
}
const battleZoneMap = [];
for (let i = 0; i < battleZonesData.length; i += 70) {
    battleZoneMap.push(battleZonesData.slice(i, i + 70));
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

const battleZones = [];
battleZoneMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) {
            battleZones.push(new Collision({
                x: j * Collision.width + offset.x,
                y: i * Collision.height + offset.y
            }));
        }
    });
})

const image = new Image();
image.src = '../assets/img/map/mapa.png';

const foregroundImage = new Image();
foregroundImage.src = '../assets/img/map/mapaForeground.png';

const playerDownImage = new Image();
playerDownImage.src = '../assets/img/player/playerDown.png';

const playerUpImage = new Image();
playerUpImage.src = '../assets/img/player/playerUp.png';

const playerLeftImage = new Image();
playerLeftImage.src = '../assets/img/player/playerLeft.png';

const playerRightImage = new Image();
playerRightImage.src = '../assets/img/player/playerRight.png';

let imagesLoaded = 0;

image.onload = () => {
    image.isReady = true;
    imagesLoaded++;
    checkAllImagesLoaded();
};
playerDownImage.onload = () => {
    playerDownImage.isReady = true;
    imagesLoaded++;
    checkAllImagesLoaded();
};

foregroundImage.onload = () => {
    foregroundImage.isReady = true;
    imagesLoaded++;
    checkAllImagesLoaded();
};

function checkAllImagesLoaded() {
    if (imagesLoaded === 3 && image.isReady && playerDownImage.isReady && foregroundImage.isReady) {
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
        x: canvas.width / 2 - (playerDownImage.width / 4) / 2,
        y: canvas.height / 2 - playerDownImage.height / 2
    },
    image: playerDownImage,
    frames: {
        max: 4
    },
    sprites: {
        up: playerUpImage,
        down: playerDownImage,
        left: playerLeftImage,
        right: playerRightImage
    }
});

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: foregroundImage,
});

const movables = [background, ...collisions, foreground, ...battleZones];

function rectangularCollision(rect1, rect2) {
    return (
        rect1.position.x + rect1.width >= rect2.position.x &&
        rect1.position.x <= rect2.position.x + rect2.width &&
        rect1.position.y + rect1.height >= rect2.position.y &&
        rect1.position.y <= rect2.position.y + rect2.height
    );
}

const battle = {}

function animate() {
    window.requestAnimationFrame(animate);

    background.draw(c);
    battleZones.forEach((battleZone) => {
        battleZone.draw(c);
    })
    player.draw(c);
    foreground.draw(c);

    let moving = true;
    player.moving = false;

    if (battle.initiated) return;

    if (moving) {
        for (let i = 0; i < battleZones.length; i++) {
            const battleZone = battleZones[i];

            const overlappingArea =
                Math.max(0, Math.min(player.position.x + player.width, battleZone.position.x + battleZone.width) -
                    Math.max(player.position.x, battleZone.position.x)) *
                Math.max(0, Math.min(player.position.y + player.height, battleZone.position.y + battleZone.height) -
                    Math.max(player.position.y, battleZone.position.y));

            if (
                rectangularCollision(player, battleZone) &&
                overlappingArea > (player.width * player.height) / 2 &&
                Math.random() < 0.1
            ) {
                console.log('Entrou em zona de batalha!');
                battleZone.initiated = true;
                break;
            }
        }
    }

    if (keys.w || keys.arrowup) {
        player.moving = true;
        player.image = player.sprites.up;

        for (let i = 0; i < collisions.length; i++) {
            const collision = collisions[i];
            if (
                rectangularCollision(
                    player,
                    {
                        ...collision,
                        position: {
                            x: collision.position.x,
                            y: collision.position.y + 2.8
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
        player.moving = true;
        player.image = player.sprites.down;

        for (let i = 0; i < collisions.length; i++) {
            const collision = collisions[i];
            if (
                rectangularCollision(
                    player,
                    {
                        ...collision,
                        position: {
                            x: collision.position.x,
                            y: collision.position.y - 2.8
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
        player.moving = true;
        player.image = player.sprites.left;

        for (let i = 0; i < collisions.length; i++) {
            const collision = collisions[i];
            if (
                rectangularCollision(
                    player,
                    {
                        ...collision,
                        position: {
                            x: collision.position.x + 2.8,
                            y: collision.position.y
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
        player.moving = true;
        player.image = player.sprites.right;

        for (let i = 0; i < collisions.length; i++) {
            const collision = collisions[i];
            if (
                rectangularCollision(
                    player,
                    {
                        ...collision,
                        position: {
                            x: collision.position.x - 2.8,
                            y: collision.position.y
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