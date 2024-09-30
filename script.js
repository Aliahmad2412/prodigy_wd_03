const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const messageElement = document.getElementById('message');
const winnerMessageText = document.getElementById('winner-message');
const restartButton = document.getElementById('restart');

let isCircleTurn; // false for X, true for O

// Winning combinations
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Start the game
startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    isCircleTurn = false;
    cells.forEach(cell => {
        cell.classList.remove('x');
        cell.classList.remove('circle');
        cell.textContent = ''; // Clear the text from previous games
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    messageElement.classList.remove('show');
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = isCircleTurn ? 'circle' : 'x';
    
    // Place the mark (X or O)
    placeMark(cell, currentClass);

    // Check for win or draw
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        // Switch turns
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if (draw) {
        winnerMessageText.textContent = "It's a draw!";
    } else {
        winnerMessageText.textContent = `${isCircleTurn ? "O's" : "X's"} Wins!`;
    }
    messageElement.classList.add('show');
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle');
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.textContent = currentClass === 'x' ? 'X' : 'O'; // Set the text content to 'X' or 'O'
}

function swapTurns() {
    isCircleTurn = !isCircleTurn;
}

function setBoardHoverClass() {
    board.classList.remove('x');
    board.classList.remove('circle');
    if (isCircleTurn) {
        board.classList.add('circle');
    } else {
        board.classList.add('x');
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}
