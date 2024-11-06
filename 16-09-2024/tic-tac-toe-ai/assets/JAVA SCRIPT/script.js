// script.js
const board = document.querySelector('.board');
const cells = Array.from(document.querySelectorAll('.cell'));
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let boardState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X'; // Player 'X' starts
let gameOver = false;

// Função para verificar se há um vencedor
const checkWinner = () => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
        [0, 4, 8], [2, 4, 6] // diagonais
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return boardState[a];
        }
    }
    return boardState.includes('') ? null : 'T'; // T para empate
};

// Função minimax
const minimax = (boardState, depth, isMaximizing) => {
    const winner = checkWinner(boardState);

    if (winner === 'X') return -10;
    if (winner === 'O') return 10;
    if (winner === 'T') return 0;

    const availableMoves = boardState.map((value, index) => value === '' ? index : null).filter(index => index !== null);

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (const move of availableMoves) {
            boardState[move] = 'O';
            const score = minimax(boardState, depth + 1, false);
            boardState[move] = '';
            bestScore = Math.max(score, bestScore);
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (const move of availableMoves) {
            boardState[move] = 'X';
            const score = minimax(boardState, depth + 1, true);
            boardState[move] = '';
            bestScore = Math.min(score, bestScore);
        }
        return bestScore;
    }
};

// Função para a IA fazer a jogada
const aiMove = () => {
    const availableMoves = boardState.map((value, index) => value === '' ? index : null).filter(index => index !== null);

    if (availableMoves.length === 0) return;

    let bestMove = null;
    let bestScore = -Infinity;

    for (const move of availableMoves) {
        boardState[move] = 'O';
        const score = minimax(boardState, 0, false);
        boardState[move] = '';
        if (score > bestScore) {
            bestScore = score;
            bestMove = move;
        }
    }

    boardState[bestMove] = 'O';
    cells[bestMove].textContent = 'O';
    cells[bestMove].classList.add('O');
    currentPlayer = 'X';

    const winner = checkWinner();
    if (winner) {
        endGame(winner);
    }
};

// Função para lidar com o clique nas células
const handleClick = (e) => {
    if (gameOver) return;

    const index = e.target.getAttribute('data-index');
    if (boardState[index] !== '' || e.target.classList.contains('X') || e.target.classList.contains('O')) return;

    boardState[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add(currentPlayer);
    const winner = checkWinner();

    if (winner) {
        endGame(winner);
    } else {
        currentPlayer = 'O';
        aiMove();
    }
};

// Função para encerrar o jogo
const endGame = (winner) => {
    gameOver = true;
    if (winner === 'T') {
        message.textContent = 'Empate!';
    } else {
        message.textContent = `${winner} venceu!`;
    }
};

// Função para reiniciar o jogo
const resetGame = () => {
    boardState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
    message.textContent = '';
};

// Adiciona event listeners
board.addEventListener('click', handleClick);
resetButton.addEventListener('click', resetGame);
