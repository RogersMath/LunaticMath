// player.js
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.angle = 0; // Start at 0 degrees (pointing right)
        this.velocityX = 0;
        this.velocityY = 0;
        this.maxSpeed = 5;
        this.thrustPower = 0.05; // Reduced from previous acceleration value
    }

    update() {
        // Update position based on current velocity
        this.x += this.velocityX;
        this.y -= this.velocityY; // Remember, canvas Y is inverted

        // Keep player within canvas bounds (optional, remove if you want unbounded movement)
        this.x = (this.x + canvas.width) % canvas.width;
        this.y = (this.y + canvas.height) % canvas.height;

        // Calculate current speed
        const currentSpeed = Math.sqrt(this.velocityX ** 2 + this.velocityY ** 2);

        console.log(`Player position: (${this.x.toFixed(2)}, ${this.y.toFixed(2)}), Angle: ${(this.angle * 180 / Math.PI).toFixed(2)}°, Speed: ${currentSpeed.toFixed(2)}`);
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(-this.angle);
        drawShape(ctx, SHAPES.PLAYER, 0, 0, SIZES.PLAYER, COLORS.PLAYER);
        ctx.restore();
    }

    thrust() {
        // Apply thrust in the direction the ship is facing
        const thrustX = Math.cos(this.angle) * this.thrustPower;
        const thrustY = Math.sin(this.angle) * this.thrustPower;
        
        this.velocityX += thrustX;
        this.velocityY += thrustY;

        // Limit the maximum speed
        const currentSpeed = Math.sqrt(this.velocityX ** 2 + this.velocityY ** 2);
        if (currentSpeed > this.maxSpeed) {
            const ratio = this.maxSpeed / currentSpeed;
            this.velocityX *= ratio;
            this.velocityY *= ratio;
        }

        console.log(`Thrusting. Velocity: (${this.velocityX.toFixed(2)}, ${this.velocityY.toFixed(2)})`);
    }

    reverseThrust() {
        // Apply thrust in the opposite direction the ship is facing
        const thrustX = -Math.cos(this.angle) * this.thrustPower;
        const thrustY = -Math.sin(this.angle) * this.thrustPower;
        
        this.velocityX += thrustX;
        this.velocityY += thrustY;

        console.log(`Reverse thrusting. Velocity: (${this.velocityX.toFixed(2)}, ${this.velocityY.toFixed(2)})`);
    }

    rotateLeft() {
        this.angle += 0.1;
        console.log(`Rotating left. New angle: ${(this.angle * 180 / Math.PI).toFixed(2)}°`);
    }

    rotateRight() {
        this.angle -= 0.1;
        console.log(`Rotating right. New angle: ${(this.angle * 180 / Math.PI).toFixed(2)}°`);
    }

    shoot() {
        console.log("Player shooting");
        // Implement shooting logic here
    }
}
