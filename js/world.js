// world.js
class World {
    constructor() {
        this.entities = [];
        this.generateInitialEntities();
    }

    generateInitialEntities() {
        // Add some random entities
        for (let i = 0; i < 20; i++) {
            this.addRandomEntity();
        }
        
        // Add a station
        this.entities.push({
            type: 'STATION',
            x: canvas.width / 2,
            y: canvas.height / 2
        });
    }

    addRandomEntity() {
        const types = ['ASTEROID', 'PLANET', 'ANOMALY'];
        const type = types[Math.floor(Math.random() * types.length)];
        this.entities.push({
            type: type,
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height
        });
    }

    // Add this method to the World class in world.js
    drawRelativeToPlayer(ctx, player) {
        const offsetX = canvas.width / 2 - player.x;
        const offsetY = canvas.height / 2 - player.y;
    
        this.entities.forEach(entity => {
            const relativeX = entity.x + offsetX;
            const relativeY = entity.y + offsetY;
            drawShape(ctx, SHAPES[entity.type], relativeX, relativeY, SIZES[entity.type], COLORS[entity.type]);
        });
    }

    update(player) {
        // Remove entities that are too far from the player
        this.entities = this.entities.filter(entity => 
            Math.hypot(entity.x - player.x, entity.y - player.y) < 1000
        );

        // Add new entities as the player moves
        while (this.entities.length < 30) {
            const angle = Math.random() * Math.PI * 2;
            const distance = 800 + Math.random() * 200;
            this.entities.push({
                type: ['ASTEROID', 'PLANET', 'ANOMALY'][Math.floor(Math.random() * 3)],
                x: player.x + Math.cos(angle) * distance,
                y: player.y + Math.sin(angle) * distance
            });
        }
    }

    draw(ctx) {
        this.entities.forEach(entity => {
            drawShape(ctx, SHAPES[entity.type], entity.x, entity.y, SIZES[entity.type], COLORS[entity.type]);
        });
    }
}
