export class Collision {
    static width = 48;
    static height = 48;

    constructor(position) {
        this.position = position;
        this.width = Collision.width;
        this.height = Collision.height;
    }

    draw(c) {
        c.fillStyle = 'rgba(255, 0, 0, 0.2)';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
