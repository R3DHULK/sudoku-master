let gameState = {
    playerName: '',
    boardSize: 9,
    difficulty: 'medium',
    board: [],
    solution: [],
    selectedCell: null,
    startTime: null,
    pausedTime: 0,
    moves: 0,
    hints: 3,
    gameTimer: null,
    isLightTheme: false,
    isPaused: false
};

// Theme toggle functionality
function toggleTheme() {
    gameState.isLightTheme = !gameState.isLightTheme;
    const body = document.body;
    const toggle = document.querySelector('.theme-toggle');

    if (gameState.isLightTheme) {
        body.classList.add('light-theme');
        toggle.textContent = '☀️ Light Mode';
    } else {
        body.classList.remove('light-theme');
        toggle.textContent = '🌙 Dark Mode';
    }
}

// Play/Pause functionality
function togglePause() {
    const pauseBtn = document.getElementById('pauseBtn');
    const pauseModal = document.getElementById('pauseModal');

    if (gameState.isPaused) {
        // Resume game
        gameState.isPaused = false;
        gameState.startTime = Date.now() - gameState.pausedTime;
        startTimer();
        pauseBtn.innerHTML = '⏸️ Pause';
        pauseModal.style.display = 'none';

        // Re-enable game interactions
        document.querySelectorAll('.sudoku-cell').forEach(cell => {
            cell.style.pointerEvents = 'auto';
        });
        document.querySelectorAll('.number-btn').forEach(btn => {
            btn.disabled = false;
        });
        document.querySelectorAll('.control-btn').forEach(btn => {
            if (btn.id !== 'pauseBtn') {
                btn.disabled = false;
            }
        });
    } else {
        // Pause game
        gameState.isPaused = true;
        gameState.pausedTime = Date.now() - gameState.startTime;
        clearInterval(gameState.gameTimer);
        pauseBtn.innerHTML = '▶️ Resume';
        pauseModal.style.display = 'flex';

        // Disable game interactions
        document.querySelectorAll('.sudoku-cell').forEach(cell => {
            cell.style.pointerEvents = 'none';
        });
        document.querySelectorAll('.number-btn').forEach(btn => {
            btn.disabled = true;
        });
        document.querySelectorAll('.control-btn').forEach(btn => {
            if (btn.id !== 'pauseBtn') {
                btn.disabled = true;
            }
        });
    }
}

// Initialize background animation
function initBackgroundAnimation() {
    const container = document.getElementById('backgroundAnimation');
    for (let i = 0; i < 15; i++) {
        const number = document.createElement('div');
        number.className = 'floating-number';
        number.textContent = Math.floor(Math.random() * 9) + 1;
        number.style.left = Math.random() * 100 + '%';
        number.style.top = Math.random() * 100 + '%';
        number.style.animationDelay = Math.random() * 8 + 's';
        container.appendChild(number);
    }
}

// Level selection handling
document.querySelectorAll('.level-option').forEach(option => {
    option.addEventListener('click', function () {
        document.querySelectorAll('.level-option').forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
        gameState.difficulty = this.dataset.level;
    });
});

function startGame() {
    const playerNameInput = document.getElementById('playerName');
    const boardSizeSelect = document.getElementById('boardSize');

    gameState.playerName = playerNameInput.value.trim() || 'Anonymous Player';
    gameState.boardSize = parseInt(boardSizeSelect.value);

    document.getElementById('setupScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';
    document.getElementById('playerDisplay').textContent = `👋 ${gameState.playerName}`;

    initializeGame();
}

function initializeGame() {
    gameState.moves = 0;
    gameState.hints = 3;
    gameState.startTime = Date.now();
    gameState.pausedTime = 0;
    gameState.isPaused = false;

    // Reset pause button
    document.getElementById('pauseBtn').innerHTML = '⏸️ Pause';
    document.getElementById('pauseModal').style.display = 'none';

    generatePuzzle();
    createGameBoard();
    createNumberPad();
    startTimer();

    updateDisplay();
}

function generatePuzzle() {
    const size = Math.sqrt(gameState.boardSize);
    gameState.board = [];
    gameState.solution = [];

    // Initialize empty boards
    for (let i = 0; i < size; i++) {
        gameState.board[i] = [];
        gameState.solution[i] = [];
        for (let j = 0; j < size; j++) {
            gameState.board[i][j] = 0;
            gameState.solution[i][j] = 0;
        }
    }

    // Generate a valid solution
    solveSudoku(gameState.solution, size);

    // Copy solution to board
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            gameState.board[i][j] = gameState.solution[i][j];
        }
    }

    // Remove numbers based on difficulty
    const difficultySettings = {
        easy: 0.4,
        medium: 0.55,
        hard: 0.7,
        superhard: 0.8
    };

    const removeRatio = difficultySettings[gameState.difficulty];
    const cellsToRemove = Math.floor(gameState.boardSize * removeRatio);

    for (let i = 0; i < cellsToRemove; i++) {
        let row, col;
        do {
            row = Math.floor(Math.random() * size);
            col = Math.floor(Math.random() * size);
        } while (gameState.board[row][col] === 0);

        gameState.board[row][col] = 0;
    }
}

