document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENTOS DEL DOM ---
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('score');
    const statusElement = document.getElementById('game-status');
    const playButton = document.getElementById('playButton');
    const restartButton = document.getElementById('restartButton');

    // --- CONFIGURACIÓN DEL JUEGO ---
    const gridSize = 20;
    let snake, food, score, direction, changingDirection, gameInterval, gameSpeed;

    // --- FUNCIONES PRINCIPALES DEL JUEGO ---

    function initializeGame() {
        snake = [{ x: 10, y: 10 }];
        food = {};
        score = 0;
        gameSpeed = 150; // Velocidad inicial
        direction = { x: 0, y: 0 };
        changingDirection = false;
        scoreElement.innerText = 0;
        statusElement.innerHTML = `Puntuación: <span id="score">0</span>`;
        generateFood();
    }

    function startGame() {
        initializeGame();
        playButton.style.display = 'none';
        restartButton.style.display = 'none';
        
        if (gameInterval) clearInterval(gameInterval);
        gameInterval = setInterval(mainLoop, gameSpeed);

        document.addEventListener('keydown', changeDirection);
    }

    function mainLoop() {
        if (isGameOver()) {
            endGame();
            return;
        }
        changingDirection = false;
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();
    }

    function endGame() {
        clearInterval(gameInterval);
        document.removeEventListener('keydown', changeDirection);
        statusElement.innerHTML = `¡Has perdido! Puntuación final: ${score}`;
        restartButton.style.display = 'inline-block';
    }

    // --- FUNCIONES DE LÓGICA Y DIBUJO ---

    function moveSnake() {
        const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
        snake.unshift(head);

        if (snake[0].x === food.x && snake[0].y === food.y) {
            score += 10;
            scoreElement.innerText = score;
            generateFood();
            // Aumentar la velocidad
            gameSpeed = Math.max(50, gameSpeed - 5);
            clearInterval(gameInterval);
            gameInterval = setInterval(mainLoop, gameSpeed);
        } else {
            snake.pop();
        }
    }

    function isGameOver() {
        const head = snake[0];
        if (
            head.x < 0 || head.x >= canvas.width / gridSize ||
            head.y < 0 || head.y >= canvas.height / gridSize
        ) {
            return true;
        }
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                return true;
            }
        }
        return false;
    }

    function generateFood() {
        food = {
            x: Math.floor(Math.random() * (canvas.width / gridSize)),
            y: Math.floor(Math.random() * (canvas.height / gridSize))
        };
        for (const part of snake) {
            if (part.x === food.x && part.y === food.y) {
                generateFood(); // Evita que la comida aparezca en la serpiente
                break;
            }
        }
    }

    function changeDirection(event) {
        if (changingDirection) return;
        
        const keyPressed = event.key;
        const goingUp = direction.y === -1;
        const goingDown = direction.y === 1;
        const goingLeft = direction.x === -1;
        const goingRight = direction.x === 1;

        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(keyPressed)) {
             event.preventDefault(); // Evita que la página se desplace
        }

        if (keyPressed === 'ArrowLeft' && !goingRight) {
            direction = { x: -1, y: 0 };
            changingDirection = true;
        } else if (keyPressed === 'ArrowUp' && !goingDown) {
            direction = { x: 0, y: -1 };
            changingDirection = true;
        } else if (keyPressed === 'ArrowRight' && !goingLeft) {
            direction = { x: 1, y: 0 };
            changingDirection = true;
        } else if (keyPressed === 'ArrowDown' && !goingUp) {
            direction = { x: 0, y: 1 };
            changingDirection = true;
        }
    }
    
    // --- FUNCIONES DE CANVAS ---

    function clearCanvas() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function drawSnake() {
        snake.forEach((part, index) => {
            ctx.fillStyle = index === 0 ? '#9c27b0' : '#6a1b9a'; // Cabeza de un color, cuerpo de otro
            ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
            ctx.strokeStyle = '#1a1a1a';
            ctx.strokeRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
        });
    }

    function drawFood() {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
    }
    
    // --- EVENT LISTENERS ---
    playButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', startGame);
});
