const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20; // size of each cell in the grid
const tileCount = canvas.width / gridSize;

let snakeX = 10; 
let snakeY = 10;
let snakeVelocityX = 0;
let snakeVelocityY = 0;
const snakeTrail = [];
let snakeLength = 5;

let foodX = 15;
let foodY = 15;

function gameLoop() {
  // Move snake
  snakeX += snakeVelocityX;
  snakeY += snakeVelocityY;

  // Wrap snake around edges
  if (snakeX < 0) snakeX = tileCount - 1;
  if (snakeX > tileCount - 1) snakeX = 0;
  if (snakeY < 0) snakeY = tileCount - 1;
  if (snakeY > tileCount - 1) snakeY = 0;

  // Draw background
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw food
  ctx.fillStyle = 'red';
  ctx.fillRect(foodX * gridSize, foodY * gridSize, gridSize - 2, gridSize - 2);

  // Draw snake
  ctx.fillStyle = 'lime';
  for (let i = 0; i < snakeTrail.length; i++) {
    ctx.fillRect(snakeTrail[i].x * gridSize, snakeTrail[i].y * gridSize, gridSize - 2, gridSize - 2);

    // Check collision with tail
    if (snakeTrail[i].x === snakeX && snakeTrail[i].y === snakeY && snakeTrail.length > 5) {
      // Reset the snake
      snakeLength = 5;
    }
  }

  snakeTrail.push({x: snakeX, y: snakeY});
  while (snakeTrail.length > snakeLength) {
    snakeTrail.shift();
  }

  // Check if snake eats food
  if (snakeX === foodX && snakeY === foodY) {
    snakeLength++;
    // Place food in random position
    foodX = Math.floor(Math.random() * tileCount);
    foodY = Math.floor(Math.random() * tileCount);
  }
}

// Listen for keyboard input
document.addEventListener('keydown', keyPush);

function keyPush(evt) {
  switch(evt.key) {
    case 'ArrowLeft':
    case 'a':
      if (snakeVelocityX !== 1) {
        snakeVelocityX = -1; 
        snakeVelocityY = 0;
      }
      break;
    case 'ArrowUp':
    case 'w':
      if (snakeVelocityY !== 1) {
        snakeVelocityX = 0; 
        snakeVelocityY = -1;
      }
      break;
    case 'ArrowRight':
    case 'd':
      if (snakeVelocityX !== -1) {
        snakeVelocityX = 1; 
        snakeVelocityY = 0;
      }
      break;
    case 'ArrowDown':
    case 's':
      if (snakeVelocityY !== -1) {
        snakeVelocityX = 0; 
        snakeVelocityY = 1;
      }
      break;
  }
}

setInterval(gameLoop, 100);
