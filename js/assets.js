// assets.js

const COLORS = {
    PLAYER: '#00FF00',
    ENEMY: '#FF0000',
    STATION: '#0000FF',
    ASTEROID: '#8B4513',
    PLANET: '#4682B4',
    ANOMALY: '#FF00FF'
};

const SHAPES = {
    PLAYER: 'triangle',
    ENEMY: 'diamond',
    STATION: 'square',
    ASTEROID: 'circle',
    PLANET: 'circle',
    ANOMALY: 'star'
};

const SIZES = {
    PLAYER: 20,
    ENEMY: 15,
    STATION: 40,
    ASTEROID: 10,
    PLANET: 50,
    ANOMALY: 25
};

function drawShape(ctx, shape, x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();

    switch (shape) {
        case 'triangle': // This is our player ship
            ctx.moveTo(x + size / 2, y);
            ctx.lineTo(x - size / 2, y - size / 3);
            ctx.lineTo(x - size / 2, y + size / 3);
            break;
        case 'diamond':
            ctx.moveTo(x, y - size / 2);
            ctx.lineTo(x + size / 2, y);
            ctx.lineTo(x, y + size / 2);
            ctx.lineTo(x - size / 2, y);
            break;
        case 'square':
            ctx.rect(x - size / 2, y - size / 2, size, size);
            break;
        case 'circle':
            ctx.arc(x, y, size / 2, 0, Math.PI * 2);
            break;
        case 'star':
            for (let i = 0; i < 5; i++) {
                ctx.lineTo(x + size / 2 * Math.cos(i * 4 * Math.PI / 5),
                           y + size / 2 * Math.sin(i * 4 * Math.PI / 5));
                ctx.lineTo(x + size / 4 * Math.cos((i * 4 + 2) * Math.PI / 5),
                           y + size / 4 * Math.sin((i * 4 + 2) * Math.PI / 5));
            }
            break;
    }

    ctx.closePath();
    ctx.fill();
}

// This function simulates asset loading
function loadAssets() {
    return new Promise((resolve) => {
        console.log("Assets loaded!");
        resolve();
    });
}
