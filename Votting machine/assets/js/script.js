// FUNÇÕES AUXILIARES
let d = (e) => {
    return document.querySelector(e)
}
let da = (e) => {
    return document.querySelectorAll(e)
}

// ELEMENTOS DA TELA
let yourVote = d('.d-1-1 span');
let post = d('.d-1-2 span');
let description = d('.d-1-4');
let warning = d('.d-2');
let images = d('.d-1-right');
let slotNumber = d('.d-1-3');

//VARIÁVEIS E FUNÇÕES DE CONTROLE

let actualStage = 0;
let number = '';
let whiteVote = false;
let votes = []

function startStage () {
    let stage = stages[actualStage];
    let numberHTML = '';
    number = '';
    whiteVote = false;

    for (let i = 0; i < stage.numbers; i++) {
        if (i === 0) {
            numberHTML += '<div class="number blink"></div>'
        } else {
            numberHTML += '<div class="number"></div>'
        }
    } 

    yourVote.innerHTML = '';
    post.innerHTML = stage.title;
    description.innerHTML = '';
    warning.style.display = 'none';
    images.innerHTML = '';
    slotNumber.innerHTML = numberHTML
};

function updateInterface () {
    let stage = stages[actualStage];

    let candidate = stage.candidates.filter((item) => {
        if (item.number === number) {
            return true
        } else {
            return false
        }
    });

    if (candidate.length > 0) {
        candidate = candidate[0];
        yourVote.style.display = 'block';
        description.innerHTML = `Nome: ${candidate.name}<br/> Partido: ${candidate.parties}`;
        warning.style.display = 'block';
        let imgHTML = '';
        for (i in candidate.candidateImages) {
            if (candidate.candidateImages[i].small) {
                imgHTML += `<div class="d-1-img small"><img src="${candidate.candidateImages[i].url}">${candidate.candidateImages[i].legend}(a)</div>`
            } else {
            imgHTML += `<div class="d-1-img"><img src="${candidate.candidateImages[i].url}">${candidate.candidateImages[i].legend}(a)</div>`
            }
        }
        images.innerHTML = imgHTML;   
    } else {
        yourVote.style.display = 'block';
        warning.style.display = 'block';
        description.innerHTML = `<div class="bigWarning blink">VOTO NULO</div>`;
    }
}


// EVENTOS DE CLICK

function clicked (n) {
    let blinkNumber = d('.number.blink')
    if (blinkNumber !== null) {
        blinkNumber.innerHTML += n;
        number = `${number}${n}`;

        blinkNumber.classList.remove('blink');
        if (blinkNumber.nextElementSibling !== null) {
            blinkNumber.nextElementSibling.classList.add('blink')
        } else {
            updateInterface()
        }
    }
};
function whiteButton () {
    if (number === '') {
        whiteVote = true;
        yourVote.style.display = 'block';
        warning.style.display = 'block';
        slotNumber.innerHTML = '';
        description.innerHTML = `<div class="bigWarning blink">VOTO EM BRANCO</div>`;
        images.innerHTML = ''
    } else {
        alert('Para votar em BRANCO, não pode ter nenhum número digitado')
    }
};
function correct () {
    startStage()
};
function confirmVote () {
    let stage = stages[actualStage];
    let confirmedVote = false;

    if (number.length === stage.numbers) {
        confirmedVote = true;
        votes.push({
            stage: stages[actualStage].title,
            voteNumber: number
        })
    } else if (whiteVote === true) {
        confirmedVote = true;
        votes.push({
            stage: stages[actualStage].title,
            voteNumber: 'BRANCO'
        })
    };

    if (confirmedVote === true) {
        actualStage++;
        if (stages[actualStage] !== undefined) {
            startStage();
        } else {
            d('.screen').innerHTML = `<div class="gigaWarning">FIM</div>`;
            console.log(votes)
        }
    }
};

startStage()
