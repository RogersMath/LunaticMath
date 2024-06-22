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

    const handleInput = setupInputHandlers();

    loadAssets().then(() => {
        gameLoop(handleInput);
    });
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function setupInputHandlers() {
    const keys = {};

    function handleButton(id, startAction, stopAction = null) {
        const button = document.getElementById(id);
        button.addEventListener('mousedown', startAction);
        button.addEventListener('touchstart', startAction);
        if (stopAction) {
            button.addEventListener('mouseup', stopAction);
            button.addEventListener('touchend', stopAction);
        }
    }

    handleButton('thrustBtn', () => keys['Thrust'] = true, () => keys['Thrust'] = false);
    handleButton('reverseBtn', () => keys['Reverse'] = true, () => keys['Reverse'] = false);
    handleButton('leftBtn', () => keys['Left'] = true, () => keys['Left'] = false);
    handleButton('rightBtn', () => keys['Right'] = true, () => keys['Right'] = false);
    handleButton('shootBtn', () => keys['Shoot'] = true, () => keys['Shoot'] = false);
    handleButton('menuBtn', toggleMenu);

    document.addEventListener('keydown', (e) => {
        keys[e.key] = true;
    });

    document.addEventListener('keyup', (e) => {
        keys[e.key] = false;
    });

    return function handleInput() {
        if (keys['Thrust'] || keys['ArrowUp']) player.thrust();
        if (keys['Reverse'] || keys['ArrowDown']) player.reverseThrust();
        if (keys['Left'] || keys['ArrowLeft']) player.rotateLeft();
        if (keys['Right'] || keys['ArrowRight']) player.rotateRight();
        if (keys['Shoot'] || keys[' ']) player.shoot();
    };
}

function toggleMenu() {
    console.log("Menu toggled");
}

function update(handleInput) {
    handleInput();
    player.update();
    world.update(player);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    world.drawRelativeToPlayer(ctx, player);
    player.draw(ctx);
}

function gameLoop(handleInput) {
    update(handleInput);
    draw();
    requestAnimationFrame(() => gameLoop(handleInput));
}

window.onload = init;
