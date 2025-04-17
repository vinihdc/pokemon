export function rectangularCollision(rect1, rect2) {
    return (
        rect1.position.x + rect1.width >= rect2.position.x &&
        rect1.position.x <= rect2.position.x + rect2.width &&
        rect1.position.y + rect1.height >= rect2.position.y &&
        rect1.position.y <= rect2.position.y + rect2.height
    );
}

export function map2D(data, width = 70) {
    const map = [];
    for (let i = 0; i < data.length; i += width) {
        map.push(data.slice(i, i + width));
    }
    return map;
}
