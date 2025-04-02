// game.js
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const music = document.getElementById("background-music");
const musicToggle = document.getElementById("music-toggle");

// Game Variables
const gravity = 0.6;
const jumpForce = -15;
const duckHeightReduction = 20;
let score = 0;
let gameSpeed = 5;
let gameOver = false;

// Load Images
const characterRunImg = new Image();
characterRunImg.src = "assets/character-run.png"; // Replace with your asset path

const characterJumpImg = new Image();
characterJumpImg.src = "assets/character-jump.png"; // Replace with your asset path

const characterDuckImg = new Image();
characterDuckImg.src = "assets/character-duck.png"; // Replace with your asset path

const cactusImg = new Image();
cactusImg.src = "assets/cactus.png"; // Replace with your asset path

const birdImg = new Image();
birdImg.src = "assets/bird.png"; // Replace with your asset path

// Placeholder URLs (remove these when using your assets)
if (!characterRunImg.src.includes("assets")) characterRunImg.src = "https://picsum.photos/50/50?random=1";
if (!characterJumpImg.src.includes("assets")) characterJumpImg.src = "https://picsum.photos/50/50?random=2";
if (!characterDuckImg.src.includes("assets")) characterDuckImg.src = "https://picsum.photos/50/50?random=3";
if (!cactusImg.src.includes("assets")) cactusImg.src = "https://picsum.photos/20/50?random=4";
if (!birdImg.src.includes("assets")) birdImg.src = "https://picsum.photos/30/30?random=5";

// Player Object
const player = {
    x: 50,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    velocityY: 0,
    jumping: false,
    ducking: false,
    update() {
        // Apply gravity
        this.velocityY += gravity;
        this.y += this.velocityY;

        // Ground collision
        if (this.y > canvas.height - this.height) {
            this.y = canvas.height - this.height;
            this.velocityY = 0;
            this.jumping = false;
        }

        // Adjust height when ducking
        if (this.ducking) {
            this.height = 50 - duckHeightReduction;
        } else {
            this.height = 50;
        }
    },
    draw() {
        let img = this.ducking ? characterDuckImg : (this.jumping ? characterJumpImg : characterRunImg);
        ctx.drawImage(img, this.x, this.y, this.width, this.height);
    },
    jump() {
        if (!this.jumping && !this.ducking) {
            this.velocityY = jumpForce;
            this.jumping = true;
        }
    },
    duck(state) {
        if (!this.jumping) {
            this.ducking = state;
        }
    }
};

// Enemy Class
class Enemy {
    constructor(type) {
        this.type = type; // "cactus" or "bird"
        this.width = type === "cactus" ? 20 : 30;
        this.height = type === "cactus" ? 50 : 30;
        this.x = canvas.width;
        this.y = type === "cactus" ? canvas.height - this.height : canvas.height - 150; // Birds fly higher
        this.speed = gameSpeed;
    }

    update() {
        this.x -= this.speed;
    }

    draw() {
        const img = this.type === "cactus" ? cactusImg : birdImg;
        ctx.drawImage(img, this.x, this.y, this.width, this.height);
    }
}

let enemies = [];
let frame = 0;

// Spawn Enemies
function spawnEnemy() {
    if (frame % 100 === 0) {
        const type = Math.random() > 0.5 ? "cactus" : "bird";
        enemies.push(new Enemy(type));
    }
}

// Collision Detection
function checkCollision() {
    for (let enemy of enemies) {
        if (
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
        ) {
            return true;
        }
    }
    return false;
}

// Game Loop
function gameLoop() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and Draw Player
    player.update();
    player.draw();

    // Spawn and Update Enemies
    spawnEnemy();
    enemies = enemies.filter(enemy => enemy.x + enemy.width > 0); // Remove off-screen enemies
    enemies.forEach(enemy => {
        enemy.update();
        enemy.draw();
    });

    // Update Score
    score++;
    document.getElementById("score").textContent = `Score: ${Math.floor(score / 10)}`;

    // Increase Game Speed
    gameSpeed += 0.001;
    enemies.forEach(enemy => enemy.speed = gameSpeed);

    // Check Collision
    if (checkCollision()) {
        gameOver = true;
        music.pause();
        document.getElementById("game-over").style.display = "block";
        document.getElementById("final-score").textContent = Math.floor(score / 10);
    }

    frame++;
    requestAnimationFrame(gameLoop);
}

// Restart Game
function restartGame() {
    score = 0;
    gameSpeed = 5;
    gameOver = false;
    enemies = [];
    player.y = canvas.height - player.height;
    player.velocityY = 0;
    player.jumping = false;
    player.ducking = false;
    document.getElementById("score").textContent = "Score: 0";
    document.getElementById("game-over").style.display = "none";
    if (musicToggle.checked) music.play();
    gameLoop();
}

// Event Listeners
document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        player.jump();
    }
    if (e.code === "ArrowDown") {
        player.duck(true);
    }
});

document.addEventListener("keyup", (e) => {
    if (e.code === "ArrowDown") {
        player.duck(false);
    }
});

// Music Control
musicToggle.addEventListener("change", () => {
    if (musicToggle.checked) {
        music.play();
    } else {
        music.pause();
    }
});

// Start Game
document.addEventListener("DOMContentLoaded", () => {
    if (musicToggle.checked) music.play();
    gameLoop();
});