// FUNÇÕES AUXILIARES
let d = (e) => document.querySelector(e);
let da = (e) => document.querySelectorAll(e);

// DADOS INICIAIS
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
}

let player = '';
let warning = '';
let playing = false;

resetGame()

// EVENTOS
d('.reset').addEventListener('click', resetGame);
da('.item').forEach((item) => {
    item.addEventListener('click', itemClick)
})

// FUNÇÕES

function itemClick (event) {
    let item = event.target.getAttribute('data-item');
    
    if (playing && square[item] === '') {
        square[item] = player;
        renderSquare();
        togglePlayer();
    } 
};
function resetGame () {
    warning = '';
    let random = Math.floor(Math.random() * 2);

    if (random === 0) {
        player = 'X'
    } else {
        player = 'O'
    };

    for (let i in square) {
        square[i] = ''
    };

    playing = true;

    renderSquare();
    renderInfo()
};

function renderSquare () {
    for (let i in square) {
        let item = d(`div[data-item="${i}"]`);
        item.innerHTML = square[i]
    };

    checkGame()
};
function renderInfo () {
    d('.vez').innerHTML = player;
    d('.resultado').innerHTML = warning
};
function togglePlayer () {
    if (player === 'O') {
        player = 'X'
    } else {
        player = 'O'
    };
    renderInfo()
};

function checkGame () {
    if (checkWinnerFor('X')) {
        warning = 'O "X" ganhou!';
        playing = false;
    } else if (checkWinnerFor('O')) {
        warning = 'O "O" ganhou!';
        playing = false
    } else if (isFull()) {
        warning = 'Deu Velha!';
        playing = false
    }
};
function checkWinnerFor (player) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1',
    ];

    for (let w in pos) {
        let pArray = pos[w].split(',');
        let hasWon = pArray.every((option) => square[option] === player);
        if (hasWon) {
            return true
        }
    }
    return false
};
function isFull () {
    for (let i in square) {
        if (square[i] === '') {
            return false
        } 
    };
    return true
}

