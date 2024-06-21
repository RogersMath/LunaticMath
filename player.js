// player.js
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 5;
        this.dx = 0;
        this.dy = 0;
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        // Keep player within canvas bounds
        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));
    }

    draw(ctx) {
        drawShape(ctx, SHAPES.PLAYER, this.x, this.y, SIZES.PLAYER, COLORS.PLAYER);
    }

    moveUp() { this.dy = -this.speed; }
    moveDown() { this.dy = this.speed; }
    moveLeft() { this.dx = -this.speed; }
    moveRight() { this.dx = this.speed; }
    stopVertical() { this.dy = 0; }
    stopHorizontal() { this.dx = 0; }
}
