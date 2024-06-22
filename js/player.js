// player.js
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.angle = 0; // Angle in radians
        this.speed = 0;
        this.maxSpeed = 5;
        this.acceleration = 0.1;
        this.rotationSpeed = 0.1;
    }

    update() {
        // Update position based on current speed and angle
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        // Apply drag to gradually slow down
        this.speed *= 0.99;

        // Keep player within canvas bounds (optional, remove if you want unbounded movement)
        this.x = (this.x + canvas.width) % canvas.width;
        this.y = (this.y + canvas.height) % canvas.height;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(this.angle);
        drawShape(ctx, SHAPES.PLAYER, 0, 0, SIZES.PLAYER, COLORS.PLAYER);
        ctx.restore();
    }

    thrust() {
        this.speed = Math.min(this.speed + this.acceleration, this.maxSpeed);
    }

    reverseThrust() {
        this.speed = Math.max(this.speed - this.acceleration, -this.maxSpeed / 2);
    }

    rotateLeft() {
        this.angle -= this.rotationSpeed;
    }

    rotateRight() {
        this.angle += this.rotationSpeed;
    }

    shoot() {
        console.log("Player shooting");
        // Implement shooting logic here
    }
}
