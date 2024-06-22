// main.js
let canvas, ctx;
let player;
let world;

function init() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    player = new Player(canvas.width / 2, canvas.height / 2);
    world = new World();

    setupInputHandlers();

    loadAssets().then(() => {
        gameLoop();
    });
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function setupInputHandlers() {
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowUp': player.moveUp(); break;
            case 'ArrowDown': player.moveDown(); break;
            case 'ArrowLeft': player.moveLeft(); break;
            case 'ArrowRight': player.moveRight(); break;
        }
    });

    document.addEventListener('keyup', (e) => {
        switch(e.key) {
            case 'ArrowUp':
            case 'ArrowDown':
                player.stopVertical();
                break;
            case 'ArrowLeft':
            case 'ArrowRight':
                player.stopHorizontal();
                break;
        }
    });
}

function update() {
    player.update();
    world.update(player);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    world.drawRelativeToPlayer(ctx, player);
    drawShape(ctx, SHAPES.PLAYER, canvas.width / 2, canvas.height / 2, SIZES.PLAYER, COLORS.PLAYER);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

window.onload = init;
