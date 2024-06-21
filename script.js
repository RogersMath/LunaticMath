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

    loadAssets().then(() => {
        gameLoop();
    });
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function update() {
    player.update();
    world.update(player);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    world.draw(ctx);
    player.draw(ctx);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

window.onload = init;
