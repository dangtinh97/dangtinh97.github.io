const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Thông số viên bi
let ball = {
  x: 50,
  y: 50,
  radius: 10,
  speedX: 0,
  speedY: 0
};

// Mê cung đơn giản (các tường)
const walls = [
  { x: 0, y: 0, width: 400, height: 10 }, // Tường trên
  { x: 0, y: 590, width: 400, height: 10 }, // Tường dưới
  { x: 0, y: 0, width: 10, height: 600 }, // Tường trái
  { x: 390, y: 0, width: 10, height: 600 }, // Tường phải
  { x: 100, y: 100, width: 200, height: 10 } // Tường giữa
];

// Điểm kết thúc
const goal = { x: 350, y: 550, width: 20, height: 20 };

// Lấy dữ liệu từ con quay hồi chuyển
window.addEventListener('deviceorientation', handleOrientation);

function handleOrientation(event) {
  const tiltX = event.gamma; // Nghiêng trái-phải
  const tiltY = event.beta;  // Nghiêng trước-sau

  // Điều chỉnh tốc độ viên bi dựa trên độ nghiêng
  ball.speedX = tiltX * 0.2;
  ball.speedY = tiltY * 0.2;
}

// Vòng lặp game
function update() {
  // Cập nhật vị trí viên bi
  ball.x += ball.speedX;
  ball.y += ball.speedY;

  // Kiểm tra va chạm với tường
  walls.forEach(wall => {
    if (checkCollision(ball, wall)) {
      ball.x -= ball.speedX;
      ball.y -= ball.speedY;
    }
  });

  // Kiểm tra đến đích
  if (checkCollision(ball, goal)) {
    alert("Chúc mừng! Bạn đã thắng!");
    resetGame();
  }

  // Vẽ lại khung cảnh
  draw();
  requestAnimationFrame(update);
}

// Kiểm tra va chạm
function checkCollision(ball, rect) {
  return ball.x + ball.radius > rect.x &&
    ball.x - ball.radius < rect.x + rect.width &&
    ball.y + ball.radius > rect.y &&
    ball.y - ball.radius < rect.y + rect.height;
}

// Vẽ game
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Vẽ mê cung
  ctx.fillStyle = 'black';
  walls.forEach(wall => {
    ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
  });

  // Vẽ điểm kết thúc
  ctx.fillStyle = 'green';
  ctx.fillRect(goal.x, goal.y, goal.width, goal.height);

  // Vẽ viên bi
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.closePath();
}

// Reset game
function resetGame() {
  ball.x = 50;
  ball.y = 50;
  ball.speedX = 0;
  ball.speedY = 0;
}

// Bắt đầu game
update();