function solveSudoku(board, size) {
    const boxSize = Math.sqrt(size);

    function isValid(board, row, col, num) {
        // Check row
        for (let i = 0; i < size; i++) {
            if (board[row][i] === num) return false;
        }

        // Check column
        for (let i = 0; i < size; i++) {
            if (board[i][col] === num) return false;
        }

        // Check box (for classic sudoku)
        if (size === 9) {
            const boxRow = Math.floor(row / 3) * 3;
            const boxCol = Math.floor(col / 3) * 3;
            for (let i = boxRow; i < boxRow + 3; i++) {
                for (let j = boxCol; j < boxCol + 3; j++) {
                    if (board[i][j] === num) return false;
                }
            }
        }

        return true;
    }

    function solve() {
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                if (board[row][col] === 0) {
                    const numbers = Array.from({ length: size }, (_, i) => i + 1);
                    shuffleArray(numbers);

                    for (let num of numbers) {
                        if (isValid(board, row, col, num)) {
                            board[row][col] = num;
                            if (solve()) return true;
                            board[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    solve();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createGameBoard() {
    const table = document.getElementById('sudokuTable');
    table.innerHTML = '';
    const size = Math.sqrt(gameState.boardSize);

    for (let i = 0; i < size; i++) {
        const row = table.insertRow();
        for (let j = 0; j < size; j++) {
            const cell = row.insertCell();
            cell.className = 'sudoku-cell';
            cell.dataset.row = i;
            cell.dataset.col = j;

            if (gameState.board[i][j] !== 0) {
                cell.textContent = gameState.board[i][j];
                cell.classList.add('pre-filled');
            }

            cell.addEventListener('click', function () {
                if (!gameState.isPaused && !this.classList.contains('pre-filled')) {
                    selectCell(this);
                }
            });
        }
    }
}

function createNumberPad() {
    const numberPad = document.getElementById('numberPad');
    numberPad.innerHTML = '';
    const maxNumber = Math.sqrt(gameState.boardSize);

    // Adjust grid columns based on number count
    const columns = Math.min(Math.ceil(maxNumber / 2), 5);
    numberPad.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

    for (let i = 1; i <= maxNumber; i++) {
        const button = document.createElement('button');
        button.className = 'number-btn';
        button.textContent = i;
        button.addEventListener('click', () => {
            if (!gameState.isPaused) {
                placeNumber(i);
            }
        });
        numberPad.appendChild(button);
    }

    // Add clear button
    const clearBtn = document.createElement('button');
    clearBtn.className = 'number-btn';
    clearBtn.textContent = '×';
    clearBtn.addEventListener('click', () => {
        if (!gameState.isPaused) {
            clearCell();
        }
    });
    numberPad.appendChild(clearBtn);
}

function selectCell(cell) {
    if (gameState.isPaused) return;

    document.querySelectorAll('.sudoku-cell').forEach(c => c.classList.remove('selected'));
    cell.classList.add('selected');
    gameState.selectedCell = cell;
}

function placeNumber(number) {
    if (gameState.isPaused || !gameState.selectedCell || gameState.selectedCell.classList.contains('pre-filled')) {
        return;
    }

    const row = parseInt(gameState.selectedCell.dataset.row);
    const col = parseInt(gameState.selectedCell.dataset.col);

    gameState.selectedCell.textContent = number;
    gameState.board[row][col] = number;
    gameState.moves++;

    // Check if number is correct
    if (gameState.solution[row][col] !== number) {
        gameState.selectedCell.classList.add('error');
        setTimeout(() => {
            gameState.selectedCell.classList.remove('error');
        }, 1000);
    }

    updateDisplay();
    checkWin();
}

function clearCell() {
    if (gameState.isPaused || !gameState.selectedCell || gameState.selectedCell.classList.contains('pre-filled')) {
        return;
    }

    const row = parseInt(gameState.selectedCell.dataset.row);
    const col = parseInt(gameState.selectedCell.dataset.col);

    gameState.selectedCell.textContent = '';
    gameState.board[row][col] = 0;
    gameState.moves++;

    updateDisplay();
}

function getHint() {
    if (gameState.isPaused) return;

    if (gameState.hints <= 0) {
        alert('No hints remaining!');
        return;
    }

    if (!gameState.selectedCell || gameState.selectedCell.classList.contains('pre-filled')) {
        alert('Please select an empty cell first!');
        return;
    }

    const row = parseInt(gameState.selectedCell.dataset.row);
    const col = parseInt(gameState.selectedCell.dataset.col);

    gameState.selectedCell.textContent = gameState.solution[row][col];
    gameState.board[row][col] = gameState.solution[row][col];
    gameState.selectedCell.classList.add('pre-filled');
    gameState.hints--;
    gameState.moves++;

    updateDisplay();
    checkWin();
}

function checkSolution() {
    if (gameState.isPaused) return;

    const size = Math.sqrt(gameState.boardSize);
    let correct = 0;
    let total = 0;

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (gameState.board[i][j] !== 0) {
                total++;
                if (gameState.board[i][j] === gameState.solution[i][j]) {
                    correct++;
                }
            }
        }
    }

    alert(`Progress: ${correct}/${gameState.boardSize} cells correct (${Math.round(correct / gameState.boardSize * 100)}%)`);
}

function checkWin() {
    if (gameState.isPaused) return;

    const size = Math.sqrt(gameState.boardSize);

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (gameState.board[i][j] !== gameState.solution[i][j]) {
                return false;
            }
        }
    }

    // Player won!
    clearInterval(gameState.gameTimer);
    const timeElapsed = Math.floor((Date.now() - gameState.startTime) / 1000);
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;

    document.getElementById('victoryMessage').innerHTML = `
                <p>🎊 Congratulations ${gameState.playerName}!</p>
                <p>You solved the ${Math.sqrt(gameState.boardSize)}x${Math.sqrt(gameState.boardSize)} ${gameState.difficulty} puzzle!</p>
                <p>⏱️ Time: ${minutes}:${seconds.toString().padStart(2, '0')}</p>
                <p>🎯 Moves: ${gameState.moves}</p>
                <p>💡 Hints used: ${3 - gameState.hints}</p>
            `;

    document.getElementById('victoryModal').style.display = 'flex';
}

function startTimer() {
    if (gameState.gameTimer) {
        clearInterval(gameState.gameTimer);
    }

    gameState.gameTimer = setInterval(() => {
        if (!gameState.isPaused) {
            const timeElapsed = Math.floor((Date.now() - gameState.startTime) / 1000);
            const minutes = Math.floor(timeElapsed / 60);
            const seconds = timeElapsed % 60;
            document.getElementById('timeDisplay').textContent =
                `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }, 1000);
}

function updateDisplay() {
    document.getElementById('movesDisplay').textContent = gameState.moves;
    document.getElementById('hintsDisplay').textContent = gameState.hints;
}

function newGame() {
    document.getElementById('victoryModal').style.display = 'none';
    document.getElementById('pauseModal').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('setupScreen').style.display = 'block';

    if (gameState.gameTimer) {
        clearInterval(gameState.gameTimer);
    }

    // Reset game state
    gameState.isPaused = false;
    gameState.pausedTime = 0;

    // Reset form
    document.getElementById('playerName').value = gameState.playerName;
    document.getElementById('boardSize').value = gameState.boardSize;
    document.querySelectorAll('.level-option').forEach(opt => opt.classList.remove('selected'));
    document.querySelector(`[data-level="${gameState.difficulty}"]`).classList.add('selected');
}

// Initialize the game
initBackgroundAnimation();