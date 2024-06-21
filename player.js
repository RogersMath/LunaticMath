// player.js
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 5;
    }

    update() {
        // We'll add movement logic here later
    }

    draw(ctx) {
        drawShape(ctx, SHAPES.PLAYER, this.x, this.y, SIZES.PLAYER, COLORS.PLAYER);
    }
}
