// world.js
class World {
    constructor() {
        this.entities = [];
        this.generateInitialEntities();
    }

    generateInitialEntities() {
        // Add some random entities
        for (let i = 0; i < 10; i++) {
            this.entities.push({
                type: 'ASTEROID',
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height
            });
        }
        
        // Add a station
        this.entities.push({
            type: 'STATION',
            x: canvas.width / 2,
            y: canvas.height / 2
        });
    }

    update(player) {
        // We'll add logic for entity behavior and generation here later
    }

    draw(ctx) {
        this.entities.forEach(entity => {
            drawShape(ctx, SHAPES[entity.type], entity.x, entity.y, SIZES[entity.type], COLORS[entity.type]);
        });
    }
}
