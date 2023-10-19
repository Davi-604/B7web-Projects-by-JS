// AUXILLIARY VARIABLES
let d = (e) => document.querySelector(e);
let da = (e) => document.querySelectorAll(e);

// INITIAL VARIABLES
let currentQuestion = 0;
let totalCorrects = 0;

showQuestion()

// EVENTS
d('.scoreArea button').addEventListener('click', resetQuestions)
// FUNCTIONS
function showQuestion () {
    if(questions[currentQuestion]) {
        let q = questions[currentQuestion];
        
        let pct = Math.floor((currentQuestion / questions.length) * 100);
        d('.progress--bar').style.width = `${pct}%`

        d('.scoreArea').style.display = 'none';
        d('.questionArea').style.display = 'block';
        d('.question').innerHTML = `${parseInt(currentQuestion) + 1}) ${q.question}`;
        
        let optionsHtml = '';
        for (let i in q.options) {
            optionsHtml += `<div class="option" data-op="${i}"><span>${parseInt(i) + 1}</span>${q.options[i]}</div>`
        };
        d('.options').innerHTML = optionsHtml;

        da('.options .option').forEach((item) => {
            item.addEventListener('click', optionClick);
        })
    } else {
        finishQuiz();
    };;
};

function optionClick (e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if(questions[currentQuestion].answer === clickedOption) {
        totalCorrects++
    };

    currentQuestion++;
    showQuestion()
}
function finishQuiz () {
    d('.questionArea').style.display = 'none';
    d('.scoreArea').style.display = 'block';
    d('.progress--bar').style.width = `100%`;

    let points = Math.floor((totalCorrects / questions.length) * 100);
    d('.scorePct').innerHTML = `Acertou ${points}%`;
    d('.scoreText2').innerHTML = `Você repondeu ${questions.length} questões e acertou ${totalCorrects}`;

    if (points < 30) {
        d('.scoreText1').innerHTML = 'Precisa melhorar';
        d('.scorePct').style.color = '#f00';
    } else if (points >= 30 && points < 70) {
        d('.scoreText1').innerHTML = 'Até que foi bom';
        d('.scorePct').style.color = '#ff0';
    } else if (points >= 70) {
        d('.scoreText1').innerHTML = 'Excelente';
        d('.scorePct').style.color = '#0d630d';
    }
};

function resetQuestions () {
    currentQuestion = 0;
    totalCorrects = 0;
    showQuestion();
}
