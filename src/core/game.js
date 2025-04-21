import { Sprite } from '../engine/Sprite.js';
import { rectangularCollision } from './utils.js';
import { collisions } from '../maps/collisions.js';
import { battleZones } from '../maps/battleZones.js';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const offset = { x: -1600, y: -1200 };
const keys = { w: false, a: false, s: false, d: false, arrowup: false, arrowdown: false, arrowleft: false, arrowright: false };

let imagesLoaded = 0;
const totalImages = 6;
const loadedImages = {};

const loadImage = (name, src) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        imagesLoaded++;
        loadedImages[name] = img;
        if (imagesLoaded === totalImages) {
            animate();
        }
    };
    return img;
};

const images = {
    player: {
        down: loadImage('playerDown', './assets/img/player/playerDown.png'),
        up: loadImage('playerUp', './assets/img/player/playerUp.png'),
        left: loadImage('playerLeft', './assets/img/player/playerLeft.png'),
        right: loadImage('playerRight', './assets/img/player/playerRight.png')
    },
    pokemon: {
        lucas: loadImage('lucas', './assets/img/pokemon/lucas.png'),
        traks: loadImage('traks', './assets/img/pokemon/traks.png')
    },
    map: loadImage('background', './assets/img/map/mapa.png'),
    foreground: loadImage('foreground', './assets/img/map/mapaForeground.png'),
    battleBackground: loadImage('battleBackground', './assets/img/map/battleBackground.png')
};

const background = new Sprite({ position: { x: offset.x, y: offset.y }, image: images.map });

const player = new Sprite({
    position: {
        x: canvas.width / 2 - (images.player.down.width / 4) / 2,
        y: canvas.height / 2 - images.player.down.height / 2
    },
    image: images.player.down,
    frames: { max: 4 },
    sprites: images.player
});

const foreground = new Sprite({ position: { x: offset.x, y: offset.y }, image: images.foreground });
const battleBackground = new Sprite({ position: { x: 0, y: 0 }, image: images.battleBackground });
const pokemonLucas = new Sprite({ position: { x: 750, y: 40 }, image: images.pokemon.lucas, width: 150, height: 150 });
const pokemonTraks = new Sprite({ position: { x: 220, y: 100 }, image: images.pokemon.traks, width: 250, height: 300 });

const movables = [background, foreground, ...collisions, ...battleZones];
const battle = {}

function animate() {
    const animationId = window.requestAnimationFrame(animate);

    background.draw(c);
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
                window.cancelAnimationFrame(animationId);

                battleZone.initiated = true;

                gsap.to('#overlapping-div', {
                    opacity: 1,
                    duration: 0.4,
                    onComplete: () => {
                        gsap.to('#overlapping-div', {
                            opacity: 0,
                            duration: 0.4,
                            repeat: 4,
                            yoyo: true,
                            onComplete: () => {
                                animateBattle();
                                gsap.to('#overlapping-div', {
                                    opacity: 1,
                                    duration: 0.4
                                });
                            }
                        });
                    }
                });
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
                            y: collision.position.y + 1.4
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
                movable.position.y += 1.4;
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
                            y: collision.position.y - 1.4
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
                movable.position.y -= 1.4;
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
                            x: collision.position.x + 1.4,
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
                movable.position.x += 1.4;
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
                            x: collision.position.x - 1.4,
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
                movable.position.x -= 1.4;
            });
        }
    }
}

function animateBattle() {
    window.requestAnimationFrame(animateBattle);
    battleBackground.draw(c);
    pokemonTraks.draw(c);
    pokemonLucas.draw(c);
}

document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (key in keys) keys[key] = true;
});
document.addEventListener('keyup', (e) => {
    const key = e.key.toLowerCase();
    if (key in keys) keys[key] = false;
});

export { animate };
