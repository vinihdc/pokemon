export class Sprite {
    constructor({ position, frames = { max: 1 }, image, sprites, width, height }) {
        this.position = position;
        this.image = image;
        this.frames = { ...frames, val: 0, elapsed: 0 };

        this.originalWidth = this.image.width / this.frames.max;
        this.originalHeight = this.image.height;

        this.width = width || this.originalWidth;
        this.height = height || this.originalHeight;

        this.moving = false;
        this.sprites = sprites;
    }


    draw(c) {
        c.drawImage(
            this.image,
            this.frames.val * this.originalWidth,
            0,
            this.originalWidth,
            this.originalHeight,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );

        if (!this.moving) return;

        if (this.frames.max > 1) {
            this.frames.elapsed++;
        }

        if (this.frames.elapsed % 15 === 0) {
            if (this.frames.val < this.frames.max - 1) this.frames.val++;
            else this.frames.val = 0;
        }
    }
}