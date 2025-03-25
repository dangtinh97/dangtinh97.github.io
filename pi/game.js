const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const levelDisplay = document.getElementById('level');
const menu = document.getElementById('menu');
const ui = document.getElementById('ui');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const collisionSound = document.getElementById('collisionSound');
const winSound = document.getElementById('winSound');

// Điều chỉnh canvas
canvas.width = Math.min(window.innerWidth * 0.9, 400);
canvas.height = Math.min(window.innerHeight * 0.7, 600);

// Thông số game
const tileSize = 40;
const ball = { x: tileSize * 1.5, y: tileSize * 1.5, radius: 10, speedX: 0, speedY: 0 };
let score = 0;
let timeLeft = 60;
let level = 1;
let lastTime = performance.now();
let gameRunning = false;

// Các cấp độ mê cung
const mazes = [
  // Cấp 1
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 1],
    [1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 1, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  // Cấp 2
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 1, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  // Cấp 3
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 1, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
];
let currentMaze = mazes[0];

// Xử lý con quay hồi chuyển
window.addEventListener('deviceorientation', handleOrientation);

function handleOrientation(event) {
  if (!gameRunning) return;
  const tiltX = event.gamma || 0;
  const tiltY = event.beta || 0;
  ball.speedX = Math.max(-5, Math.min(5, tiltX * 0.2));
  ball.speedY = Math.max(-5, Math.min(5, tiltY * 0.2));
}

// Kiểm tra va chạm
function checkCollision(x, y) {
  const col = Math.floor(x / tileSize);
  const row = Math.floor(y / tileSize);
  return currentMaze[row] && currentMaze[row][col] === 1;
}

// Cập nhật game
function update(currentTime) {
  if (!gameRunning) return;

  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  // Cập nhật thời gian
  timeLeft -= deltaTime;
  if (timeLeft <= 0) {
    alert(`Hết giờ! Điểm: ${score}`);
    endGame();
    return;
  }
  timeDisplay.textContent = Math.max(0, Math.floor(timeLeft));

  // Cập nhật vị trí viên bi
  let newX = ball.x + ball.speedX;
  let newY = ball.y + ball.speedY;

  // Kiểm tra va chạm
  if (checkCollision(newX + ball.radius, ball.y) || checkCollision(newX - ball.radius, ball.y)) {
    collisionSound.play();
  } else {
    ball.x = newX;
  }
  if (checkCollision(ball.x, newY + ball.radius) || checkCollision(ball.x, newY - ball.radius)) {
    collisionSound.play();
  } else {
    ball.y = newY;
  }

  // Kiểm tra đến đích
  const goalRow = Math.floor(ball.y / tileSize);
  const goalCol = Math.floor(ball.x / tileSize);
  if (currentMaze[goalRow] && currentMaze[goalCol][goalCol] === 2) {
    winSound.play();
    score += Math.floor(timeLeft * 10);
    scoreDisplay.textContent = score;
    level++;
    if (level <= mazes.length) {
      currentMaze = mazes[level - 1];
      levelDisplay.textContent = level;
      resetBall();
    } else {
      alert(`Chúc mừng! Bạn đã hoàn thành tất cả cấp độ. Điểm: ${score}`);
      endGame();
    }
  }

  draw();
  requestAnimationFrame(update);
}

// Vẽ game
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Vẽ mê cung
  for (let row = 0; row < currentMaze.length; row++) {
    for (let col = 0; col < currentMaze[row].length; col++) {
      if (currentMaze[row][col] === 1) {
        ctx.fillStyle = 'black';
        ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
      } else if (currentMaze[row][col] === 2) {
        ctx.fillStyle = 'green';
        ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
      }
    }
  }

  // Vẽ viên bi
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.closePath();
}

// Reset vị trí viên bi
function resetBall() {
  ball.x = tileSize * 1.5;
  ball.y = tileSize * 1.5;
  ball.speedX = 0;
  ball.speedY = 0;
  timeLeft = 60;
}

// Kết thúc game
function endGame() {
  gameRunning = false;
  canvas.classList.add('hidden');
  ui.classList.add('hidden');
  menu.classList.remove('hidden');
  score = 0;
  level = 1;
  currentMaze = mazes[0];
  scoreDisplay.textContent = score;
  levelDisplay.textContent = level;
}

// Bắt đầu game
startButton.addEventListener('click', () => {
  menu.classList.add('hidden');
  canvas.classList.remove('hidden');
  ui.classList.remove('hidden');
  gameRunning = true;
  resetBall();
  lastTime = performance.now();
  requestAnimationFrame(update);
});

// Chơi lại
restartButton.addEventListener('click', () => {
  endGame();
  startButton.click();
});
